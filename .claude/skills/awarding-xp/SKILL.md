---
name: awarding-xp
description: Use whenever code grants XP, recomputes a level, or touches the XP economy in any way. Encodes the server-authoritative rule — XP is awarded ONLY via a Cloud Function callable, with an idempotency key per action and a daily-cap check against the `xpEvents` ledger; clients NEVER write xp or level. Reach for it on "award XP", "level up", "daily cap", "eco-action reward". Companion to `guardrail-enforcement` (the callable pattern) and `topical-questionnaire` (the value vector, which is decoupled from XP).
---

## STUB — not yet written

Author this skill once **the data models are defined (see docs/architecture.md)**. Writing it earlier would bake in guesses.

What it will encode:
- XP is server-authoritative: awarded only via a Cloud Function callable; clients never write `xp` or `level` (rules forbid it).
- Idempotency key per action so a retried/duplicated request awards XP at most once.
- Daily-cap check against the `xpEvents` ledger before awarding.
- Aspect mapping: which eco-action contributes to which XP aspect.
- Level recompute from total XP, performed server-side in the same transaction.
