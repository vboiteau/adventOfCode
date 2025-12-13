const { FlatCompat } = require('@eslint/eslintrc')
const fs = require('fs')

let baseConfig = {}
try {
  baseConfig = JSON.parse(fs.readFileSync('./.eslintrc.json', 'utf8'))
} catch (e) {
  baseConfig = {}
}

const compat = new FlatCompat({})

module.exports = [
  ...compat.compatConfig(baseConfig),
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.beads/**', 'history/**'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json']
      }
    }
  }
]
