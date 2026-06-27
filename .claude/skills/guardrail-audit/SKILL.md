---
name: guardrail-audit
description: Use to audit a feature or the codebase for MISSING guardrails — trust-sensitive writes that aren't enforced at the server boundary. Produces a GAP / RULE-BACKED / DEAD table mapping each sensitive write path to its actual enforcement. Reach for it when a feature spans many trust-sensitive writes (run before `grill-me` finalizes scope, or during review). Companion to `guardrail-enforcement` (which fixes the gaps this finds).
---

## STUB — not yet written

Author this skill once **services + Firestore rules + functions** exist. Writing it earlier would bake in guesses.

What it will encode:
- The audit procedure: enumerate every trust-sensitive write path (cross-user, role, XP/level, value vector, moderation), then trace each to its actual enforcement.
- The classification table — for each path: GAP (no server enforcement), RULE-BACKED (enforced by rules/callable), or DEAD (path no longer reachable).
- How to confirm a rule/callable actually covers the path vs. only appearing to.
- Hand-off to `guardrail-enforcement` to close each GAP at the correct layer.
