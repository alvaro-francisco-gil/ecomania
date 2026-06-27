---
name: grill-me
description: Interview the user relentlessly about a plan, design, or PRD until reaching shared understanding, walking each branch of the decision tree one decision at a time. Use when the user says "grill me", "interview me", "stress-test this plan", "poke holes", or when starting `write-a-prd` and the brief is vague. Hands a structured decision summary back to `write-a-prd`; pulls codebase conventions from `AGENTS.md` and the domain skills instead of making the user re-derive them.
---

# Grill me

One question at a time. Resolve dependencies between decisions one-by-one. Walk down each branch of the design tree until you have a shared understanding.

## Rules

- **One question per turn.** Multi-part questions get hand-waved.
- **Recommend an answer.** Don't just ask — propose the answer you'd pick and why, then let the user override. A grilling that only asks is procrastination.
- **Explore the codebase instead of asking when you can.** If "does service X already do Y?" is a grep away, grep — don't make the user remember.
- **Resolve dependencies in order.** Don't ask about UI shape before the data model is settled. Don't ask about deployment before the rollback story.
- **Stop when you have enough.** Grilling is a means to a PRD or a decision, not a ritual. When the next question doesn't change any downstream decision, stop and summarize.

## What to grill on

Walk these in roughly this order, skipping ones already settled:

1. **Problem framing** — whose pain, how often, what's the cost of doing nothing.
2. **Scope boundary** — what's explicitly in, what's explicitly out, where the user would be tempted to scope-creep.
3. **Which app(s)** — funnel only, app only, or both? If both, do they ship in lockstep (e.g. anything touching the Rive avatar contract or `@ecomania/shared`)?
4. **Data model** — new shapes vs. existing models in `packages/shared/src/models/` and `docs/architecture.md`. Migration of existing data.
5. **Trust boundary** — what writes belong client-side vs. Cloud Function (per AGENTS.md). XP, level, and the value vector are server-authoritative; confirm the slice respects that. Any guardrails (run `guardrail-audit` if it looks feature-wide).
6. **Failure modes** — silent-fallback temptations to refuse, error states to surface, what happens offline / mid-write, what happens if the funnel→app handoff is interrupted (the user must never redo the survey — see `funnel-handoff`).
7. **Privacy** — does this touch the eco-value vector or other special-category data? If so, surface the consent/exposure questions (`values-privacy`).
8. **Rollout** — single PR or phased? Env order (dev → beta → prod)? App/funnel ordering? Backfill? Feature flag?
9. **Test strategy** — which behaviors matter, smallest harness that proves them (see `tdd` / `fix-bug`).
10. **Out-of-scope explicit** — capture the "no" answers as loudly as the "yes" ones; they prevent scope creep mid-implementation.

## When grilling for a PRD

If invoked by `write-a-prd`, end the grilling by handing back a structured summary of decisions (problem, scope, app(s), modules, trust boundary, privacy, tests, out-of-scope). The PRD writer turns that into the doc — don't write the PRD inside this skill.

## Avoid

- Asking questions whose answer doesn't change anything you'll write down.
- Piling up "and also…" questions in one turn.
- Asking the user to invent something the codebase already has a convention for — grep `AGENTS.md`, `packages/shared/src/services/_services-map.md`, `docs/architecture.md`, and the relevant domain skill (`awarding-xp`, `rive-avatar-contract`, `funnel-handoff`, `topical-questionnaire`) first.
- Continuing to grill after the answers have stopped changing the design. Diminishing returns is the stop signal.

## When this skill applies

- The user says "grill me", "interview me", "stress-test this", or "poke holes".
- `write-a-prd` is started against a vague brief.

## Companion skills

- `write-a-prd` — the usual caller; receives the decision summary.
- `guardrail-audit` — run it when a feature looks like it spans many trust-sensitive writes.
- `values-privacy` — surface privacy questions when special-category data is in scope.
