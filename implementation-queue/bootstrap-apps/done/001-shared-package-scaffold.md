---
type: AFK
plan: bootstrap-apps
blocked_by: []
allowed_paths:
  - packages/shared/**
  - pnpm-workspace.yaml
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
  - packages/shared/assets/**
feedback_loop:
  - pnpm install
  - pnpm --filter @ecomania/shared typecheck
  - pnpm --filter @ecomania/shared test
  - pnpm --filter @ecomania/shared build
budget_iterations: 6
---

# `packages/shared` — TypeScript project scaffold

## What to build
Turn `packages/shared/` from five empty directories into a buildable, testable TypeScript
package published to the workspace as `@ecomania/shared`. Everything it exports is a
**placeholder barrel** — this slice creates the shape, not the content.

- `package.json` (name `@ecomania/shared`, `typecheck` / `test` / `build` scripts), `tsconfig.json`
  (strict), `vitest.config.ts`.
- `src/index.ts` re-exporting the five sub-barrels: `models`, `services`, `avatar`, `values`,
  `economy`. Each sub-barrel is an `index.ts` that exports nothing yet and carries a one-line
  `TBD — see docs/architecture.md §10` note.
- `src/services/_services-map.md` — seeded with the format it will be maintained in (one row
  per service: collection, exported functions, consumers). Empty table for now.
- `test/smoke.test.ts` — proves the vitest harness runs and the barrel imports resolve.
- Rewrite `packages/shared/AGENTS.md` to describe what now exists, dropping the "mostly empty
  for now" framing while keeping the three-contracts (`avatar` / `values` / `economy`) rule.

## Acceptance criteria
- [ ] `pnpm --filter @ecomania/shared typecheck` passes under `strict: true`
- [ ] `pnpm --filter @ecomania/shared test` runs and the smoke test passes
- [ ] `pnpm --filter @ecomania/shared build` emits types + JS consumable by both apps
- [ ] `src/index.ts` resolves all five sub-barrels; no sub-barrel invents a product type
- [ ] `_services-map.md` exists with its own format documented at the top
- [ ] No silent fallbacks introduced (AGENTS.md)
- [ ] No new top-level deps beyond typescript + vitest

## Plan sections addressed
Slice 001 in `docs/plans/ready/bootstrap-apps.md`.

## Notes for the implementer
- This package is consumed by **both** apps and mirrored by `functions/` — the build output
  must work for a Next.js app and a Metro bundler. Prefer plain ESM + `.d.ts`, no bundler-only tricks.
- Do **not** create anything under `packages/shared/assets/` — the sample `.riv` is slice 004
  and requires a human to source the binary.
- Do **not** populate `src/avatar/` with input-name constants. Those are the Rive contract and
  are HITL by construction (see `rive-avatar-contract`).
- Companion skill: `touch-service` — its dependency (`src/services/`) becomes real here, so
  flag in the final message that the stub is now writable.
