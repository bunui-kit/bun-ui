# Bun UI Library

[![npm version](https://img.shields.io/npm/v/@bun-ui/react.svg)](https://www.npmjs.com/package/@bun-ui/react)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@bun-ui/react)](https://bundlephobia.com/package/@bun-ui/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Bun UI is a modern, lightweight, and customizable React component library designed to help developers build stunning and accessible user interfaces effortlessly. It provides a collection of reusable, responsive, and fully typed components that integrate seamlessly into your projects.

> [!CAUTION]
> This library is heavily under development. Expect bugs, breaking
> changes, and incomplete features as we work towards a stable release. Use at
> your own risk and feel free to contribute!

## 📦 Installation

To get started, install the package via your preferred package manager:

```bash
# Using npm
npm install @bun-ui/react

# Using pnpm
pnpm add @bun-ui/react

# Using yarn
yarn add @bun-ui/react
```

### Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
  }
}
```

## 🚀 Quick Start

```tsx
import { Button } from "@bun-ui/react"

function App() {
  return (
    <Button variant="filled" color="primary">
      Click me
    </Button>
  )
}
```

## ✨ Features

- **Lightweight**: Optimized for performance with minimal overhead.
- **Customizable**: Easily adaptable to your design system.
- **Responsive**: Designed with mobile-first principles.
- **Accessible**: Built with accessibility in mind to ensure inclusivity.
- **TypeScript Support**: Fully typed for a better developer experience.
- **Extensive Components**: Includes a variety of pre-built, reusable components.
- **Radix UI Primitives**: Built on top of Radix UI for consistent behavior and accessibility.

## 📚 Documentation

For detailed documentation and examples, visit the [Bun UI Documentation](https://bun-ui.com/docs).

## 💡 Open Code, Open Source

Bun UI is fully open source and designed with simplicity and developer freedom at its core. Many components are built using [@radix-ui](https://www.radix-ui.com/primitives) primitives, providing accessible and high-quality behavior while leaving styling and customization in your hands.

Need a custom version of a component? Simply copy the source from the library into your project directory and tweak it to fit your design or specific use case — no complicated overrides or internal coupling.

I believe great UI libraries should be transparent, flexible, and easy to extend.

## 🪪 License

Bun UI is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
