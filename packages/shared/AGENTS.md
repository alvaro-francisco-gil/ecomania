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
- `src/avatar/` — ✅ **the Rive input contract.** Frozen input names, the base-form registry, the
  elements, and `computeAvatarInputs()`. Consumed identically by `rive-react-native` (app) and
  `@rive-app/react-canvas` (funnel).
- `src/values/` — ✅ **the value-axis contract.** Four locked axes, the vector type, and the
  moving-average nudge.
- `src/economy/` — ✅ **the XP clock.** The level curve. No source table: each questionnaire
  declares its own XP value, and there are no daily caps — supply is the cap
  (`docs/decisions/xp-economy.md`).
- `assets/` — the `.riv` files both renderers load. Currently only `avatar.sample.riv`, a
  placeholder; `avatar.person.riv` and `avatar.tree.riv` are commissioned, not delivered.

An empty barrel is a **statement**, not an oversight: the shape is blocked on a decision
recorded in `docs/architecture.md` §10. Don't invent a type to unblock yourself — resolve the
question, or ask.

## The value-axis contract (`src/values/`)

Four axes, locked 2026-08-05 (`docs/projects/value-system.md`). Each runs `-1` (negative pole)
→ `+1` (positive pole), each drives one non-overlapping avatar channel:

| Axis | − | + | Channel |
|---|---|---|---|
| `moralStanding` | anthropocentric | ecocentric | base form *(picks the `.riv`)* |
| `means` | technological | sufficiency | surface |
| `agency` | individual | collective | companions |
| `power` | technocratic | grassroots | geometry |

- **The sign convention is load-bearing.** Swapping a pole reverses every stored vector and
  every avatar visual — it is a data migration, not a rename.
- **Sign is identity, magnitude is only intensity.** There is **no neutral rendering on any
  axis**: `+0.1` and `+0.9` are the same look at different strengths, never a blend of the two
  poles. So `ORIGIN_VALUE_VECTOR` is a *data* zero, not a third visual state — don't read a 0
  as "unknown", that is what the per-axis answered count is for.
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

## The Rive contract (`src/avatar/`)

`computeAvatarInputs({ vector, elementId, auraIntensity })` is the single mapping from stored
state to a rendered avatar. Both renderers call it; neither computes anything itself. That is
what makes the funnel's reveal and the app's home screen provably the same creature.

- **The input names are frozen.** `surface` · `companions` · `geometry` · `aura`. Renaming one
  breaks both apps at once *and* desynchronises them from the `.riv`. It is an explicit request
  with a PR touching all three, never a silent adjustment.
- **`50` is the boundary, not a midpoint.** Inputs run `0..100`; below 50 is the negative pole,
  at-or-above is the positive one, and distance from 50 is the marker's density. One number
  carries identity *and* intensity, which is why a questionnaire can move the avatar visibly
  without crossing a pole.
- **`moralStanding` has no input** — it selects which `.riv` artboard to load. A topology change
  cannot be interpolated, and it is the only axis gated behind a consented morph ceremony.
- **`BASE_FORMS` must stay even**, split evenly across the poles; a test enforces it. An odd
  count makes the middle form a smuggled neutral. Growing 2 → 4 is data plus `.riv` files, with
  no change to the selection rule.
- **The element never touches the body.** It selects the aura's *material*; the clock owns its
  intensity. A test asserts changing the element leaves every input identical.
- **`auraIntensity` is passed in, not derived** — the XP curve does not exist yet, and inventing
  one inside a mapping function would bury a product decision. When it lands it belongs in
  `../economy/`.
- Corrupt values **throw**. Rendering a plausible avatar from a broken vector hides the bug.

The three contracts (`avatar`, `values`, `economy`) are the cross-cutting agreements that keep
the funnel, the app, the Functions, and the designer's `.riv` in lockstep. Treat a rename in any
of them as a contract change touching every consumer.

See the root [`AGENTS.md`](../../AGENTS.md) and [`docs/architecture.md`](../../docs/architecture.md).
