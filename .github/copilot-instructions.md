# Obsidian Plugin Template - Copilot Instructions

This is a comprehensive template for building Obsidian plugins with best practices, organized structure, and proper build systems.

## Project Structure and File Placement Guidelines

### Source Code Organization

- **`src/`** - All TypeScript source code
  - `src/main.ts` - Plugin entry point
  - `src/ui/` - UI components and modals
  - `src/settings/` - Plugin settings and configuration
  - `src/utils/` - Utility functions and helpers (including Logger)
  - `src/styles/` - **Source CSS files** (compiled to single styles.css)

### Styling System (CRITICAL)

This template uses a **modular CSS build system**. Multiple organized CSS files are combined into a single `styles.css` for Obsidian.

**Source CSS Files:** `src/styles/`
- `base.css` - Base styles and Obsidian variables
- `modals.css` - Modal dialog styles
- `settings.css` - Settings tab styles
- Add more as needed

**Build Process:**
- Run `npm run build:css` to compile all CSS files into `styles.css`
- Automatically runs during `npm run build` and `npm run dev`
- Edit files in `src/styles/`, never edit `styles.css` directly

**CRITICAL: Never Hardcode CSS in TypeScript**

**❌ NEVER DO THIS:**
```typescript
// DON'T create styles dynamically
const style = document.createElement('style');
style.textContent = `...`;
document.head.appendChild(style);

// DON'T hardcode style values in TypeScript
element.style.width = '650px';
element.style.padding = '1em';
```

**✅ ALWAYS DO THIS:**
```css
/* Add to appropriate file in src/styles/ */
.my-component {
	width: 650px;
	padding: 1em;
}
```

```typescript
// Use CSS classes in TypeScript
element.addClass('my-component');
```

**When to use `.style` in TypeScript:**
- ✅ **Conditional display**: `element.style.display = 'none'` based on logic
- ✅ **Dynamic calculations**: Width based on user input or runtime data
- ✅ **Programmatic state changes**: Show/hide, enable/disable based on conditions

**When to use CSS files (src/styles/):**
- ✅ **All static styling**: Colors, fonts, spacing, layout
- ✅ **Component dimensions**: Width, height, padding, margin
- ✅ **Visual design**: Backgrounds, borders, shadows, border-radius
- ✅ **Responsive design**: Media queries, flexible layouts
- ✅ **Typography**: Font sizes, weights, line heights

**Obsidian CSS Variables to Use:**

Always use Obsidian's CSS variables for theming compatibility:

- `var(--background-primary)` - Main background color
- `var(--background-secondary)` - Secondary background (cards, sections)
- `var(--background-modifier-border)` - Border colors
- `var(--text-normal)` - Normal text color
- `var(--text-muted)` - Muted/secondary text
- `var(--text-faint)` - Very light text
- `var(--font-monospace)` - Code/monospace font
- `var(--interactive-accent)` - Accent color (buttons, links)
- `var(--interactive-accent-hover)` - Accent hover state

### Logging System (CRITICAL)

This template includes a sophisticated centralized logging system located in `src/utils/Logger.ts`.

**Never use console.log, console.debug, console.warn, or console.error directly!**

**How to use the logger:**

1. Import the logger system:
```typescript
import { createLogger } from '../utils/Logger';
```

2. Create a component-specific logger:
```typescript
private logger = createLogger('componentName');
```

3. Use the logger methods:
```typescript
this.logger.debug('Debug message', data);
this.logger.info('Info message', data);
this.logger.warn('Warning message', error);
this.logger.error('Error message', error);
```

**Available component names:**
- `main` - Plugin entry point
- `modal` - Modal dialogs
- `api` - API calls
- `settings` - Settings management
- `ui` - UI components
- `events` - Event handling
- `general` - General/uncategorized

**Logger Features:**
- Component-based filtering - Different log levels per component
- **Tag-based filtering** - Filter debug by tags within components (e.g., 'validation', 'rendering')
- File logging - Optional logging to `debug-log.txt` in vault root
- Structured output - Consistent formatting with timestamps
- Buffered writing - Efficient file operations
- Development-friendly - Easy to enable/disable debug output
- **Production builds** - Debug code completely removed via dead code elimination
- **Manual cleanup** - Optional script to permanently remove debug code from source

**Tag-Based Filtering:**

For complex components with lots of debug output, use tags to filter:

```typescript
// Show only specific debug categories
logger.setComponentLevel('npe', 'debug', ['validation', 'state']);

// Use tags in debug calls
logger.debug('Field valid', { field }, ['validation']);  // ✅ Shows
logger.debug('Rendering', { time }, ['rendering']);  // ❌ Hidden
```

Benefits:
- Reduce noise from complex components
- Focus on specific aspects (validation, rendering, state, etc.)
- No need to elevate debug to warn
- Keep debug semantics correct

See `docs/developer/TAG-BASED-FILTERING.md` for complete guide.

**Debug Code Elimination:**

In production builds, **all debug logging is completely removed** from the bundle:

```typescript
// Development: Full debug output
this.logger.debug('Processing data', { data, computed });

// Production: This entire line doesn't exist in the bundle!
// Zero runtime overhead, smaller bundle size
```

**Manual Debug Cleanup:**

For stable features, you can permanently remove debug code from source:

```typescript
// Wrap debug code you plan to eventually remove
// DEBUG_START
this.logger.debug('Complex state', { details });
// DEBUG_END

// Run cleanup script when feature is stable
// node scripts/clean-debug-code.mjs --all
```

Benefits:
- Automatic elimination protects production users
- Manual cleanup improves source code readability
- Best of both worlds: debug freely, clean up when stable

See `docs/developer/DEBUG-CODE-ELIMINATION.md` for complete details.

**Important**: Only `debug()` calls are removed. `info()`, `warn()`, and `error()` remain in production builds.

### Documentation Organization (CRITICAL)

**ABSOLUTE RULE: Only README.md in root directory!**

All other documentation must be placed in organized subdirectories.

**PRIVACY POLICY**: Internal development documentation is **NOT committed to GitHub** (kept in `docs-internal/` which is gitignored). This includes coding session summaries, architecture decisions, TODOs, and internal guides. We maintain transparency through public-facing documentation in `docs/` while keeping development process details private until we have external contributors.

#### Public Documentation (Committed to GitHub)

**Everything in `docs/` is public and will be committed to GitHub.**

- **`docs/user/`** - User-facing documentation
  - **PUBLIC** - Published on GitHub Pages
  - Installation guides, features, how-tos
  - Visible to all users
  
- **`docs/developer/`** - Developer documentation
  - **PUBLIC** - Published on GitHub Pages
  - All developer-facing documentation
  - Visible to users and contributors
  - Contains:
    - `README.md` - Contributing guide
    - `ROADMAP.md` - Project roadmap and version planning
    - `KNOWN-ISSUES.md` - Known bugs and limitations
    - `quick-start.md` - Quick start for developers
    - `start-here.md` - Comprehensive developer introduction
    - `architecture/` - Public architecture documentation
    - `api/` - Public API documentation (if needed)

- **`docs/features/`** - Feature-specific documentation
  - **PUBLIC** - Published on GitHub Pages
  - Subdirectory per feature: `features/feature-name/`
  - Technical details, implementation notes, usage examples
  - Helps users and contributors understand features
  
- **`docs/examples/`** - Code examples and demonstrations
  - **PUBLIC** - Published on GitHub Pages
  - Usage examples, code snippets, demonstrations
  - Helps users understand how to use the plugin

#### Private Documentation (NOT Committed - .gitignore'd)

**Everything in `docs-internal/` is private and will NOT be committed.**

- **`docs-internal/PROJECT-DASHBOARD.md`** - ⭐ Central landing page
  - **PRIVATE** - Local only, not in git
  - Always-current project status hub
  - Single source of truth for active work, completed items, planned work
  - Updated continuously as work progresses
  - See [PROJECT-DASHBOARD](#project-dashboard) section below

- **`docs-internal/todos/`** - TODO lifecycle management
  - **PRIVATE** - Local only, not in git
  - Three-stage lifecycle: `planned/` → `active/` → `completed/`
  - File format: `YYYY-MM-DD-feature-name.md` (creation date preserved through lifecycle)
  - Tracks features, improvements, strategies, and procedures
  - **Type field** distinguishes: Implementation | Strategy | Procedure
  - See [TODO System Workflow](#todo-system-workflow) section below

- **`docs-internal/tracking/`** - Historical project snapshots
  - **PRIVATE** - Local only, not in git
  - File format: `YYYY-MM-DD-snapshot.md` (snapshot date)
  - Created after 5+ completed TODOs, major milestones, or extended breaks
  - Source material for release changelogs
  - Historical project progression record

- **`docs-internal/decisions/`** - Architecture Decision Records (ADRs)
  - **PRIVATE** - Local only, not in git
  - File format: `NNN-descriptive-name.md` (numbered)
  - Records formal architecture decisions
  - Alternatives considered, trade-offs, rationale

- **`docs-internal/sessions/`** - Coding session summaries
  - **PRIVATE** - Local only, not in git
  - File format: `YYYY-MM-DD-descriptive-name.md` (dated)
  - Documents implementation decisions and changes
  - Chronological work logs

- **`docs-internal/guides/`** - Internal development guides
  - **PRIVATE** - Local only, not in git
  - **Organized by category** in subfolders: `testing/`, `deployment/`, `debugging/`, `development/`
  - File format: `category/YYYY-MM-DD-guide-name.md` (dated)
  - How-to documentation, procedures, techniques

- **`docs-internal/references/`** - Internal quick references
  - **PRIVATE** - Local only, not in git
  - **Organized by type** in subfolders: `documentation/`, `api/`, `shortcuts/`, `checklists/`, `templates/`
  - File format: `category/reference-name.md` (NO date - timeless)
  - Quick lookups, cheat sheets, verification lists

- **`docs-internal/architecture/`** - Internal architecture documentation
  - **PRIVATE** - Local only, not in git
  - **Organized by component** in subfolders: `logger/`, `css-system/`, `ui/`, `build/`, `core/`
  - File format: `component/YYYY-MM-DD-design-doc.md` (dated)
  - System design documentation, implementation details

**Note**: If external contributors join the project, we may reconsider which internal documentation to make public.

### Documentation File Placement Rules (CRITICAL)

**BEFORE creating ANY new .md file, use this decision tree:**

```
Is this README.md for the main project?
├─ YES → Root directory ✅
└─ NO → Continue...

Is this for end users (installation, features, how-to)?
├─ YES → docs/user/
└─ NO → Continue...

Is this developer documentation (contributing, roadmap, getting started)?
├─ YES → docs/developer/
└─ NO → Continue...

Is this about a specific feature/system?
├─ YES → docs/features/feature-name/descriptive-name.md
└─ NO → Continue...

Is this a code example or demonstration?
├─ YES → docs/examples/
└─ NO → Continue...

Is this a coding session summary?
├─ YES → docs-internal/sessions/YYYY-MM-DD-descriptive-name.md
└─ NO → Continue...

Is this a TODO (feature/improvement/strategy/procedure)?
├─ YES → docs-internal/todos/planned/YYYY-MM-DD-descriptive-name.md
│         (Add Type field: Implementation | Strategy | Procedure)
└─ NO → Continue...

Is this a project status snapshot?
├─ YES → docs-internal/tracking/YYYY-MM-DD-snapshot.md
└─ NO → Continue...

Is this a design decision/Architecture Decision Record?
├─ YES → docs-internal/decisions/NNN-descriptive-name.md (numbered)
└─ NO → Continue...

Is this a quick reference, checklist, or cheat sheet?
├─ YES → docs-internal/references/category/reference-name.md (use category subfolder)
└─ NO → Continue...

Is this a development guide or best practices doc?
├─ YES → docs-internal/guides/category/YYYY-MM-DD-guide-name.md (use category subfolder)
└─ NO → Continue...

Is this architecture/system design documentation?
├─ YES → docs-internal/architecture/component/YYYY-MM-DD-design-doc.md (use component subfolder)
└─ NO → Ask for guidance - unclear where this belongs!
```

**File Naming Conventions:**

- **Session docs**: `YYYY-MM-DD-descriptive-name.md` (dated)
- **TODOs**: `YYYY-MM-DD-feature-name.md` (dated - creation date, preserved through lifecycle)
- **Tracking snapshots**: `YYYY-MM-DD-snapshot.md` (dated - snapshot date)
- **Decisions (ADRs)**: `NNN-descriptive-name.md` (numbered sequentially)
- **Guides**: `category/YYYY-MM-DD-guide-name.md` (dated, in category subfolder)
- **References**: `category/reference-name.md` (NO date - timeless, in category subfolder)
- **Architecture**: `component/YYYY-MM-DD-design-doc.md` (dated, in component subfolder)
- **All other docs**: `descriptive-name.md` (lowercase with hyphens)

**Examples:**

```
❌ WRONG: Creating BUILD-SYSTEM-UPDATE.md in root
✅ RIGHT: Creating docs-internal/sessions/2026-02-16-build-system-update.md

❌ WRONG: Creating QUICK-REFERENCE.md in root  
✅ RIGHT: Creating docs-internal/references/quick-reference.md

❌ WRONG: Creating TESTING-PLAN.md in root
✅ RIGHT: Creating docs-internal/todos/planned/2026-02-16-testing-strategy.md (Type: Procedure)

❌ WRONG: Creating DEBUG-ELIMINATION-GUIDE.md in root
✅ RIGHT: Creating docs/features/debug-system/elimination-guide.md

❌ WRONG: Creating CODING-BEST-PRACTICES.md in root
✅ RIGHT: Creating docs-internal/guides/development/2026-02-16-coding-best-practices.md

❌ WRONG: Creating CONTRIBUTING.md in root
✅ RIGHT: Creating docs/developer/README.md (or CONTRIBUTING.md)
```

## TODO System Workflow

### Overview

TODOs track feature development through a **3-stage lifecycle**: `planned/` → `active/` → `completed/`

**Directory structure:**
```
docs-internal/todos/
├── active/         # Currently being worked on (0-2 TODOs max)
├── completed/      # Finished features and improvements
├── planned/        # Future work, prioritized
├── README.md       # Navigation and quick stats
├── TODO-SYSTEM.md  # Complete 500+ line workflow documentation
└── TODO-TEMPLATE.md # Template for new TODOs
```

**Key principle:** TODOs are dated by creation date (`YYYY-MM-DD-feature-name.md`) and that date is **preserved** as the file moves through the lifecycle.

### Creating a New TODO

**When to create a TODO:**
- New feature to implement
- Significant improvement or refactoring
- System redesign or major change
- Multi-step work that needs tracking

**Steps:**

1. **Copy template:** Use `todos/TODO-TEMPLATE.md` as starting point

2. **Name file:** `YYYY-MM-DD-feature-name.md` (today's date)

3. **Save location:** `docs-internal/todos/planned/`

4. **Fill required sections:**
   - **Status**: Planned
   - **Priority**: High/Medium/Low (consider impact and urgency)
   - **Target Version**: vX.X.X
   - **Estimated Effort**: X hours/days/weeks
   - **Overview**: What you're building and why
   - **Motivation**: Problem this solves
   - **Requirements**: Must-have features
   - **Implementation Plan**: Step-by-step approach
   - **Testing Plan**: How to verify it works
   - **Success Criteria**: Measurable outcomes (checkboxes)
   - **Dependencies**: What must be done first
   - **Related Documentation**: Links to decisions, plans, architecture docs

5. **Update `PROJECT-DASHBOARD.md`:**
   - Add to "Up Next (Top 5 Planned)" section
   - Update Quick Stats (increment planned count)
   - Link to the new TODO file

6. **Update `todos/README.md`:**
   - Add entry in "Planned" section with brief description

7. **Commit:**
   ```bash
   git add docs-internal/todos/planned/YYYY-MM-DD-feature-name.md
   git commit -m "plan: Add TODO for [feature name]
   
   - Target version: vX.X.X
   - Priority: High/Medium/Low
   - Estimated effort: X days"
   ```

### Starting Work (Moving to Active)

**Before starting work on a TODO:**

1. **Move file:** `planned/` → `active/`
   ```bash
   mv docs-internal/todos/planned/YYYY-MM-DD-feature.md \
      docs-internal/todos/active/YYYY-MM-DD-feature.md
   ```

2. **Update TODO file:**
   - Status: Planned → Active
   - Started: YYYY-MM-DD (today's date)
   - Add any new implementation notes discovered during planning

3. **Update `PROJECT-DASHBOARD.md`:**
   - Add to "Active TODOs" section with current status
   - Remove from "Up Next"
   - Update Quick Stats (decrement planned, increment active)

4. **Update `todos/README.md`:**
   - Move entry from "Planned" to "Active" section

5. **Commit:**
   ```bash
   git add .
   git commit -m "chore: Start work on [feature name]
   
   Moving TODO to active/"
   ```

**Best practice:** Only have 1-2 active TODOs at a time. Finish before starting new work.

### Completing a TODO (CRITICAL WORKFLOW)

**When all success criteria are met and tested:**

1. ✅ **Verify completion:**
   - All checkboxes in "Success Criteria" section checked
   - Features tested and working
   - Documentation updated
   - Code reviewed (if applicable)

2. ✅ **Update TODO file:**
   - Status: Active → Completed
   - Completed: YYYY-MM-DD (today's date)
   - Add completion notes (any deviations from plan, lessons learned)

3. ✅ **Move file:**
   ```bash
   mv docs-internal/todos/active/YYYY-MM-DD-feature.md \
      docs-internal/todos/completed/YYYY-MM-DD-feature.md
   ```

4. ✅ **Update `PROJECT-DASHBOARD.md`:**
   - **Remove** from "Active TODOs" section
   - **Add** to "Recent Completions (Last 10)" section (add at top, remove 11th if list full)
   - **Update Quick Stats:**
     - Decrement "Active TODOs" count
     - Increment "Completed TODOs" count
   - **INCREMENT completion counter:**
     - Example: `Snapshot maintenance: 1/5 completed` → `2/5 completed`
     - This tracks progress toward next snapshot trigger

5. ✅ **Update `todos/README.md`:**
   - Move entry from "Active" to "Completed" section
   - Keep date and brief description

6. ✅ **Check snapshot trigger:**
   - If counter shows `5/5` → **CREATE SNAPSHOT NOW**
   - If major milestone reached → **CREATE SNAPSHOT NOW**
   - If about to take extended break → **CREATE SNAPSHOT NOW**
   - See "Snapshot Maintenance Workflow" section below

7. ✅ **Commit changes:**
   ```bash
   git add .
   git commit -m "feat: [Feature name] (#TODO-filename)
   
   - Success criterion 1
   - Success criterion 2
   - Success criterion 3
   
   Closes #YYYY-MM-DD-feature-name
   Updates PROJECT-DASHBOARD (X/5 completions toward snapshot)"
   ```

**Common mistakes to avoid:**

❌ **DON'T:**
- Leave TODO in `active/` after completing work
- Forget to update PROJECT-DASHBOARD
- Forget to increment completion counter
- Miss snapshot trigger at 5/5
- Forget to update `todos/README.md`
- Skip verification of success criteria

✅ **DO:**
- Follow all 7 steps every single time
- Check completion counter after updating
- Create snapshot immediately when triggered
- Update all cross-references
- Celebrate completed work!

**For complete workflow details:** See `docs-internal/todos/TODO-SYSTEM.md` (500+ lines)

## Category Organization in docs-internal/

### guides/ - Organized by Purpose

Create category subfolders for related guides:

```
docs-internal/guides/
├── testing/
│   ├── YYYY-MM-DD-unit-testing.md
│   └── YYYY-MM-DD-integration-testing.md
├── deployment/
│   ├── YYYY-MM-DD-release-process.md
│   └── YYYY-MM-DD-version-management.md
├── development/
│   ├── YYYY-MM-DD-coding-standards.md
│   └── YYYY-MM-DD-git-workflow.md
├── debugging/
│   └── YYYY-MM-DD-troubleshooting.md
└── README.md
```

**When to create category:**
- 2+ guides on the same topic
- Clear grouping (testing, deployment, development, debugging, etc.)

**File naming:** `category/YYYY-MM-DD-descriptive-name.md` (dated, in category subfolder)

### references/ - Organized by Type

Create category subfolders for different types of references:

```
docs-internal/references/
├── documentation/
│   ├── system-overview.md
│   └── file-structure.md
├── api/
│   ├── logger-api.md
│   └── modal-api.md
├── checklists/
│   ├── code-review-checklist.md
│   └── release-checklist.md
├── shortcuts/
│   └── keyboard-shortcuts.md
└── templates/
    └── commit-messages.md
```

**When to create category:**
- Natural grouping (APIs, checklists, shortcuts, templates)
- 2+ references of the same type

**File naming:** `category/descriptive-name.md` (NOT dated - timeless reference material)

### architecture/ - Organized by Component

Create component subfolders for system designs:

```
docs-internal/architecture/
├── logger/
│   └── YYYY-MM-DD-logger-design.md
├── css-system/
│   └── YYYY-MM-DD-modular-css.md
├── ui/
│   ├── YYYY-MM-DD-modal-system.md
│   └── YYYY-MM-DD-component-structure.md
├── build/
│   └── YYYY-MM-DD-build-pipeline.md
└── core/
    └── YYYY-MM-DD-plugin-architecture.md
```

**When to create component:**
- System has multiple design docs
- Clear component boundaries (logger, UI, build system, etc.)

**File naming:** `component/YYYY-MM-DD-design-doc.md` (dated, in component subfolder)

## Snapshot Maintenance Workflow

### Creation Triggers (Completion-Based)

Create new snapshot in `tracking/YYYY-MM-DD-snapshot.md` when:

1. **5+ TODOs completed** since last snapshot (PRIMARY TRIGGER)
   - Check PROJECT-DASHBOARD.md completion counter
   - Example: "Snapshot maintenance: 5/5 completed ⚠️ Create snapshot!"
   - Rationale: Ensures substantial content in each snapshot

2. **Major milestone reached**
   - Version release (v1.0.0, v2.0.0, etc.)
   - System redesign (like documentation system)
   - Significant feature completion
   - Breaking changes

3. **Extended work break**
   - Before vacation or leave
   - When returning after extended break
   - End of development phase
   - Project handoff

### Why Completion-Based (Not Time-Based)?

- ✅ **Realistic:** Acknowledges irregular work patterns (don't work every day/Sunday)
- ✅ **Practical:** Can't automate AI tasks on a timer
- ✅ **Meaningful:** Each snapshot has substantial content (5+ completed features)
- ✅ **Flexible:** 5 TODOs in 1 day or 1 month both work equally well

### Snapshot Creation Procedure

**When trigger is met:**

1. ✅ **Verify trigger:** Counter at 5/5 OR major milestone OR extended break

2. ✅ **Create file:** `docs-internal/tracking/YYYY-MM-DD-snapshot.md`

3. ✅ **Copy template** from `tracking/README.md`

4. ✅ **Fill sections:**
   - **Trigger**: Which trigger was met (5 completions / milestone / break)
   - **Period Covered**: Start date to end date
   - **Summary Statistics**: 
     - Total TODOs completed
     - Total files created/modified
     - Lines of code/documentation
   - **Completed TODOs**: List all completed since last snapshot
   - **Active Work Status**: What's currently in progress
   - **Planned Next Steps**: Top priorities from PROJECT-DASHBOARD
   - **Technical Debt Changes**: New debt, resolved debt
   - **Dependencies Updates**: External dependencies, blockers
   - **Notes**: Lessons learned, discoveries, changes

5. ✅ **Update `PROJECT-DASHBOARD.md`:**
   - **Reset completion counter:** `5/5 completed` → `0/5 completed`
   - Update "Last Snapshot" reference
   - Link to new snapshot in relevant sections

6. ✅ **Update `tracking/README.md`:**
   - Add entry for new snapshot
   - Update count

7. ✅ **Commit:**
   ```bash
   git add .
   git commit -m "docs: Snapshot after [N] completions / [milestone name]
   
   - Completed TODOs: TODO1, TODO2, TODO3, TODO4, TODO5
   - Period: YYYY-MM-DD to YYYY-MM-DD
   - [X] active, [Y] planned"
   ```

**Important:** Create snapshots immediately when triggered, don't postpone!

## Cross-Referencing Between Documents

### Required Section: Related Documentation

**Every significant document should have a "Related Documentation" section:**

```markdown
## Related Documentation

**Origin** (What led to this):
- [ADR 001: Decision](../decisions/001-example.md) - Why we made this choice
- [Session: Implementation](../sessions/2026-02-16-example.md) - When we built it

**Implementation** (How to build this):
- [TODO: Feature](../todos/active/2026-02-16-feature.md) - Current work
- [TODO: Strategy](../todos/planned/2026-02-16-strategy.md) - High-level approach

**Usage** (How to use this):
- [Guide: How-to](../guides/testing/2026-02-16-howto.md) - Tutorial
- [Reference: Quick ref](../references/checklists/checklist.md) - Cheat sheet

**Details** (Technical info):
- [Architecture: Design](../architecture/logger/2026-02-16-design.md) - System design
```

### Benefits of Cross-Referencing

- ✅ **No isolated docs:** Every document connected to context
- ✅ **Navigation:** Easy to find related information
- ✅ **Understanding:** See full story (decision → implementation → usage → details)
- ✅ **Maintenance:** Update related docs when changing one

### Link Types Explained

**Origin links** - Why this exists:
- Architecture decisions (ADRs) that led to this
- Coding sessions where this was created/discussed
- Problems this solves
- Historical context

**Implementation links** - How to build/do this:
- TODOs tracking the work
- Plans with step-by-step procedures
- Implementation guides
- Migration strategies

**Usage links** - How to use this:
- Guides for learning and tutorials
- References for quick lookup
- Examples demonstrating use
- Best practices

**Details links** - Technical depth:
- Architecture designs and system diagrams
- Deep dives into implementation
- API documentation
- Technical specifications

### When to Update Index Files

After creating new documentation, update the relevant README.md index:

- Created session doc? → Update `docs-internal/sessions/README.md`
- Created feature doc? → Update `docs/features/README.md` and feature-specific README
- Created reference? → Update `docs-internal/references/README.md`
- Created guide? → Update `docs-internal/guides/README.md`
- Created developer doc? → Update `docs/developer/README.md`
- Created TODO? → Update `docs-internal/todos/README.md`
- Created plan? → Update `docs-internal/plans/README.md`
- Created tracking snapshot? → Update `docs-internal/tracking/README.md`
- Created decision? → Update `docs-internal/decisions/README.md` (if exists)
- Created architecture doc? → Update `docs-internal/architecture/README.md`

## Keeping Documentation Organized

### The Problem We're Avoiding

Previously, root directories accumulated many unsorted `.md` files. **We now use a structured `docs/` and `docs-internal/` folder system.**

### Rules for New Documentation

**Before creating any documentation file:**

1. **Is this for users?** → `docs/user/`
2. **Is this for contributors?** → `docs/developer/`
3. **Is this an example?** → `docs/examples/`
4. **Is this a coding session?** → `docs-internal/sessions/`
5. **Is this a TODO?** → `docs-internal/todos/planned/`
6. **Is this a procedure?** → `docs-internal/plans/`
7. **Is this a snapshot?** → `docs-internal/tracking/`
8. **Is this a decision?** → `docs-internal/decisions/`
9. **Is this a guide?** → `docs-internal/guides/category/`
10. **Is this a reference?** → `docs-internal/references/category/`
11. **Is this architecture?** → `docs-internal/architecture/component/`

**If unsure where a doc goes:**
- Check existing files in `docs/` and `docs-internal/` subdirectories
- Look at PROJECT-DASHBOARD.md to see where similar topics are referenced
- Ask: "Should this be on GitHub Pages?" 
  - YES → `docs/user/`, `docs/examples/`, or `docs/developer/`
  - NO → `docs-internal/` (gitignored, private)

### Build and Configuration

- **Root directory** - Build scripts and configuration files
  - `package.json` - Dependencies and scripts
  - `tsconfig.json` - TypeScript configuration
  - `manifest.json` - Obsidian plugin manifest
  - `esbuild.config.mjs` - Build script
  - `build-css.mjs` - CSS bundler
  - `build-release.mjs` - Release builder (creates versioned releases)
  - `copy-assets.mjs` - Asset copier
  - `versions.json` - Version compatibility matrix
  - `styles.css` - **GENERATED FILE - DO NOT EDIT DIRECTLY**

### Release System

- **`release/`** - Release files (generated, not committed to git)
  - `release/0.1.0/` - Version-specific directory
    - `manifest.json`, `main.js`, `styles.css`
  - `release/plugin-name-0.1.0.zip` - Zip archive for distribution

## File Creation Guidelines

### File Size Limits (CRITICAL)

**Maximum file sizes to maintain readability and modularity:**

- **TypeScript source files**: 500 lines maximum
- **UI component files**: 300 lines maximum  
- **Utility files**: 200 lines maximum
- **Modal/Dialog files**: 400 lines maximum
- **Settings files**: 400 lines maximum

**When a file approaches its limit:**

❌ **NEVER add more code to an already large file**

✅ **ALWAYS refactor into smaller, focused modules:**

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

**Signs a file needs splitting:**

1. File has multiple unrelated responsibilities
2. File exceeds line count limits
3. Hard to find specific functions
4. Many private helper methods (extract to utilities)
5. Multiple UI components in one file (separate them)
6. Long scroll distance to navigate
7. Difficult to understand at a glance

### Modularity and Code Organization (CRITICAL)

**ALWAYS prefer modular design over monolithic files.**

#### Principle 1: Single Responsibility

Each file should have ONE clear purpose:

```typescript
// ❌ BAD: Everything in one file
src/ui/UserInterface.ts  // Modals, forms, buttons, validations, API calls...

// ✅ GOOD: Each file has one responsibility
src/ui/modals/CreateRecordModal.ts    // One modal
src/ui/modals/EditRecordModal.ts      // Another modal
src/ui/forms/RecordForm.ts            // Form component
src/ui/components/Button.ts           // Reusable button
src/validation/recordValidator.ts     // Validation logic
src/api/recordApi.ts                  // API calls
```

#### Principle 2: Extract Reusable Code

**When you write similar code twice, extract it:**

```typescript
// ❌ BAD: Duplicated logic in multiple modals
class Modal1 {
    validateField() { /* 30 lines of validation */ }
}
class Modal2 {
    validateField() { /* same 30 lines */ }
}

// ✅ GOOD: Extracted to shared utility
// src/utils/validation.ts
export function validateField() { /* 30 lines once */ }

// src/modals/Modal1.ts
import { validateField } from '../utils/validation';
class Modal1 {
    validate() { return validateField(this.data); }
}
```

#### Principle 3: Component-Based UI

**Break UI into small, reusable components:**

```typescript
// ❌ BAD: One giant modal file (600 lines)
class ComplexModal extends Modal {
    // 100 lines of header logic
    // 200 lines of form logic
    // 150 lines of table logic
    // 150 lines of validation logic
}

// ✅ GOOD: Composed from smaller components
class ComplexModal extends Modal {
    private header = new ModalHeader(this);
    private form = new RecordForm(this);
    private table = new DataTable(this);
    
    onOpen() {
        this.header.render();
        this.form.render();
        this.table.render();
    }
}

// Each component in its own file (50-150 lines each)
```

#### Principle 4: Utilities Over Duplication

**Create utility modules for shared functionality:**

```typescript
// ✅ GOOD structure for utilities
src/utils/
├── validation.ts       // Field validation functions
├── formatting.ts       // Date, number, text formatting
├── domHelpers.ts       // DOM manipulation helpers
├── apiHelpers.ts       // API request/response utilities
├── errorHandling.ts    // Error formatting and handling
└── Logger.ts           // Logging system
```

#### Principle 5: Namespace Folders

**Group related files in subdirectories:**

```typescript
// ✅ GOOD: Organized by feature/responsibility
src/
├── modals/
│   ├── CreateNoteModal.ts
│   ├── EditNoteModal.ts
│   └── DeleteConfirmModal.ts
├── forms/
│   ├── NoteForm.ts
│   ├── MetadataForm.ts
│   └── TemplateForm.ts
├── components/
│   ├── Button.ts
│   ├── Dropdown.ts
│   └── SearchBox.ts
└── api/
    ├── notesApi.ts
    ├── metadataApi.ts
    └── templatesApi.ts
```

### When creating new files:

1. **TypeScript source files** → Always place in appropriate `src/` subdirectory
2. **Check existing file size** → If file approaching 400+ lines, refactor FIRST, then add code
3. **New component** → Create in appropriate subdirectory (ui/components/, ui/modals/, etc.)
4. **Shared logic** → Extract to utils/ with descriptive filename
5. **Related files** → Group in subdirectory, don't scatter
6. **CSS files** → Place in `src/styles/` and add to `build-css.mjs` cssFiles array
7. **User documentation** → Place in `docs/user/`
8. **Public developer docs** → Place in `docs/developer/public/`
9. **Internal developer notes** → Place in `docs/developer/` (not in public/)
10. **Configuration files** → Root directory only if they affect the entire project

### Code Quality Checklist

Before adding code to a file, ask:

- [ ] Is this file already over 400 lines? (If yes, refactor first)
- [ ] Does this code belong in this file? (Single responsibility)
- [ ] Am I duplicating code that exists elsewhere? (Extract to utility)
- [ ] Could this be a separate component? (Prefer composition)
- [ ] Will this make the file hard to understand? (Split it up)
- [ ] Can I extract helper functions to utilities? (Reduce file size)
- [ ] Is there a better place for this code? (Check folder structure)

### Naming Conventions

**File Names:**
- Use PascalCase for class files (e.g., `ExampleModal.ts`, `SettingsTab.ts`)
- Use camelCase for utility files (e.g., `validation.ts`, `formatters.ts`)
- Use kebab-case for directories (e.g., `ui/`, `api-client/`, `note-processor/`)
- Documentation files use `.md` extension
- CSS files use `.css` extension and descriptive names

**Variable and Function Names:**
- Use camelCase for variables and functions: `userName`, `calculateTotal()`
- Use PascalCase for classes and types: `UserRecord`, `NoteMetadata`
- Use UPPER_SNAKE_CASE for constants: `MAX_FILE_SIZE`, `DEFAULT_TIMEOUT`
- Use descriptive names: `getUserById()` not `get()`
- Avoid abbreviations unless very common: `id`, `url`, `api` are OK

**Component and Class Names:**
- Suffix modals with `Modal`: `CreateNoteModal`, `SettingsModal`
- Suffix forms with `Form`: `MetadataForm`, `TemplateForm`
- Suffix managers with `Manager`: `TemplateManager`, `CacheManager`
- Suffix handlers with `Handler`: `EventHandler`, `ErrorHandler`
- Suffix utilities with descriptive names: `validation`, `formatting`, `apiHelpers`

## TypeScript Best Practices (CRITICAL)

### Type Safety

**ALWAYS use strong typing, NEVER use `any`:**

```typescript
// ❌ BAD: Using 'any' loses type safety
function processData(data: any) {
    return data.value; // No error if 'value' doesn't exist!
}

// ✅ GOOD: Proper types
interface DataRecord {
    value: string;
    metadata: Record<string, unknown>;
}

function processData(data: DataRecord): string {
    return data.value; // Type-safe!
}
```

**Use TypeScript features:**

```typescript
// ✅ Use interfaces for object shapes
interface NoteMetadata {
    title: string;
    created: Date;
    tags: string[];
    author?: string;  // Optional property
}

// ✅ Use type unions for alternatives
type Status = 'pending' | 'active' | 'completed' | 'failed';

// ✅ Use generics for reusable code
function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
    return items.find(item => item.id === id);
}

// ✅ Use type guards
function isError(value: unknown): value is Error {
    return value instanceof Error;
}
```

### Error Handling

**ALWAYS handle errors explicitly:**

```typescript
// ❌ BAD: Silent failures
async function loadData() {
    const data = await fetchData(); // Might throw!
    return data;
}

// ✅ GOOD: Explicit error handling
async function loadData(): Promise<DataRecord[]> {
    try {
        const data = await fetchData();
        this.logger.info('Data loaded successfully', { count: data.length });
        return data;
    } catch (error) {
        this.logger.error('Failed to load data', error);
        throw new Error(`Data loading failed: ${error.message}`);
    }
}
```

**Use early returns for validation:**

```typescript
// ❌ BAD: Nested conditions
function processRecord(record: Record) {
    if (record) {
        if (record.isValid) {
            if (record.data) {
                // Process record
            }
        }
    }
}

// ✅ GOOD: Early returns
function processRecord(record: Record) {
    if (!record) {
        this.logger.warn('No record provided');
        return;
    }
    
    if (!record.isValid) {
        this.logger.warn('Invalid record', { id: record.id });
        return;
    }
    
    if (!record.data) {
        this.logger.warn('Record has no data', { id: record.id });
        return;
    }
    
    // Process record - main logic at end, not nested
    this.processData(record.data);
}
```

### Async/Await Best Practices

**Use async/await consistently:**

```typescript
// ❌ BAD: Mixing promises and async/await
async function fetchAndProcess() {
    return fetchData().then(data => {
        return processData(data).then(result => {
            return result;
        });
    });
}

// ✅ GOOD: Consistent async/await
async function fetchAndProcess() {
    const data = await fetchData();
    const result = await processData(data);
    return result;
}
```

**Handle promise rejections:**

```typescript
// ✅ GOOD: Proper error handling with Promise.all
async function loadMultipleRecords(ids: string[]) {
    try {
        const records = await Promise.all(
            ids.map(id => this.loadRecord(id))
        );
        return records;
    } catch (error) {
        this.logger.error('Failed to load records', error);
        throw error;
    }
}
```

## Code Documentation (CRITICAL)

### JSDoc Comments

**Document public APIs with JSDoc:**

```typescript
/**
 * Fetches a record by its unique identifier.
 * 
 * @param id - The unique identifier of the record
 * @returns Promise resolving to the record, or undefined if not found
 * @throws {Error} If the API request fails
 * 
 * @example
 * ```typescript
 * const record = await api.getRecordById('abc-123');
 * if (record) {
 *   console.log(record.title);
 * }
 * ```
 */
async getRecordById(id: string): Promise<Record | undefined> {
    // Implementation
}
```

**Document complex logic with inline comments:**

```typescript
// ✅ GOOD: Explain WHY, not WHAT
function calculateScore(metrics: Metrics): number {
    // Multiply by 0.7 because we weight recent activity more heavily
    // than historical data (based on user research from 2025-11)
    const recentScore = metrics.recent * 0.7;
    
    // Cap historical score at 30% to prevent old data from
    // dominating the calculation
    const historicalScore = Math.min(metrics.historical * 0.3, 30);
    
    return recentScore + historicalScore;
}
```

### Function Documentation

**Every non-trivial function should have:**

1. Brief description of what it does
2. Parameter descriptions
3. Return value description
4. Possible errors/exceptions
5. Example usage (if complex)

```typescript
/**
 * Validates note metadata against template requirements.
 * 
 * Checks required fields, data types, and value constraints
 * defined in the template. Returns detailed validation errors
 * for each field that fails validation.
 * 
 * @param metadata - The metadata object to validate
 * @param template - The template defining requirements
 * @returns Array of validation errors (empty if valid)
 * 
 * @example
 * ```typescript
 * const errors = validateMetadata(note.metadata, template);
 * if (errors.length > 0) {
 *   console.error('Validation failed:', errors);
 * }
 * ```
 */
function validateMetadata(
    metadata: NoteMetadata,
    template: Template
): ValidationError[] {
    // Implementation
}
```

## Performance Best Practices

### Avoid Unnecessary Re-renders

```typescript
// ❌ BAD: Creating new objects in render loop
class MyComponent {
    render() {
        this.containerEl.createEl('div', {
            cls: ['class1', 'class2'] // New array every render!
        });
    }
}

// ✅ GOOD: Reuse constant arrays/objects
class MyComponent {
    private readonly classes = ['class1', 'class2'];
    
    render() {
        this.containerEl.createEl('div', {
            cls: this.classes // Reuse existing array
        });
    }
}
```

### Cache Expensive Computations

```typescript
// ✅ GOOD: Cache computed values
class DataProcessor {
    private cache = new Map<string, ProcessedData>();
    
    process(id: string, data: RawData): ProcessedData {
        if (this.cache.has(id)) {
            return this.cache.get(id)!;
        }
        
        const processed = this.expensiveComputation(data);
        this.cache.set(id, processed);
        return processed;
    }
}
```

### Debounce Frequent Operations

```typescript
// ✅ GOOD: Debounce search as user types
class SearchComponent {
    private searchDebounce: number | null = null;
    
    onSearchInput(query: string) {
        if (this.searchDebounce) {
            window.clearTimeout(this.searchDebounce);
        }
        
        this.searchDebounce = window.setTimeout(() => {
            this.performSearch(query);
        }, 300); // Wait 300ms after user stops typing
    }
}
```

## Testing and Validation

### Manual Testing Checklist

Before committing code, verify:

- [ ] Code builds without errors (`npm run build`)
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] Plugin loads in Obsidian
- [ ] All features work as expected
- [ ] No console errors
- [ ] Tested with light and dark themes
- [ ] Performance is acceptable

### Code Review Checklist

Before finalizing changes:

- [ ] No files exceed size limits (500 lines max)
- [ ] Code follows single responsibility principle
- [ ] No duplicated code (extracted to utilities)
- [ ] Strong typing (no `any` types)
- [ ] Error handling present
- [ ] Logger used instead of console.*
- [ ] JSDoc comments on public APIs
- [ ] Meaningful variable/function names
- [ ] CSS in .css files, not TypeScript
- [ ] Documentation updated if needed

## CRITICAL: Never Create Documentation in Root

**❌ NEVER DO THIS:**
```
plugin-template/
├── IMPLEMENTATION-NOTES.md  ❌ NO!
├── BUG-FIX-NOTES.md         ❌ NO!
├── TODO.md                  ❌ NO!
```

**✅ ALWAYS DO THIS:**
```
plugin-template/
├── README.md                 ✅ Only this in root
├── LICENSE                   ✅ License file
├── docs/
│   └── developer/
│       ├── implementation-notes.md   ✅ Internal doc
│       ├── bug-fixes.md              ✅ Internal doc
│       └── public/
│           ├── README.md             ✅ Public dev doc
│           └── ROADMAP.md            ✅ Public roadmap
```

## Development Workflow

### Build Commands

- `npm run dev` - Build and copy to dev vault (fast, no type checking)
- `npm run build` - Full production build with type checking
- `npm run build:css` - Compile CSS files only
- `npm run watch:css` - Watch CSS files and rebuild on changes
- `npm run release` - Create versioned release with zip file

### Development Setup

1. Create a dev vault: `../obsidian-dev-vault/`
2. Plugin will be installed to: `../obsidian-dev-vault/.obsidian/plugins/your-plugin/`
3. Run `npm run dev` to build and copy files
4. Reload plugin in Obsidian after changes

### Testing

- Test in Obsidian by symlinking or using `npm run dev`
- The plugin follows Obsidian's plugin development patterns
- All UI components should integrate with Obsidian's theming system
- Test with multiple themes to ensure compatibility

## Architecture Notes

This template is designed for Obsidian plugins that:
- Need organized, maintainable CSS with multiple files
- Require sophisticated logging and debugging
- Follow modern TypeScript best practices
- Have clear separation of concerns (UI, logic, settings, utilities)
- Use versioned releases for easy distribution
- Support both manual and BRAT installation

## Important: Never place generated files in src/

- Build outputs go to root (`main.js`, `styles.css`) or `release/`
- Never commit `node_modules/`
- Never commit generated files (`main.js`, `styles.css`)
- Git should ignore: `node_modules/`, `main.js`, `styles.css`, `release/`, `.env`

## Why This Matters

**Separation of Concerns:**
- CSS belongs in CSS files, not JavaScript
- Logging through centralized system for consistency
- Documentation organized by audience (users vs developers)
- Work tracked systematically through TODO lifecycle

**Maintainability:**
- Easy to find and modify styles (modular CSS)
- Easy to debug with component-based logging
- Easy to onboard contributors with clear structure
- Historical snapshots for changelog generation

**Performance:**
- No dynamic style injection
- Buffered file logging
- Optimized build system

**Standards:**
- Follows Obsidian plugin best practices
- Uses Obsidian's CSS variables for theming
- Proper TypeScript configuration
- Completion-based documentation workflow
