# ecomania — Agent Notes

Gamified ecology social app: eco-survey → evolving **ecoavatar** → social leveling.
pnpm monorepo · native Expo "game" + Next.js funnel · Firebase backend · Rive avatar.

> **Status: scaffolded, not built.** All four workspaces build, lint, and test. What does
> **not** exist is the product: no data models, no survey, no XP economy, no avatar asset.
> Those are blocked on the creative core (`docs/architecture.md` §10). An empty barrel in
> `packages/shared` is a deliberate statement that a decision is pending — don't fill it in to
> unblock yourself. Grep/read before assuming either that code exists or that it doesn't.

## North Star — long-term repo health
Every change must leave the repo **cheaper to navigate and modify next time**. This goal
outranks every other rule below. If anything here conflicts with repo cleanliness, flag it.

In practice: delete rather than deprecate, consolidate duplicates when you spot them, fix
stale docs the moment you see them, and leave every file you touch a little better.

## Layout
- `apps/mobile/` — Expo native app, *the game* (Rive avatar, Reanimated, Lottie, `@react-native-firebase`).
- `apps/funnel/` — Next.js web funnel: landing, ecology survey, avatar reveal, `/invite/[code]`.
- `packages/shared/` — `@ecomania/shared`: models, services, and the **avatar / value / economy contracts**. TypeScript.
- `functions/` — Firebase Cloud Functions. **The only writer of the economy.**
- `docs/architecture.md` — the product + technical design. **Read this first.**
- `docs/plans/{ideas,ready,ongoing}/` — plans by lifecycle stage; retire to `docs/decisions/`. See `managing-plans-lifecycle`.
- `implementation-queue/` + `ralph/` — the AFK loop that scaffolds and builds slices.
- `.claude/skills/` — house procedures. Many are **STUBs** pending structure/models — see `docs/plans/ideas/agentic-skills-backlog.md`.

## Agent-first
This repo is designed for agents to read and modify, not for humans browsing API docs.
Lean on strict types, descriptive names, banner sections, and the services map at
`packages/shared/src/services/_services-map.md`. Skip ceremony docs (per-function API
references, hand-maintained "Used in" lists) — they go stale, burn tokens, and grep is more
reliable. Add a comment only when something can't be derived from types or names: side
effects, preconditions, "use X instead".

## Core rules
1. **Models are source of truth.** Reuse the interfaces in `packages/shared/src/models/`
   before defining new shapes. Data crossing service/component/hook boundaries must match a
   model. _(Still empty — blocked on `docs/architecture.md` §10. Empty means "decide first",
   not "invent one here".)_
2. **The economy is server-authoritative** (see the invariant below). This is the rule
   most likely to be violated by a well-meaning shortcut.
3. **No retrocompat shims** unless explicitly asked. When changing a data shape, call out
   that existing data needs migration.
4. **Avoid silent fallbacks.** Prefer explicit errors over defaults that mask bugs.
5. **Production-grade, scale-first.** Built for high volume from day one: no hot documents
   (use sharded counters / read-models), `FlatList` for growing lists, proper async error
   handling, loading + error states.
6. **Reuse first.** Check `packages/shared` and the app's components/hooks before writing new code.

## The economy invariant — non-negotiable from day one
Clients **NEVER** write `xp`, `level`, `avatarState`, `aspects`, `counters`, or the
eco-**value vector**. All such mutations go through Cloud Functions (`functions/`) with an
**idempotency key**, landing a row in the append-only `xpEvents` ledger. Firestore rules
enforce the client denial, and a rules test must prove it **before** any economy collection
ships. XP is *earned* (capped, anti-cheat); the value vector is *measured* (not gameable)
and is **GDPR special-category data** — consent + careful exposure (see `values-privacy`,
once written). Detail lives in `docs/architecture.md`.

## Don't
- **Never start dev servers** (Metro, `expo`, `next dev`, Firebase emulators) — the user runs these.
- Don't add comments that restate the code. No "added for X" / "used by Y" notes.
- Don't bypass hooks (`--no-verify`) or amend commits unless asked.
- Don't deploy Firebase to beta/production without explicit confirmation.
- Don't leave half-finished states. If a change can't land cleanly this session, revert it.
- Don't keep dead code "just in case". Delete it; git remembers.

## Be proactive
You're expected to **propose improvements, not just execute tasks**. End your response with
a one-line suggestion (or an inline diff if under ~10 lines) when you notice:
- **Repeated manual ops (2+ times)** → script in `scripts/`.
- **Encodable workflow** → a skill under `.claude/skills/<name>/SKILL.md`.
- **Convention used in 3+ places but undocumented** → add to this file, or a sub-directory `AGENTS.md`.
- **Single source of truth violated** (duplicated enum, threshold, hex, status string) → consolidate.
- **Docs contradicting code** → fix or delete the doc.
- **A STUB skill whose dependency now exists** → propose writing it (see the backlog).

Soft proposals are the default — surface, then wait. Don't pre-implement large refactors uninvited.

## Verifying a change
```sh
pnpm typecheck && pnpm lint && pnpm test      # all four workspaces, functions included
pnpm --filter @ecomania/shared build          # apps typecheck against dist/ — build it first
pnpm --filter @ecomania/mobile exec expo export --platform android   # Metro resolution
```

Two non-obvious facts about this workspace:

- **`node-linker=hoisted` in `.npmrc` is load-bearing.** Metro cannot follow pnpm's default
  symlinked layout; without it `apps/mobile` stops bundling while everything else keeps
  working. See `apps/mobile/AGENTS.md`.
- **`functions/` is npm-managed and not a workspace member** — `firebase deploy` packages it
  itself. Root scripts reach it via an explicit `npm --prefix functions` call; that is why each
  one has an `&&` tail rather than relying on the pnpm filter.

`tsc` and Metro resolve differently, so a green typecheck does not prove the app bundles.
CI runs the export for that reason.

## Branch management
- Base branch is `main`. New branches always branch off `main`. Naming: `feat/...`, `fix/...`.
- **Two work modes — ask which when unstated:** *Direct* (simple/low-risk → work locally,
  push to `main`) vs *Isolated* (complex/risky → its own branch in a **separate git worktree**
  under `.claude/worktrees/`).
- **Never move the main working checkout off `main`.** If isolation is needed, create a
  worktree — never `git checkout <branch>` in the primary working copy.

## Conventions
- TypeScript everywhere new; explicit types on exports.
- Commits: conventional (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`). "Why" in the body when non-obvious.
- **Names over comments.** Agents read identifiers, not prose. Rename rather than comment-and-leave.
- Plans live in `docs/plans/`; promote via `managing-plans-lifecycle`.

## Tests
- **`packages/shared`** — vitest (`test/**/*.test.ts`). Wired.
- **`functions/`** — vitest. Wired. Includes `test/no-console-gate.test.ts`, which asserts the
  structured-logging build gate is still an *error* — so relaxing the rule during an unrelated
  lint cleanup fails a test rather than quietly passing.
- **Firestore rules** — `@firebase/rules-unit-testing`. Not wired: there are no collections yet.
  A rules test proving the economy denial must land **before** the first economy collection
  ships (see the invariant above).
- **Mobile E2E** — Maestro, mirroring the sibling repos. Not wired: there are no flows yet.

`apps/funnel` has no test harness yet — its only logic is Firebase env validation. Add vitest
when the survey lands, not before.
