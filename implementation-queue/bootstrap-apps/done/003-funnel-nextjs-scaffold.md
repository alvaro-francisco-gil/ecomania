---
type: AFK
plan: bootstrap-apps
blocked_by: ["001-shared-package-scaffold"]
allowed_paths:
  - apps/funnel/**
forbidden_paths:
  - firestore.rules
  - firestore.indexes.json
  - functions/**
  - apps/mobile/**
  - apps/mobile/app.json
  - apps/mobile/eas.json
  - eas.json
  - CHANGELOG.md
  - .github/workflows/**
  - scripts/deploy-*
  - scripts/admin-*
  - packages/shared/**
feedback_loop:
  - pnpm install
  - pnpm --filter @ecomania/funnel typecheck
  - pnpm --filter @ecomania/funnel lint
  - pnpm --filter @ecomania/funnel build
budget_iterations: 8
---

# `apps/funnel` — Next.js App Router scaffold + Firebase web SDK

## What to build
A buildable Next.js (App Router, TypeScript) app at `apps/funnel/`, depending on
`@ecomania/shared`, with the Firebase web SDK initialised from environment variables.

- `package.json` as `@ecomania/funnel`, `next.config.ts`, `tsconfig.json` with a path to the
  shared package.
- `src/app/layout.tsx` + `src/app/page.tsx` — a placeholder landing page. Plain, unstyled,
  no marketing copy invented; it exists to prove the build.
- `src/lib/firebase.ts` — client SDK init reading `NEXT_PUBLIC_FIREBASE_*` from env, throwing
  an explicit error when a required var is missing (no silent fallback).
- `.env.example` listing every required var with placeholder values. **No real keys committed.**
- Import something from `@ecomania/shared` so the workspace dependency is proven at build time.
- Rewrite `apps/funnel/AGENTS.md` to describe what exists.

## Acceptance criteria
- [ ] `pnpm --filter @ecomania/funnel build` succeeds
- [ ] `pnpm --filter @ecomania/funnel typecheck` passes
- [ ] Missing Firebase env vars produce an explicit thrown error, never a default
- [ ] `.env.example` covers every var `src/lib/firebase.ts` reads; no secrets committed
- [ ] The build resolves a real import from `@ecomania/shared`
- [ ] No `@rive-app/react-canvas` usage yet — that is slice 004

## Plan sections addressed
Slice 003 in `docs/plans/ready/bootstrap-apps.md`.

## Notes for the implementer
- **Never start `next dev`** (root AGENTS.md). Verify with `build`, not by serving.
- Mirrors `ordago-apps/apps/ordago-web` if that repo is reachable.
- Do not build the survey, the reveal, or `/invite/[code]` — those need the creative core and
  the funnel-handoff design. Landing page + Firebase init only.
