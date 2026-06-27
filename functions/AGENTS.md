# functions — Agent Notes

**Not scaffolded yet.** Firebase Cloud Functions — **the only writer of the gamification
economy.** Anything a client cannot be trusted to write lives here.

What will live here:
- **Callable economy functions** — `submitSurvey`/`computeAvatar`, `awardXp`, `levelUp`,
  `claimReferral`, questionnaire submission + value-vector update. Every XP-bearing call
  takes an **idempotency key**, enforces **daily caps** against the `xpEvents` ledger, and is
  server-authoritative (see `awarding-xp`, once written).
- **Triggers** — post fan-out to `feeds/<uid>`, counter maintenance (sharded), leaderboard
  read-model recompute, FCM on level-up / referral-converted.
- **Moderation** — required step on any user-generated-content write path (see `moderation-pipeline`).

Conventions (mirroring the sibling repos): structured logger (`logger.info(msg, { handler, ...})`),
no raw `console.*` (a build gate will enforce it — see `cloud-function-logging`). `firebase-admin`
is used directly here (separate from the client SDK).

See the root [`AGENTS.md`](../../AGENTS.md) and [`docs/architecture.md`](../../docs/architecture.md).
