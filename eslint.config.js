import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'build/**', '**/*.min.js'],
  },

  js.configs.recommended,

  // Browser source
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'smart'],
      'object-shorthand': 'warn',
      'prefer-template': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],
    },
  },

  // Build tooling and config files run in Node
  {
    files: ['*.config.js', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Must stay last so formatting rules defer to Prettier
  prettier,
];
