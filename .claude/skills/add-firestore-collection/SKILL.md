---
name: add-firestore-collection
description: Use whenever adding a new Firestore collection to ecomania. Encodes the multi-file checklist (model + service + index re-export + services-map row + security rules + composite index + tests) so the change lands complete in one commit instead of trickling in over five. Companion to `touch-service` (subsequent edits), `denormalized-read-model` (when the collection copies fields owned elsewhere), `guardrail-enforcement` (writes that must be server-side), and `firestore-deploy` (pushing rules + indexes).
---

## STUB — not yet written

Author this skill once **the first Firestore collections** exist. Writing it earlier would bake in guesses.

What it will encode:
- The full single-commit checklist: model (schema as source of truth) + service + service index re-export + `_services-map.md` row + `firestore.rules` block + `firestore.indexes.json` composite index + service tests + rules tests.
- Path-shape decision: top-level vs. nested collection, and the scoping field convention.
- Rules must enforce both auth AND shape (the only defense against direct console writes that bypass typed services).
- Trust-sensitive or cross-user writes route to a Cloud Function callable, not the client service.
- Deploy note in the PR description (rules/indexes don't auto-propagate; indexes build asynchronously).
