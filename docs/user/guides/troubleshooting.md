# Troubleshooting Guide

Comprehensive guide to diagnosing and fixing common issues with plugins built using this template.

## Table of Contents

- [Quick Diagnostics](#quick-diagnostics)
- [Installation Issues](#installation-issues)
- [Plugin Won't Enable](#plugin-wont-enable)
- [Runtime Errors](#runtime-errors)
- [Performance Problems](#performance-problems)
- [Styling Issues](#styling-issues)
- [Data Issues](#data-issues)
- [Platform-Specific Issues](#platform-specific-issues)
- [Reporting Bugs](#reporting-bugs)

## Quick Diagnostics

Before diving into specific issues, run these quick checks:

### 1. Check Plugin is Enabled
```
Settings → Community plugins → [Plugin Name] → Toggle ON
```

### 2. Check Obsidian Version
```
Settings → About → App version
```
Minimum required: v1.0.0 (check `manifest.json` for specific requirement)

### 3. Check Plugin Version
```
Settings → Community plugins → [Plugin Name] → Version number
```

### 4. Check Console for Errors
```
Ctrl/Cmd + Shift + I → Console tab
```
Look for red error messages.

### 5. Enable Debug Logging
```
Plugin Settings → Enable debug logging
Check: VaultRoot/debug-log.txt
```

## Installation Issues

### Plugin Doesn't Appear in List

**Symptoms:**
- Plugin installed but not visible in Community plugins list

**Causes & Solutions:**

**1. Files in wrong location**
```bash
# Correct location:
VaultName/.obsidian/plugins/plugin-name/
├── main.js
├── manifest.json
└── styles.css
```

**2. Missing required files**
- Ensure `main.js`, `manifest.json`, and `styles.css` all exist
- Download complete release package

**3. Invalid manifest.json**
```bash
# Validate JSON:
cat manifest.json | python -m json.tool
```

**4. Obsidian needs restart**
- Quit Obsidian completely (not just close window)
- Reopen vault

## Plugin Won't Enable

### Toggle Turns Off Immediately

**Diagnosis:**
```javascript
// Open console (Ctrl/Cmd + Shift + I)
// Look for errors when toggling
```

**Common Causes:**

1. Syntax error in plugin code - Update to latest version
2. Missing dependencies - For dev: `npm install && npm run build`
3. Incompatible Obsidian version - Check `manifest.json` → `minAppVersion`
4. Conflicting plugin - Disable other plugins one by one

## Runtime Errors

### Plugin Causes Crashes

**Immediate Fix:**
```
Safe mode:
1. Hold Ctrl/Cmd while opening vault
2. Opens without plugins
3. Disable problematic plugin
4. Restart normally
```

## Performance Problems

### Obsidian Running Slowly

**Solutions:**

1. **Disable debug logging:**
   - Plugin Settings → Disable "Enable debug logging"

2. **Reduce operation frequency:**
   - Check settings for update intervals

3. **Disable unused features:**
   - Turn off optional features

## Styling Issues

### Styles Not Loading

**Checks:**

1. Verify `styles.css` exists in plugin folder
2. Clear cache: Settings → About → Clear cache
3. Disable CSS snippets temporarily
4. Test with default theme

## Reporting Bugs

When reporting bugs, include:

- Obsidian version
- Plugin version  
- Operating system
- Steps to reproduce
- Debug log (if applicable)
- Console errors

[Create new issue](https://github.com/your-repo/issues/new)

---

**More details:** See full troubleshooting sections above or check [FAQ](faq.md).
