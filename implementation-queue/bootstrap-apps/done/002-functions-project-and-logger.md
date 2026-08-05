---
type: HITL
plan: bootstrap-apps
blocked_by: []
---

# `functions` — Firebase Functions project + structured logger + no-console gate

## What to build
Scaffold `functions/` as an npm-managed (deliberately **not** a pnpm workspace member) Firebase
Cloud Functions project in TypeScript, exporting nothing yet.

- `package.json`, `tsconfig.json`, `.eslintrc.cjs`.
- `src/index.ts` — no functions exported yet.
- `src/lib/logger.ts` — the structured logger: `logger.info(msg, { handler, ...fields })`, with
  the `handler` field required by type, wrapping `firebase-functions/logger`.
- `no-console` ESLint rule wired into the build so a raw `console.*` **fails the build**, plus
  a test proving the gate actually fires.
- Emulator-friendly test setup (config only — agents never start the emulator).
- Rewrite `functions/AGENTS.md` to describe what exists.

## Why HITL
`functions/**` is a forbidden path for the AFK loop by construction — this directory is the
only writer of the economy, and the logger + build gate it establishes are conventions every
later function inherits. Worth a human read before they calcify.

## Acceptance criteria
- [ ] `npm --prefix functions run build` succeeds
- [ ] `npm --prefix functions run lint` fails on a `console.log` and passes without one
- [ ] The logger's `handler` field is required by the type signature, not by convention
- [ ] `firebase.json`'s existing `functions.source` still resolves
- [ ] No economy logic, no callables, no triggers — structure only

## Plan sections addressed
Slice 002 in `docs/plans/ready/bootstrap-apps.md`.

## Notes for the implementer
- Mirrors the sibling repos (ordago / cultuvilla) — match their logger shape if available.
- Companion skill: `cloud-function-logging` — its dependency (`functions/src/`) becomes real
  here, and this slice defines exactly what that skill will encode. Write it as a follow-up.
- Do **not** deploy. No `firebase deploy`, no GCP project setup.
