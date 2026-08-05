---
type: HITL
plan: bootstrap-apps
blocked_by: ["001-shared-package-scaffold", "004-sample-riv-asset-and-funnel-render"]
---

# `apps/mobile` — Expo app scaffold with the native dependency set

## What to build
An Expo React Native app (New Architecture, dev client) at `apps/mobile/`, depending on
`@ecomania/shared`, with the full native dependency set installed and a placeholder screen
rendering the sample `.riv`.

- `package.json` as `@ecomania/mobile`, `app.json`, `tsconfig.json`, `babel.config.js`.
- `@react-native-firebase/*` (app + auth + firestore + messaging), React Navigation,
  `rive-react-native`, `react-native-reanimated`, `lottie-react-native`.
- `App.tsx` + `src/navigation/` — a minimal navigation root with one placeholder screen that
  renders `packages/shared/assets/avatar.sample.riv` via `rive-react-native`.
- Rewrite `apps/mobile/AGENTS.md`: what exists, plus the rule that native dependency or
  `app.json` changes require a full native rebuild (a JS reload is not enough).

## Why HITL
Triple-locked by the classification rules: it creates `apps/mobile/app.json`, it adds **native
dependencies** (every one of which triggers `expo-native-rebuild`), and verifying it means
building and booting a dev client on a device or emulator — which the AFK loop cannot do.

## Acceptance criteria
- [ ] `pnpm --filter @ecomania/mobile typecheck` passes
- [ ] A dev client build succeeds for at least one platform
- [ ] The placeholder screen renders the sample `.riv` on a booted emulator/device
- [ ] The app resolves a real import from `@ecomania/shared`
- [ ] New Architecture is enabled in `app.json`
- [ ] Reanimated's babel plugin is last in `babel.config.js`

## Plan sections addressed
Slice 004 in `docs/plans/ready/bootstrap-apps.md`.

## Notes for the implementer
- **Never start Metro or `expo`** — the user runs these (root AGENTS.md).
- Companion skills, both stubs whose dependencies land here: `expo-native-rebuild` and
  `drive-android-avd`. Propose writing them once this slice is verified — this slice's actual
  rebuild + emulator steps are the content those skills need.
- Metro must resolve the shared package out of the monorepo root — expect to configure
  `watchFolders` / `nodeModulesPaths`.
- The `.riv` is loaded from the shared package's `assets/`, same file the funnel uses. Do not
  copy it into `apps/mobile`.
