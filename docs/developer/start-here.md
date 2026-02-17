# 🚀 Developer Start Guide

Welcome! This guide will get you from zero to building your first plugin feature.

## Prerequisites

- **Node.js** 16+ installed
- **Obsidian** installed
- **Git** (for version control)
- **Code editor** (VS Code recommended for TypeScript support)

## Step 1: Set Up the Project

```bash
# Clone the repository (or use it as a template on GitHub)
git clone https://github.com/fcskit/obsidian-plugin-template.git
cd obsidian-plugin-template

# Install dependencies
npm install

# Build the plugin
npm run dev
```

**Note**: `npm run dev` builds once. Use `npm run dev:watch` for automatic rebuilds (blocks terminal).

## Step 2: Open Test Vault in Obsidian

The template includes a pre-configured test vault with the plugin already installed.

1. **Open Obsidian**
2. **Click**: "Open another vault" (or File → Open vault)
3. **Click**: "Open folder as vault"
4. **Navigate to**: `obsidian-plugin-template/test-vault` (in your cloned directory)
5. **Click**: "Open"

## Step 3: Enable Community Plugins

1. **Go to**: Settings (gear icon)
2. **Navigate to**: Community plugins
3. **If needed**: Click "Turn on community plugins"
4. **Verify**: Both plugins are enabled:
   - ✅ obsidian-plugin-template
   - ✅ hot-reload

## Step 4: Open Developer Console

**Mac**: `Cmd + Option + I`
**Windows/Linux**: `Ctrl + Shift + I`

**Tab**: Console

## Step 5: Test the Plugin

### Quick Test
1. Press `Cmd + P` (or `Ctrl + P`)
2. Type: "Open Example Modal"
3. Press Enter
4. **Expected**: Modal opens with message
5. **Check Console**: Should see debug message

### Test Hot-Reload

**Option 1: Watch Mode (Auto-rebuild)**
1. Keep Obsidian open
2. In terminal: `npm run dev:watch` (starts watch mode)
3. Edit `src/main.ts` (change modal message)
4. Save file
5. **Expected**: Plugin auto-reloads in Obsidian
6. Test modal again - should show new message

**Option 2: Single Builds (AI-Friendly)**
1. Edit `src/main.ts` (change modal message)
2. Run `npm run dev`
3. In Obsidian: Press `Cmd+R` (or Ctrl+R) to reload
4. Test modal again - should show new message

## That's It! 🎉

You're now ready to develop with:
- ✅ Instant feedback (hot-reload)
- ✅ Full debug logging
- ✅ Component-based logs
- ✅ Tag-based filtering

## Need More Details?

See: [OBSIDIAN-TESTING-CHECKLIST.md](./OBSIDIAN-TESTING-CHECKLIST.md)

## Common Issues

**Plugins not showing?**
→ Make sure community plugins are enabled in Settings

**Hot-reload not working?**
→ Make sure `npm run dev` is running in watch mode

**No debug messages?**
→ Open developer console (Cmd+Option+I / Ctrl+Shift+I)

**Modal not opening?**
→ Check console for errors, try Cmd/Ctrl+R to reload Obsidian

## Next Steps

- **Build your plugin**: Replace example code with your own functionality
- **Explore features**: Check out the [Feature Documentation](../features/README.md)
- **Learn patterns**: Review the [Logger](../features/logger/tag-based-filtering.md) and [Debug System](../features/debug-system/code-elimination.md)
- **Customize**: Modify settings, add commands, create new modals
- **Deploy**: Follow the [Roadmap](ROADMAP.md) for release planning
