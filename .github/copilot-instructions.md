# Obsidian Plugin Template - Copilot Instructions

This is a comprehensive template for building Obsidian plugins with best practices, organized structure, and proper build systems.

---

## 📋 Instruction Modules

This project uses **modular copilot instructions** organized by topic. Each module is a separate file that can be shared across projects or customized as needed.

### Core Instructions (Read These First)

1. **[Project Structure](instructions/project-structure.md)** - Single plugin organization, src/ layout, file placement rules
2. **[Documentation System](instructions/documentation.md)** - docs/ vs docs-internal/, file placement decision tree
3. **[TODO System](instructions/todo-system.md)** - TODO lifecycle, PROJECT-DASHBOARD, snapshot system

### Plugin-Specific Modules

4. **[Build System](instructions/build-system.md)** - esbuild + CSS compilation, development workflow, release process
5. **[Versioning](instructions/versioning.md)** - manifest.json, versions.json, semantic versioning, releases
6. **[Styling System](instructions/styling-system.md)** - Modular CSS, Obsidian CSS variables, never hardcode styles
7. **[Logging System](instructions/logging-system.md)** - Centralized Logger.ts, component filtering, debug elimination

### Coding Standards (Generic - Shared Across Projects)

8. **[TypeScript Best Practices](instructions/typescript.md)** - Type safety, file size limits, modularity, error handling
9. **[Code Documentation](instructions/code-documentation.md)** - JSDoc standards, comment guidelines
10. **[Performance](instructions/performance.md)** - Optimization patterns, caching, debouncing
11. **[Testing](instructions/testing.md)** - Unit/integration/manual testing strategies
12. **[Git Workflow](instructions/git-workflow.md)** - Commit format, branching, pull requests

---

## 🎯 Quick Reference

### Build Commands

```bash
# Development
npm run dev              # Fast build + watch + copy to dev vault
npm run build:css        # Compile CSS only
npm run watch:css        # Watch CSS files

# Production
npm run build            # Full production build + type checking
npm run release          # Create release package

# Testing
npm test                 # Run tests (if configured)
```

### Development Workflow

1. **Initial setup:**
   ```bash
   npm install
   npm run build
   # Create dev vault: ../obsidian-dev-vault/
   ```

2. **Active development:**
   ```bash
   # Terminal 1: Watch TypeScript
   npm run dev
   
   # Terminal 2: Watch CSS (optional)
   npm run watch:css
   ```

3. **After changes:**
   - Reload plugin in Obsidian (Ctrl/Cmd + R)
   - Test features
   - Check for errors

4. **Before release:**
   ```bash
   npm run build        # Full production build
   npm run release      # Create release package
   ```

### Critical Rules

**❌ NEVER:**
- Hardcode CSS in TypeScript (use CSS files in `src/styles/`)
- Use `console.*` directly (use `Logger.ts`)
- Edit generated files (`main.js`, `styles.css`, `release/`)
- Create documentation in root (only `README.md` allowed)
- Exceed file size limits (TypeScript: 500 lines, UI: 300 lines)

**✅ ALWAYS:**
- Use Obsidian CSS variables for theming
- Use centralized logger with component filtering
- Follow TODO system for task tracking
- Update `PROJECT-DASHBOARD.md` when completing work
- Create snapshot after 5 completed TODOs

### File Placement

**Before creating any file:**
1. TypeScript source → `src/` (appropriate subdirectory)
2. CSS styles → `src/styles/`
3. User documentation → `docs/user/`
4. Developer documentation → `docs/developer/`
5. Internal notes → `docs-internal/` (gitignored)
6. TODOs → `docs-internal/todos/`

**See:** [Documentation System](instructions/documentation.md) for complete decision tree

### Architecture Notes

This template is designed for Obsidian plugins that:
- Need organized, maintainable CSS with multiple files
- Require sophisticated logging and debugging
- Follow modern TypeScript best practices
- Have clear separation of concerns (UI, logic, settings, utilities)
- Use versioned releases for easy distribution
- Support both manual and BRAT installation

---

## 🔄 Instruction Maintenance

**These modules are shared across fcskit projects:**
- TypeScript Best Practices
- Code Documentation
- Performance
- Testing
- Git Workflow

**These modules are project-specific:**
- Project Structure (single plugin)
- Documentation System
- TODO System
- Build System (esbuild + CSS)
- Versioning (manifest.json)
- Styling System (Obsidian-specific)
- Logging System (debug elimination)

**When updating:**
- Generic modules → Consider updating in ALL fcskit projects
- Plugin-specific → Update only for this template

---

## 📚 Additional Resources

- [Obsidian Plugin API](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [esbuild Documentation](https://esbuild.github.io/)
- [Obsidian Plugin Guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)

---

## 🚀 Getting Started

**For new plugin development:**

1. **Clone this template**
2. **Update plugin metadata:**
   - `manifest.json` (id, name, description, author)
   - `package.json` (name, description, author)
   - `README.md` (plugin description)
3. **Install dependencies:** `npm install`
4. **Build plugin:** `npm run build`
5. **Create dev vault:** `../obsidian-dev-vault/`
6. **Start development:** `npm run dev`
7. **Read instruction modules** (start with Project Structure, Documentation, TODO System)

**For contributors:**

1. Read [Developer Documentation](docs/developer/README.md)
2. Review [TODO System](instructions/todo-system.md)
3. Check `PROJECT-DASHBOARD.md` for current work
4. Follow [Git Workflow](instructions/git-workflow.md)

---

## 🎓 Why Modular Instructions?

**Benefits:**
- **Reusability:** Generic modules (TypeScript, Testing, Git) shared across projects
- **Maintainability:** Update once, apply everywhere
- **Organization:** Easy to find specific guidance
- **Scalability:** Add new modules as needed
- **Clarity:** Each module focused on one topic

**Structure:**
- **12 modules** (7 plugin-specific + 5 generic)
- **~4,500 total lines** of comprehensive guidance
- **Cross-referenced** for easy navigation
- **Examples included** in every module
