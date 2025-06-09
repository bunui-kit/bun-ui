import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import { globalIgnores } from "eslint/config"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended"
  ),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "warn",
    },
  },
  globalIgnores([
    "**/.velite/**",
    "node_modules",
    "**/dist/**",
    "build",
    "coverage",
    "out",
    "lib",
    "es",
    "**/*.test.ts",
  ]),
]

export default eslintConfig
