/**
 * Cloud Functions entry point — the only writer of the gamification economy.
 *
 * Nothing is exported yet. The callables (`submitSurvey`, `awardXp`, `claimReferral`,
 * questionnaire submission) and triggers (post fan-out, level-up, leaderboard read-models) are
 * blocked on the data models — `docs/architecture.md` §10.
 *
 * When the first one lands: every XP-bearing call takes an idempotency key, enforces its daily
 * cap against the append-only `xpEvents` ledger, and logs through `lib/logger.js`. See
 * `awarding-xp` and `guardrail-enforcement`.
 */
export {};
