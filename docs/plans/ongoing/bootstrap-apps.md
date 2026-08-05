# Plan: bootstrap the apps

Scaffold the monorepo's runnable pieces. This is pure structure (no product models), so it
proceeds before the §10 open questions in `docs/architecture.md` are resolved.

## Goal
Turn the greenfield foundation into a buildable monorepo: `pnpm typecheck`, `pnpm lint`, and
`pnpm test` pass at the root, and both apps launch locally (started **by the user** — agents
never start dev servers).

## Status

- **Updated:** 2026-08-05
- **Stage:** 7 of 8 slices done. Only slice 004 (the sample `.riv` asset) remains.
- **Branch:** `main` — direct mode, docs + scaffold only, nothing deployed.
- **Done:** `packages/shared` (incl. the locked value-axis contract, 17 tests) · `functions`
  (structured logger + no-console build gate, 7 tests) · `apps/funnel` (Next.js 16, Firebase
  init) · `apps/mobile` (Expo SDK 57, 11 native deps, bundles) · root scripts + commitlint
  hook · CI workflow · docs de-greenfielded.
- **Next:** source a placeholder `avatar.riv`, then render it in both `/reveal` (funnel) and
  `AvatarScreen` (mobile).
- **Blockers:** slice 004 needs a **human** — a `.riv` is a binary from a proprietary editor,
  and adopting a sample means accepting its licence. No agent can author one.
- **Handoff:**
  - `node-linker=hoisted` in `.npmrc` is **load-bearing** — Metro cannot follow pnpm's default
    symlinked layout. Removing it breaks only `apps/mobile`, and the error reads like a missing
    install.
  - `tsc` and Metro resolve differently. A green typecheck does not prove the app bundles;
    verify with `pnpm --filter @ecomania/mobile exec expo export --platform android`.
  - The apps consume `@ecomania/shared` from `dist/` — build it before typechecking them.
  - CI has never run (no GitHub remote exercised yet). Expect one round of fixes on first push.
  - No Firebase project exists, so nothing has been deployed and `.env.local` is unfilled. The
    funnel builds regardless: config is validated at call time, not build time.

## Rollout status

| Slice | Built | Verified |
|---|---|---|
| 001 `packages/shared` | ✅ | ✅ typecheck · 17 tests · build |
| 002 `functions` | ✅ | ✅ typecheck · lint · 7 tests · gate breaks a build |
| 003 `apps/funnel` | ✅ | ✅ typecheck · lint · production build |
| 004 sample `.riv` | ⬜ | ⬜ **blocked on a human** |
| 005 `apps/mobile` | ✅ | ⚠️ typecheck + Metro bundle only — **never run on a device** |
| 006 root tooling | ✅ | ✅ all four gates green · commitlint rejects/accepts |
| 007 CI | ✅ | ⚠️ authored, never executed |
| 008 docs | ✅ | ✅ |

Legend: ⬜ pending · ⏳ in progress · ✅ done · ⚠️ done but unverified (note inline)

## Approach

Five slices, each a thin path through its own workspace. They stack bottom-up: `packages/shared`
first (everything depends on it), then `functions` (independent of the apps), then the two apps,
then the root tooling that ties them together.

Everything scaffolded here is **structure with placeholder content**. No product model, no
value axis, no XP value, no archetype is invented by this plan — those are blocked on the
creative core. Where a slice needs a shape to compile against, it exports a deliberately empty
module with a `TBD` note pointing at `docs/architecture.md` §10.

The Rive integration is built against a **placeholder/sample `.riv`**, not the real avatar —
the Rive Cadet plan ($9/mo, which gates export) is not needed until the designer exports the
real one.

## File Structure

### Create
```
packages/shared/package.json                    @ecomania/shared
packages/shared/tsconfig.json
packages/shared/vitest.config.ts
packages/shared/src/index.ts                    re-exports the five sub-barrels
packages/shared/src/{models,services,avatar,values,economy}/index.ts   placeholder barrels
packages/shared/src/services/_services-map.md   the index touch-service will maintain
packages/shared/test/smoke.test.ts
packages/shared/assets/avatar.sample.riv        placeholder asset, both renderers point here

functions/package.json                          npm-managed, NOT a pnpm workspace member
functions/tsconfig.json
functions/.eslintrc.cjs                         includes the no-console gate
functions/src/index.ts                          exports nothing yet
functions/src/lib/logger.ts                     logger.info(msg, { handler, ...fields })
functions/test/logger.test.ts

apps/funnel/package.json                        next, react, firebase, @rive-app/react-canvas
apps/funnel/next.config.ts
apps/funnel/tsconfig.json
apps/funnel/src/app/{layout.tsx,page.tsx}       placeholder landing
apps/funnel/src/app/reveal/page.tsx             renders the sample .riv
apps/funnel/src/lib/firebase.ts                 web SDK init from env
apps/funnel/.env.example

apps/mobile/package.json                        expo, RN New Arch, @react-native-firebase/*,
                                                rive-react-native, reanimated, lottie
apps/mobile/app.json
apps/mobile/tsconfig.json
apps/mobile/babel.config.js
apps/mobile/App.tsx                             placeholder screen rendering the sample .riv
apps/mobile/src/navigation/                     React Navigation root

.github/workflows/ci.yml                        typecheck + lint + test
commitlint.config.cjs
.husky/commit-msg
```

### Modify
```
package.json                 add typecheck / lint / test / build scripts + devDeps
README.md                    drop the "Not scaffolded yet" markers as each app lands
AGENTS.md                    drop the greenfield Status banner once slice 005 is done
apps/{mobile,funnel}/AGENTS.md, functions/AGENTS.md, packages/shared/AGENTS.md
                             replace "Not scaffolded yet" with the real local conventions
docs/plans/ideas/agentic-skills-backlog.md
                             strike the structure-pending skills this plan unblocks
```

### Delete
```
apps/funnel/.gitkeep · apps/mobile/.gitkeep · functions/src/.gitkeep · scripts/.gitkeep
```

## Tasks

### Slice 001 — `packages/shared`
- [ ] TS project: `package.json`, `tsconfig.json`, vitest config, build script
- [ ] Placeholder barrels for `models/`, `services/`, `avatar/`, `values/`, `economy/`
- [ ] `src/services/_services-map.md` seeded with its own format doc
- [ ] A smoke test proving the vitest harness runs
- [ ] Rewrite `packages/shared/AGENTS.md` to describe what now exists

### Slice 002 — `functions`
- [ ] Firebase Functions project (Node, TS), npm-managed; `firebase.json` already points here
- [ ] Structured logger at `src/lib/logger.ts` — `logger.info(msg, { handler, ...fields })`
- [ ] ESLint `no-console` gate wired into the build, with a test proving it fails on `console.*`
- [ ] Emulator-friendly test setup (no emulator started by agents)
- [ ] Rewrite `functions/AGENTS.md`

### Slice 003 — `apps/funnel`
- [ ] `create-next-app` (App Router, TS), depends on `@ecomania/shared`
- [ ] Firebase web SDK init from env + `.env.example` (no real keys committed)
- [ ] `@rive-app/react-canvas` installed; `/reveal` renders `avatar.sample.riv`
- [ ] Rewrite `apps/funnel/AGENTS.md`

### Slice 004 — `apps/mobile`
- [ ] Expo app, New Architecture, dev client, depends on `@ecomania/shared`
- [ ] `@react-native-firebase/*` + React Navigation
- [ ] `rive-react-native` + Reanimated + Lottie installed; a screen renders `avatar.sample.riv`
- [ ] Rewrite `apps/mobile/AGENTS.md`; note the native-rebuild requirement

### Slice 005 — root tooling
- [ ] Root scripts: `typecheck`, `lint`, `test`, `build` fanning out across workspaces
- [ ] commitlint + husky `commit-msg` hook (conventional commits)
- [ ] CI workflow running typecheck + lint + test on PRs to `main`
- [ ] Drop the greenfield banners from `AGENTS.md` and `README.md`
- [ ] Update `agentic-skills-backlog.md` — mark the newly unblocked skills

## Out of scope
Data models, the survey instrument, value axes, archetype taxonomy, XP values and the level
curve — and therefore the ⭐ domain skills. All blocked on `docs/architecture.md` §10 and the
creative-core exploration. Also out of scope: the real `avatar.riv` (designer-owned), any
Firebase deploy, and any GCP project setup.

## Gate
None — this plan is unblocked and starts whenever a machine is available. Running it through
the ralph AFK loop needs the local checkout (`ralph/afk.sh`), so execution waits on the server;
slicing it does not.
