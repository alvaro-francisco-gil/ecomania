# Plan: bootstrap the apps

Scaffold the monorepo's runnable pieces. This is pure structure (no product models), so it
can proceed before the §10 open questions in `docs/architecture.md` are resolved. Promote via
`managing-plans-lifecycle`, then slice with `prd-to-slices` and run through ralph.

## Goal
Turn the greenfield foundation into a buildable monorepo: typechecks, lints, and the apps
launch (locally, by the user — agents never start dev servers).

## Slices (sketch — refine in `prd-to-slices`)
1. **`packages/shared`** — TS project (vitest, tsconfig, build), empty `models/`, `services/`
   (+ `_services-map.md`), `avatar/`, `values/`, `economy/` with placeholder index exports.
2. **`functions`** — Firebase Functions project (Node), structured logger, lint + no-console
   gate, emulator-friendly test setup.
3. **`apps/funnel`** — `create-next-app` (App Router), Firebase web SDK wired, depends on
   `@ecomania/shared`, `@rive-app/react-canvas` installed, a placeholder reveal page rendering
   a sample `.riv`.
4. **`apps/mobile`** — Expo app (New Arch, dev client), `@react-native-firebase/*`,
   React Navigation, `rive-react-native` + Reanimated + Lottie, depends on `@ecomania/shared`.
5. **Root tooling** — pnpm scripts (`typecheck`, `lint`, `test`), commitlint + hooks, CI stub.

## Out of scope (blocked on architecture §10)
Data models, the survey instrument, value axes, archetype taxonomy, the economy values — and
therefore the ⭐ domain skills. Those come after the models are defined.
