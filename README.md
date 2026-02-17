# Obsidian Plugin Template

**A modern template for building Obsidian plugins—designed from the ground up for AI-assisted development workflows.**

This template emerged from building several Obsidian plugins with AI-assisted programming (GitHub Copilot, Claude, etc.). It incorporates best practices and patterns that enable efficient AI-assisted development while maintaining high code quality, modularity, and comprehensive documentation.

**Who is this for?**
- **Developers** building plugins for obsidian and value clean code and modularity
- **Developers** who want to build obsidian plugins with AI-assistance (GitHub Copilot, Claude, or similar tools)
- **Newcomers to programming** who want to build Obsidian plugins with AI support but need a solid foundation to start with
- **Teams** wanting consistent, well-documented plugin architecture

**Can you use this without AI?** Absolutely! All patterns and structures work perfectly for manual development. The comprehensive documentation and clear guidelines actually make it *easier* to develop manually too.

📚 **[View Full Documentation →](https://fcskit.github.io/obsidian-plugin-template/)**

## Features

🤖 **AI-First Design**
- Comprehensive `.github/copilot-instructions.md` (1400+ lines) with project patterns
- Clear file placement rules and decision trees
- Enforced modularity prevents overwhelming AI context windows
- File size limits (500 lines max) keep code manageable
- Structured documentation system AI can navigate
- Build commands that don't block terminal (AI can keep working)

✨ **Best Practices Built-in**
- Modular CSS system with automatic bundling
- Centralized logging system with component-based filtering
- **Tag-based debug filtering** for complex components
- Proper TypeScript configuration with strict typing
- Organized project structure (7 core directories)
- Comprehensive cross-referenced documentation

🛠️ **Modern Build System**
- Fast development builds with esbuild
- **Non-blocking dev builds** (AI-friendly workflow)
- Optional watch mode for manual development
- Versioned releases with automatic zip creation
- CSS compilation from multiple source files
- Asset copying and management
- Type checking with TypeScript

📚 **Complete Documentation**
- Detailed copilot instructions for AI-assisted development
- Code quality guidelines and checklists
- User and developer documentation structure
- **GitHub Pages ready** with Jekyll configuration
- ROADMAP and KNOWN-ISSUES templates
- Architecture Decision Records (ADR) system

🎯 **Code Quality Standards**
- File size limits enforced (500 lines max per file)
- Single responsibility principle
- No code duplication (extract to utilities)
- Strong typing (no `any`)
- Explicit error handling
- Comprehensive JSDoc comments

## Quick Start

### 1. Clone and Setup

```bash
# Clone this template
git clone https://github.com/yourusername/obsidian-plugin-template.git my-plugin
cd my-plugin

# Install dependencies
npm install

# Update plugin information
# Edit: manifest.json, package.json
```

### 2. Development

```bash
# Build once and copy to test vault (AI-friendly)
npm run dev

# Build with watch mode (manual development)
npm run dev:watch

# Build for production
npm run build

# Compile CSS only
npm run build:css

# Watch CSS files
npm run watch:css
```

**Note**: `npm run dev` builds once and exits (recommended for AI-assisted development). Use `npm run dev:watch` for automatic rebuilds during manual development.

### 3. Test in Obsidian

The template includes an integrated test vault with hot-reload:

```bash
# Build and copy to test vault (once)
npm run dev

# Open test-vault/ in Obsidian
# The plugin will be automatically enabled

# Make changes to src/ files
# Run 'npm run dev' again to rebuild
# Or use 'npm run dev:watch' for auto-rebuild
```

**Development Workflows:**

**Option 1: AI-Assisted (Recommended)**
- Run `npm run dev` when ready to test changes
- Terminal stays available for AI commands
- Manual reload in Obsidian (Ctrl+R) or use hot-reload with dev:watch

**Option 2: Watch Mode**
- Run `npm run dev:watch` in separate terminal
- Automatic rebuilds on file changes
- Hot-reload plugin auto-reloads in Obsidian
- Terminal blocked (intentionally)

**Test Vault Features:**
- ✅ Pre-configured with hot-reload plugin
- ✅ Automatic plugin reload on code changes
- ✅ Example notes for testing
- ✅ No manual reload needed (Ctrl+R)
- ✅ Self-contained testing environment

**Hot-Reload Setup:**
The hot-reload plugin (by pjeby) monitors the `.hotreload` file in your plugin directory and automatically reloads when `main.js`, `manifest.json`, or `styles.css` change. This eliminates the need to manually reload Obsidian during development.

### 4. Configure Custom Vault (Optional)

You can also use a custom development vault:

```bash
# Use custom dev vault
DEV_VAULT=/path/to/vault npm run dev
```

### 5. Customize

1. Update `manifest.json` with your plugin info
2. Update `package.json` name and description
3. Add your CSS files to `src/styles/` and update `build-css.mjs`
4. Add your TypeScript code to `src/`
5. Update `.github/copilot-instructions.md` with your specific patterns

## Project Structure

```
obsidian-plugin-template/
├── src/
│   ├── main.ts                  # Plugin entry point
│   ├── ui/                      # UI components and modals
│   │   └── ExampleModal.ts
│   ├── utils/                   # Utility functions
│   │   └── Logger.ts            # Centralized logging system
│   ├── settings/                # Settings management
│   └── styles/                  # Source CSS files
│       ├── base.css
│       ├── modals.css
│       └── settings.css
├── test-vault/                  # Integrated test vault
│   ├── .obsidian/
│   │   ├── plugins/
│   │   │   ├── obsidian-plugin-template/  # Your plugin (built here)
│   │   │   │   └── .hotreload             # Hot-reload marker
│   │   │   └── hot-reload/                # Hot-reload plugin
│   │   └── community-plugins.json
│   ├── README.md                # Test vault instructions
│   └── Example Note.md          # Sample notes
├── docs/
│   ├── user/                    # User documentation
│   └── developer/
│       ├── public/              # Public developer docs (GitHub Pages)
│       │   ├── README.md
│       │   ├── ROADMAP.md
│       │   └── KNOWN-ISSUES.md
│       └── [internal docs]      # Internal implementation notes
├── scripts/
│   └── clean-debug-code.mjs     # Debug cleanup script
├── .github/
│   └── copilot-instructions.md  # AI-assisted development guidelines
├── build-css.mjs                # CSS bundler
├── build-release.mjs            # Release builder
├── esbuild.config.mjs           # Build configuration
├── copy-assets.mjs              # Asset copier
├── manifest.json                # Obsidian plugin manifest
├── package.json                 # Node dependencies
├── tsconfig.json                # TypeScript configuration
└── versions.json                # Version compatibility
```

## Logging System

The template includes a sophisticated logging system:

```typescript
import { createLogger } from './utils/Logger';

class MyComponent {
    private logger = createLogger('componentName');
    
    myMethod() {
        this.logger.debug('Debug message', { data });
        this.logger.info('Info message');
        this.logger.warn('Warning message', error);
        this.logger.error('Error message', error);
    }
}
```

**Features:**
- Component-based log levels
- **Tag-based filtering** - Filter debug output by tags within components
- File logging support
- Buffered writes
- Structured JSON output
- Easy to enable/disable per component
- **Debug code elimination** - Debug calls completely removed from production builds
- **Manual cleanup script** - Permanently remove debug code from source when stable

### Tag-Based Debug Filtering

For complex components, you can filter debug output by tags:

```typescript
// Show ALL debug from component
logger.setComponentLevel('ui', 'debug');

// Show ONLY 'validation' and 'rendering' debug
logger.setComponentLevel('ui', 'debug', ['validation', 'rendering']);

// Use tags in debug calls
logger.debug('Field validated', { field }, ['validation']);
logger.debug('Render complete', { time }, ['rendering']);
logger.debug('Event fired', { event }, ['events']);  // Hidden if not in filter
```

Perfect for complex components with lots of debug output. See `docs/developer/TAG-BASED-FILTERING.md` for details.

### Debug Code Elimination

In production builds, all `logger.debug()` calls are **completely removed** from the bundle:

```typescript
// Development: Full debug output
this.logger.debug('Processing data', { data, computed });

// Production: This entire line doesn't exist in the bundle!
// Zero runtime overhead, smaller bundle size
```

### Manual Debug Cleanup

For stable features, you can permanently remove debug code from source files:

```typescript
// During development - wrap debug code
// DEBUG_START
this.logger.debug('Complex state', { details });
// DEBUG_END

// After feature is stable - remove it
npm run clean:debug:dry  # Preview changes
npm run clean:debug      # Specify files to clean
```

**When to use each:**
- **Automatic elimination** (default) - Protects users, keeps code for future debugging
- **Manual cleanup** - Improves code readability, removes scaffolding from stable features

See `docs/developer/DEBUG-CODE-ELIMINATION.md` for complete details.

## CSS System

Multiple CSS files are automatically combined into `styles.css`:

1. Add CSS files to `src/styles/`
2. Update `cssFiles` array in `build-css.mjs`
3. Run `npm run build:css` or it runs automatically during build

**Never hardcode CSS in TypeScript!** Always use proper CSS files.

## Release Process

```bash
# 1. Update version
npm version patch  # or minor, or major

# 2. Build release
npm run release

# 3. Files will be in release/X.X.X/
# - manifest.json
# - main.js
# - styles.css
# Plus: obsidian-plugin-template-X.X.X.zip

# 4. Create GitHub release and upload zip
```

## Documentation

- **User docs**: `docs/user/` - Installation, features, guides
- **Public developer docs**: `docs/developer/public/` - Contributing, roadmap
- **Internal docs**: `docs/developer/` - Implementation notes (hidden from GitHub Pages)
- **Copilot instructions**: `.github/copilot-instructions.md` - AI development guidelines

## Best Practices

### Never Do This ❌

```typescript
// Don't hardcode CSS
const style = document.createElement('style');
style.textContent = `...`;
document.head.appendChild(style);

// Don't use console directly
console.log('Debug message');
```

### Always Do This ✅

```css
/* Put styles in src/styles/something.css */
.my-component {
    padding: 1em;
}
```

```typescript
// Use the logging system
this.logger.debug('Debug message', data);
```

## Contributing

1. Check `docs/developer/public/ROADMAP.md` for planned features
2. Review `docs/developer/public/KNOWN-ISSUES.md` for current limitations
3. Follow the coding patterns in `.github/copilot-instructions.md`
4. Update documentation when adding features

## License

MIT

## Credits

This template incorporates best practices from:
- Obsidian ELN Plugin
- Obsidian Kadi4Mat Sync Plugin
- Obsidian Plugin Development best practices
