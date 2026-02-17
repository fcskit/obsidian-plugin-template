# Project Structure

**Single Obsidian plugin organization.**

---

## Repository Organization

```
obsidian-plugin-template/
├── src/                    # All TypeScript source code
│   ├── main.ts            # Plugin entry point
│   ├── ui/                # UI components and modals
│   ├── settings/          # Plugin settings and configuration
│   ├── utils/             # Utility functions and helpers (including Logger)
│   └── styles/            # Source CSS files (compiled to single styles.css)
├── docs/                  # Public documentation (committed to GitHub)
│   ├── user/             # User-facing documentation (GitHub Pages)
│   ├── developer/        # Developer documentation (GitHub Pages)
│   ├── features/         # Feature-specific documentation
│   └── examples/         # Code examples and demonstrations
├── docs-internal/        # Private development documentation (gitignored)
│   ├── PROJECT-DASHBOARD.md
│   ├── todos/
│   ├── tracking/
│   ├── sessions/
│   ├── decisions/
│   ├── guides/
│   ├── references/
│   └── architecture/
├── tests/                # Test files
├── scripts/              # Automation scripts (backup, health checks, etc.)
├── images/               # Screenshots and visual assets for documentation
├── misc/                 # Design files, icons, miscellaneous assets
├── backup/               # Automated backups (managed by scripts)
├── release/              # Release artifacts (generated during build)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── manifest.json         # Obsidian plugin manifest
├── esbuild.config.mjs    # Build script
├── build-css.mjs         # CSS bundler
├── build-release.mjs     # Release builder
├── versions.json         # Version compatibility matrix
├── styles.css            # GENERATED FILE - DO NOT EDIT DIRECTLY
└── README.md
```

---

## Source Code Organization

### `src/` Directory Structure

```
src/
├── main.ts               # Plugin entry point
├── ui/                   # User interface components
│   ├── modals/          # Modal dialogs
│   ├── components/      # Reusable UI components
│   └── views/           # Custom views
├── settings/             # Settings management
│   ├── SettingsTab.ts   # Settings UI
│   └── settings.ts      # Settings data
├── utils/                # Utility functions
│   ├── Logger.ts        # Centralized logging system
│   ├── validation.ts    # Validation helpers
│   └── ...
└── styles/               # Source CSS files (compiled to styles.css)
    ├── base.css
    ├── modals.css
    ├── settings.css
    └── ...
```

### Key Principles

1. **Single Plugin Structure** (not a monorepo)
   - No `packages/` directory
   - No workspace dependencies
   - Simple, flat structure

2. **Separation of Concerns**
   - UI code in `ui/`
   - Business logic in appropriate directories
   - Settings isolated in `settings/`
   - Utilities in `utils/`

3. **Entry Point**
   - `src/main.ts` is the plugin entry point
   - Extends Obsidian's `Plugin` class
   - Registers commands, views, settings

---

## File Placement Rules

### Decision Tree for New Files

**BEFORE creating a new source file, ask:**

1. **Is this the plugin entry point?**
   - YES → `src/main.ts` (already exists)

2. **Is this a modal dialog?**
   - YES → `src/ui/modals/YourModal.ts`

3. **Is this a reusable UI component?**
   - YES → `src/ui/components/YourComponent.ts`

4. **Is this a custom view?**
   - YES → `src/ui/views/YourView.ts`

5. **Is this settings-related?**
   - YES → `src/settings/` (settings.ts or SettingsTab.ts)

6. **Is this a utility function?**
   - YES → `src/utils/yourUtility.ts`

7. **Is this CSS styling?**
   - YES → `src/styles/your-styles.css`

8. **Is this a test?**
   - YES → `tests/` directory

9. **Is this documentation?**
   - YES → See [Documentation](documentation.md) module

---

## File Size Limits

**Maximum file sizes to maintain readability and modularity:**

- **TypeScript source files**: 500 lines maximum
- **UI component files**: 300 lines maximum  
- **Utility files**: 200 lines maximum
- **Modal/Dialog files**: 400 lines maximum
- **Settings files**: 400 lines maximum

**When a file approaches its limit:**

❌ **NEVER add more code to an already large file**

✅ **ALWAYS refactor into smaller, focused modules**

**Example refactoring:**
```typescript
// ❌ BAD: One huge file (800+ lines)
src/ui/ComplexModal.ts  // 800 lines - too big!

// ✅ GOOD: Split into logical modules
src/ui/ComplexModal.ts           // 200 lines - main modal
src/ui/components/Header.ts      // 100 lines - header component
src/ui/components/ContentPane.ts // 150 lines - content area
src/ui/components/Footer.ts      // 100 lines - footer/buttons
src/utils/modalHelpers.ts        // 150 lines - shared utilities
```

---

## Naming Conventions

### File Names

- **PascalCase for class files**: `ExampleModal.ts`, `SettingsTab.ts`
- **camelCase for utility files**: `validation.ts`, `formatters.ts`
- **kebab-case for directories**: `ui/`, `api-client/`, `note-processor/`
- **CSS files**: `base.css`, `modals.css` (descriptive names)
- **Documentation**: `kebab-case.md` (lowercase with hyphens)

### Variable and Function Names

- **camelCase for variables/functions**: `userName`, `calculateTotal()`
- **PascalCase for classes/types**: `UserRecord`, `NoteMetadata`
- **UPPER_SNAKE_CASE for constants**: `MAX_FILE_SIZE`, `DEFAULT_TIMEOUT`
- **Descriptive names**: `getUserById()` not `get()`
- **Avoid abbreviations** unless very common: `id`, `url`, `api` are OK

### Component and Class Names

- **Suffix modals with `Modal`**: `CreateNoteModal`, `SettingsModal`
- **Suffix forms with `Form`**: `MetadataForm`, `TemplateForm`
- **Suffix managers with `Manager`**: `TemplateManager`, `CacheManager`
- **Suffix handlers with `Handler`**: `EventHandler`, `ErrorHandler`
- **Suffix utilities descriptively**: `validation`, `formatting`, `apiHelpers`

---

## Build Output

### Generated Files (Do Not Edit)

```
obsidian-plugin-template/
├── main.js               # Compiled plugin code (GENERATED)
├── styles.css            # Compiled CSS (GENERATED)
└── release/              # Release artifacts (GENERATED)
    ├── 0.1.0/
    │   ├── main.js
    │   ├── styles.css
    │   └── manifest.json
    └── plugin-name-0.1.0.zip
```

**NEVER edit these files directly:**
- `main.js` - Generated by esbuild
- `styles.css` - Generated by build-css.mjs
- Files in `release/` - Generated by build-release.mjs

**Always edit source files:**
- Edit TypeScript in `src/`
- Edit CSS in `src/styles/`

---

## .gitignore Rules

**Generated files (ignored):**
```gitignore
# Build outputs
main.js
styles.css
release/

# Dependencies
node_modules/

# Environment
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# Private development docs
docs-internal/
```

**Committed files:**
- All source code in `src/`
- Documentation in `docs/`
- Configuration files (`package.json`, `tsconfig.json`, `manifest.json`, etc.)
- Build scripts (`*.mjs`)
- README.md, LICENSE

---

## Important Distinctions

### This is NOT a Monorepo

**What we DON'T have:**
- ❌ No `packages/` directory
- ❌ No workspace dependencies (`workspace:*`)
- ❌ No TypeScript project references
- ❌ No multiple package.json files
- ❌ No synchronized versioning across packages

**What we DO have:**
- ✅ Single `package.json` at root
- ✅ Single `tsconfig.json` at root
- ✅ Single plugin in `src/`
- ✅ Simple, flat structure
- ✅ Direct dependencies from npm

---

## Development Setup

### Initial Setup

```bash
# Clone repository
git clone <your-repo-url>
cd obsidian-plugin-template

# Install dependencies
npm install

# Build plugin
npm run build
```

### Development Vault

**Create a development vault:**

```bash
# Create dev vault (outside plugin repo)
mkdir ../obsidian-dev-vault
```

**Plugin will be installed to:**
```
../obsidian-dev-vault/.obsidian/plugins/your-plugin/
```

**Use `npm run dev` to build and copy files automatically.**

---

## Code Quality Checklist

Before adding code to a file, ask:

- [ ] Is this file already over 400 lines? (If yes, refactor first)
- [ ] Does this code belong in this file? (Single responsibility)
- [ ] Am I duplicating code that exists elsewhere? (Extract to utility)
- [ ] Could this be a separate component? (Prefer composition)
- [ ] Will this make the file hard to understand? (Split it up)
- [ ] Can I extract helper functions to utilities? (Reduce file size)
- [ ] Is there a better place for this code? (Check folder structure)
