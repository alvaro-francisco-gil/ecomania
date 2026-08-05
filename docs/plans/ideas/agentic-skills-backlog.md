# Agentic skills backlog

Tracks the `.claude/skills/` set: what's written, and what's stubbed pending a dependency.
A stub has correct frontmatter (so it's discoverable) but a `## STUB` body. When a stub's
dependency lands, write the real procedure and move it up this file.

## Written (process skills — structure-independent)
- `managing-plans-lifecycle`, `write-a-prd`, `prd-to-slices`, `grill-me`, `tdd`, `fix-bug`,
  `improve-codebase-architecture`

## Unblocked — ready to write now

The scaffold landed (2026-08-05), so these have their dependency. Each is still a `## STUB`;
writing one is its own small piece of work, because a skill written from an imagined procedure
is worse than no skill. **Write each from a procedure that has actually been run once.**

| Skill | Dependency that landed | What it should now encode |
|---|---|---|
| `cloud-function-logging` | `functions/src/lib/logger.ts` + the no-console build gate | the real `logger.info(msg, { handler, … })` shape, the `cause` unwrapping, why `build` runs `lint` first |
| `expo-native-rebuild` | `apps/mobile/` with 11 native deps + config plugins | the rebuild triggers; `expo install` over `pnpm add`; the `node-linker=hoisted` trap |
| `touch-service` | `packages/shared/src/services/` + `_services-map.md` | grep-callers-first, models-first, the services-map row, the backend boundary |
| `parallel-agent-workflow` | Metro/emulator port infra now real | per-slot port isolation for concurrent agents |
| `drive-android-avd` | `apps/mobile/` scaffolded | **write only after driving an AVD once** — a procedure invented on paper will be wrong |
| `prepare-release` | `apps/mobile/app.json` + `CHANGELOG.md` | version bump + changelog draft; never tag or push |

## Still blocked — **structure**

| Skill | Write once… |
|---|---|
| `add-firestore-collection` | first Firestore collections defined |
| `denormalized-read-model` | first read-model + trigger |
| `guardrail-enforcement` / `guardrail-audit` | services + rules + functions have real write paths |
| `firestore-deploy` | deploy scripts wired + a dev Firebase project exists |
| `gcloud-ecomania` | GCP project + named gcloud config set up |
| `observability-conventions` | telemetry stack chosen |
| `i18n-add-string` | i18n approach decided (`docs/architecture.md` §10) |

## Still blocked — **models / creative core**

| Skill | Encodes |
|---|---|
| `awarding-xp` ⭐ | server-authoritative XP: callable + idempotency key + `xpEvents` ledger + the level curve. No daily caps and no aspects — supply is the cap (`docs/decisions/xp-economy.md`) |
| `rive-avatar-contract` ⭐ | Rive input names as shared constants; app + funnel renderers in lockstep |
| `funnel-handoff` ⭐ | anon-auth → deep link → account-link; never redo the survey |
| `topical-questionnaire` | versioned questionnaires + value-axis weights; value-vector update decoupled from XP |
| `moderation-pipeline` | UGC moderation required on comment/post paths + report queue |

The three ⭐ are the highest-value, most project-specific guardrails — prioritize them as soon
as the models are defined.

### `values-privacy` — partially unblocked

The value axes are locked and `packages/shared/src/values/` exists, so the *subject* of this
skill is now concrete. What it still lacks is a storage location and an exposure surface: there
is no `valueProfile` collection and nothing renders another user's vector yet. Write it when the
first of those lands — and before, not after, the vector is first persisted.
