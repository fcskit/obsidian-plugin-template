# Build System Overview

The template includes a comprehensive build system with multiple modes optimized for different workflows.

## Build Modes

### Development Build

**Command:** `npm run dev`

Fast builds for active development:
- No TypeScript type checking (faster)
- Includes debug code
- Source maps enabled
- No minification
- Copies to test vault automatically

**Use when:** Making frequent changes and testing in Obsidian

### Development Watch

**Command:** `npm run dev:watch`

Continuous development with automatic rebuilds:
- Watches for file changes
- Rebuilds on any source file change
- Same fast build as `dev` mode
- Blocks terminal (runs in background)

**Use when:** Working on features that need frequent testing

**⚠️ Note:** This blocks the terminal. Use a separate terminal for other commands.

### Production Build

**Command:** `npm run build`

Full production build with optimizations:
- Complete TypeScript type checking
- Debug code eliminated via tree-shaking
- Minified output
- Smaller bundle size
- Source maps enabled

**Use when:** 
- Preparing for release
- Testing production behavior
- Verifying debug elimination works

## CSS Build System

### Modular Source Files

CSS is organized in modular source files in `src/styles/`:

```
src/styles/
├── base.css       # Base styles and Obsidian variables
├── modals.css     # Modal dialog styles
└── settings.css   # Settings tab styles
```

### Compilation

**Command:** `npm run build:css`

Combines all CSS files into single `styles.css`:
- Reads all files from `src/styles/`
- Concatenates in order
- Outputs to `styles.css` in root
- Automatically runs during `dev` and `build`

**Watch mode:** `npm run watch:css`
- Monitors `src/styles/` for changes
- Rebuilds automatically
- Blocks terminal

### Adding New CSS Files

1. Create file in `src/styles/`
2. Add to `cssFiles` array in `build-css.mjs`
3. Run `npm run build:css`

**Important:** Never edit `styles.css` directly - edit source files in `src/styles/`

## Release Build

**Command:** `npm run release`

Creates versioned release package:
- Runs production build
- Creates `release/VERSION/` directory
- Copies `manifest.json`, `main.js`, `styles.css`
- Creates zip archive for distribution

**Output:**
```
release/
├── 0.1.0/
│   ├── manifest.json
│   ├── main.js
│   └── styles.css
└── plugin-name-0.1.0.zip
```

## Build Configuration

### esbuild.config.mjs

Main build configuration:

**Key settings:**
- **Bundle:** `true` - Single output file
- **Format:** `cjs` - CommonJS for Obsidian
- **Target:** `es2018` - Browser compatibility
- **External:** `obsidian`, `electron` - Don't bundle these
- **Define:** `BUILD_ENV` - Used for debug elimination

**Development mode:**
```javascript
define: {
    'BUILD_ENV': '"development"'
}
```

**Production mode:**
```javascript
define: {
    'BUILD_ENV': '"production"'
}
treeShaking: true
minify: true
```

### tsconfig.json

TypeScript configuration:

**Important settings:**
- **target:** `ES2018`
- **module:** `ESNext`
- **lib:** ES2018, DOM
- **strict:** `true` - Strict type checking
- **skipLibCheck:** `true` - Faster builds

## Build Output

### Development

**Target:** `test-vault/.obsidian/plugins/obsidian-plugin-template/`

Files copied:
- `main.js` - Bundled plugin code
- `manifest.json` - Plugin metadata
- `styles.css` - Compiled styles

### Production

**Target:** `test-vault/.obsidian/plugins/obsidian-plugin-template/`

Same files, but:
- Smaller `main.js` (minified, debug eliminated)
- Same `manifest.json` and `styles.css`

## Performance Characteristics

### Build Times

**Development:** ~100-200ms
- No type checking
- No minification
- Fast incremental rebuilds

**Production:** ~1-2s
- Full TypeScript compilation
- Minification
- Tree-shaking
- Type checking

### Bundle Sizes

**Development:**
- main.js: ~10-15 KB (typical small plugin)
- Includes debug code
- Not minified

**Production:**
- main.js: ~6-8 KB (typical small plugin)
- Debug code eliminated
- Minified

**Actual size depends on your plugin code**

## Troubleshooting

### Build Fails

**TypeScript errors:**
```bash
npm run build  # See full type errors
```

**esbuild errors:**
- Check imports are correct
- Verify external packages listed
- Check for syntax errors

### CSS Not Updating

```bash
npm run build:css  # Manual rebuild
```

**Watch mode not working:**
- Kill existing watch process
- Restart `npm run watch:css`

### Plugin Not Updating in Obsidian

1. Check build completed successfully
2. Reload Obsidian (Cmd/Ctrl + R)
3. Check Developer Console for errors
4. Verify files copied to test vault

## Related Documentation

- [Debug System](../debug-system/code-elimination.md) - How debug elimination works
- [Logger](../logger/tag-based-filtering.md) - Logging system
- [Developer Guide](../../developer/README.md) - Development workflow
