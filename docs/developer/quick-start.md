# Quick Start

Get up and running with the template in 5 minutes.

## 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/fcskit/obsidian-plugin-template.git
cd obsidian-plugin-template

# Install dependencies
npm install
```

## 2. Build the Plugin

```bash
# Development build (fast, includes debug)
npm run dev

# Production build (minified, debug eliminated)
npm run build
```

## 3. Test in Obsidian

The template includes a pre-configured test vault at `test-vault/`:

1. Open Obsidian
2. "Open another vault" → "Open folder as vault"
3. Select `obsidian-plugin-template/test-vault`
4. Enable community plugins if prompted
5. Plugin is automatically installed and ready to test

## 4. Try the Example

- Press `Cmd/Ctrl + P` → "Open Example Modal"
- Check Developer Console (`Cmd/Ctrl + Opt/Shift + I`)
- In dev build: See debug messages
- In production build: No debug messages

## 5. Start Building

Replace the example code in `src/` with your plugin logic:

- `src/main.ts` - Plugin entry point
- `src/ui/` - UI components and modals
- `src/utils/` - Utility functions

See [Developer Guide](README.md) for detailed information.

## Next Steps

- Read [Start Here](start-here.md) for comprehensive developer introduction
- Review [Feature Documentation](../features/README.md)
- Check [Known Issues](KNOWN-ISSUES.md)
- Explore [Roadmap](ROADMAP.md) for planned features

See detailed plan in TOMORROW-ACTION-PLAN.md if needed.
