---
name: prd-to-slices
description: Break a PRD into vertical-slice tasks written as markdown files under `implementation-queue/<plan-slug>/NNN-*.md`, each tagged AFK or HITL with explicit allowed/forbidden path lists so the Ralph loop can pick them up safely. Use when the user says "break this PRD into tasks", "generate slices", "make the implementation queue", "queue for ralph", "split into slices", or after `write-a-prd` is done. Reads the PRD produced by `write-a-prd`; the parent plan's lifecycle is owned by `managing-plans-lifecycle`. Routes trust-sensitive slices to HITL and names the companion skill the implementer should follow.
---

# PRD to slices

Vertical slices (tracer bullets) that each cut through every layer end-to-end. The Ralph AFK loop consumes these from `implementation-queue/<slug>/NNN-*.md`. Two non-negotiables:

1. **Every slice declares `type: AFK` or `type: HITL`.** AFK = the loop may implement and commit without you. HITL = needs you in the loop.
2. **Every AFK slice declares `allowed_paths` and `forbidden_paths`.** Without these, the loop is unsafe in this repo.

## Process

### 1. Locate the PRD
Ask for the path (typical: `docs/plans/ideas/<slug>.md` or `docs/plans/ready/<slug>.md`). Read it. If the slug isn't obvious from the filename, derive it.

### 2. Explore the codebase (if not already)
Grep the services map (`packages/shared/src/services/_services-map.md`, once it exists) and any domain skill relevant to the area (`awarding-xp`, `rive-avatar-contract`, `funnel-handoff`, `topical-questionnaire`, `values-privacy`, `moderation-pipeline`). You need to know what already exists before deciding what a slice "builds."

### 3. Draft vertical slices

A slice is **a thin path through every layer** (model, service, rule, function, UI, test) — not a horizontal layer slice ("all the models," "all the services"). A completed slice is demoable or verifiable on its own. Because ecomania has two clients, a slice may legitimately cross the `@ecomania/shared` boundary into both — but keep it thin.

Prefer **many thin slices** over few thick ones. If a slice can't be shipped in a single PR, it's too big.

### 4. Classify AFK vs. HITL

Default to **HITL** when the slice touches any of:

- `firestore.rules`, `firestore.indexes.json`
- `functions/**`
- `apps/mobile/app.json`, `apps/mobile/eas.json`, `CHANGELOG.md`
- Anything that crosses a trust boundary — XP/level economy, value-vector updates, role grants, moderation decisions (see `guardrail-enforcement`, `awarding-xp`, `topical-questionnaire`)
- The Rive input/data-binding contract in `@ecomania/shared` (renaming an input breaks both renderers — see `rive-avatar-contract`)
- Special-category value data subject to GDPR handling (see `values-privacy`)
- New native dependencies or anything that triggers `expo-native-rebuild`
- UI flows where visual judgment matters (avatar reveal, survey UX)

A slice is **AFK** when:

- It only touches `packages/shared/src/{utils,models}/**`, `packages/shared/test/**`, or pure-logic services with existing test coverage
- The behavior is fully describable in unit-test assertions
- The blast radius if wrong is bounded (no rules, no deploys, no native, no money/XP/value state)

Prefer AFK where defensible. But **err HITL** when in doubt — the cost of a bad autonomous commit is higher than the cost of pulling you in.

### 5. Map dependencies
For each slice, list `blocked_by` (other slice IDs that must complete first). The Ralph loop schedules in dependency order.

### 6. Quiz the user (optional but recommended)
Present the breakdown as a numbered list with: title, type (AFK/HITL), blocked-by, user stories covered. Ask:
- Is the granularity right?
- Are AFK/HITL classifications correct?
- Are dependencies right?
- Anything to merge or split further?

Iterate. Then write files.

### 7. Create the slice files

Directory: `implementation-queue/<plan-slug>/`. Create if needed. Filename pattern: `NNN-<short-slug>.md`, zero-padded.

The `<plan-slug>` is the PRD filename without its `.md` extension — e.g. PRD `docs/plans/ideas/xp-economy.md` → plan slug `xp-economy` → directory `implementation-queue/xp-economy/`.

Numbering: start from the next free `NNN` in the directory. Skip numbers already used in `done/`.

Also write `implementation-queue/<plan-slug>/000-prd-link.md` — a one-liner pointing at the PRD path, so the loop has the upstream context cheap.

#### Slice template

```markdown
---
type: AFK            # or HITL
plan: <plan-slug>    # MUST match the directory name under implementation-queue/
blocked_by: []       # list of slice IDs (e.g. ["001-add-xp-event-model"]) or []
allowed_paths:       # for AFK only — paths the loop may modify
  - packages/shared/src/utils/<area>/**
  - packages/shared/test/utils/<area>/**
forbidden_paths:     # for AFK only — paths that escalate to HITL if needed
  - firestore.rules
  - functions/**
  - apps/mobile/app.json
  - CHANGELOG.md
  - eas.json
feedback_loop:       # commands the loop runs before committing
  - pnpm --filter @ecomania/shared test
  - pnpm --filter @ecomania/shared build
budget_iterations: 6
---

# <Slice title>

## What to build
Concise, behavior-level description. End-to-end through every layer this slice touches. Reference PRD sections by anchor, don't duplicate.

## Acceptance criteria
- [ ] Behavior 1 (verifiable via the feedback_loop above)
- [ ] Behavior 2
- [ ] No silent fallbacks introduced (AGENTS.md)
- [ ] No new top-level deps without justification

## User stories addressed
PRD #3, #7

## Notes for the implementer
- Reuse: <which existing services/utils/models to lean on>
- Companion skill: <touch-service / awarding-xp / rive-avatar-contract / fix-bug if bug, etc.>
- Anything subtle the loop should NOT discover the hard way
```

For HITL slices, omit `allowed_paths` / `forbidden_paths` / `feedback_loop` / `budget_iterations` — those exist to gate the loop, and the loop won't touch HITL.

## Forbidden-paths default list

Always include these in `forbidden_paths` for AFK slices, even if irrelevant — defense in depth:

```yaml
forbidden_paths:
  - firestore.rules
  - firestore.indexes.json
  - functions/**
  - apps/mobile/app.json
  - apps/mobile/eas.json
  - eas.json
  - CHANGELOG.md
  - .github/workflows/**
  - scripts/deploy-*
  - scripts/admin-*
```

The slice may add more on top of these, but never remove from the list.

## When a slice can't be safely AFK

If you find yourself needing to allow-list `firestore.rules` or `functions/` to make a slice AFK — **don't**. Mark it HITL and move on. The temptation to widen the allow-list is the most common way this whole system blows up. The same applies to the Rive input contract and any XP/value write path: those are HITL by construction.

## Avoid

- Writing slices that span multiple PRs of work — split them.
- Writing horizontal slices ("all models", "all services"). Vertical only.
- Using GitHub issues. Local markdown files only.
- Omitting `allowed_paths` / `forbidden_paths` on AFK slices.
- Classifying as AFK any slice touching rules, functions, native config, the Rive contract, XP/value state, version bumps, or release artifacts.
- Closing or modifying the parent PRD.

## When this skill applies

- The user says "split this into slices", "queue for ralph", or finishes a PRD via `write-a-prd`.
- An `ideas/`/`ready/` plan needs to become AFK-executable work.

## Companion skills

- `write-a-prd` — produces the PRD this skill consumes.
- `managing-plans-lifecycle` — owns the parent plan's stage and retirement.
- `tdd` — the loop follows this for each AFK slice's RED→GREEN.
- `guardrail-enforcement`, `awarding-xp`, `rive-avatar-contract` — name these in `Notes for the implementer` when a slice touches their domain.
