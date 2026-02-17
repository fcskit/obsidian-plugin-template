#!/usr/bin/env node

/**
 * Debug Code Cleanup Script
 * 
 * Removes debug logging code from source files when features reach stable phase.
 * This improves code readability by removing development-only debug scaffolding.
 * 
 * Usage:
 *   node scripts/clean-debug-code.mjs [options] [files...]
 * 
 * Options:
 *   --dry-run    Show what would be removed without actually removing it
 *   --all        Process all TypeScript files in src/
 *   --verbose    Show detailed information about each removal
 * 
 * Examples:
 *   node scripts/clean-debug-code.mjs --dry-run --all
 *   node scripts/clean-debug-code.mjs src/main.ts src/ui/MyModal.ts
 *   node scripts/clean-debug-code.mjs --all
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

class DebugCodeCleaner {
    constructor(options = {}) {
        this.dryRun = options.dryRun || false;
        this.verbose = options.verbose || false;
        this.stats = {
            filesProcessed: 0,
            filesModified: 0,
            blocksRemoved: 0,
            linesRemoved: 0,
        };
    }

    /**
     * Find all TypeScript files recursively
     */
    findTypeScriptFiles(dir) {
        const files = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            
            if (entry.isDirectory()) {
                // Skip node_modules and build output
                if (entry.name === 'node_modules' || entry.name === 'dist') {
                    continue;
                }
                files.push(...this.findTypeScriptFiles(fullPath));
            } else if (entry.isFile() && entry.name.endsWith('.ts')) {
                files.push(fullPath);
            }
        }

        return files;
    }

    /**
     * Remove debug code blocks from file content
     * 
     * Looks for blocks marked with:
     *   // DEBUG_START
     *   logger.debug(...);
     *   // DEBUG_END
     */
    removeDebugBlocks(content, filePath) {
        const lines = content.split('\n');
        const newLines = [];
        let inDebugBlock = false;
        let debugBlockStart = -1;
        let blocksFound = 0;
        let linesRemoved = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            if (trimmed === '// DEBUG_START') {
                inDebugBlock = true;
                debugBlockStart = i + 1; // Line number (1-indexed)
                blocksFound++;
                continue; // Don't include this line
            }

            if (trimmed === '// DEBUG_END') {
                if (!inDebugBlock) {
                    console.warn(
                        `${colors.yellow}Warning:${colors.reset} Found DEBUG_END without DEBUG_START at ${filePath}:${i + 1}`
                    );
                    newLines.push(line); // Keep orphaned DEBUG_END
                } else {
                    inDebugBlock = false;
                    
                    if (this.verbose) {
                        console.log(
                            `  ${colors.cyan}→${colors.reset} Removed debug block at lines ${debugBlockStart}-${i + 1}`
                        );
                    }
                }
                continue; // Don't include this line
            }

            if (inDebugBlock) {
                linesRemoved++;
                continue; // Skip lines inside debug block
            }

            newLines.push(line);
        }

        // Check for unclosed debug blocks
        if (inDebugBlock) {
            console.warn(
                `${colors.yellow}Warning:${colors.reset} Found DEBUG_START without DEBUG_END at ${filePath}:${debugBlockStart}`
            );
        }

        return {
            content: newLines.join('\n'),
            blocksFound,
            linesRemoved,
        };
    }

    /**
     * Process a single file
     */
    processFile(filePath) {
        this.stats.filesProcessed++;

        // Read file
        let content;
        try {
            content = fs.readFileSync(filePath, 'utf8');
        } catch (error) {
            console.error(
                `${colors.red}Error:${colors.reset} Failed to read ${filePath}: ${error.message}`
            );
            return;
        }

        // Check if file has any debug blocks
        if (!content.includes('// DEBUG_START')) {
            if (this.verbose) {
                console.log(`  ${colors.blue}○${colors.reset} ${filePath} (no debug blocks)`);
            }
            return;
        }

        // Remove debug blocks
        const result = this.removeDebugBlocks(content, filePath);

        if (result.blocksFound === 0) {
            if (this.verbose) {
                console.log(`  ${colors.blue}○${colors.reset} ${filePath} (no debug blocks)`);
            }
            return;
        }

        this.stats.filesModified++;
        this.stats.blocksRemoved += result.blocksFound;
        this.stats.linesRemoved += result.linesRemoved;

        // Show what we're doing
        const action = this.dryRun ? 'Would remove' : 'Removed';
        const plural = result.blocksFound === 1 ? 'block' : 'blocks';
        console.log(
            `  ${colors.green}✓${colors.reset} ${filePath}: ${action} ${result.blocksFound} debug ${plural} (${result.linesRemoved} lines)`
        );

        // Write file (unless dry run)
        if (!this.dryRun) {
            try {
                fs.writeFileSync(filePath, result.content, 'utf8');
            } catch (error) {
                console.error(
                    `${colors.red}Error:${colors.reset} Failed to write ${filePath}: ${error.message}`
                );
            }
        }
    }

    /**
     * Process multiple files
     */
    processFiles(files) {
        console.log(`\n${colors.bright}Processing ${files.length} files...${colors.reset}\n`);

        for (const file of files) {
            this.processFile(file);
        }

        this.printSummary();
    }

    /**
     * Print summary statistics
     */
    printSummary() {
        console.log(`\n${colors.bright}Summary:${colors.reset}`);
        console.log(`  Files processed:  ${this.stats.filesProcessed}`);
        console.log(`  Files modified:   ${this.stats.filesModified}`);
        console.log(`  Debug blocks:     ${this.stats.blocksRemoved}`);
        console.log(`  Lines removed:    ${this.stats.linesRemoved}`);

        if (this.dryRun) {
            console.log(
                `\n${colors.yellow}Dry run mode - no files were actually modified${colors.reset}`
            );
            console.log(`Run without --dry-run to actually remove debug code\n`);
        } else if (this.stats.filesModified > 0) {
            console.log(
                `\n${colors.green}✓ Successfully cleaned debug code from ${this.stats.filesModified} files${colors.reset}\n`
            );
        } else {
            console.log(`\n${colors.blue}No debug blocks found to remove${colors.reset}\n`);
        }
    }
}

/**
 * Parse command line arguments
 */
function parseArgs(args) {
    const options = {
        dryRun: false,
        all: false,
        verbose: false,
        files: [],
    };

    for (const arg of args) {
        if (arg === '--dry-run') {
            options.dryRun = true;
        } else if (arg === '--all') {
            options.all = true;
        } else if (arg === '--verbose') {
            options.verbose = true;
        } else if (arg === '--help' || arg === '-h') {
            printHelp();
            process.exit(0);
        } else if (!arg.startsWith('--')) {
            options.files.push(arg);
        } else {
            console.error(`${colors.red}Error:${colors.reset} Unknown option: ${arg}`);
            printHelp();
            process.exit(1);
        }
    }

    return options;
}

/**
 * Print help message
 */
function printHelp() {
    console.log(`
${colors.bright}Debug Code Cleanup Script${colors.reset}

Removes debug logging code from source files when features reach stable phase.

${colors.bright}Usage:${colors.reset}
  node scripts/clean-debug-code.mjs [options] [files...]

${colors.bright}Options:${colors.reset}
  --dry-run    Show what would be removed without actually removing it
  --all        Process all TypeScript files in src/
  --verbose    Show detailed information about each removal
  --help, -h   Show this help message

${colors.bright}Examples:${colors.reset}
  # Preview changes for all files
  node scripts/clean-debug-code.mjs --dry-run --all

  # Remove debug code from specific files
  node scripts/clean-debug-code.mjs src/main.ts src/ui/MyModal.ts

  # Remove debug code from all files
  node scripts/clean-debug-code.mjs --all

${colors.bright}Debug Block Format:${colors.reset}
  The script looks for blocks marked with special comments:

  ${colors.cyan}// DEBUG_START${colors.reset}
  logger.debug('Detailed debug info', { data });
  ${colors.cyan}// DEBUG_END${colors.reset}

  Everything between DEBUG_START and DEBUG_END (inclusive) will be removed.

${colors.bright}When to Use:${colors.reset}
  - Feature is stable and well-tested
  - Debug logging no longer needed for troubleshooting
  - Want to improve code readability
  - Before major release

${colors.bright}Note:${colors.reset}
  This is for ${colors.yellow}permanent removal${colors.reset} of debug code. For temporary disabling,
  use the build-time elimination feature instead (logger.debug() calls are
  automatically removed from production builds).
`);
}

/**
 * Main function
 */
function main() {
    const args = process.argv.slice(2);
    const options = parseArgs(args);

    console.log(`\n${colors.bright}${colors.magenta}Debug Code Cleanup${colors.reset}\n`);

    const cleaner = new DebugCodeCleaner({
        dryRun: options.dryRun,
        verbose: options.verbose,
    });

    let files = [];

    if (options.all) {
        // Find all TypeScript files in src/
        const srcDir = path.join(__dirname, '..', 'src');
        if (!fs.existsSync(srcDir)) {
            console.error(`${colors.red}Error:${colors.reset} src/ directory not found`);
            process.exit(1);
        }
        files = cleaner.findTypeScriptFiles(srcDir);
    } else if (options.files.length > 0) {
        // Use specified files
        files = options.files.map(f => path.resolve(f));
        
        // Validate files exist
        for (const file of files) {
            if (!fs.existsSync(file)) {
                console.error(`${colors.red}Error:${colors.reset} File not found: ${file}`);
                process.exit(1);
            }
        }
    } else {
        console.error(
            `${colors.red}Error:${colors.reset} No files specified. Use --all or specify files.`
        );
        printHelp();
        process.exit(1);
    }

    if (files.length === 0) {
        console.log(`${colors.yellow}No TypeScript files found${colors.reset}\n`);
        process.exit(0);
    }

    cleaner.processFiles(files);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { DebugCodeCleaner };
