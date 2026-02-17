# Feature Documentation

Detailed documentation for specific features and systems in the plugin template.

## Feature Areas

### Debug System
Documentation for the debug code elimination system:
- **[Overview](debug-system/README.md)** - Debug system introduction *(coming soon)*
- **[Build Size Comparison](debug-system/build-size-comparison.md)** - Before/after size analysis
- **[Elimination Summary](debug-system/elimination-summary.md)** - How debug elimination works
- **[Code Elimination Guide](debug-system/code-elimination.md)** - Complete guide to debug code elimination
- **[Cleanup Guide](debug-system/cleanup-guide.md)** - Manual debug code cleanup process

### Logger System
Documentation for the logging system:
- **[Logger Overview](logger/README.md)** - Complete logger system guide
- **[Tag-Based Filtering](logger/tag-based-filtering.md)** - Advanced tag-based debug filtering

### Build System
Documentation for the build and compilation system:
- **[Build System Overview](build-system/README.md)** - Build modes, CSS compilation, and release management

## Purpose

Feature documentation provides:
- Detailed technical explanations
- Design decisions and rationale
- Implementation details
- Usage examples and patterns
- Performance characteristics

## Documentation Structure

Each feature area has its own subdirectory:

```
features/
├── debug-system/        Debug code elimination
├── logger/              Logging system
└── build-system/        Build and compilation
```

## Adding New Feature Documentation

When documenting a new feature:

1. **Create feature directory**: `features/feature-name/`
2. **Add overview**: `feature-name/README.md`
3. **Add specific docs**: Implementation details, examples, etc.
4. **Update this index**: Add link in appropriate section above
5. **Cross-reference**: Link from user docs if user-facing

## Related Documentation

- [Developer Guides](../developer/guides/) - Best practices
- [Architecture](../developer/architecture/) - System design
- [User Documentation](../user/) - User-facing features
