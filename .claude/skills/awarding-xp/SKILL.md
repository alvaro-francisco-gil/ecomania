---
name: awarding-xp
description: Use whenever code grants XP, recomputes a level, or touches the XP economy in any way. Encodes the server-authoritative rule — XP is awarded ONLY via a Cloud Function callable, with an idempotency key per action, appending to the `xpEvents` ledger; clients NEVER write xp or level. Reach for it on "award XP", "level up", "level curve", "eco-action reward". Companion to `guardrail-enforcement` (the callable pattern) and `topical-questionnaire` (the value vector, which is decoupled from XP).
---

## STUB — not yet written

Author this skill once **the data models are defined (see docs/architecture.md)**. Writing it earlier would bake in guesses.

What it will encode:
- XP is server-authoritative: awarded only via a Cloud Function callable; clients never write `xp` or `level` (rules forbid it).
- Idempotency key per action so a retried/duplicated request awards XP at most once.
- No daily caps: XP-bearing content arrives on a global content calendar, so supply is the cap (`docs/decisions/xp-economy.md`). Posts/comments/referrals are unbounded and will need caps if they ever earn XP.
- Each questionnaire declares its own XP value — there is no source table in code, and there are no activity aspects.
- Level recompute from total XP, performed server-side in the same transaction.
