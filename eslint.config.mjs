import reactHooks from "eslint-plugin-react-hooks";
import sonarjs from "eslint-plugin-sonarjs";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["**/dist/**", "storybook-static/**", "**/node_modules/**"],
  },
  {
    ...reactHooks.configs.flat.recommended,
    files: ["packages/**/src/**/*.{ts,tsx}", ".storybook/**/*.{ts,tsx}"],
  },
  {
    files: ["packages/**/src/**/*.{ts,tsx}", ".storybook/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      sonarjs,
    },
    rules: {
      "sonarjs/cognitive-complexity": "error",
      "sonarjs/cyclomatic-complexity": "error",
      "sonarjs/expression-complexity": "warn",
      "sonarjs/regex-complexity": "warn",
      "@typescript-eslint/no-inferrable-types": "error",
    },
  },
]);
