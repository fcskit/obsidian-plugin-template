# Installation Guide

This guide covers how to install and set up plugins built with this template.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [From GitHub Releases](#from-github-releases)
  - [Using BRAT](#using-brat)
  - [Manual Installation](#manual-installation)
- [Configuration](#configuration)
- [Updating](#updating)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing, ensure you have:

- ✅ **Obsidian** v1.0.0 or higher installed
- ✅ **Community plugins enabled** in Obsidian settings
- ✅ Basic familiarity with Obsidian's interface

## Installation Methods

### From GitHub Releases

**Recommended for most users**

1. **Download the plugin**
   - Go to the [Releases page](https://github.com/your-repo/releases)
   - Download the latest `plugin-name-x.x.x.zip` file

2. **Extract to plugins folder**
   ```bash
   # Navigate to your vault's plugins folder
   cd /path/to/your/vault/.obsidian/plugins/
   
   # Extract the zip file
   unzip ~/Downloads/plugin-name-x.x.x.zip -d plugin-name/
   ```

3. **Enable the plugin**
   - Open Obsidian Settings
   - Navigate to **Community plugins**
   - Find the plugin in the list
   - Toggle it **ON**

4. **Verify installation**
   - Check that the plugin appears in your plugin list
   - Open the plugin settings to configure

### Using BRAT

**For beta testing and development versions**

[BRAT (Beta Reviewers Auto-update Tool)](https://github.com/TfTHacker/obsidian42-brat) allows you to install and auto-update plugins from GitHub.

1. **Install BRAT**
   - Open Obsidian Settings → Community plugins
   - Search for "BRAT" and install it
   - Enable BRAT

2. **Add the plugin**
   - Open BRAT settings
   - Click **Add Beta plugin**
   - Enter the GitHub repository URL: `https://github.com/your-repo`
   - Click **Add Plugin**

3. **Enable the plugin**
   - Go to Community plugins
   - Find the plugin and toggle it ON

**Benefits of BRAT:**
- ✅ Automatic updates when new versions are released
- ✅ Easy testing of development versions
- ✅ One-click installation

### Manual Installation

**For developers and advanced users**

1. **Clone the repository**
   ```bash
   cd /path/to/your/vault/.obsidian/plugins/
   git clone https://github.com/your-repo.git plugin-name
   cd plugin-name
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the plugin**
   ```bash
   npm run build
   ```

4. **Enable in Obsidian**
   - Restart Obsidian or reload plugins (Ctrl/Cmd + R)
   - Go to Settings → Community plugins
   - Find the plugin and enable it

**Development mode:**
```bash
# For active development with manual reload
npm run dev

# Watch CSS changes
npm run watch:css
```

## Configuration

After installation, configure the plugin:

1. **Open plugin settings**
   - Settings → Community plugins → [Plugin Name] → Settings (gear icon)

2. **Configure basic settings**
   - Review and adjust default settings
   - Configure keyboard shortcuts if desired

3. **Test the plugin**
   - Try out the basic features
   - Check that everything works as expected

### Important Settings

**Logging (for troubleshooting):**
- Enable debug logging if you encounter issues
- Logs are written to `debug-log.txt` in your vault root
- Remember to disable debug logging in production

**Performance:**
- Adjust settings based on vault size
- Disable features you don't need

## Updating

### From GitHub Releases

1. Download the latest release zip
2. Extract to your plugins folder (overwrite existing files)
3. Restart Obsidian

### Using BRAT

BRAT automatically checks for updates:
- Updates are downloaded automatically
- Enable "Auto-update plugins at startup" in BRAT settings
- Manual update: BRAT settings → Check for updates

### Manual Installation

```bash
cd /path/to/your/vault/.obsidian/plugins/plugin-name
git pull origin main
npm install
npm run build
```

Then restart Obsidian or reload plugins.

## Troubleshooting

### Plugin doesn't appear in list

**Solution:**
1. Verify plugin files are in correct location:
   ```
   YourVault/.obsidian/plugins/plugin-name/
   ├── main.js
   ├── manifest.json
   └── styles.css
   ```

2. Check that `manifest.json` is valid JSON
3. Restart Obsidian completely (quit and reopen)

### Plugin won't enable

**Solution:**
1. Check Obsidian console for errors (Ctrl/Cmd + Shift + I)
2. Verify you're using compatible Obsidian version
3. Disable conflicting plugins
4. Try reinstalling the plugin

### Plugin causes errors

**Solution:**
1. Enable debug logging in plugin settings
2. Check `debug-log.txt` in vault root
3. Check Obsidian console (Ctrl/Cmd + Shift + I)
4. Report issue on GitHub with:
   - Error message
   - Steps to reproduce
   - Obsidian version
   - Plugin version

### Styles not loading

**Solution:**
1. Verify `styles.css` exists in plugin folder
2. Check for CSS snippet conflicts
3. Try disabling custom themes temporarily
4. Clear Obsidian cache (Settings → About → Clear cache)

### Performance issues

**Solution:**
1. Disable debug logging
2. Reduce frequency of background operations
3. Disable unused features
4. Check for conflicts with other plugins

## Uninstallation

To remove the plugin:

1. **Disable the plugin**
   - Settings → Community plugins
   - Toggle plugin OFF

2. **Delete plugin files**
   ```bash
   rm -rf /path/to/vault/.obsidian/plugins/plugin-name
   ```

3. **Restart Obsidian**

**Note:** This removes the plugin but preserves your vault data. Plugin-specific data may remain in `.obsidian/` folder.

## Getting Help

If you encounter issues:

1. Check the [FAQ](guides/faq.md)
2. Review [Troubleshooting](#troubleshooting) section above
3. Search [GitHub Issues](https://github.com/your-repo/issues)
4. Create a new issue with detailed information

## Next Steps

- Read the [Features Guide](features.md) to learn what the plugin can do
- Browse [Guides](guides/) for tutorials
- Check [Examples](../examples/) for code samples

---

**Last Updated:** February 2026  
**Obsidian Version:** 1.0.0+  
**Plugin Version:** See [Releases](https://github.com/your-repo/releases)
