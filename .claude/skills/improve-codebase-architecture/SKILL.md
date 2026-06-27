---
name: improve-codebase-architecture
description: Explore a codebase looking for shallow modules, tightly-coupled clusters, and missing seams; surface deepening opportunities; design 3+ alternative interfaces in parallel; write the chosen refactor as a plan in `docs/plans/ideas/`. Use when the user says "find refactor opportunities", "improve architecture", "find deep modules", "consolidate this", "make X more testable", "AI-navigability pass". Emits a plan that enters the `managing-plans-lifecycle`; pairs with `tdd` for the deep-module testability lever. Refactor only — never bundle a feature.
---

# Improve codebase architecture

A **deep module** (Ousterhout, *A Philosophy of Software Design*) has a small interface hiding a large implementation. Deep modules are more testable, more AI-navigable, and let you test at the boundary rather than inside. The opposite — shallow modules — burn agent tokens, leak invariants, and break under refactor.

This skill runs an exploratory pass, lets the user pick a target, designs alternative interfaces in parallel, and emits a refactor plan. In ecomania, the highest-leverage seam is usually the `@ecomania/shared` boundary between the two clients (mobile app + web funnel) — both consume the same models/services/contracts, so a shallow shared interface costs twice.

## Process

### 1. Explore

Spawn an `Explore` subagent (or grep yourself if scope is narrow). Don't follow rigid heuristics — the friction is the signal:

- Where does understanding one concept require bouncing between many small files?
- Where is the interface nearly as complex as the implementation?
- Where have pure functions been extracted *just* for testability, but real bugs hide in how they're called?
- Where do tightly-coupled tiny modules create integration risk in the seams between them?
- Where does the app and the funnel each reimplement logic that should live once in `@ecomania/shared`?
- Which parts have no tests, or only tests that mock everything?

Cross-reference: `packages/shared/src/services/_services-map.md` (once it exists), `docs/architecture.md`, AGENTS.md "Services are the only Firebase ingress" rule, and any domain skill (`awarding-xp`, `rive-avatar-contract`, `funnel-handoff`, `topical-questionnaire`) — those skills already name invariants the architecture must respect.

### 2. Present candidates

Numbered list. For each:

- **Cluster** — modules / concepts involved
- **Why they're coupled** — shared types, call patterns, co-ownership of a concept, duplicated across app+funnel
- **Dependency category** — see table below
- **Test impact** — what existing tests would be replaced by boundary tests, what's currently untested

Do NOT propose interfaces yet. Ask: "Which would you like to deepen?"

### 3. User picks a candidate

### 4. Frame the problem space (user-facing)

Before parallel design, write a short explanation for the user:
- Constraints any new interface must satisfy (invariants from domain skills, AGENTS.md rules, existing callers in both clients)
- Dependencies it must rely on
- A rough sketch of constraints — NOT a proposal, just grounding

Show it. The user reads while sub-agents work.

### 5. Design interfaces in parallel

Spawn 3+ Agent calls in **a single message** (parallel). Each gets a brief: file paths in scope, coupling details, dependency category, what's being hidden. Give each a different constraint:

- **Agent 1:** "Minimize the interface — 1–3 entry points max."
- **Agent 2:** "Maximize flexibility — support many use cases and extension points."
- **Agent 3:** "Optimize for the most common caller — make the default case trivial."
- **Agent 4 (if cross-boundary):** "Design around ports & adapters" — relevant when the same logic must serve both the app and the funnel from `@ecomania/shared`.

Each sub-agent outputs:
1. Interface signature (types, methods, params)
2. Usage example showing how callers invoke it
3. What complexity it hides internally
4. Dependency strategy (which category, how deps are handled)
5. Trade-offs

Present designs sequentially. Then compare in prose. **Give your own recommendation** — be opinionated, the user wants a strong read, not a menu. If a hybrid is clearly best, propose it.

### 6. User picks (or accepts your recommendation)

### 7. Write the refactor plan

Path: `docs/plans/ideas/refactor-<slug>.md` (bare kebab slug, **no date prefix**) per `managing-plans-lifecycle`. Use the template below. Promotion to `docs/plans/ready/` is the user's call.

## Dependency categories

When assessing a cluster:

| Category | Description | Deepening recipe |
|---|---|---|
| **In-process** | Pure computation, in-memory, no I/O | Merge the modules, test directly. Always deepenable. |
| **Local-substitutable** | Has a local test stand-in (Firestore emulator, in-memory FS) | Deepen with the stand-in in the test harness. Tests use real semantics, not mocks. |
| **Remote but owned (Ports & Adapters)** | Your own services across network (Cloud Functions callables, internal APIs) | Define a port at the module boundary; real adapter for prod, in-memory adapter for tests. Logic stays one deep module. |
| **True external** | Third-party APIs you don't control (Rive runtime, telemetry SDK, etc.) | Mock at the boundary. Module takes the dep as an injected port. |

In ecomania today: most logic in `@ecomania/shared` is **in-process** (XP math, value-vector moving-average, questionnaire scoring) or **local-substitutable** (Firestore via emulators). Watch for someone treating Firestore as "external" and over-mocking — the emulator harness is the substitute; use it once it exists.

## Testing strategy: replace, don't layer

- Old unit tests on the shallow modules are waste once boundary tests exist — **delete them** in the same PR.
- Write new tests at the deepened module's public interface.
- Tests assert on observable outcomes, not internal state.
- Tests survive internal refactors.

## Plan template

```markdown
# Refactor: <cluster name> → deep module

**Status:** draft — awaiting user sign-off
**Last reviewed:** YYYY-MM-DD

## Problem
Architectural friction:
- Which modules are shallow and tightly coupled (by responsibility, not file path)
- What integration risk exists in the seams between them
- Whether the app and funnel duplicate this logic
- Why this makes the codebase harder to navigate / modify / test
- Cross-reference: any AGENTS.md rule or domain skill invariant being strained

## Proposed interface
Chosen design (from §5):
- Signature — types, methods, params
- Usage example — how callers (app and/or funnel) invoke it
- What complexity it hides

## Dependency strategy
Category: <In-process / Local-substitutable / Ports & adapters / Mock>
How dependencies are handled:
- For ports & adapters: port definition + prod adapter + test adapter
- For local-substitutable: which harness (Firestore emulators, etc.)
- For mock: where the boundary is

## Testing strategy
- **New boundary tests:** behaviors to verify at the new interface
- **Tests to delete:** the shallow-module tests that become redundant (named)
- **Test environment needs:** any new harness setup

## Implementation guidance
Durable architectural guidance, NOT coupled to current file paths:
- What the module owns (responsibilities)
- What it hides (implementation details)
- What it exposes (interface contract)
- How callers (app + funnel) migrate

## Out of scope
The shape-changes deliberately not in this refactor. Loud "no"s.
```

## Avoid

- Proposing interfaces before the user picks a candidate.
- Running the 3+ parallel design agents sequentially — fire them in one message, or you waste the latency.
- Writing the plan into `docs/plans/ready/` directly. Draft in `docs/plans/ideas/`; promotion is the user's call.
- Referencing current file paths in the durable guidance section — they rot. Use names of responsibilities.
- Proposing a refactor that contradicts a domain skill's invariants without explicitly calling out the conflict and resolving it.
- Bundling the refactor *and* a feature in one plan. Refactors are their own PRs.

## When this skill applies

- The user says "find refactor opportunities", "improve architecture", "find deep modules", "consolidate this", "make X more testable", or "AI-navigability pass".

## Companion skills

- `managing-plans-lifecycle` — the refactor plan enters its lifecycle in `ideas/`.
- `tdd` — the deep-module principle is the testability lever; deepen, then test at the new boundary.
- `touch-service` — when the deepened module is a shared service.
