/**
 * Centralized logging system for Obsidian plugins
 * Provides granular control over debug output from different components
 * Supports both console and file logging
 * 
 * PRODUCTION BUILDS: Debug code is completely removed from production builds
 * via dead code elimination. Use NODE_ENV=production in build to strip debug.
 */

import { App } from 'obsidian';

// Build-time constant - will be replaced by esbuild
declare const BUILD_ENV: string;

/**
 * Check if we're in development mode
 * This will be evaluated at compile time and removed in production builds
 */
function isDevelopment(): boolean {
	try {
		return typeof BUILD_ENV !== 'undefined' && BUILD_ENV === 'development';
	} catch {
		// Fallback if BUILD_ENV is not defined
		return false;
	}
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type ComponentName = 
    | 'main'          // Plugin main class
    | 'modal'         // Modal dialogs
    | 'api'           // API calls
    | 'settings'      // Settings management
    | 'ui'            // UI components
    | 'events'        // Event handling
    | 'general';      // General/uncategorized

export interface LoggerConfig {
    main: LogLevel;
    modal: LogLevel;
    api: LogLevel;
    settings: LogLevel;
    ui: LogLevel;
    events: LogLevel;
    general: LogLevel;
}

/**
 * Tag-based filtering configuration
 * Allows granular control within components (e.g., only show 'validation' debug from 'npe')
 */
export interface TagFilterConfig {
    component: ComponentName;
    level: LogLevel;
    tags: string[];  // Only log messages with these tags
}

/**
 * Default configuration - warnings and errors only
 * Users can enable debug logging through settings if needed
 */
const DEFAULT_CONFIG: LoggerConfig = {
    main: 'warn',
    modal: 'warn',
    api: 'warn',
    settings: 'warn',
    ui: 'warn',
    events: 'warn',
    general: 'warn'
};

class Logger {
    private config: LoggerConfig;
    private enabled: boolean;
    private fileLoggingEnabled: boolean = false;
    private logFilePath: string = '';
    private logBuffer: string[] = [];
    private maxBufferSize: number = 10;
    private app: App | null = null;
    private tagFilters: Map<ComponentName, Set<string>> = new Map();

    constructor() {
        this.config = { ...DEFAULT_CONFIG };
        this.enabled = true;
    }

    /**
     * Initialize file logging with the Obsidian app instance
     */
    initFileLogging(app: App, logFileName: string = 'debug-log.txt'): void {
        this.app = app;
        this.logFilePath = logFileName;
        this.fileLoggingEnabled = true;
        
        this.writeToFile(`[${new Date().toISOString()}] === Plugin Debug Log Started ===\n`);
    }

    /**
     * Disable file logging
     */
    disableFileLogging(): void {
        if (this.fileLoggingEnabled && this.logBuffer.length > 0) {
            this.flushBuffer();
        }
        this.fileLoggingEnabled = false;
    }

    /**
     * Write a message to the log file (buffered)
     */
    private writeToFile(message: string): void {
        if (!this.fileLoggingEnabled || !this.app) return;

        this.logBuffer.push(message);
        
        if (this.logBuffer.length >= this.maxBufferSize) {
            this.flushBuffer();
        }
    }

    /**
     * Flush the log buffer to file
     */
    private flushBuffer(): void {
        if (!this.fileLoggingEnabled || !this.app || this.logBuffer.length === 0) return;

        try {
            const content = this.logBuffer.join('');
            const maxFileSize = 1024 * 1024; // 1MB limit

            this.app.vault.adapter.exists(this.logFilePath).then((exists: boolean) => {
                if (!this.app) return;
                
                if (exists) {
                    this.app.vault.adapter.stat(this.logFilePath).then((stat) => {
                        if (!this.app || !stat) return;
                        
                        if (stat.size > maxFileSize) {
                            const clearHeader = `[${new Date().toISOString()}] === Log file cleared (size exceeded 1MB) ===\n`;
                            this.app.vault.adapter.write(this.logFilePath, clearHeader + content).then(() => {
                                this.logBuffer = [];
                            }).catch((error) => {
                                console.error('[Logger] Failed to clear and write log file:', error);
                            });
                        } else {
                            this.app.vault.adapter.read(this.logFilePath).then((existingContent: string) => {
                                if (!this.app) return;
                                const newContent = existingContent + content;
                                this.app.vault.adapter.write(this.logFilePath, newContent).then(() => {
                                    this.logBuffer = [];
                                }).catch((error) => {
                                    console.error('[Logger] Failed to write to log file (append):', error);
                                });
                            }).catch((error) => {
                                console.error('[Logger] Failed to read existing log file:', error);
                            });
                        }
                    }).catch((error) => {
                        console.error('[Logger] Failed to get log file stats:', error);
                    });
                } else {
                    this.app.vault.adapter.write(this.logFilePath, content).then(() => {
                        this.logBuffer = [];
                    }).catch((error) => {
                        console.error('[Logger] Failed to create log file:', error);
                    });
                }
            }).catch((error) => {
                console.error('[Logger] Failed to check if log file exists:', error);
            });
        } catch (error) {
            console.error('Failed to flush log buffer:', error);
        }
    }

    /**
     * Format log message for file output with timestamp and structured JSON
     */
    private formatForFile(component: ComponentName, level: LogLevel, message: string, tags: string[] | undefined, args: unknown[]): string {
        const timestamp = new Date().toISOString();
        const formattedMessage = this.formatMessage(component, message, tags);
        
        let result = `[${timestamp}] [${level.toUpperCase()}] ${formattedMessage}`;
        
        if (args.length > 0) {
            result += '\n  Arguments: ';
            try {
                const argsJson = JSON.stringify(args, null, 2);
                result += argsJson;
            } catch (error) {
                result += '[Unable to serialize arguments: ' + String(error) + ']';
            }
        }
        
        result += '\n';
        return result;
    }

    /**
     * Update the logging configuration
     */
    setConfig(config: Partial<LoggerConfig>): void {
        this.config = { ...this.config, ...config };
    }

    /**
     * Enable or disable all logging
     */
    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    /**
     * Get current configuration
     */
    getConfig(): LoggerConfig {
        return { ...this.config };
    }

    /**
     * Set component level with optional tag filtering
     * 
     * @param component - The component to configure
     * @param level - The log level for this component
     * @param tags - Optional: Only show messages with these tags (for debug level)
     * 
     * @example
     * // Show all debug messages for 'ui' component
     * logger.setComponentLevel('ui', 'debug');
     * 
     * @example
     * // Show only 'validation' and 'rendering' debug messages for 'ui' component
     * logger.setComponentLevel('ui', 'debug', ['validation', 'rendering']);
     */
    setComponentLevel(component: ComponentName, level: LogLevel, tags?: string[]): void {
        this.config[component] = level;
        
        if (tags && tags.length > 0) {
            this.tagFilters.set(component, new Set(tags));
        } else {
            this.tagFilters.delete(component);
        }
    }

    /**
     * Clear tag filters for a component (show all debug messages)
     */
    clearTagFilters(component: ComponentName): void {
        this.tagFilters.delete(component);
    }

    /**
     * Clear all tag filters
     */
    clearAllTagFilters(): void {
        this.tagFilters.clear();
    }

    /**
     * Get active tag filters for a component
     */
    getTagFilters(component: ComponentName): string[] | undefined {
        const filters = this.tagFilters.get(component);
        return filters ? Array.from(filters) : undefined;
    }

    /**
     * Check if a log level should be output for a component
     * Optionally checks tags for fine-grained filtering
     */
    private shouldLog(component: ComponentName, level: LogLevel, tags?: string[]): boolean {
        if (!this.enabled) return false;

        const componentLevel = this.config[component];
        const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
        const componentLevelIndex = levels.indexOf(componentLevel);
        const requestedLevelIndex = levels.indexOf(level);

        // Check if level is high enough
        if (requestedLevelIndex < componentLevelIndex) {
            return false;
        }

        // For debug level, check tag filters if they exist
        if (level === 'debug' && this.tagFilters.has(component)) {
            const allowedTags = this.tagFilters.get(component)!;
            
            // If message has no tags, don't show it when filters are active
            if (!tags || tags.length === 0) {
                return false;
            }
            
            // Check if any of the message tags match allowed tags
            return tags.some(tag => allowedTags.has(tag));
        }

        return true;
    }

    /**
     * Format log message with component prefix and optional tags
     */
    private formatMessage(component: ComponentName, message: string, tags?: string[]): string {
        const tagStr = tags && tags.length > 0 ? `[${tags.join(',')}]` : '';
        return `[${component.toUpperCase()}]${tagStr} ${message}`;
    }

    /**
     * Debug logging - REMOVED IN PRODUCTION BUILDS
     * 
     * This method and all calls to it will be completely stripped from
     * production builds via dead code elimination.
     * 
     * @param component - The component logging the message
     * @param message - The log message
     * @param tags - Optional tags for fine-grained filtering (e.g., ['validation', 'rendering'])
     * @param args - Additional arguments to log
     * 
     * @example
     * logger.debug('ui', 'Processing data');
     * logger.debug('ui', 'Validation failed', ['validation'], { field: 'name' });
     */
    debug(component: ComponentName, message: string, tags?: string[], ...args: unknown[]): void {
        // This entire block will be removed in production builds
        if (!isDevelopment()) return;
        
        if (this.shouldLog(component, 'debug', tags)) {
            console.debug(this.formatMessage(component, message, tags), ...args);
            
            if (this.fileLoggingEnabled) {
                this.writeToFile(this.formatForFile(component, 'debug', message, tags, args));
            }
        }
    }

    /**
     * Info logging
     */
    info(component: ComponentName, message: string, ...args: unknown[]): void {
        if (this.shouldLog(component, 'info')) {
            console.info(this.formatMessage(component, message), ...args);
            
            if (this.fileLoggingEnabled) {
                this.writeToFile(this.formatForFile(component, 'info', message, undefined, args));
            }
        }
    }

    /**
     * Warning logging
     */
    warn(component: ComponentName, message: string, ...args: unknown[]): void {
        if (this.shouldLog(component, 'warn')) {
            console.warn(this.formatMessage(component, message), ...args);
            
            if (this.fileLoggingEnabled) {
                this.writeToFile(this.formatForFile(component, 'warn', message, undefined, args));
            }
        }
    }

    /**
     * Error logging
     */
    error(component: ComponentName, message: string, ...args: unknown[]): void {
        if (this.shouldLog(component, 'error')) {
            console.error(this.formatMessage(component, message), ...args);
            
            if (this.fileLoggingEnabled) {
                this.writeToFile(this.formatForFile(component, 'error', message, undefined, args));
            }
        }
    }

    /**
     * Manually flush the log buffer
     */
    flush(): void {
        this.flushBuffer();
    }

    /**
     * Clear the log buffer without writing to file
     */
    clearBuffer(): void {
        this.logBuffer = [];
    }

    /**
     * Create a component-specific logger that automatically prefixes the component
     * 
     * @example
     * const logger = createLogger('ui');
     * logger.debug('Message');  // No tags
     * logger.debug('Message', data, ['validation']);  // With tag
     */
    createComponentLogger(component: ComponentName) {
        return {
            debug: (message: string, ...args: unknown[]) => {
                // Last arg might be tags array
                const lastArg = args[args.length - 1];
                if (Array.isArray(lastArg) && lastArg.every(item => typeof item === 'string')) {
                    const tags = args.pop() as string[];
                    this.debug(component, message, tags, ...args);
                } else {
                    this.debug(component, message, undefined, ...args);
                }
            },
            info: (message: string, ...args: unknown[]) => this.info(component, message, ...args),
            warn: (message: string, ...args: unknown[]) => this.warn(component, message, ...args),
            error: (message: string, ...args: unknown[]) => this.error(component, message, ...args),
        };
    }
}

// Export a singleton instance
export const logger = new Logger();

// Convenience method to get component loggers
export function createLogger(component: ComponentName) {
    return logger.createComponentLogger(component);
}

// Export type for component loggers
export type ComponentLogger = ReturnType<typeof createLogger>;
