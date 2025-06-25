import eslint from "@eslint/js"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import { defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig([
  eslintPluginPrettierRecommended,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "warn",
    },
  },
  globalIgnores([
    "node_modules",
    "**/dist/**",
    "build",
    "coverage",
    "out",
    "lib",
    "es",
    "**/*.test.ts",
    "**/.velite/**",
    "**/tsup.config.ts",
    "**/CHANGELOG.md",
  ]),
])
