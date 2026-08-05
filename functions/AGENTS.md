# functions — Agent Notes

Firebase Cloud Functions — **the only writer of the gamification economy.** Anything a client
cannot be trusted to write lives here.

**npm, not pnpm.** This directory is deliberately outside the pnpm workspace (see
`pnpm-workspace.yaml`) because `firebase deploy` packages `functions/` on its own and does not
understand a symlinked store. Run every command with `npm --prefix functions run <script>`, and
commit `functions/package-lock.json`.

```
npm --prefix functions run typecheck   # tsc --noEmit, src + test
npm --prefix functions run lint        # the no-console gate
npm --prefix functions test            # vitest
npm --prefix functions run build       # lint, then tsc -p tsconfig.build.json → lib/
```

`build` runs `lint` first **on purpose** — that is what makes the no-console rule a build gate
rather than a suggestion. Don't split them.

## Logging

Every log goes through `src/lib/logger.ts`, which requires a `handler` field naming the callable
or trigger. Cloud Logging cannot filter on free text, so an unstructured line is an unqueryable
line. Raw `console.*` is an ESLint **error** and fails the build; `test/no-console-gate.test.ts`
asserts the rule is still an error, so relaxing it during a lint cleanup breaks a test.

Pass a caught value as `cause` — `logger.error` unwraps `Error` into name/message/stack, since
an `Error` does not survive JSON serialization.

**Never log special-category data** — no raw eco-value vectors, no survey answers. Log a hashed
uid and the axis *count* touched, not the values (`values-privacy`).

## What will live here

- **Callable economy functions** — `submitSurvey`/`computeAvatar`, `awardXp`, `levelUp`,
  `claimReferral`, questionnaire submission + value-vector update. Every XP-bearing call takes
  an **idempotency key**, enforces **daily caps** against the append-only `xpEvents` ledger, and
  is server-authoritative (`awarding-xp`, `guardrail-enforcement`).
- **Triggers** — post fan-out to `feeds/<uid>`, sharded counter maintenance, leaderboard
  read-model recompute, FCM on level-up / referral-converted.
- **Moderation** — a required step on any user-generated-content write path
  (`moderation-pipeline`).

None of it exists yet: the shapes are blocked on `docs/architecture.md` §10. `src/index.ts`
exports nothing, and that is the correct state until the models land.

`firebase-admin` is used directly here — never the client SDK, and never
`@ecomania/shared`'s services (those are client-side by definition). Shared *types* may be
mirrored, but this package is not a pnpm workspace member and cannot import it.

## Don't

- Don't start the emulator — the user runs it.
- Don't deploy to beta/prod (`firestore-deploy` refuses; CI owns those).
- Don't add a `console.*` escape hatch, or an eslint-disable for it.

See the root [`AGENTS.md`](../AGENTS.md) and [`docs/architecture.md`](../docs/architecture.md).
