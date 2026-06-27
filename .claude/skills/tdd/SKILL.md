---
name: tdd
description: Feature-driven TDD with vertical RED→GREEN→REFACTOR per behavior. Use when building a new feature, implementing a Ralph AFK slice, or the user says "TDD this", "red-green-refactor", "test-first". For defects/bugs use `fix-bug` instead — same loop, different entry point and harness routing. Pulls the deep-module lever from `improve-codebase-architecture`; honors the server-authoritative boundaries from `awarding-xp` and `topical-questionnaire` when testing economy/value logic.
---

# TDD — feature driven

`fix-bug` is for defects (the symptom is the test). `tdd` is for new feature work or a Ralph slice (the spec is the test). Same RED→GREEN loop; different starting point.

## Philosophy

**Tests verify behavior through public interfaces, not implementation details.** Code can change entirely; tests shouldn't. A test that fails when you rename a private helper but the user-visible behavior didn't change is a bad test.

**Good test:** "Awarding XP for a completed eco-action applies the action's aspect weight and respects the daily cap." — reads like a spec, survives refactors.

**Bad test:** asserts an internal helper was called with arg X — implementation detail, breaks on refactor, doesn't prove anything about behavior.

## Anti-pattern — horizontal slicing

**Do NOT write all tests first, then all implementation.** That produces:
- Tests against *imagined* behavior, not actual
- Tests of shape (signatures, data structures) instead of user-visible behavior
- Tests insensitive to real changes — pass when broken, fail when fine

**Vertical only:** one test → one bit of implementation → next test. Each cycle responds to what the previous cycle taught you.

```
WRONG (horizontal):
  RED:   test1, test2, test3, test4
  GREEN: impl1, impl2, impl3, impl4

RIGHT (vertical):
  RED→GREEN: test1 → impl1
  RED→GREEN: test2 → impl2
  ...
```

## Workflow

### 0. Pick the harness

Test harnesses are still being established per app — `apps/mobile/` and `apps/funnel/` are not yet scaffolded, and `functions/` is empty. Use whatever runner the target package already has; do not introduce a second runner alongside an existing one. The general routing, by surface:

| Surface | Test home (convention) | Notes |
|---|---|---|
| Shared service / model / utils (`@ecomania/shared`) | `packages/shared/test/{services,models,utils}/<name>.*` | Cheapest layer — pure logic, no I/O. Start here whenever possible. |
| Cross-service / Firestore behavior | `packages/shared/test/e2e/<name>.*` | Firestore emulator harness (TBD once a collection exists — see `add-firestore-collection`). |
| Firestore rules | `packages/shared/test/e2e/...` | `@firebase/rules-unit-testing` once rules exist. |
| Cloud Function (callable / trigger) | `functions/test/...` | Emulator-backed, once `functions/src/` exists. |
| App screen / component / hook | `apps/mobile/<area>/__tests__/<Name>.test.tsx` | RTL once the Expo app is scaffolded; visual judgment may need `drive-android-avd`. |
| Funnel page / component | `apps/funnel/...` | Per the funnel's test setup once scaffolded. |

When the harness for a surface genuinely doesn't exist yet, say so in the PR and TDD at the lowest layer that does (almost always shared pure logic). Don't stand up a bespoke runner to avoid the gap.

### 1. Plan (before any code)

Confirm with the user (or the slice spec if running under Ralph):
- What's the public interface? (types, methods, params)
- Which behaviors are tested? Prioritize critical paths.
- Any chance to extract a **deep module** (small interface, complex implementation hidden)? See `improve-codebase-architecture` for the deep-module principle.
- For economy/value logic, confirm the test asserts the **server-authoritative** behavior (idempotency, daily cap, level recompute) — clients never write XP/level/value. See `awarding-xp`, `topical-questionnaire`.
- Get approval (or for Ralph: confirm slice acceptance criteria covers it).

You can't test everything. Focus on critical paths and complex logic, not every possible permutation.

### 2. Tracer bullet — first RED→GREEN

One test that proves the path works end-to-end through every layer it touches:

- **RED:** write the test. Run it. See it fail with a meaningful error (not "module not found" — that's just stub-missing).
- **GREEN:** write the minimum code to pass. Resist the urge to add more.

This is the tracer bullet. It proves the wiring works.

### 3. Incremental loop

For each remaining behavior:

- **RED:** next test → fails
- **GREEN:** minimal code → passes

Rules:
- One test at a time
- Only enough code to pass the current test
- Don't anticipate future tests (YAGNI)
- Keep tests focused on observable behavior

### 4. Refactor (only while GREEN)

After all tests pass for the current scope:

- Extract duplication
- **Deepen modules** — move complexity behind simple interfaces
- Apply SOLID where natural
- Reconsider names — agents read identifiers, not comments (AGENTS.md)
- Run tests after each refactor step

**Never refactor while RED.** Get to GREEN first.

## Deep modules — the testability lever

From Ousterhout: **deep module = small interface + lots of implementation.** Shallow modules (large interface, thin implementation) are the testability problem this repo wants to avoid.

Signs you should deepen:
- The interface is almost as complex as the implementation
- Pure functions extracted "for testability" — but bugs hide in how they're called, not in the helpers
- Tightly-coupled small modules with shared types passing between them
- Tests at the seams duplicate setup the deep boundary would absorb

When you spot it during TDD, deepen *first*, then test at the new boundary. Old shallow-module tests get deleted when their behavior is covered at the deeper interface — **replace, don't layer.**

See `improve-codebase-architecture` for a structured pass on this when you want to commit a refactor PR.

## Mocking — when, and how little

- **In-process deps (pure logic, in-memory state):** no mocks. Merge and test directly.
- **Local-substitutable (Firestore, etc.):** use the emulator harness once it exists. Don't roll your own mock.
- **Owned remote:** ports & adapters — in-memory adapter in tests, real adapter in prod.
- **External (third-party APIs):** mock at the boundary, never deeper.

Per AGENTS.md, services are the only Firebase ingress in the clients — so tests against screens/hooks should go through the service interface, not stub Firebase directly.

## Per-cycle checklist

- [ ] Test describes behavior, not implementation
- [ ] Test uses public interface only
- [ ] Test would survive an internal refactor
- [ ] Test failed in RED with a meaningful error
- [ ] Code is minimal — no speculative features
- [ ] No silent fallbacks introduced (AGENTS.md)

## Avoid

- Writing all tests first.
- Refactoring while RED.
- Mocking collaborators you own — change them.
- Asserting on private methods or internal call patterns.
- Keeping a passing test you wrote without seeing it fail — you can't trust it.
- Bundling a refactor that isn't covered by the tests in the current scope. Open a separate PR.
- Shipping a feature whose deepest test is "the file compiles."
- Standing up a new test runner to dodge a missing harness — TDD the shared logic instead and flag the gap.

## When this skill applies

- Building a new feature or implementing a Ralph AFK slice.
- The user says "TDD this", "test-first", or "red-green-refactor".

## Companion skills

- `fix-bug` — same loop for defects; different entry point and harness routing.
- `improve-codebase-architecture` — for a structured deep-module refactor pass.
- `awarding-xp`, `topical-questionnaire` — define the server-authoritative behavior these tests must assert.
- `prd-to-slices` — the Ralph loop runs this skill per AFK slice.
