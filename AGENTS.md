# AGENTS.md — Repo agent instructions

This repository uses Opencode as the agent runtime. It is _not_ configured for Claude.

Summary for AI agents and humans:

- Agent runtime: Opencode (see project-specific instructions in this file)
- Beads usage: This repo uses `bd` (beads) for issue tracking. See `.beads/BD_GUIDE.md` for canonical bd instructions.
- Approval policy: Follow the machine-wide AGENTS.md in your home directory. This repo does not require additional interactive approvals beyond the defaults.

Onboarding steps (for interactive agents):

1. Read `.beads/BD_GUIDE.md` for beads workflow and commands.
2. Respect the user's preference for Opencode. Do not attempt to configure Claude integrations.
3. For any action that modifies files outside the project root or touches system-level settings, request explicit approval.

Repository-specific guidance for Opencode agents:

- When creating or editing code files, follow existing TypeScript style and test patterns.
- Run unit tests locally before suggesting commits.
- Place ephemeral AI planning documents in `history/` (recommended by BD guide).

Contact the repo owner for further clarification.

**Testing & Linting**

- Install dependencies: run `npm ci` (prefer `nvm use` first if the repo uses an `.nvmrc`).
- Tests:
  - Run all tests once: `npm test` (runs `vitest --run`).
  - Run tests in watch mode: `npm run test:watch` (runs `vitest`).
  - Coverage: `npm run test:coverage`.
- Linting & formatting:
  - Run linter: `npm run lint` (runs `eslint .`).
  - Auto-fix lints: `npm run fix` (runs `eslint . --fix`).
  - Format code: `npm run format` (runs `prettier --write` on source/test files).
- Git hooks:
  - `prepare` script runs `husky install` so clones/installs set up hooks automatically.
  - Pre-commit: `.husky/pre-commit` runs `lint-staged`. `lint-staged` (configured in `package.json`) runs `prettier --write` then `eslint --fix` on staged `.ts`/`.js` files and re-stages them.
  - Pre-push: `.husky/pre-push` runs `npm test --silent` to prevent pushing failing tests.
- Where config lives:
  - Husky hooks: `.husky/`
  - lint-staged config: `package.json` (key: `lint-staged`)
  - Prettier config: `.prettierrc.js`
  - ESLint config: `eslint.config.cjs`
- Agent rules / recommendations:
  - Run `npm ci` and `npm test` after making dependency or test changes.
  - This workspace uses Nx for task orchestration. Prefer `nx` commands when available (for example, `nx test <project>` or `nx run-many --target=test --all`). Use `npm` scripts as a fallback.
  - Do not alter husky hooks or `.husky/` files without explicit approval from the repository owner.
  - Prefer failing early: ensure lint and tests pass locally before creating commits/PRs.
  - If changing lint rules or formatting config, run `npm run format` and fix any resulting changes in a dedicated commit.
