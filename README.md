# ecomania

A gamified ecology social app. You take an ecology survey, get an **ecoavatar** that
reflects your ecological personality, and level it up by interacting with the social
network — answering topical questionnaires about new ecology policies, posting opinions,
commenting, and referring friends. Heavily visual and animation-driven: it should feel
like a game.

## Shape

- **`apps/mobile/`** — Expo native app, *the game* (Rive avatar, Reanimated, Lottie).
- **`apps/funnel/`** — Next.js web funnel: landing, the ecology survey, avatar reveal, `/invite`.
- **`packages/shared/`** — `@ecomania/shared`: models, services, and the avatar / value / economy contracts.
- **`functions/`** — Firebase Cloud Functions — the only writer of the gamification economy.

`functions/` is npm-managed and deliberately outside the pnpm workspace, because
`firebase deploy` packages it on its own.

## Verify

```sh
pnpm install
npm --prefix functions install
pnpm --filter @ecomania/shared build   # the apps typecheck against dist/

pnpm typecheck && pnpm lint && pnpm test
```

Each root script fans out across all four workspaces, `functions/` included.

Dev servers are **not** started by agents — run `pnpm --filter @ecomania/funnel dev` or
`pnpm --filter @ecomania/mobile start` yourself. To check the native app bundles without a
server: `pnpm --filter @ecomania/mobile exec expo export --platform android`.

## Where the work stands

The scaffold builds end to end, but the product is not built: no data models, no survey, no XP
economy, no avatar. Those are blocked on the **creative core** — the survey instrument and the
archetype taxonomy. The **value axes are decided** (four, locked 2026-08-05) and live in
`packages/shared/src/values/`.

## Start here

- **[`AGENTS.md`](./AGENTS.md)** — non-negotiable repo rules (agent-first).
- **[`docs/architecture.md`](./docs/architecture.md)** — the product + technical design and the decisions behind it. §10 lists what is still open.
- **[`docs/plans/`](./docs/plans/)** — plans by lifecycle stage; `ideas/` holds the creative-core and app-design explorations.
