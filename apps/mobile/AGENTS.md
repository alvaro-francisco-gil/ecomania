# apps/mobile — Agent Notes

The Expo native app — *the game*. `@ecomania/mobile` in the pnpm workspace.
Expo SDK 57, React Native 0.86, New Architecture on.

```
pnpm --filter @ecomania/mobile typecheck
cd apps/mobile && npx expo export --platform android   # bundles without a dev server
```

**Never start Metro or `expo start`** — the user runs dev servers (root AGENTS.md). To verify a
change actually bundles, use `expo export`; it exercises the full Metro graph and is the check
that catches monorepo resolution breakage.

## Two pieces of infrastructure that will bite you

**`node-linker=hoisted` in the repo root `.npmrc` is load-bearing.** Metro cannot follow pnpm's
default symlinked layout and fails to resolve packages' own transitive dependencies — `expo`
cannot find `expo-modules-core`, and the error reads like a missing install rather than a
layout problem. If someone "cleans up" that `.npmrc`, the app stops bundling while everything
else in the repo keeps working.

**`metro.config.js` watches the workspace root** and adds the root `node_modules` to the
resolver path. Hierarchical lookup stays **enabled** — disabling it (a common monorepo
suggestion) causes exactly the failure above.

## Native changes need a native rebuild

A JS reload is not enough after: adding or removing a native dependency, editing `app.json` or
a config plugin, or pulling a branch that did either. The dev client must be rebuilt, or the
app crashes on launch with an error unrelated to the actual change. See `expo-native-rebuild`.

Native dependencies land via `npx expo install <pkg>`, never `pnpm add` — Expo resolves the
version matching the SDK, and hand-picked versions are a reliable way to produce a build that
compiles and then crashes at runtime.

Config plugins currently registered in `app.json`: `@react-native-firebase/app`, `/auth`,
`/messaging` (added automatically by `expo install`).

## What exists

- `src/navigation/RootNavigator.tsx` — a one-screen stack. Placeholder: the real information
  architecture is being designed in `docs/plans/ideas/app-design-exploration.md`.
- `src/screens/AvatarScreen.tsx` — renders the value axes out of `@ecomania/shared`, which makes
  the workspace dependency a compile-time assertion instead of a claim.

## The avatar is not rendered yet

`rive-react-native` is installed, but `packages/shared/assets/avatar.riv` does not exist. A
`.riv` is a binary authored in the Rive editor — adopting even a placeholder is a human
decision about which sample and under what licence. The screen shows the data that will drive
the avatar rather than faking the avatar.

When it lands: the avatar is driven **only** through the shared Rive input contract
(`packages/shared/src/avatar/`), the same names the funnel's `@rive-app/react-canvas` renderer
uses. Same file, same names, both renderers (`rive-avatar-contract`).

`scheme: "ecomania"` in `app.json` is what makes the funnel's `ecomania://claim?anon=…` deep
link resolve — it is part of the funnel→app handoff (`funnel-handoff`), not decoration.

## Constraints

- Never write economy fields (`xp`, `level`, `avatarState`, `aspects`, `counters`, the value
  vector) from the client. Read them; mutate through Cloud Functions callables.
- `FlatList` for any growing list, with real loading and error states (root AGENTS.md, §5).
- Reanimated 4's Babel plugin is `react-native-worklets/plugin` and must stay **last** in
  `babel.config.js`.

See the root [`AGENTS.md`](../../AGENTS.md) and [`docs/architecture.md`](../../docs/architecture.md).
