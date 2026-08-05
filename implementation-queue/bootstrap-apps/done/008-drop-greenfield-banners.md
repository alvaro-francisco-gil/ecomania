---
type: AFK
plan: bootstrap-apps
blocked_by:
  - "001-shared-package-scaffold"
  - "002-functions-project-and-logger"
  - "003-funnel-nextjs-scaffold"
  - "005-mobile-expo-scaffold"
  - "006-root-scripts-and-commit-hooks"
allowed_paths:
  - AGENTS.md
  - README.md
  - docs/plans/ideas/agentic-skills-backlog.md
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
  - docs/architecture.md
  - docs/plans/ready/**
feedback_loop:
  - pnpm typecheck
  - pnpm test
budget_iterations: 4
---

# Drop the greenfield banners; mark the newly unblocked skills

## What to build
The repo is no longer greenfield — the docs must stop saying it is. This slice is documentation
truth-maintenance, run last.

- `AGENTS.md`: remove the "Status: greenfield / apps are not scaffolded yet" banner and the
  "How this repo bootstraps itself" section. Fill in the `## Tests` section with the harnesses
  that now actually exist. Update the Layout list to drop every "_Not scaffolded yet._".
- `README.md`: same — drop the "_Not scaffolded yet._" markers and the greenfield paragraph.
- `docs/plans/ideas/agentic-skills-backlog.md`: move every skill whose **structure** dependency
  now exists out of the pending table and into a "ready to write" list. Do **not** write the
  skills themselves — that is separate work, each deserving its own review.

## Acceptance criteria
- [ ] No file in the repo still claims the apps are not scaffolded
- [ ] `AGENTS.md` `## Tests` describes the real harnesses, not "TBD"
- [ ] The skills backlog distinguishes *structure-unblocked* from *still blocked on models*
- [ ] The six ⭐ / models-pending skills stay listed as blocked — the creative core is still open
- [ ] `docs/architecture.md` §10 is **not** edited; those questions remain genuinely open

## Plan sections addressed
Slice 005 (docs portion) in `docs/plans/ready/bootstrap-apps.md`.

## Notes for the implementer
- Verify each claim before deleting a banner: grep that the directory really has a
  `package.json` and a passing build. Do not remove a "not scaffolded yet" marker for a
  workspace that did not actually land — slice 005 is HITL and may still be pending.
- After this lands, the parent plan is ready to retire via `managing-plans-lifecycle` (extract
  any durable rationale to `docs/decisions/`, then delete the plan file).
