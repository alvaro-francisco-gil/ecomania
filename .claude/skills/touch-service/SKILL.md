---
name: touch-service
description: Procedure for adding, changing, or removing exports in `packages/shared/src/services/` — the single owner of Firestore access in client code (app + funnel). Use whenever a task adds a query/mutation, changes a service's return shape, or moves logic between a service and a Cloud Function. Encodes the grep-callers-first, models-first, backend-boundary, and services-map conventions that aren't visible from grep alone. Companion to `add-firestore-collection` (new collection), `guardrail-enforcement` (server-side writes), and `firestore-deploy` (index changes). See [AGENTS.md](../../../AGENTS.md) for the service-ownership rule.
---

## STUB — not yet written

Author this skill once **`packages/shared/src/services/`** exists. Writing it earlier would bake in guesses.

What it will encode:
- The service layer is the sole owner of Firestore access in both clients; Firebase imports live only in services.
- Grep all call sites before changing an export (`git grep -n 'fnName(' apps/ packages/`) — the file you edit is one of N.
- Models-first: input/return shapes come from `packages/shared/src/models/`; never widen a service signature with an inline shape.
- Backend boundary rules: cross-user writes, denormalized aggregates, and trust-sensitive state (XP/level/value vector, role grants) belong in Cloud Functions, not the client service.
- Banner-section file style, strict types on every export, no `any` at boundaries.
- No silent fallbacks — return `null`/`[]` intentionally or throw; never paper over a Firestore failure.
- Services-map (`_services-map.md`) upkeep: add/update the row in the same commit so future sessions can find the service.
