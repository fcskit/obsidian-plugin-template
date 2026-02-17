# Developer Documentation# Onboarding Documentation



Welcome to the developer documentation for the Obsidian Plugin Template.Quick start guides and first steps for new developers.



## 📋 Contents## Getting Started



### Getting Started### Quick Start

- **[Quick Start](quick-start.md)** - Get up and running in 5 minutes- **[Quick Start Guide](quick-start.md)** - Get up and running quickly

- **[Start Here](start-here.md)** - Comprehensive introduction for new developers  - Installation

  - First build

### Project Information  - Testing in Obsidian

- **[Roadmap](ROADMAP.md)** - Project roadmap and version planning

- **[Known Issues](KNOWN-ISSUES.md)** - Known bugs and limitations### First Steps

- **[Start Here](start-here.md)** - Comprehensive introduction

### Feature Documentation  - Project overview

See [features/](../features/) for detailed feature-specific documentation:  - Key concepts

- Debug system - Code elimination and size optimization  - Development workflow

- Logger system - Tag-based filtering and component logging

- Build system - Build modes and compilation## Recommended Learning Path



## 🚀 Quick Start**For Complete Beginners:**

1. Read [Start Here](start-here.md) for project overview

1. **Install dependencies**:2. Follow [Quick Start](quick-start.md) for setup

   ```bash3. Review [Coding Best Practices](../developer/guides/coding-best-practices.md)

   npm install4. Check [Testing Checklist](../developer/references/testing-checklist.md)

   ```5. Explore [Feature Documentation](../features/)



2. **Build the plugin**:**For Experienced Developers:**

   ```bash1. Quick scan of [Start Here](start-here.md)

   npm run dev2. Run through [Quick Start](quick-start.md)

   ```3. Dive into [Architecture](../developer/architecture/) (when available)

4. Review [Coding Best Practices](../developer/guides/coding-best-practices.md)

3. **Test in Obsidian**:

   - Files are copied to `../obsidian-dev-vault/.obsidian/plugins/`## Key Resources

   - Reload plugin in Obsidian

- **Build Commands**: See [Quick Reference](../developer/references/quick-reference.md)

4. **Make changes**:- **Coding Standards**: See [Coding Best Practices](../developer/guides/coding-best-practices.md)

   - Edit files in `src/`- **Testing**: See [Testing Checklist](../developer/references/testing-checklist.md)

   - Run `npm run dev` again

   - Reload plugin## After Onboarding



## 📚 Key ResourcesOnce you're comfortable with the basics:

- Explore [Feature Documentation](../features/) to understand specific systems

### For Contributors- Read [Coding Session Notes](../sessions/) to see real-world examples

- Read [Quick Start](quick-start.md) for setup- Review [Maintenance Plans](../maintenance/) to see what's planned

- Check [Roadmap](ROADMAP.md) for current priorities

- Review [Known Issues](KNOWN-ISSUES.md) before reporting bugs## Getting Help



### For Understanding the CodeIf you encounter issues:

- Explore [Feature Documentation](../features/)1. Check relevant [Developer Guides](../developer/guides/)

- Check code examples in [examples/](../examples/) (when available)2. Search [Coding Sessions](../sessions/) for similar problems

- Read inline JSDoc comments in source code3. Review [Feature Documentation](../features/) for specific systems

4. Consult main [README](../../README.md) for contact info

## 🤝 Contributing

## Contributing

We welcome contributions! To get started:

Ready to contribute? Check:

1. Fork the repository- Current work in [Maintenance Plans](../maintenance/)

2. Create a feature branch- Coding standards in [Developer Guides](../developer/guides/)

3. Make your changes- Testing requirements in [References](../developer/references/)

4. Test thoroughly
5. Submit a pull request

### Code Quality Standards

This project follows strict coding standards:
- **File size limits**: 500 lines max per file
- **Strong typing**: No `any` types
- **Modular design**: Single responsibility principle
- **Error handling**: Explicit try-catch blocks
- **Documentation**: JSDoc comments on public APIs

See the source code and copilot instructions for detailed guidelines.

## 🐛 Reporting Issues

Before reporting an issue:
1. Check [Known Issues](KNOWN-ISSUES.md)
2. Search existing issues on GitHub
3. Try with the latest version
4. Test with default theme and no other plugins

When reporting:
- Describe expected vs actual behavior
- Provide steps to reproduce
- Include Obsidian version
- Attach relevant console logs

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check [user docs](../user/) for usage help

## 🗂️ Documentation Structure

```
docs/
├── user/              # User-facing documentation
├── developer/         # Developer documentation (you are here)
├── features/          # Feature-specific technical docs
└── examples/          # Code examples and demonstrations
```

All public documentation lives in `docs/`. Internal development notes are kept private in `docs-internal/` (not committed to GitHub).

## 🔄 Versioning

This project uses semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes

See [Roadmap](ROADMAP.md) for version planning.

## 📄 License

See [LICENSE](../../LICENSE) in the root directory.

---

**Last Updated**: February 16, 2026
