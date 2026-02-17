# Git Workflow

**Generic git conventions for all projects.**

---

## Commit Message Format

### Structure

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring (no feature change or bug fix)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, build, etc.)
- **plan**: Planning TODOs (specific to projects with TODO system)

### Examples

**Simple commit:**
```bash
git commit -m "feat: Add CSV parser for scientific data"
```

**Detailed commit:**
```bash
git commit -m "feat: Add CSV parser for scientific data

- Implement CSVParser class with papaparse
- Handle headers and data rows
- Add error handling for malformed CSV
- Include unit tests

Closes #123"
```

**Bug fix:**
```bash
git commit -m "fix: Handle empty CSV files correctly

Previously threw error on empty input.
Now returns empty ParsedDataFile structure."
```

**Documentation:**
```bash
git commit -m "docs: Add parser API documentation"
```

**Refactoring:**
```bash
git commit -m "refactor: Extract validation logic to utils

No functional changes, improves code organization."
```

---

## Commit Best Practices

### Do

✅ **Write clear, concise commit messages**
✅ **Use present tense** ("Add feature" not "Added feature")
✅ **Use imperative mood** ("Fix bug" not "Fixes bug")
✅ **Limit subject line to 50 characters**
✅ **Wrap body at 72 characters**
✅ **Separate subject from body with blank line**
✅ **Reference issues/TODOs in commit message**
✅ **Make atomic commits** (one logical change per commit)

### Don't

❌ **Don't commit broken code**
❌ **Don't use vague messages** ("Update stuff", "Fix things")
❌ **Don't commit generated files** (dist/, node_modules/)
❌ **Don't mix unrelated changes** in one commit
❌ **Don't commit sensitive data** (API keys, passwords)

---

## Branching Strategy

### Main Branches

- **`main`** - Production-ready code
- **`develop`** - Integration branch for features (optional)

### Feature Branches

```bash
# Create feature branch
git checkout -b feat/csv-parser

# Work on feature
git add .
git commit -m "feat: Implement CSV parser"

# Push to remote
git push origin feat/csv-parser

# Create pull request
# After review and merge, delete branch
git branch -d feat/csv-parser
```

### Branch Naming

```
feat/feature-name      # New features
fix/bug-description    # Bug fixes
docs/what-changed      # Documentation
refactor/what-changed  # Code refactoring
chore/task-description # Maintenance
```

---

## Pull Request Workflow

### Before Creating PR

- [ ] Code builds successfully
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] Code reviewed locally
- [ ] Commits are clean and logical
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Description
Brief description of changes

## Changes
- Change 1
- Change 2
- Change 3

## Testing
How to test these changes

## Related Issues
Closes #123
Related to #456
```

---

## Useful Git Commands

### Staging and Committing

```bash
# Stage specific files
git add file1.ts file2.ts

# Stage all changes
git add .

# Commit with message
git commit -m "feat: Add new feature"

# Amend last commit
git commit --amend

# Stage and commit
git commit -am "fix: Quick bug fix"
```

### Branching

```bash
# List branches
git branch

# Create new branch
git branch feat/new-feature

# Switch to branch
git checkout feat/new-feature

# Create and switch in one command
git checkout -b feat/new-feature

# Delete branch
git branch -d feat/new-feature
```

### Viewing History

```bash
# View commit history
git log

# Compact log
git log --oneline

# See changes in commits
git log -p

# Graph view
git log --graph --oneline --all
```

### Undoing Changes

```bash
# Discard unstaged changes
git checkout -- file.ts

# Unstage file
git reset HEAD file.ts

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert commit (creates new commit)
git revert abc1234
```

### Syncing

```bash
# Fetch latest from remote
git fetch origin

# Pull latest changes
git pull origin main

# Push local changes
git push origin feat/my-feature

# Push and set upstream
git push -u origin feat/my-feature
```

---

## Merge vs Rebase

### Merge (Recommended for most projects)

```bash
git checkout main
git merge feat/my-feature
```

**Pros:**
- Preserves complete history
- Non-destructive
- Easy to understand

**Cons:**
- Can create messy history with many merge commits

### Rebase (For clean history)

```bash
git checkout feat/my-feature
git rebase main
```

**Pros:**
- Creates linear history
- Cleaner commit log

**Cons:**
- Rewrites history (don't use on shared branches)
- Can be confusing for beginners

---

## .gitignore Best Practices

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
build/
*.js.map

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/

# Temporary
*.tmp
.cache/
```

---

## Git Hooks

### Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Run linter
npm run lint

# Run tests
npm test

# If either fails, prevent commit
if [ $? -ne 0 ]; then
    echo "Pre-commit checks failed. Fix errors before committing."
    exit 1
fi
```

### Using Husky (Recommended)

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm test",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

---

## Common Scenarios

### Fix Typo in Last Commit Message

```bash
git commit --amend -m "Corrected message"
```

### Add Forgotten File to Last Commit

```bash
git add forgotten-file.ts
git commit --amend --no-edit
```

### Split Large Commit

```bash
# Undo last commit, keep changes
git reset --soft HEAD~1

# Stage and commit in smaller chunks
git add file1.ts
git commit -m "feat: Add part 1"

git add file2.ts
git commit -m "feat: Add part 2"
```

### Clean Up Branch Before Merging

```bash
# Interactive rebase to squash/edit commits
git rebase -i HEAD~5

# Push force (only on feature branches!)
git push --force-with-lease
```
