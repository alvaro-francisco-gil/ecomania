# Agentic skills backlog

Tracks the `.claude/skills/` set: what's written, and what's stubbed pending a dependency.
A stub has correct frontmatter (so it's discoverable) but a `## STUB` body. When a stub's
dependency lands, write the real procedure (and remove it from this list).

## Written (process skills — structure-independent)
- `managing-plans-lifecycle`, `write-a-prd`, `prd-to-slices`, `grill-me`, `tdd`, `fix-bug`,
  `improve-codebase-architecture`

## Stubbed — pending **structure** (write when the named thing exists)
| Skill | Write once… |
|---|---|
| `touch-service` | `packages/shared/src/services/` exists |
| `add-firestore-collection` | first Firestore collections defined |
| `denormalized-read-model` | first read-model + trigger |
| `cloud-function-logging` | `functions/src/` exists |
| `observability-conventions` | telemetry stack chosen |
| `firestore-deploy` | firebase deploy scripts wired |
| `gcloud-ecomania` | GCP project + named config set up |
| `guardrail-enforcement` / `guardrail-audit` | services + rules + functions exist |
| `expo-native-rebuild` / `drive-android-avd` | `apps/mobile/` scaffolded |
| `prepare-release` | `apps/mobile/app.json` + CHANGELOG release flow |
| `parallel-agent-workflow` | per-slot Metro/emulator/port infra under `.claude/worktrees/` |
| `i18n-add-string` | i18n approach decided |

## Stubbed — pending **models** (write once `docs/architecture.md` §10 is resolved)
| Skill | Encodes |
|---|---|
| `awarding-xp` ⭐ | server-authoritative XP: callable + idempotency key + daily caps + `xpEvents` ledger + aspect mapping |
| `rive-avatar-contract` ⭐ | Rive input names as shared constants; app + funnel renderers in lockstep |
| `funnel-handoff` ⭐ | anon-auth → deep link → account-link; never redo the survey |
| `topical-questionnaire` | versioned questionnaires + value-axis weights; value-vector update decoupled from XP |
| `values-privacy` | GDPR special-category handling for the eco-value vector |
| `moderation-pipeline` | UGC moderation required on comment/post paths + report queue |

The three ⭐ are the highest-value, most project-specific guardrails — prioritize them as soon
as the models are defined.
