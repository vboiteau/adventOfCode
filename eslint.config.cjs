module.exports = [
  // Base config (applies to all files)
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.beads/**', 'history/**'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        sourceType: 'module',
      },
      ecmaVersion: 2022,
      globals: {
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {},
  },
  // Additional language options for TypeScript files (enable project-aware rules)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
      },
    },
  },
  {
    ignores: ['**/vitest.config.*.timestamp*'],
  },
];
