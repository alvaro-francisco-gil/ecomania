# ecomania

A gamified ecology social app. You take an ecology survey, get an **ecoavatar** that
reflects your ecological personality, and level it up by interacting with the social
network — answering topical questionnaires about new ecology policies, posting opinions,
commenting, and referring friends. Heavily visual and animation-driven: it should feel
like a game.

## Shape

- **`apps/mobile/`** — Expo native app, *the game* (Rive avatar, Reanimated, Lottie). _Not scaffolded yet._
- **`apps/funnel/`** — Next.js web funnel: landing, the ecology survey, avatar reveal, `/invite`. _Not scaffolded yet._
- **`packages/shared/`** — `@ecomania/shared`: models, services, and the avatar / value / economy contracts.
- **`functions/`** — Firebase Cloud Functions — the only writer of the gamification economy.

## Start here

- **[`AGENTS.md`](./AGENTS.md)** — non-negotiable repo rules (agent-first).
- **[`docs/architecture.md`](./docs/architecture.md)** — the product + technical design and the decisions behind it.
- **[`docs/plans/ideas/`](./docs/plans/ideas/)** — what's planned next, including the backlog of agentic skills to write.

This repo is **greenfield** and **agent-first**: it currently holds the agentic foundation
(rules, docs, skills, the ralph AFK loop) that will bootstrap the apps themselves. The
first build plan is [`docs/plans/ideas/bootstrap-apps.md`](./docs/plans/ideas/bootstrap-apps.md).
