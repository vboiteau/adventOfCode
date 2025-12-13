module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.beads/**', 'history/**'],
    languageOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    settings: {},
    rules: {
      // keep a small baseline - match previous 'eslint:recommended' and typescript plugin behavior
      // TODO: expand ruleset as needed
    }
  }
]
