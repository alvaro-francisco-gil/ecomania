---
name: funnel-handoff
description: Use whenever touching the funnel→app handoff — the anonymous-auth → deep-link → account-link sequence that carries a web visitor's survey result into the native app. Encodes the invariant that the user must NEVER have to redo the survey. Reach for it on "/invite", "account link", "carry the survey into the app", "anonymous user". Companion to `topical-questionnaire` (the survey data being carried) and `rive-avatar-contract` (the avatar that must look identical across the boundary).
---

## STUB — not yet written

Author this skill once **the data models are defined (see docs/architecture.md)**. Writing it earlier would bake in guesses.

What it will encode:
- The handoff sequence: anonymous Firebase auth on the funnel → deep link into the app → link the anonymous account to a permanent credential, preserving the uid's data.
- The hard invariant: the user never redoes the survey — the value vector and avatar computed on the funnel survive the account link intact.
- Failure handling mid-handoff (interrupted deep link, link conflict with an existing account) with no silent data loss.
- Where the handoff token/state lives and how the app reclaims it.
