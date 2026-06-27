---
name: denormalized-read-model
description: Use whenever adding a denormalized field on a Firestore read model, or extending an existing one — to keep high-fan-out reads flat instead of issuing N+1 queries. Codifies the source-of-truth / trigger / read-model / backfill pattern. Companion to `add-firestore-collection` (if the read target is new), `cloud-function-logging` (the trigger's structured logs), and `firestore-deploy` (pushing the trigger + rules).
---

## STUB — not yet written

Author this skill once **the first read-model + Cloud Function trigger** exist. Writing it earlier would bake in guesses.

What it will encode:
- When to denormalize: hot read path, crosses a collection boundary, changes far less often than it's read, brief staleness acceptable.
- The four-part pattern: source-of-truth doc → `onDocumentUpdated` trigger that early-returns on unchanged fields → fanned-out read-model copies → one-time backfill script.
- Rules must forbid clients writing the denormalized fields; the trigger is the only writer.
- Backfill plan is mandatory — existing docs go inconsistent the moment the trigger ships.
- Document the read model in `_services-map.md` and the architecture doc.
