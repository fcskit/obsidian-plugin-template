# TODO System

**Task tracking and development documentation for the plugin.**

---

## Overview

This plugin uses a **centralized TODO system** to track all development work. TODOs move through a **3-stage lifecycle**: `planned/` → `active/` → `completed/`

**Directory structure:**
```
docs-internal/
├── PROJECT-DASHBOARD.md    # ⭐ Central status hub (always current)
├── todos/
│   ├── active/            # Currently being worked on (0-2 TODOs max)
│   ├── completed/         # Finished features and improvements
│   ├── planned/           # Future work, prioritized
│   ├── README.md          # Navigation and quick stats
│   ├── TODO-SYSTEM.md     # Complete workflow documentation (this file)
│   └── TODO-TEMPLATE.md   # Template for new TODOs
├── tracking/              # Project snapshots (every 5 completed TODOs)
│   └── README.md
├── sessions/              # Coding session summaries
│   └── README.md
├── decisions/             # Architecture Decision Records (ADRs)
│   └── README.md
├── guides/                # Internal development guides
│   ├── testing/
│   ├── deployment/
│   ├── development/
│   ├── debugging/
│   └── README.md
├── references/            # Quick references and checklists
│   ├── documentation/
│   ├── api/
│   ├── checklists/
│   ├── shortcuts/
│   ├── templates/
│   └── README.md
└── architecture/          # System design documentation
    ├── logger/
    ├── css-system/
    ├── ui/
    ├── build/
    ├── core/
    └── README.md
```

---

## TODO Types

- **Implementation** - Coding features, bug fixes
- **Strategy** - High-level planning, architecture decisions
- **Procedure** - Workflows, development processes

**Key principle:** TODOs are dated by creation date (`YYYY-MM-DD-feature-name.md`) and that date is **preserved** as the file moves through lifecycle.

---

## Creating a New TODO

### When to Create

- New feature to implement
- Significant improvement or refactoring
- System redesign or major change
- Multi-step work that needs tracking
- Bug fixes requiring investigation

### Steps

1. **Copy template:** `docs-internal/todos/TODO-TEMPLATE.md`

2. **Name file:** `YYYY-MM-DD-feature-name.md` (today's date)

3. **Save location:** `docs-internal/todos/planned/`

4. **Fill required sections:**
   - **Status**: Planned
   - **Type**: Implementation|Strategy|Procedure
   - **Priority**: High/Medium/Low
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
   
   - Target: vX.X.X
   - Priority: High
   - Type: Implementation"
   ```

---

## Starting Work (Moving to Active)

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

---

## Completing a TODO (CRITICAL WORKFLOW)

**When all success criteria are met and tested:**

1. ✅ **Verify completion:**
   - All checkboxes in "Success Criteria" section checked
   - Features tested and working
   - Documentation updated
   - Tests added/updated
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
   - See "Snapshot Maintenance" section below

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

---

## Snapshot Maintenance

### Creation Triggers

Create new snapshot in `tracking/YYYY-MM-DD-snapshot.md` when:

1. **5+ TODOs completed** since last snapshot (PRIMARY TRIGGER)
   - Check PROJECT-DASHBOARD.md completion counter
   - Example: "Snapshot maintenance: 5/5 completed ⚠️ Create snapshot!"
   - Rationale: Ensures substantial content in each snapshot

2. **Major milestone reached**
   - Version release (v1.0.0, v2.0.0, etc.)
   - System redesign
   - Significant feature completion
   - Breaking changes

3. **Extended work break**
   - Before vacation or leave
   - When returning after extended break
   - End of development phase
   - Project handoff

### Why Completion-Based?

- ✅ **Realistic:** Acknowledges irregular work patterns (don't work every day)
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

---

## docs-internal/ Category Organization

### sessions/ - Coding Session Summaries

**Purpose:** Document implementation decisions and changes

**File format:** `YYYY-MM-DD-descriptive-name.md` (dated)

**When to create:**
- After significant coding session
- Implementation decisions made
- Workarounds or hacks applied
- Complex bug fixes

**Example:**
```
docs-internal/sessions/
├── 2025-02-17-modal-redesign.md
├── 2025-02-18-logger-implementation.md
└── 2025-02-20-css-build-system.md
```

---

### decisions/ - Architecture Decision Records (ADRs)

**Purpose:** Record formal architecture decisions

**File format:** `NNN-descriptive-name.md` (numbered sequentially)

**When to create:**
- Significant architectural choice
- Technology selection
- API design decision
- Migration strategy

**Template:**
```markdown
# ADR 001: Use esbuild for Build System

## Status
Accepted

## Context
Need fast build system for Obsidian plugin development.

## Decision
Use esbuild instead of webpack or rollup.

## Consequences
**Pros:**
- Extremely fast builds
- Simple configuration
- Tree shaking built-in

**Cons:**
- Less flexible than webpack
- Smaller ecosystem

## Alternatives Considered
- webpack (too slow)
- rollup (more complex)
- tsc only (no bundling)
```

---

### guides/ - Internal Development Guides

**Purpose:** How-to documentation, procedures, techniques

**Organization:** By category in subfolders

```
docs-internal/guides/
├── testing/
│   ├── 2025-02-17-unit-testing.md
│   └── 2025-02-18-integration-testing.md
├── deployment/
│   ├── 2025-02-17-release-process.md
│   └── 2025-02-18-version-management.md
├── development/
│   ├── 2025-02-17-coding-standards.md
│   └── 2025-02-18-git-workflow.md
└── debugging/
    └── 2025-02-17-troubleshooting.md
```

**File naming:** `category/YYYY-MM-DD-guide-name.md` (dated)

---

### references/ - Quick References

**Purpose:** Quick lookups, cheat sheets, verification lists

**Organization:** By type in subfolders

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

**File naming:** `category/reference-name.md` (NO date - timeless)

---

### architecture/ - System Design

**Purpose:** System design documentation, implementation details

**Organization:** By component in subfolders

```
docs-internal/architecture/
├── logger/
│   └── 2025-02-17-logger-design.md
├── css-system/
│   └── 2025-02-18-modular-css.md
├── ui/
│   └── 2025-02-20-component-structure.md
└── build/
    └── 2025-02-22-build-pipeline.md
```

**File naming:** `component/YYYY-MM-DD-design-doc.md` (dated)

---

## PROJECT-DASHBOARD Best Practices

**Always keep current:**
- Update immediately when TODOs change state
- Increment counter when completing TODOs
- Add new TODOs to "Up Next"
- Keep "Recent Completions" updated (max 10)

**Should reflect:**
- Current active work
- Top 5 planned priorities
- Last 10 completed items
- Completion counter (X/5)
- Last snapshot date

**Review regularly:**
- Before starting new work
- After completing TODO
- When planning next sprint
- Before creating snapshot

---

## Summary

**Golden Rules:**

1. ✅ **TODOs track all work** (features, improvements, strategies, procedures)
2. ✅ **3-stage lifecycle** (planned/ → active/ → completed/)
3. ✅ **Only 1-2 active at a time** (finish before starting new)
4. ✅ **Update PROJECT-DASHBOARD** (every TODO state change)
5. ✅ **Increment completion counter** (after every completion)
6. ✅ **Create snapshot at 5 completions** (don't skip this!)
7. ✅ **Follow all 7 completion steps** (every single time)
8. ✅ **Preserve TODO creation date** (YYYY-MM-DD through lifecycle)

**Benefits:**

- Clear visibility of all work (past, present, future)
- Completion-based snapshots (realistic, meaningful)
- Historical record (for changelogs, reviews)
- Single source of truth (PROJECT-DASHBOARD)
- No work gets lost or forgotten
