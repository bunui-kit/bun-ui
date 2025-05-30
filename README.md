# Bun UI Library

[![npm version](https://img.shields.io/npm/v/@bun-ui/react.svg)](https://www.npmjs.com/package/@bun-ui/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

Bun UI is a modern React component library that offers both Tailwind CSS integration and standalone usage. Built with accessibility in mind and designed for flexibility, it provides a collection of reusable, responsive, and fully typed components that adapt to your workflow.

> [!CAUTION]
> This library is heavily under development. Expect bugs, breaking
> changes, and incomplete features as we work towards a stable release. Use at
> your own risk and feel free to contribute!

## 🚀 Quick Start

```bash
# Using npm
npm install @bun-ui/react

# Using pnpm
pnpm add @bun-ui/react

# Using yarn
yarn add @bun-ui/react
```

### With Tailwind CSS (Recommended)

```scss
/* global.css or main.css */

@import "tailwindcss";
@import "tw-animate-css";

/* Replace with your correct path to the package */
@import "../../node_modules/@bun-ui/react/dist/theme.css" layer(base); 

@source "../../node_modules/@bun-ui/react/dist/";
```

## ✨ Features

- **Flexible Styling**:
  - Seamless Tailwind CSS integration
  - Pre-built styles for non-Tailwind projects
  - Component-specific style imports

- **Modern Development**:
  - Full TypeScript support
  - Minimal configuration
  - Clear, consistent API

- **Accessibility First**: Built with Radix UI primitives for robust keyboard navigation and screen reader support

- **Lightweight**: Optimized for performance with minimal overhead

- **Customizable**: Easily adaptable to your design system

- **Extensive Components**: A growing collection of pre-built, reusable components

## 📚 Documentation

For detailed documentation and examples, visit the [Bun UI Documentation](https://bun-ui.com/docs).

## 💡 Open Code, Open Source

Bun UI is fully open source and designed with simplicity and developer freedom at its core. Many components are built using [@radix-ui](https://www.radix-ui.com/primitives) primitives, providing accessible and high-quality behavior while leaving styling and customization in your hands.

Need a custom version of a component? Simply copy the source from the library into your project directory and tweak it to fit your design or specific use case — no complicated overrides or internal coupling.

## 🏗️ Project Structure

```
bun-ui/
├── apps/
│   └── www/          # Documentation site
├── packages/
│   └── react/        # React component library
└── packages/
    └── tailwind/     # Tailwind CSS configuration
```

## 🤝 Contributing

Contributors are welcomed! For contribution guidelines, please refer to the [Contributing Guide](./CONTRIBUTING.md) file.

## 🪪 License

Bun UI is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
