# AGENTS.md — Repo agent instructions

This repository uses Opencode as the agent runtime. It is *not* configured for Claude.

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
