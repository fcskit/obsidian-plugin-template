# Documentation System

**Documentation organization designed for clear separation of public and private docs.**

---

## Core Principle

**ABSOLUTE RULE: Only README.md in root directory!**

All other documentation must be placed in organized subdirectories.

---

## Documentation Structure

```
obsidian-plugin-template/
├── README.md                # ✅ ONLY this in root
├── LICENSE                  # ✅ License file
├── docs/                    # PUBLIC (committed to GitHub)
│   ├── user/
│   ├── developer/
│   ├── features/
│   └── examples/
└── docs-internal/           # PRIVATE (gitignored, not committed)
    ├── PROJECT-DASHBOARD.md
    ├── todos/
    ├── tracking/
    ├── sessions/
    ├── decisions/
    ├── guides/
    ├── references/
    └── architecture/
```

---

## Public Documentation (docs/)

**Everything in `docs/` is committed to GitHub and may be published on GitHub Pages.**

### docs/user/

**User-facing documentation (published on GitHub Pages):**

```
docs/user/
├── installation.md         # Installation guide
├── getting-started.md      # Quick start
├── features.md             # Feature overview
├── workflows.md            # Common workflows
├── troubleshooting.md      # Common issues
└── faq.md                  # Frequently asked questions
```

**Purpose:**
- Help users install and use the plugin
- Visible to all users
- Published on GitHub Pages

**When to create:**
- Installation instructions
- Feature explanations
- User guides
- Troubleshooting steps

### docs/developer/

**Developer documentation (published on GitHub Pages):**

```
docs/developer/
├── README.md               # Contributing guide
├── ROADMAP.md              # Project roadmap and version planning
├── KNOWN-ISSUES.md         # Known bugs and limitations
├── quick-start.md          # Quick start for developers
├── start-here.md           # Comprehensive developer introduction
├── architecture/           # Public architecture documentation
└── api/                    # Public API documentation (if needed)
```

**Purpose:**
- Help contributors get started
- Visible to users and contributors
- Published on GitHub Pages

**When to create:**
- Contributing guidelines
- Development setup
- Architecture overviews
- API documentation

### docs/features/

**Feature-specific documentation (published on GitHub Pages):**

```
docs/features/
├── feature-name/
│   ├── README.md           # Feature overview
│   ├── implementation.md   # Technical details
│   ├── usage.md            # How to use
│   └── examples.md         # Code examples
```

**Purpose:**
- Deep dives into specific features
- Technical details and usage
- Helps users and contributors understand features

**When to create:**
- Complex features need explanation
- Implementation details worth documenting
- Usage examples helpful

### docs/examples/

**Code examples and demonstrations (published on GitHub Pages):**

```
docs/examples/
├── basic-usage.md
├── advanced-workflows.md
└── api-integration.md
```

**Purpose:**
- Working code examples
- Usage demonstrations
- Helps users understand how to use the plugin

---

## Private Documentation (docs-internal/)

**Everything in `docs-internal/` is gitignored and NOT committed to GitHub.**

**Privacy Policy:** Internal development documentation is kept private until we have external contributors. This includes coding session summaries, architecture decisions, TODOs, and internal guides.

### PROJECT-DASHBOARD.md

**⭐ Central landing page:**

```markdown
# Project Dashboard

**Status:** Active Development
**Version:** 0.1.0
**Last Updated:** 2025-02-17

## Quick Stats
- Active TODOs: 2
- Completed TODOs: 5
- Planned TODOs: 3
- Snapshot maintenance: 0/5 completed

## Active TODOs
- [2025-02-15-feature-name](todos/active/2025-02-15-feature-name.md) - In progress

## Up Next (Top 5 Planned)
1. [2025-02-16-improvement](todos/planned/2025-02-16-improvement.md) - High priority

## Recent Completions (Last 10)
1. [2025-02-14-bug-fix](todos/completed/2025-02-14-bug-fix.md) - Completed 2025-02-15
```

**Purpose:**
- Always-current project status
- Single source of truth for active work
- Updated continuously

### todos/

**TODO lifecycle management:**

```
docs-internal/todos/
├── active/                 # Currently being worked on (0-2 max)
├── completed/              # Finished features and improvements
├── planned/                # Future work, prioritized
├── README.md               # Navigation and quick stats
├── TODO-SYSTEM.md          # Complete workflow documentation
└── TODO-TEMPLATE.md        # Template for new TODOs
```

**File format:** `YYYY-MM-DD-feature-name.md` (creation date preserved through lifecycle)

**Tracks:** Features, improvements, strategies, and procedures

**See:** [TODO System](todo-system.md) for complete workflow

### tracking/

**Historical project snapshots:**

```
docs-internal/tracking/
├── 2025-02-10-snapshot.md
├── 2025-02-17-snapshot.md
└── README.md
```

**File format:** `YYYY-MM-DD-snapshot.md` (snapshot date)

**Created:**
- After 5+ completed TODOs
- Major milestones
- Extended breaks

**Purpose:**
- Source material for release changelogs
- Historical project progression record

### sessions/

**Coding session summaries:**

```
docs-internal/sessions/
├── 2025-02-15-feature-implementation.md
├── 2025-02-16-bug-fix.md
└── README.md
```

**File format:** `YYYY-MM-DD-descriptive-name.md` (dated)

**Purpose:**
- Document implementation decisions
- Record changes and workarounds
- Chronological work logs

### decisions/

**Architecture Decision Records (ADRs):**

```
docs-internal/decisions/
├── 001-use-esbuild.md
├── 002-modular-css.md
└── README.md
```

**File format:** `NNN-descriptive-name.md` (numbered)

**Purpose:**
- Record formal architecture decisions
- Alternatives considered, trade-offs, rationale

### guides/

**Internal development guides:**

```
docs-internal/guides/
├── testing/
│   ├── 2025-02-15-unit-testing.md
│   └── 2025-02-16-integration-testing.md
├── deployment/
├── development/
├── debugging/
└── README.md
```

**File format:** `category/YYYY-MM-DD-guide-name.md` (dated, in category subfolder)

**Purpose:**
- How-to documentation
- Procedures
- Techniques

### references/

**Internal quick references:**

```
docs-internal/references/
├── documentation/
│   ├── system-overview.md
│   └── file-structure.md
├── api/
├── checklists/
├── shortcuts/
├── templates/
└── README.md
```

**File format:** `category/reference-name.md` (NO date - timeless)

**Purpose:**
- Quick lookups
- Cheat sheets
- Verification lists

### architecture/

**Internal architecture documentation:**

```
docs-internal/architecture/
├── logger/
│   └── 2025-02-14-logger-design.md
├── css-system/
├── ui/
├── build/
├── core/
└── README.md
```

**File format:** `component/YYYY-MM-DD-design-doc.md` (dated, in component subfolder)

**Purpose:**
- System design documentation
- Implementation details

---

## File Placement Rules (CRITICAL)

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

---

## File Naming Conventions

- **Session docs**: `YYYY-MM-DD-descriptive-name.md` (dated)
- **TODOs**: `YYYY-MM-DD-feature-name.md` (dated - creation date, preserved through lifecycle)
- **Tracking snapshots**: `YYYY-MM-DD-snapshot.md` (dated - snapshot date)
- **Decisions (ADRs)**: `NNN-descriptive-name.md` (numbered sequentially)
- **Guides**: `category/YYYY-MM-DD-guide-name.md` (dated, in category subfolder)
- **References**: `category/reference-name.md` (NO date - timeless, in category subfolder)
- **Architecture**: `component/YYYY-MM-DD-design-doc.md` (dated, in component subfolder)
- **All other docs**: `descriptive-name.md` (lowercase with hyphens)

---

## Examples

### ❌ WRONG

```
obsidian-plugin-template/
├── BUILD-SYSTEM-UPDATE.md          ❌ NO! (in root)
├── QUICK-REFERENCE.md              ❌ NO! (in root)
├── TESTING-PLAN.md                 ❌ NO! (in root)
├── DEBUG-ELIMINATION-GUIDE.md      ❌ NO! (in root)
├── CODING-BEST-PRACTICES.md        ❌ NO! (in root)
```

### ✅ RIGHT

```
obsidian-plugin-template/
├── README.md                                    ✅ Only this in root
├── LICENSE                                      ✅ License file
├── docs/
│   └── features/
│       └── debug-system/
│           └── elimination-guide.md             ✅ Public feature doc
└── docs-internal/
    ├── sessions/
    │   └── 2025-02-16-build-system-update.md   ✅ Private session doc
    ├── todos/
    │   └── planned/
    │       └── 2025-02-16-testing-strategy.md  ✅ Private TODO
    └── guides/
        └── development/
            └── 2025-02-16-coding-best-practices.md ✅ Private guide
```

---

## GitHub Pages Setup (Optional)

**If publishing docs/ to GitHub Pages:**

### _config.yml

**Location:** `docs/_config.yml`

```yaml
title: Your Plugin Name
description: Plugin description
theme: jekyll-theme-minimal

# Exclude internal docs
exclude:
  - internal/
  - _internal/

# Navigation
navigation:
  - title: Home
    url: /
  - title: User Guide
    url: /user/
  - title: Developer Guide
    url: /developer/
```

### Navigation Structure

```
https://yourusername.github.io/your-plugin/
├── /                          # docs/README.md
├── /user/                     # docs/user/
├── /developer/                # docs/developer/
├── /features/                 # docs/features/
└── /examples/                 # docs/examples/
```

---

## Cross-Referencing

**Every significant document should have a "Related Documentation" section:**

```markdown
## Related Documentation

**Origin** (What led to this):
- [ADR 001: Decision](../decisions/001-example.md) - Why we made this choice
- [Session: Implementation](../sessions/2025-02-16-example.md) - When we built it

**Implementation** (How to build this):
- [TODO: Feature](../todos/active/2025-02-16-feature.md) - Current work

**Usage** (How to use this):
- [Guide: How-to](../guides/testing/2025-02-16-howto.md) - Tutorial
- [Reference: Quick ref](../references/checklists/checklist.md) - Cheat sheet

**Details** (Technical info):
- [Architecture: Design](../architecture/logger/2025-02-16-design.md) - System design
```

---

## Summary

**Golden Rules:**

1. ✅ **Only README.md in root** (absolute rule)
2. ✅ **Public docs in docs/** (committed to GitHub)
3. ✅ **Private docs in docs-internal/** (gitignored, not committed)
4. ✅ **User docs in docs/user/** (for end users)
5. ✅ **Developer docs in docs/developer/** (for contributors)
6. ✅ **TODOs track all work** (see [TODO System](todo-system.md))
7. ✅ **Use decision tree** (before creating any .md file)
8. ✅ **Follow naming conventions** (dated vs timeless files)

**Benefits:**

- Clear separation of public vs private documentation
- Easy to find documentation (organized by type and purpose)
- Ready for GitHub Pages publishing (docs/ folder)
- Internal docs stay private (docs-internal/ gitignored)
- No clutter in root directory
