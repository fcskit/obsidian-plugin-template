# Frequently Asked Questions

Common questions and answers about using plugins built with this template.

## Table of Contents

- [General Questions](#general-questions)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Performance](#performance)
- [Compatibility](#compatibility)

## General Questions

### What is this plugin?

This is a plugin built using the Obsidian Plugin Template, which provides a solid foundation for building Obsidian plugins with modern best practices, including fast builds, modular CSS, advanced logging, and comprehensive documentation.

### Do I need to know programming to use this?

No! This plugin is designed for end users. You only need to install it and configure it through the settings interface. No programming knowledge required.

### Is this plugin free?

Yes! Plugins built with this template are open source and free to use. Check the [LICENSE](../../../LICENSE) file for details.

### How do I support the plugin?

- ⭐ Star the repository on GitHub
- 📝 Report bugs and suggest features
- 🤝 Contribute code or documentation
- 💬 Share it with others who might find it useful

## Installation

### How do I install the plugin?

See the detailed [Installation Guide](../installation.md). The quickest method is:

1. Download the latest release from GitHub
2. Extract to `.obsidian/plugins/plugin-name/`
3. Enable in Obsidian settings

### Can I install it from the Community Plugins browser?

If the plugin has been submitted and approved by Obsidian, yes! Otherwise, use [BRAT](https://github.com/TfTHacker/obsidian42-brat) or manual installation.

### The plugin doesn't appear in my plugin list

**Check:**
- Files are in the correct location: `VaultName/.obsidian/plugins/plugin-name/`
- Required files exist: `main.js`, `manifest.json`, `styles.css`
- Manifest.json is valid JSON
- Restart Obsidian completely

### Can I use this on mobile?

Yes! Plugins built with this template work on both desktop and mobile versions of Obsidian (iOS and Android).

## Configuration

### Where do I find plugin settings?

Settings → Community plugins → [Plugin Name] → Settings (gear icon)

### My settings aren't saving

**Try:**
1. Check Obsidian has write permissions to vault folder
2. Close and reopen Obsidian
3. Check for errors in console (Ctrl/Cmd + Shift + I)
4. Report issue if problem persists

### Can I customize keyboard shortcuts?

Yes! 

1. Settings → Hotkeys
2. Search for plugin commands
3. Click to set custom hotkey
4. Confirm changes

### What do the different settings do?

Check the [Settings Guide](settings-guide.md) for detailed explanations of each setting.

## Usage

### How do I access plugin features?

**Command Palette:** Press `Ctrl/Cmd + P` and search for plugin commands.

**Ribbon Icon:** Click the plugin icon in the left sidebar (if enabled).

**Keyboard Shortcuts:** Use custom hotkeys you've configured.

**Context Menu:** Right-click for context-specific options (if applicable).

### The plugin isn't doing anything

**Check:**
1. Plugin is enabled: Settings → Community plugins
2. You're using the correct command
3. Check console for errors (Ctrl/Cmd + Shift + I)
4. Enable debug logging to see what's happening

### How do I enable debug logging?

1. Open plugin settings
2. Find "Enable debug logging" option
3. Toggle it ON
4. Check `debug-log.txt` in your vault root folder

**Remember:** Disable debug logging when not troubleshooting (performance impact).

### Can I use this with other plugins?

Yes! This plugin is designed to be compatible with other community plugins. If you encounter conflicts, please report them.

## Troubleshooting

### The plugin causes Obsidian to slow down

**Try:**
1. Disable debug logging (if enabled)
2. Check for conflicts with other plugins
3. Reduce frequency of background operations (in settings)
4. Report performance issues on GitHub

### I see error messages

**Steps:**
1. Note the exact error message
2. Enable debug logging
3. Check `debug-log.txt` in vault root
4. Search [GitHub Issues](https://github.com/your-repo/issues) for similar errors
5. Create new issue if not found, including:
   - Error message
   - Debug log
   - Steps to reproduce
   - Obsidian version
   - Plugin version

### Styles look broken

**Check:**
1. `styles.css` exists in plugin folder
2. Disable custom CSS snippets temporarily to test
3. Try disabling custom theme to test
4. Clear Obsidian cache: Settings → About → Clear cache
5. Restart Obsidian

### Plugin stopped working after update

**Try:**
1. Check you meet minimum Obsidian version requirement
2. Check [Release Notes](https://github.com/your-repo/releases) for breaking changes
3. Disable and re-enable the plugin
4. Try reinstalling the plugin
5. Report issue if problem persists

### Features work on desktop but not mobile

**Considerations:**
- Some features may be desktop-only (check documentation)
- Mobile has different file access permissions
- Mobile version may have different API limitations
- Check mobile-specific settings

## Performance

### Will this slow down Obsidian?

No! Plugins built with this template are optimized for performance:
- Debug code is eliminated in production builds
- Efficient build system produces small bundles
- No unnecessary background operations

### How large is the plugin?

Typical size: 55-170 KB total (main.js + styles.css)

This is very small and should not impact performance.

### Does it use a lot of memory?

No. The plugin is designed to be lightweight with minimal memory footprint.

### Can I reduce performance impact?

Yes:
1. Disable debug logging
2. Disable unused features (if configurable)
3. Reduce frequency of background operations
4. Report performance issues for optimization

## Compatibility

### What Obsidian version do I need?

Check `manifest.json` for `minAppVersion`. Typically requires Obsidian 1.0.0 or higher.

### Does it work on mobile?

Yes! Compatible with:
- iOS (Obsidian mobile)
- Android (Obsidian mobile)

### Does it work with my theme?

Yes! The plugin uses Obsidian's CSS variables, so it automatically adapts to your theme.

If you experience styling issues:
1. Check theme compatibility
2. Try with default theme to test
3. Report compatibility issues

### Does it work with other plugins?

Yes! Designed to be compatible with other community plugins.

Known incompatibilities:
- (None reported yet)

Report conflicts on [GitHub Issues](https://github.com/your-repo/issues).

### Which operating systems are supported?

All platforms supported by Obsidian:
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (various distributions)
- ✅ iOS (mobile)
- ✅ Android (mobile)

## Advanced

### Can I modify the plugin?

Yes! The plugin is open source. See the [Developer Documentation](../../developer/) for contribution guidelines.

### Where is data stored?

Plugin data is stored in your vault's `.obsidian/plugins/plugin-name/data.json` file.

### Is my data private?

Yes! All data stays in your local vault. The plugin does not send data anywhere.

### Can I backup plugin data?

Yes! Simply backup your entire vault, which includes `.obsidian/plugins/` folder.

### How do I reset plugin to defaults?

1. Disable the plugin
2. Delete `data.json` from plugin folder
3. Re-enable the plugin

Settings will reset to defaults.

## Getting More Help

### Documentation

- [Installation Guide](../installation.md)
- [Features Overview](../features.md)
- [User Guides](README.md)
- [Troubleshooting Guide](troubleshooting.md)

### Support

- [GitHub Issues](https://github.com/your-repo/issues) - Bug reports and feature requests
- [GitHub Discussions](https://github.com/your-repo/discussions) - Questions and community help
- Obsidian Discord - General plugin help

### Contributing

Found an answer that should be in this FAQ?

1. Edit this file
2. Submit a pull request
3. Help other users!

See [Contributing Guide](../../developer/README.md).

---

**Still have questions?** [Ask on GitHub Discussions](https://github.com/your-repo/discussions) or [create an issue](https://github.com/your-repo/issues).
