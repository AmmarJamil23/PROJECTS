import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.config.js"
    ],
  },

  // Global configuration for all JS files
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      
      // Custom rules
      "no-console": "off", // Allow console.log in Node.js
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-undef": "error",
      "prefer-const": "warn",
      "no-var": "error",
    },
  },

  // Separate configuration for test files (coming later)
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    rules: {
      "no-undef": "off", // Allow test globals like 'describe', 'it'
    },
  },
];