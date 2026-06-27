---
name: values-privacy
description: Use whenever storing, exposing, or processing the eco-value vector or any other special-category data. Encodes GDPR special-category handling for the value vector — consent, storage, and exposure rules. Reach for it on "show someone's values", "store the value vector", "consent", "GDPR", "can other users see X". Companion to `topical-questionnaire` (which produces the vector), `funnel-handoff` (which carries it), and `observability-conventions` (telemetry must not leak it).
---

## STUB — not yet written

Author this skill once **the data models are defined (see docs/architecture.md)**. Writing it earlier would bake in guesses.

What it will encode:
- The eco-value vector is GDPR special-category data: explicit consent before collection, and what consent state gates storage/processing.
- Storage rules: where the vector lives, who can read it (rules), and that it is never client-writable beyond the user's own derived state.
- Exposure rules: what (if anything) about a user's values is visible to other users, and how it's aggregated/anonymized before exposure.
- Telemetry/logging must never carry the raw vector (cross-reference `observability-conventions`).
- Deletion/export obligations on account deletion.
