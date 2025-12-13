const { FlatCompat } = require('@eslint/eslintrc')
const fs = require('fs')

let baseConfig = {}
try {
  baseConfig = JSON.parse(fs.readFileSync('./.eslintrc.json', 'utf8'))
} catch (e) {
  baseConfig = {}
}

const compat = new FlatCompat()

module.exports = [
  // Extend legacy configs
  ...(baseConfig.extends ? compat.extends(baseConfig.extends) : []),
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
    rules: baseConfig.rules || {}
  }
]
