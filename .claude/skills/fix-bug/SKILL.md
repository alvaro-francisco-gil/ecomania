---
name: fix-bug
description: RED/GREEN procedure for fixing a reported bug — write the failing test in the right harness first, then fix, then a `fix(scope): …` PR to `main`. Use whenever a defect is reported, a real test failure surfaces, or a beta/prod incident is being investigated. Routes to `touch-service`, `guardrail-enforcement`, `awarding-xp`, `rive-avatar-contract`, `funnel-handoff`, `firestore-deploy`, `cloud-function-logging`, `expo-native-rebuild`, or `gcloud-ecomania` for the actual fix layer. Don't invoke for new features (`tdd`), refactors (`improve-codebase-architecture`), or "while I'm here" cleanups — those have their own entry points.
---

# Fix a bug

Red/green. The regression test is written **before** the fix and committed in the same PR — that's the proof.

## 1. Reproduce

Pin down: entry point (screen / funnel page / service / callable / trigger), inputs (IDs, account state, funnel vs. signed-in), expected vs. actual, environment (dev / beta / prod — default dev). If you can't reproduce, don't code: ask the user, or pivot to Cloud Logging via `gcloud-ecomania` (works-in-dev / fails-in-beta is almost always config or data drift, not code).

## 2. RED — write the failing test first

Pick the layer and the **smallest scope that can express the bug**. Pure shared logic runs in seconds; emulator/native runtime is far slower — only escalate when the bug genuinely requires it.

**Harnesses are still being established.** `apps/mobile/` and `apps/funnel/` aren't scaffolded yet and `functions/` is empty, so several rows below describe the *convention* the harness will follow rather than a runner that exists today. Use the runner the target package already has; never introduce a second runner alongside an existing one. When the harness for a surface genuinely doesn't exist, drop to the lowest layer that does (almost always shared pure logic) and say so explicitly in the PR.

| Bug surface | Test home (convention) | Library |
| --- | --- | --- |
| Shared service / model / utils (`@ecomania/shared`) | `packages/shared/test/{services,models,utils}/<name>.*` | the package's unit runner |
| Cross-service flow / Firestore behavior | `packages/shared/test/e2e/<name>.*` | Firestore emulator harness (once a collection exists) |
| Firestore rule | `packages/shared/test/e2e/...` | `@firebase/rules-unit-testing` |
| Cloud Function (callable / trigger / scheduled) | `functions/test/...` | emulator harness (once `functions/src/` exists) |
| App screen / component / hook | `apps/mobile/<area>/__tests__/<Name>.test.tsx` | RTL (once the Expo app is scaffolded) |
| Funnel page / component | `apps/funnel/...` | the funnel's test setup |
| Whole-flow regression (auth → nav → broken interaction) | per-app e2e flow dir (TBD per app) | the app's e2e runner (e.g. Maestro on mobile) |

Naming:
- Match the package's existing test-file convention once one exists.
- `describe` block names the bug (e.g. `'awards XP only once for a duplicate idempotency key (#1234)'`). Avoid generic `describe` blocks for regression tests — they should be findable by symptom.

**Run the test, see it fail.** A test that passes before the fix is the wrong test. Paste the RED line into the PR body if it isn't obvious from the diff.

## 3. Fix at the right layer

Match cause to layer; route to the companion skill — don't re-derive its rules:

| Cause | Companion skill |
| --- | --- |
| Service shape / missing filter / stale cache / silent fallback | `touch-service` |
| Cross-user write or trust-sensitive state succeeds when it shouldn't | `guardrail-enforcement` (run `guardrail-audit` first if the gap looks feature-wide) |
| XP/level wrong, awarded twice, or daily cap bypassed | `awarding-xp` |
| Value vector drifts wrong, or special-category data leaks | `topical-questionnaire` / `values-privacy` |
| Avatar renders differently on app vs funnel, or a Rive input is missing | `rive-avatar-contract` |
| User is asked to redo the survey after the funnel handoff | `funnel-handoff` |
| UGC slips past moderation on a write path | `moderation-pipeline` |
| Firestore rule rejects valid write / accepts invalid one / missing index | `firestore-deploy` |
| Cloud Function log can't be filtered / `console.*` used | `cloud-function-logging` |
| Native init crash on launch after pulling a branch with new native deps | `expo-native-rebuild` |
| Works in dev, fails in beta/prod | `gcloud-ecomania` (Cloud Logging, Secret Manager) — investigate config before code |

AGENTS.md non-negotiables that bug fixes commonly violate:

- **No silent fallbacks.** Don't catch-and-default the failure away — surface it.
- **Services are the only Firebase ingress in the clients.** Don't reach Firestore from a screen/page/hook/component to "skip the bug".
- **Models first.** If the shape is wrong, fix `packages/shared/src/models/` — don't widen a service signature inline.
- **Server-authoritative economy.** XP, level, and the value vector are never written by a client; a fix that lets the client write them is the wrong fix.
- **No retrocompat shims** unless asked. If existing data is now invalid, call out the migration in the PR.

## 4. GREEN — test passes, repro is gone

- New test passes (run the package's test command from Step 2).
- Re-walk the Step 1 repro in the actual app/funnel — type-checks and unit tests are not enough for UI bugs. The user runs the dev server (per AGENTS.md, never start it yourself); for the app, `drive-android-avd` can drive an emulator.
- For backend changes deployed to dev (rules / indexes / functions), confirm in Cloud Logging via `gcloud-ecomania`.

## 5. Visual / UI bugs

Assert on the rendered tree, not on pixels — there is no snapshot tooling. A "visual test" is a render assertion (RTL on mobile, the funnel's equivalent on web) against what the component shows. If the bug is **whole-flow** (manifests only after multi-screen interaction — auth, nav, then the broken action), add an e2e flow in the app's regression directory once that harness exists. Skip e2e for narrow component bugs — the render-assertion layer is much faster. If the bug is genuinely layout/styling/pixel-offset and can't be expressed in either harness, document the manual repro in the PR description as the standing test, and say so explicitly.

## 6. PR back to `main`

- Branch off `main` as `fix/<short-slug>`.
- Commit: `fix(<scope>): <one-line summary>`. Body has the root-cause sentence and the repro path.
- The PR contains the regression test **and** the fix in the same diff. Reviewers should be able to see the test and confirm it would fail without the change.
- Mention any `firestore.indexes.json` change or rule change in the description so deploy isn't missed (use `firestore-deploy`).

## Required outputs

- [ ] Failing test committed in the right harness per the table (or, if the harness doesn't exist yet, the lowest layer that does, with the gap noted).
- [ ] Fix obeys AGENTS.md (no silent fallbacks, services-only ingress, models first, server-authoritative economy).
- [ ] Original repro re-walked in the running app/funnel or via the relevant suite.
- [ ] PR open against `main` with `fix(...)` commit and root cause in the body.

## Avoid

- **Shipping a fix without a test.** Bugs without regression tests come back.
- **Writing the test after the fix** — you'll write one that already passes. Red first.
- **Picking a snapshot test as a "visual test"** — there's no snapshot tooling; assert on tree contents or add an e2e flow.
- **Fixing the symptom layer** when the cause lives one layer up. The contract is the bug.
- **Adding a try/catch to silence the error** — that's a silent fallback, AGENTS.md violation.
- **Standing up a new test runner** to dodge a missing harness — drop to shared logic and flag it.
- **Bundling a refactor or "while I'm here" cleanup** into the fix PR. Open a separate one.

## When this skill applies

- A defect is reported, a real test fails, or a beta/prod incident is being investigated.

## Companion skills

- `tdd` — same RED→GREEN loop for new features.
- `touch-service`, `guardrail-enforcement`, `awarding-xp`, `rive-avatar-contract`, `funnel-handoff`, `topical-questionnaire`, `values-privacy`, `moderation-pipeline` — the actual fix layer, routed by cause above.
- `firestore-deploy`, `cloud-function-logging`, `expo-native-rebuild`, `gcloud-ecomania` — infra-side causes.
