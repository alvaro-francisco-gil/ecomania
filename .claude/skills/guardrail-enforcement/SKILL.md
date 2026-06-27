---
name: guardrail-enforcement
description: Use when deciding WHERE a business-rule guardrail must live — Firestore rules, a client service, or a Cloud Function callable — and implementing it at the correct trust boundary. Reach for it whenever a write is cross-user, trust-sensitive, or money/XP/value-bearing. Encodes the admin-callable pattern. Companion to `touch-service` (which routes server-side writes here), `awarding-xp` (XP economy guardrails), and `guardrail-audit` (finding gaps). See [AGENTS.md](../../../AGENTS.md) for the trust-boundary rule.
---

## STUB — not yet written

Author this skill once **services + Firestore rules + functions** exist. Writing it earlier would bake in guesses.

What it will encode:
- Choosing the layer: UI is an optimization, the service is a consistency boundary, the server (rules + callables) is the trust boundary — a guardrail must live at the trust boundary.
- Which writes MUST be a Cloud Function callable: cross-user writes, denormalized aggregates, role grants, and all XP/level/value-vector mutations (server-authoritative).
- The admin-callable pattern: auth check, caller-role check, input validation, refuse-on-invalid, structured logging.
- Firestore rules as the backstop that catches any write that bypasses a typed service.
