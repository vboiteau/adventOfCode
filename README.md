# Advent Of Code — Solutions

Personal repository of TypeScript solutions for Advent of Code problems.

**Prerequisites**

- Node.js (use `nvm` if available; prefer an LTS release).
- `npm` available in your PATH.

**Quickstart**

1. Install dependencies:
   - `npm ci`
2. Run the full test suite:
   - `npm test`
3. Run tests in watch mode while editing:
   - `npm run test:watch`
4. Run coverage:
   - `npm run test:coverage`

**Formatting & Linting**

- Format code with Prettier:
  - `npm run format`
- Run ESLint:
  - `npm run lint`
- Auto-fix lintable problems:
  - `npm run fix`

**Git hooks (Husky + lint-staged)**

- The `prepare` script installs Husky hooks automatically after `npm install`/`npm ci`.
- Pre-commit: `.husky/pre-commit` runs `lint-staged`, which formats staged `.ts`/`.js` files with Prettier and runs `eslint --fix` on them.
- Pre-push: `.husky/pre-push` runs `npm test --silent` to prevent pushing failing tests.

**Where config lives**

- Vitest config: `vitest.config.ts`
- ESLint config: `eslint.config.cjs`
- Prettier config: `.prettierrc.js`
- Husky hooks: `.husky/`
- lint-staged config: `package.json` (key: `lint-staged`)

**Running a single day's test**

- You can target a single test file with Vitest, for example:
  - `npx vitest run src/2023/19/test.ts`
  - or `npm test -- src/2023/19/test.ts`

**Notes for contributors**

- Ensure `npm ci` and `npm test` pass locally before opening PRs.
- Do not modify Husky hooks without discussing with the repository owner.

---

If you want, I can commit this README for you and open a PR.
