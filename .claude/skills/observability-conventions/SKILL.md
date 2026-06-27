---
name: observability-conventions
description: Use whenever emitting a product/analytics telemetry event from the app or funnel, or naming a new event/attribute. Encodes the event-name format, attribute taxonomy, PII/UID-hashing rules, and retention conventions so dashboards stay queryable and privacy-safe. Distinct from `cloud-function-logging` (operational logs); this skill is product telemetry. Privacy specifics for the eco-value vector live in `values-privacy`.
---

## STUB — not yet written

Author this skill once **the telemetry stack is chosen** (analytics provider / event sink). Writing it earlier would bake in guesses.

What it will encode:
- Event-name format (canonical casing, `domain.action` shape) shared across app + funnel.
- Attribute taxonomy: which standard attributes ride every event, naming, and types.
- PII and UID handling: hash user identifiers, never log raw emails/names; cross-reference `values-privacy` for special-category eco-value data.
- Retention windows per event class and where they're configured.
- Where event names/attributes are defined as shared constants so the two clients stay in lockstep.
