# Known Issues and Limitations

## Current Limitations

### Build System

- **CSS Watch Mode**: The `watch:css` script is not yet implemented
- **Source Maps**: Inline source maps only in dev mode, not in production

### Dependencies

- **Obsidian API**: Must match your Obsidian version
- **TypeScript**: Strict mode not fully enabled (see tsconfig.json)

## Workarounds

### CSS Changes During Development

Since CSS watch mode isn't implemented yet:
```bash
# Rebuild CSS after changes
npm run build:css

# Then copy to dev vault
npm run dev
```

### TypeScript Errors

Some minor TypeScript configuration warnings exist:
- `forceConsistentCasingInFileNames` not enabled
- Can be safely ignored for most use cases

## Reporting Issues

When you find an issue:

1. Check if it's already listed here
2. Check GitHub Issues
3. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, Obsidian version, Node version)

## Fixed Issues

### Version 0.1.0

- ✅ Initial release, no fixed issues yet

## Notes

- This is a template, not a full plugin
- Some example code is intentionally simple
- Customize everything for your use case
