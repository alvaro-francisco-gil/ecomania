---
name: write-a-prd
description: Turn a vague brief, Slack message, or feature request into a structured PRD written to `docs/plans/ideas/<slug>.md`. Uses `grill-me` to extract decisions first, then `improve-codebase-architecture`'s deep-module lens to sketch modules. Use when the user says "write a PRD", "scope this", "turn this Slack message into a plan", "draft a feature plan", or pastes a vague request. Does NOT write a `docs/plans/ready/` file — promotion is manual via `managing-plans-lifecycle` once blessed. For a bug, use `fix-bug` instead. To turn the finished PRD into AFK work, hand to `prd-to-slices`.
---

# Write a PRD

A PRD here is a **draft plan** at the `ideas/` stage. It lives under `docs/plans/ideas/<slug>.md` (bare kebab-case, no date prefix — per `managing-plans-lifecycle`) until the user blesses it and promotes it to `docs/plans/ready/`. Don't skip the draft step — that's where the user reviews shape before it becomes canonical.

## Process

### 1. Read the input
The brief may be: a Slack quote pasted in chat, a markdown file (e.g. `client-brief.md`), a GitHub issue body, or a user-typed sentence. If the user pointed at a file, read it; otherwise work from the chat message.

### 2. Explore before asking
Grep `packages/shared/src/services/_services-map.md` (once services exist), the relevant domain skill (`rive-avatar-contract`, `awarding-xp`, `funnel-handoff`, `topical-questionnaire`, `values-privacy`, `moderation-pipeline`), and any existing plan slugs that touch the same area. Many "questions" answer themselves from the repo. Check `docs/architecture.md` for the data models if the feature touches XP, values, or the avatar.

### 3. Invoke `grill-me`
Hand off to the `grill-me` skill to extract decisions one question at a time. Don't pre-write the PRD before grilling — you'll anchor on a shape that may not survive the conversation.

### 4. Sketch deep modules
Once the decision tree is resolved, identify modules to build or modify. Actively look for **deep modules** (small interface, lots of implementation hidden) per `improve-codebase-architecture`. Because ecomania spans two clients (mobile app + web funnel) over `@ecomania/shared`, name explicitly which side each module lives on and what crosses the shared boundary. Check with the user that the module list matches their mental model and which ones they want tested.

### 5. Write the file

Path: `docs/plans/ideas/<slug>.md` (bare kebab slug, **no date prefix**). Do NOT write to `docs/plans/ready/` or `docs/plans/ongoing/` — promotion is a separate step the user owns via `managing-plans-lifecycle`.

Use this template:

```markdown
# <Feature title>

**Status:** draft — awaiting user sign-off
**Last reviewed:** YYYY-MM-DD
**Source brief:** <path to brief file, or "chat message YYYY-MM-DD">

## Problem statement
The pain from the user's perspective. One paragraph max. No solutions yet.

## Solution sketch
The solution from the user's perspective. Still no code — describe behavior.

## User stories
Numbered, exhaustive. Each: "As a <actor>, I want <feature>, so that <benefit>."
Cover edge cases, error states, empty states, offline behavior. Where it matters,
distinguish the funnel actor (anonymous web visitor) from the app actor (signed-in player).

## Implementation decisions
Bulleted. Cover:
- Modules to build / modify (by responsibility, not by file path — paths drift)
- Which side each module lives on (app / funnel / `@ecomania/shared` / `functions`)
- New or modified data shapes (link to `packages/shared/src/models/` entries or `docs/architecture.md`)
- Trust boundary: which writes are client-side vs. Cloud Function, why (XP/level/value-vector are server-authoritative)
- Guardrails (cross-reference `guardrail-enforcement` if non-trivial)
- API contracts (callable shapes, trigger payloads, shared constants like Rive input names)
- Architectural decisions worth surfacing

Do NOT include file paths or code snippets here — they rot. Names of responsibilities are durable; line numbers are not.

## Testing decisions
- What "good" looks like: behavior tests through public interfaces, not implementation details
- Which modules get tests, at which harness (see `tdd` / `fix-bug` — harnesses are still being set up per app)
- Prior art in the codebase (point to similar existing test files, once they exist)

## Rollout
- Single PR or phased?
- Env order if phased (dev → beta → prod)
- App vs funnel ordering — do they have to ship in lockstep? (e.g. a renamed Rive input breaks both)
- Backfill? Feature flag?
- Migration of existing data if data shape changes (AGENTS.md: no retrocompat shims — call it out)

## Out of scope
Loud "no"s. The things this PRD explicitly does not solve. Prevents scope creep mid-implementation.

## Open questions
Anything `grill-me` couldn't resolve. Each entry has a default the implementer can use if the user doesn't come back.
```

### 6. Hand off

Share the path. Tell the user:
- To promote: `git mv docs/plans/ideas/<slug>.md docs/plans/ready/<slug>.md` — or skip if the work is small enough to live as a Ralph queue without a blessed plan.
- To turn into AFK work: invoke `/prd-to-slices <path-to-prd>`.

## Avoid

- Writing the PRD before grilling.
- Writing directly to `docs/plans/ready/` or `docs/plans/ongoing/` — drafts go to `docs/plans/ideas/`. Promotion is the user's call.
- Including file paths or code snippets in the PRD body — they go stale within weeks.
- Duplicating AGENTS.md rules in the PRD. Reference them ("per AGENTS.md, no silent fallbacks") instead.
- Opening a GitHub issue, calling `gh issue create`, or tagging anyone. Local markdown only.
- Writing a PRD for a bug. Bugs go through `fix-bug`, not here.
- Treating XP, level, or the value vector as client-writable in the trust-boundary section — they are server-authoritative (see `awarding-xp`, `topical-questionnaire`).

## When this skill applies

- The user says "write a PRD", "scope this", "draft a plan", or pastes a vague request.
- A feature brief needs structuring before it can be split into slices.

## Companion skills

- `grill-me` — extracts the decisions the PRD records.
- `improve-codebase-architecture` — the deep-module lens for step 4.
- `managing-plans-lifecycle` — owns promotion of the draft to `ready/`.
- `prd-to-slices` — turns the finished PRD into Ralph queue slices.
