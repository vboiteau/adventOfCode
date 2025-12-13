module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.beads/**', 'history/**'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    env: { node: true, es2022: true },
    plugins: { 'vitest': require('vitest') },
    settings: {},
    rules: {}
  }
]
