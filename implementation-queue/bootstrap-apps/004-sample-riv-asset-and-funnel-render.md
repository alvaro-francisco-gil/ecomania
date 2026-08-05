---
type: HITL
plan: bootstrap-apps
blocked_by: ["003-funnel-nextjs-scaffold"]
---

# Sample `.riv` asset + funnel renders it via `@rive-app/react-canvas`

## What to build
Land the placeholder Rive asset both renderers will point at, and prove the web runtime works.

- `packages/shared/assets/avatar.sample.riv` — a **sourced** sample file (Rive community /
  the runtime's own examples), not the real avatar. Record its origin + licence in a sibling
  `packages/shared/assets/README.md`.
- Install `@rive-app/react-canvas` in `apps/funnel`.
- `apps/funnel/src/app/reveal/page.tsx` — renders the sample `.riv`. Placeholder page, no
  reveal UX design.

## Why HITL
Two reasons, either sufficient:
1. **An agent cannot author a `.riv`** — it is a binary produced in a proprietary GUI editor.
   Sourcing one means picking a file and accepting its licence: a human decision.
2. This is the first touch of the Rive integration path. The **input-name contract** in
   `packages/shared/src/avatar/` is HITL by construction (`rive-avatar-contract`); even though
   this slice must not create it, the boundary is close enough to want eyes on it.

## Acceptance criteria
- [ ] `avatar.sample.riv` committed with its origin + licence recorded
- [ ] `/reveal` renders the sample without runtime errors in a production build
- [ ] `pnpm --filter @ecomania/funnel build` still succeeds
- [ ] **No** input-name constants added to `packages/shared/src/avatar/` — the contract stays
      empty until the creative core defines archetypes and axes
- [ ] Nothing in this slice depends on the Rive **Cadet** plan — export is not needed to
      consume an already-exported sample (see `docs/rive-and-animation.md`)

## Plan sections addressed
Slice 003 (Rive portion) in `docs/plans/ready/bootstrap-apps.md`; `architecture.md` §4.

## Notes for the implementer
- Asset location is deliberate: one file, both renderers (`docs/rive-and-animation.md`).
  `apps/mobile` will point at this same path in slice 005.
- Companion skill: `rive-avatar-contract` — still a stub, still blocked on the creative core.
  Do not write it from this slice.
