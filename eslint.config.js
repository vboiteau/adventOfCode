import { FlatCompat } from '@eslint/eslintrc'
import fs from 'fs'

// This file adapts existing .eslintrc.json to the new flat config format
const compat = new FlatCompat({})
let baseConfig = {}
try {
  baseConfig = JSON.parse(fs.readFileSync('./.eslintrc.json', 'utf8'))
} catch (e) {
  // ignore
}

export default [
  ...compat.extendOverrides(baseConfig.extends || []),
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.beads/**', 'history/**'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json']
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    rules: {}
  }
]
