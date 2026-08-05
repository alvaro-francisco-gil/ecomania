# packages/shared — Agent Notes

`@ecomania/shared` — the shared brain used by **both** apps and (via mirrored types) the
Cloud Functions. TypeScript, strict, vitest.

```
pnpm --filter @ecomania/shared typecheck   # tsc --noEmit
pnpm --filter @ecomania/shared test        # vitest run
pnpm --filter @ecomania/shared build       # emits dist/ (ESM + .d.ts)
```

Two tsconfigs on purpose: `tsconfig.json` typechecks `src` + `test`; `tsconfig.build.json`
emits `src` only. Consumers import the built `dist/`, so **run `build` before typechecking an
app against a changed shared API** — a stale `dist/` is the usual cause of a confusing
"property does not exist" in the funnel or the app.

Because the output is consumed by both a Next.js bundler and Metro, relative imports inside
`src/` carry the `.js` extension (ESM resolution). Keep that up.

## Structure

- `src/models/` — the data shapes. **Source of truth.** _Empty — blocked on `docs/architecture.md` §10._
- `src/services/` — the **only** place client code imports the Firestore SDK. Indexed by
  `_services-map.md`. See `touch-service`. _Empty — blocked on the models._
- `src/avatar/` — the **Rive input contract**: input/data-binding names as constants, plus
  `computeInputs()`. Consumed identically by `rive-react-native` (app) and
  `@rive-app/react-canvas` (funnel). _Empty — blocked on the archetype taxonomy._
- `src/values/` — ✅ **the value-axis contract.** Four locked axes, the vector type, and the
  moving-average nudge.
- `src/economy/` — XP rules: sources, daily caps, level curve, aspect mapping. _Empty — blocked
  on the XP numbers._
- `assets/` — `avatar.riv`, the single file both renderers load. _Not landed yet._

An empty barrel is a **statement**, not an oversight: the shape is blocked on a decision
recorded in `docs/architecture.md` §10. Don't invent a type to unblock yourself — resolve the
question, or ask.

## The value-axis contract (`src/values/`)

Four axes, locked 2026-08-05 (`docs/plans/ideas/value-axes-fourth-axis.md`). Each runs
`-1` (negative pole) → `+1` (positive pole), each drives one non-overlapping avatar channel:

| Axis | − | + | Channel |
|---|---|---|---|
| `moralStanding` | anthropocentric | ecocentric | silhouette |
| `means` | technological | sufficiency | material |
| `agency` | individual | collective | multiplicity |
| `power` | technocratic | grassroots | structure |

- **The sign convention is load-bearing.** Swapping a pole reverses every stored vector and
  every avatar visual — it is a data migration, not a rename.
- **Pole names are identifiers, never display copy.** Nobody self-describes as "technocratic";
  showing these words to a user biases the answer we are trying to measure. User-facing labels
  are neutral pairs (Institutional ↔ Community, Vertical ↔ Horizontal) from the message catalog.
- **No fifth axis.** Local↔Global was considered and dropped; reformist↔radical is the
  *intensity clock*, not an axis. Adding one is a decision, not a refactor.
- `nudgeValueVector` leaves axes an answer carries no weight on **untouched** — it does not pull
  them toward zero.
- Out-of-range inputs **throw**; nothing is silently clamped.
- The vector is **GDPR special-category data**. Storing, exposing, or matching on it needs
  consent and deliberate exposure rules (`values-privacy`).
- Value updates are a *measurement* — uncapped and not gameable. XP for the same submission is
  a separate capped, idempotent call. Never fuse them.

The three contracts (`avatar`, `values`, `economy`) are the cross-cutting agreements that keep
the funnel, the app, the Functions, and the designer's `.riv` in lockstep. Treat a rename in any
of them as a contract change touching every consumer.

See the root [`AGENTS.md`](../../AGENTS.md) and [`docs/architecture.md`](../../docs/architecture.md).
