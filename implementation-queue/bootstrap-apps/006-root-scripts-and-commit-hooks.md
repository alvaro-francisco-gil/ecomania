---
type: AFK
plan: bootstrap-apps
blocked_by: ["001-shared-package-scaffold", "003-funnel-nextjs-scaffold"]
allowed_paths:
  - package.json
  - commitlint.config.cjs
  - .husky/**
  - scripts/**
forbidden_paths:
  - firestore.rules
  - firestore.indexes.json
  - functions/**
  - apps/mobile/app.json
  - apps/mobile/eas.json
  - eas.json
  - CHANGELOG.md
  - .github/workflows/**
  - scripts/deploy-*
  - scripts/admin-*
feedback_loop:
  - pnpm install
  - pnpm typecheck
  - pnpm lint
  - pnpm test
budget_iterations: 6
---

# Root tooling — workspace scripts + conventional-commit hooks

## What to build
Make the repo verifiable from the root in one command each.

- Root `package.json` scripts fanning out across workspaces: `typecheck`, `lint`, `test`,
  `build`. Keep the existing `ralph:once` / `ralph:afk` scripts untouched.
- commitlint (conventional commits: `feat` / `fix` / `refactor` / `test` / `docs` / `chore`)
  plus a husky `commit-msg` hook that enforces it.
- `functions/` is npm-managed and outside the pnpm workspace — the root scripts must either
  shell into it explicitly or skip it deliberately. Whichever you choose, make it explicit;
  do not let it silently fall out of coverage.

## Acceptance criteria
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm test` all pass from the repo root
- [ ] Each script covers every workspace that exists at the time it runs, and its treatment of
      `functions/` is explicit (covered or deliberately excluded with a comment saying why)
- [ ] A non-conventional commit message is rejected by the `commit-msg` hook
- [ ] `ralph:once` / `ralph:afk` still work
- [ ] No new top-level deps beyond commitlint + husky

## Plan sections addressed
Slice 005 (scripts + hooks portion) in `docs/plans/ready/bootstrap-apps.md`.

## Notes for the implementer
- If `apps/mobile` has not landed yet (slice 005 is HITL and may lag), the scripts must still
  pass — write them to tolerate a workspace that does not exist rather than hardcoding a list
  that breaks on ordering.
- Do not add `--no-verify` escapes anywhere (root AGENTS.md).
