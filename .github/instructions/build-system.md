# Build System

**esbuild + CSS compilation for Obsidian plugins.**

---

## Overview

This template uses a dual build system:
1. **esbuild** - Compiles TypeScript to JavaScript
2. **build-css.mjs** - Compiles modular CSS to single file
3. **build-release.mjs** - Creates versioned releases

---

## Build Scripts

### Development Build

```bash
npm run dev
```

**What happens:**
1. Compiles TypeScript with esbuild (fast, no type checking)
2. Compiles CSS from `src/styles/*.css` → `styles.css`
3. Copies `main.js`, `styles.css`, `manifest.json` to dev vault
4. Watch mode enabled (auto-rebuild on changes)

**Use for:**
- ✅ Active development
- ✅ Quick iterations
- ✅ Testing changes in Obsidian

**Note:** No TypeScript type checking in dev mode (for speed)

### Production Build

```bash
npm run build
```

**What happens:**
1. Type checks all TypeScript (`tsc --noEmit`)
2. Compiles TypeScript with esbuild (production mode)
3. Compiles CSS from `src/styles/*.css` → `styles.css`
4. **Debug code elimination** (removes all `debug()` calls)
5. Minifies output
6. Generates source maps

**Use for:**
- ✅ Final builds before release
- ✅ Verifying type correctness
- ✅ Testing production optimizations

### CSS Only

```bash
npm run build:css
```

**What happens:**
- Reads all CSS files from `src/styles/`
- Concatenates into single `styles.css`
- No minification (readable output)

**Use for:**
- ✅ Styling changes only
- ✅ Faster than full build
- ✅ Testing CSS changes

### Watch CSS

```bash
npm run watch:css
```

**What happens:**
- Watches all files in `src/styles/`
- Automatically rebuilds `styles.css` on changes
- Runs continuously until stopped

**Use for:**
- ✅ Working on styles only
- ✅ See changes immediately
- ✅ No need to manually rebuild

### Release Build

```bash
npm run release
```

**What happens:**
1. Full production build (TypeScript + CSS)
2. Creates `release/{version}/` directory
3. Copies `main.js`, `styles.css`, `manifest.json`
4. Creates zip file: `release/plugin-name-{version}.zip`

**Use for:**
- ✅ Creating distribution packages
- ✅ Preparing for GitHub releases
- ✅ Submitting to Obsidian community plugins

---

## Build Configuration

### esbuild.config.mjs

**Location:** Root directory

**Key settings:**

```javascript
const production = process.argv[2] === 'production';

const esbuildConfig = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  external: ['obsidian', 'electron', '@codemirror/*'],
  format: 'cjs',
  target: 'es2022',
  outfile: 'main.js',
  sourcemap: production ? false : 'inline',
  minify: production,
  treeShaking: true,
  drop: production ? ['debugger'] : [],
  // Debug code elimination in production
  define: production ? { DEBUG: 'false' } : { DEBUG: 'true' },
};
```

**Important settings:**

- **`external`**: Obsidian API not bundled (provided by Obsidian)
- **`format: 'cjs'`**: CommonJS format (required by Obsidian)
- **`target: 'es2022'`**: Modern JavaScript features
- **`treeShaking`**: Removes unused code
- **`drop: ['debugger']`**: Removes debugger statements in production
- **`define`**: Enables debug code elimination

### build-css.mjs

**Location:** Root directory

**Configuration:**

```javascript
const cssFiles = [
  'src/styles/base.css',
  'src/styles/modals.css',
  'src/styles/settings.css',
  // Add more files here
];

const outputFile = 'styles.css';
```

**To add new CSS file:**
1. Create file in `src/styles/`
2. Add to `cssFiles` array
3. Run `npm run build:css`

### tsconfig.json

**Location:** Root directory

**Key settings:**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "lib": ["ES2022", "DOM"],
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

**Important settings:**

- **`strict: true`**: Maximum type safety
- **`noUnusedLocals`**: Catch unused variables
- **`noUnusedParameters`**: Catch unused parameters
- **`lib: ["ES2022", "DOM"]`**: Modern JavaScript + browser APIs

---

## Build Outputs

### Generated Files (Do Not Edit)

```
obsidian-plugin-template/
├── main.js              # GENERATED - Compiled plugin code
├── styles.css           # GENERATED - Compiled CSS
└── release/             # GENERATED - Release artifacts
    ├── 0.1.0/
    │   ├── main.js
    │   ├── styles.css
    │   └── manifest.json
    └── plugin-name-0.1.0.zip
```

**NEVER edit these files:**
- They're regenerated on each build
- Changes will be overwritten
- Edit source files in `src/` instead

### Source Files (Edit These)

```
obsidian-plugin-template/
└── src/
    ├── main.ts          # Plugin entry point
    ├── ui/              # UI components
    ├── settings/        # Settings
    ├── utils/           # Utilities
    └── styles/          # CSS source files
```

---

## Development Workflow

### Initial Setup

```bash
# 1. Install dependencies
npm install

# 2. Build plugin
npm run build

# 3. Create dev vault (outside plugin repo)
mkdir ../obsidian-dev-vault
```

### Active Development

**Option 1: Watch mode (recommended)**

```bash
# Terminal 1: Watch TypeScript + copy to vault
npm run dev

# Terminal 2: Watch CSS only (optional, if working on styles)
npm run watch:css
```

**Option 2: Manual builds**

```bash
# Full development build
npm run dev

# Just CSS changes
npm run build:css

# Full production build (with type checking)
npm run build
```

### Dev Vault Setup

**Plugin is copied to:**
```
../obsidian-dev-vault/.obsidian/plugins/your-plugin/
├── main.js
├── styles.css
└── manifest.json
```

**After each build:**
1. Changes copied automatically (if using `npm run dev`)
2. Reload plugin in Obsidian (Ctrl/Cmd + R or restart)
3. Test changes

### Testing Workflow

```bash
# 1. Make changes to src/ files
# 2. Build (auto in watch mode, or manually)
npm run dev

# 3. Reload plugin in Obsidian
# 4. Test functionality
# 5. Check for errors in DevTools console
```

---

## Production Build Process

### Before Release

**Checklist:**

- [ ] All tests passing
- [ ] TypeScript compiles without errors
- [ ] No console errors in Obsidian
- [ ] Tested in light and dark themes
- [ ] Documentation updated
- [ ] Version bumped in manifest.json and versions.json

### Creating Release

```bash
# 1. Update version
npm run version -- 0.2.0  # Or edit manifest.json manually

# 2. Full production build
npm run build

# 3. Test production build
# (Copy main.js and styles.css to test vault)

# 4. Create release package
npm run release

# 5. Verify release files
ls release/0.2.0/
# Should contain: main.js, styles.css, manifest.json

# 6. Verify zip file
ls release/
# Should contain: plugin-name-0.2.0.zip
```

---

## Debug Code Elimination

### How It Works

**Development mode:**
```typescript
// All debug code present
this.logger.debug('Processing', { data });

// DEBUG_START
const debugInfo = computeExpensiveDebugInfo();
// DEBUG_END
```

**Production mode:**
```typescript
// debug() calls completely removed
// (empty space in final bundle)

// Code between DEBUG_START/END removed
// (empty space in final bundle)
```

**Configuration:**

In `esbuild.config.mjs`:
```javascript
define: production ? { DEBUG: 'false' } : { DEBUG: 'true' }
```

**Benefits:**
- ✅ Zero runtime overhead in production
- ✅ Smaller bundle size
- ✅ Automatic (no manual cleanup needed)
- ✅ All `debug()` calls eliminated

---

## Build Optimization

### Tree Shaking

**What it does:**
- Removes unused code from bundle
- Only includes code that's actually used
- Reduces bundle size

**Enabled by default:**
```javascript
treeShaking: true
```

### Minification

**Production only:**
```javascript
minify: production  // Only in production builds
```

**Benefits:**
- ✅ Smaller file size
- ✅ Faster loading
- ❌ Harder to debug (use source maps)

### Source Maps

**Development:**
```javascript
sourcemap: 'inline'  // Included in main.js
```

**Production:**
```javascript
sourcemap: false  // No source maps (smaller file)
```

**When debugging production issues:**
- Enable source maps temporarily
- Rebuild with `sourcemap: true`
- Debug with readable stack traces

---

## Troubleshooting

### Build Fails

**"Cannot find module 'obsidian'"**

Solution:
```bash
npm install  # Reinstall dependencies
```

**"TypeScript error: ..."**

Solution:
```bash
# Check errors
npm run build

# Fix TypeScript errors in src/
# Then rebuild
```

### CSS Not Updating

**Problem:** Changes to CSS files not reflected

Solution:
```bash
# Rebuild CSS
npm run build:css

# Or use watch mode
npm run watch:css
```

### Plugin Not Loading in Obsidian

**Problem:** Plugin doesn't appear after build

Solution:
1. Check dev vault path: `../obsidian-dev-vault/.obsidian/plugins/your-plugin/`
2. Verify files copied: `main.js`, `styles.css`, `manifest.json`
3. Restart Obsidian
4. Enable plugin in settings

### Watch Mode Not Detecting Changes

**Problem:** `npm run dev` doesn't rebuild on save

Solution:
1. Stop watch mode (Ctrl+C)
2. Restart: `npm run dev`
3. Check file permissions
4. Try manual build: `npm run build`

---

## Performance Tips

### Faster Development Builds

```bash
# Use dev mode (no type checking)
npm run dev  # Faster

# Instead of production build
npm run build  # Slower (includes type checking)
```

### Parallel Workflows

```bash
# Terminal 1: Watch TypeScript
npm run dev

# Terminal 2: Watch CSS
npm run watch:css

# Terminal 3: Run tests
npm test
```

### Cache Busting

If build seems stale:
```bash
# Clean and rebuild
rm main.js styles.css
npm run build
```

---

## Summary

**Key Commands:**

- `npm run dev` - Development build + watch mode
- `npm run build` - Production build + type checking
- `npm run build:css` - Compile CSS only
- `npm run watch:css` - Watch CSS files
- `npm run release` - Create release package

**Remember:**

- ✅ Use `dev` for active development (fast)
- ✅ Use `build` before committing (type checking)
- ✅ Use `release` for distribution (production build + zip)
- ✅ Never edit `main.js` or `styles.css` (generated files)
- ✅ Debug code automatically removed in production
