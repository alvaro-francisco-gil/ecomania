---
type: HITL
plan: bootstrap-apps
blocked_by: ["006-root-scripts-and-commit-hooks"]
---

# CI — typecheck + lint + test on PRs to `main`

## What to build
`.github/workflows/ci.yml` running `pnpm install` then the three root gates
(`typecheck`, `lint`, `test`) on pull requests targeting `main`, plus the `functions/` npm
build if slice 002 has landed.

## Why HITL
`.github/workflows/**` is on the standing forbidden-path list. CI config is the thing that
decides what "green" means for every future change, and a workflow file is also a credential
surface — it gets human eyes.

## Acceptance criteria
- [ ] Runs on PRs to `main`; caches the pnpm store
- [ ] Fails if any of typecheck / lint / test fails
- [ ] No secrets referenced beyond what the gates genuinely need (they need none)
- [ ] Does not deploy anything — no `firebase deploy`, no EAS build
- [ ] Node + pnpm versions pinned to match `packageManager` in the root `package.json`

## Plan sections addressed
Slice 005 (CI portion) in `docs/plans/ready/bootstrap-apps.md`.

## Notes for the implementer
- Deploys stay out of CI for now. Per `firestore-deploy`, dev deploys are a local, deliberate
  action and beta/prod belong to a separate pipeline that does not exist yet.
