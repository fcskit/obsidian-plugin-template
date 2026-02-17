# Versioning

**Version management for Obsidian plugins.**

---

## Version Files

### manifest.json

**Location:** Root directory

**Contains:**
```json
{
  "id": "your-plugin-id",
  "name": "Your Plugin Name",
  "version": "0.1.0",
  "minAppVersion": "1.0.0",
  "description": "Plugin description",
  "author": "Your Name",
  "authorUrl": "https://your-website.com",
  "isDesktopOnly": false
}
```

**Key fields:**
- **`version`**: Current plugin version (semantic versioning)
- **`minAppVersion`**: Minimum Obsidian version required

### versions.json

**Location:** Root directory

**Contains:**
```json
{
  "0.1.0": "1.0.0",
  "0.2.0": "1.0.0",
  "0.3.0": "1.1.0"
}
```

**Format:** `"plugin-version": "min-obsidian-version"`

**Purpose:**
- Tracks compatibility between plugin versions and Obsidian versions
- Used by Obsidian to determine if plugin can be installed
- Updated whenever minimum Obsidian version changes

---

## Semantic Versioning

### Format: MAJOR.MINOR.PATCH

**Examples:**
- `0.1.0` - Initial development
- `0.2.0` - New feature added
- `0.2.1` - Bug fix
- `1.0.0` - First stable release
- `2.0.0` - Breaking changes

### Version Number Rules

**During Pre-1.0 (0.x.x):**
- **MINOR**: New features, breaking changes OK
- **PATCH**: Bug fixes

**After 1.0:**
- **MAJOR**: Incompatible API changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

---

## Updating Versions

### Manual Update

**1. Edit manifest.json:**
```json
{
  "version": "0.2.0"  // Increment this
}
```

**2. Edit versions.json:**
```json
{
  "0.1.0": "1.0.0",
  "0.2.0": "1.0.0"    // Add new entry
}
```

**3. Commit changes:**
```bash
git add manifest.json versions.json
git commit -m "chore: Bump version to 0.2.0"
```

**4. Tag release:**
```bash
git tag 0.2.0
git push origin 0.2.0
```

### Automated Script

**Use version-bump.mjs:**

```bash
# Bump to specific version
npm run version -- 0.2.0

# What it does:
# 1. Updates manifest.json
# 2. Updates versions.json
# 3. Creates git commit
# 4. Creates git tag
```

**Note:** Verify script exists in your template. If not, use manual process.

---

## Version Bump Workflow

### For Minor/Major Releases

**1. Decide new version:**
```
Current: 0.1.0
New feature: 0.2.0
Breaking change: 0.3.0 (or 1.0.0 if stable)
```

**2. Update files:**
```bash
# Option A: Manual
# Edit manifest.json and versions.json

# Option B: Script (if available)
npm run version -- 0.2.0
```

**3. Update CHANGELOG.md:**
```markdown
## [0.2.0] - 2025-02-17

### Added
- New feature X
- New feature Y

### Changed
- Improved Z

### Fixed
- Bug in W
```

**4. Build and test:**
```bash
npm run build
# Test in Obsidian
```

**5. Commit and tag:**
```bash
git add .
git commit -m "chore: Release v0.2.0"
git tag 0.2.0
git push origin main
git push origin 0.2.0
```

**6. Create GitHub release:**
- Go to GitHub Releases
- Create new release
- Use tag 0.2.0
- Add changelog content
- Upload `plugin-name-0.2.0.zip` from `release/`

### For Patch Releases

**1. Fix bug:**
```
Current: 0.2.0
Bug fix: 0.2.1
```

**2. Update versions:**
```json
// manifest.json
"version": "0.2.1"

// versions.json (if min Obsidian version changed)
{
  "0.2.0": "1.0.0",
  "0.2.1": "1.0.0"  // Add if needed
}
```

**3. Update CHANGELOG:**
```markdown
## [0.2.1] - 2025-02-18

### Fixed
- Critical bug X
- Issue with Y
```

**4. Commit, tag, release:**
```bash
git commit -m "fix: Critical bug in feature X"
git tag 0.2.1
git push origin 0.2.1
```

---

## Minimum Obsidian Version

### When to Update minAppVersion

**Update when plugin requires:**
- New Obsidian API features
- Specific Obsidian version behavior
- Breaking changes in Obsidian

**Example:**
```json
// manifest.json
{
  "minAppVersion": "1.1.0"  // Changed from 1.0.0
}

// versions.json
{
  "0.2.0": "1.0.0",
  "0.3.0": "1.1.0"  // New plugin version requires Obsidian 1.1.0+
}
```

### Checking Obsidian Version

**In plugin code:**
```typescript
import { Platform } from 'obsidian';

// Check if running on desktop
if (Platform.isDesktopApp) {
  // Desktop-only features
}

// Check if running on mobile
if (Platform.isMobileApp) {
  // Mobile-only features
}
```

**Note:** Always test on both desktop and mobile if supported.

---

## Release Process

### Pre-Release Checklist

- [ ] Version bumped in `manifest.json`
- [ ] Entry added to `versions.json` (if min Obsidian version changed)
- [ ] CHANGELOG.md updated
- [ ] All tests passing
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] Plugin tested in Obsidian
- [ ] Tested on light and dark themes
- [ ] Documentation updated
- [ ] README.md updated (if needed)

### Creating Release

**1. Production build:**
```bash
npm run build
```

**2. Create release package:**
```bash
npm run release
```

**3. Verify release files:**
```bash
ls release/0.2.0/
# Should contain:
# - main.js
# - styles.css
# - manifest.json

ls release/
# Should contain:
# - plugin-name-0.2.0.zip
```

**4. Create git tag:**
```bash
git tag 0.2.0
git push origin 0.2.0
```

**5. Create GitHub release:**
- Go to GitHub → Releases → New Release
- Tag: `0.2.0`
- Title: `v0.2.0`
- Description: Copy from CHANGELOG.md
- Attach: `plugin-name-0.2.0.zip`
- Publish release

### For Community Plugins

**If submitting to Obsidian community plugins:**

1. **Fork obsidian-releases repo**
2. **Add entry to community-plugins.json:**
   ```json
   {
     "id": "your-plugin-id",
     "name": "Your Plugin Name",
     "author": "Your Name",
     "description": "Plugin description",
     "repo": "username/repo-name"
   }
   ```
3. **Create pull request**
4. **Wait for review and approval**

---

## Version Compatibility Matrix

### Example versions.json

```json
{
  "0.1.0": "1.0.0",     // Plugin 0.1.0 requires Obsidian 1.0.0+
  "0.2.0": "1.0.0",     // Plugin 0.2.0 requires Obsidian 1.0.0+
  "0.3.0": "1.1.0",     // Plugin 0.3.0 requires Obsidian 1.1.0+ (new API used)
  "1.0.0": "1.1.0",     // Plugin 1.0.0 stable, requires Obsidian 1.1.0+
  "1.1.0": "1.2.0"      // Plugin 1.1.0 uses newest APIs, requires Obsidian 1.2.0+
}
```

**Rule:** Always add entry when:
- Releasing new plugin version AND
- Minimum Obsidian version requirement changes

**Don't add entry if:**
- Minimum Obsidian version stays the same
- (Entry from previous version still applies)

---

## Breaking Changes

### Pre-1.0 (0.x.x)

**Breaking changes are OK:**
```markdown
## [0.3.0] - 2025-02-20

### ⚠️ BREAKING CHANGES

- Renamed command `create-note` to `new-note`
- Changed settings structure (re-configure settings after update)

### Migration Guide

1. Update any hotkeys using old command names
2. Reconfigure plugin settings in settings tab
```

**Why it's OK:**
- Version < 1.0 signals "unstable"
- Users expect potential breaking changes
- Document changes clearly

### Post-1.0

**Breaking changes require MAJOR version bump:**
```
1.2.3 → 2.0.0
```

**Example:**
```markdown
## [2.0.0] - 2025-03-15

### ⚠️ BREAKING CHANGES

- Removed deprecated API methods
- Changed data format (automatic migration on first load)

### Migration

Data will be automatically migrated on first load.
Backup your vault before updating.
```

---

## CHANGELOG Format

**Location:** `CHANGELOG.md` in root

**Format:**
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Work in progress

## [0.2.0] - 2025-02-17

### Added
- New feature X
- New feature Y

### Changed
- Improved Z

### Fixed
- Bug in W

### Deprecated
- Old API method (will be removed in 1.0.0)

## [0.1.0] - 2025-02-10

### Added
- Initial release
- Basic functionality
```

**Sections:**
- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security fixes

---

## Summary

**Version Files:**
- `manifest.json` - Plugin version and min Obsidian version
- `versions.json` - Compatibility matrix
- `CHANGELOG.md` - Human-readable changes

**Workflow:**
1. Bump version in `manifest.json`
2. Add entry to `versions.json` (if min version changed)
3. Update `CHANGELOG.md`
4. Build and test
5. Commit, tag, push
6. Create GitHub release
7. Upload zip file

**Semantic Versioning:**
- **0.x.x**: Pre-1.0 (breaking changes OK)
- **MAJOR**: Breaking changes (post-1.0)
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes
