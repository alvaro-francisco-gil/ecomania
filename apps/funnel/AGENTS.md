# apps/funnel — Agent Notes

The Next.js **web funnel** (App Router) — top-of-funnel only, *not* a peer of the game.
`@ecomania/funnel` in the pnpm workspace.

```
pnpm --filter @ecomania/funnel typecheck
pnpm --filter @ecomania/funnel lint
pnpm --filter @ecomania/funnel build
```

**Never run `next dev`** — the user starts dev servers (root AGENTS.md). Verify with `build`.

## What exists

- `src/app/page.tsx` — placeholder landing. It renders the value axes straight out of
  `@ecomania/shared`, which makes the workspace dependency a build-time assertion instead of a
  claim. Don't drop that import when the real landing copy lands; move it, or replace it with
  another real use of the shared package.
- `src/lib/firebase.ts` — client SDK init.

## What does not exist yet

The survey, the avatar reveal, the OG image, and `/invite/[code]`. All blocked on the survey
instrument and the archetype taxonomy (`docs/architecture.md` §10). The funnel→app handoff —
anonymous auth → deep link → account link — is the make-or-break flow when it lands; see
`funnel-handoff` and architecture §9. Its invariant: **never make the user redo the survey.**

## Environment

`src/lib/firebase.ts` reads six `NEXT_PUBLIC_FIREBASE_*` vars and **throws** when any is
missing — no silent fallback, because a funnel silently pointed at the wrong project writes
survey results into the void and we would find out from conversion numbers weeks later.

Each var is read as a literal property access. `NEXT_PUBLIC_*` is inlined at build time, so a
dynamic lookup (`process.env[key]`) silently yields `undefined` in the browser bundle. Keep the
reads literal.

Copy `.env.example` → `.env.local`. These are public client identifiers, not secrets — access is
controlled by Firestore rules, not by hiding the config.

## Constraints

- `@rive-app/react-canvas` renders the same `avatar.riv` the native app uses, driven by the same
  input names from `@ecomania/shared`. Neither renderer gets its own names
  (`rive-avatar-contract`).
- Never write economy fields (`xp`, `level`, `avatarState`, `counters`, the value
  vector) from here. Read them; mutate through Cloud Functions callables.
- The eco-value vector is GDPR special-category data — a shareable OG card must not leak it
  (`values-privacy`).

See the root [`AGENTS.md`](../../AGENTS.md) and [`docs/architecture.md`](../../docs/architecture.md).
