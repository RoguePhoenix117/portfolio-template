# Contributing to Portfolio Template

Thank you for your interest in contributing to this portfolio template! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a suggestion for improvement:

1. Check if the issue already exists
2. Create a new issue with a clear title and description
3. Include steps to reproduce (for bugs)
4. Add screenshots if applicable

### Suggesting Features

We welcome feature suggestions! Please:

1. Check existing issues first
2. Create a new issue with the "enhancement" label
3. Describe the feature and its benefits
4. Explain how it would work

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed
4. **Test your changes**:
   ```bash
   pnpm dev
   pnpm build
   pnpm lint
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📋 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing naming conventions
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Use Prettier for code formatting

### Component Guidelines

- Keep components small and focused
- Use proper TypeScript interfaces
- Add proper error handling
- Make components accessible
- Test on different screen sizes

### File Organization

- Keep related files together
- Use descriptive folder names
- Follow the existing structure
- Don't create unnecessary nested folders

## 🧪 Testing

Before submitting a PR, please:

- [ ] Test on desktop and mobile
- [ ] Check all pages load correctly
- [ ] Verify forms work properly
- [ ] Test blog functionality
- [ ] Check for console errors
- [ ] Run the linter: `pnpm lint`
- [ ] Build successfully: `pnpm build`

## 📝 Documentation

When adding new features:

- Update the README if needed
- Add comments to complex code
- Update the BLOG_GUIDE.md if blog features change
- Include examples in your PR description

## 🎨 Design Guidelines

- Maintain the existing design system
- Use Tailwind CSS classes consistently
- Ensure responsive design
- Follow accessibility best practices
- Keep the UI clean and professional

## 🚀 Release Process

Releases are managed by the maintainers. When your PR is approved:

1. It will be merged into the main branch
2. A new release will be created
3. The template will be updated
4. Contributors will be credited

## 💡 Ideas for Contributions

- **New Components**: Add reusable UI components
- **Blog Features**: Enhance the blog system
- **Performance**: Optimize loading and rendering
- **Accessibility**: Improve screen reader support
- **Documentation**: Improve guides and examples
- **Themes**: Add dark mode or color schemes
- **Animations**: Add smooth transitions
- **SEO**: Improve search engine optimization

## ❓ Questions?

If you have questions about contributing:

- Open a discussion in the GitHub repository
- Check existing issues and discussions
- Contact the maintainers

## 🙏 Thank You

Thank you for contributing to this project! Your contributions help make this template better for everyone.

---

**Happy coding!** 🚀
