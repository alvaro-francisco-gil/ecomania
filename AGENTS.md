# ecomania — Agent Notes

Gamified ecology social app: eco-survey → evolving **ecoavatar** → social leveling.
pnpm monorepo · native Expo "game" + Next.js funnel · Firebase backend · Rive avatar.

> **Status: greenfield.** The apps under `apps/` are **not scaffolded yet**. This repo
> currently holds the agentic foundation — rules, the design (`docs/architecture.md`),
> the skills, and the ralph AFK loop that will bootstrap the rest. Don't assume code
> exists; grep/read first.

## North Star — long-term repo health
Every change must leave the repo **cheaper to navigate and modify next time**. This goal
outranks every other rule below. If anything here conflicts with repo cleanliness, flag it.

In practice: delete rather than deprecate, consolidate duplicates when you spot them, fix
stale docs the moment you see them, and leave every file you touch a little better.

## Layout
- `apps/mobile/` — Expo native app, *the game* (Rive avatar, Reanimated, Lottie, `@react-native-firebase`). _Not scaffolded yet._
- `apps/funnel/` — Next.js web funnel: landing, ecology survey, avatar reveal, `/invite/[code]`. _Not scaffolded yet._
- `packages/shared/` — `@ecomania/shared`: models, services, and the **avatar / value / economy contracts**. TypeScript.
- `functions/` — Firebase Cloud Functions. **The only writer of the economy.**
- `docs/architecture.md` — the product + technical design. **Read this first.**
- `docs/plans/{ideas,ready,ongoing}/` — plans by lifecycle stage; retire to `docs/decisions/`. See `managing-plans-lifecycle`.
- `implementation-queue/` + `ralph/` — the AFK loop that scaffolds and builds slices.
- `.claude/skills/` — house procedures. Many are **STUBs** pending structure/models — see `docs/plans/ideas/agentic-skills-backlog.md`.

## Agent-first
This repo is designed for agents to read and modify, not for humans browsing API docs.
Lean on strict types, descriptive names, banner sections, and (once it exists) the services
map at `packages/shared/src/services/_services-map.md`. Skip ceremony docs (per-function API
references, hand-maintained "Used in" lists) — they go stale, burn tokens, and grep is more
reliable. Add a comment only when something can't be derived from types or names: side
effects, preconditions, "use X instead".

## Core rules
1. **Models are source of truth.** Once `packages/shared/src/models/` exists, reuse its
   interfaces before defining new shapes. Data crossing service/component/hook boundaries
   must match a model. _(Models are TBD — see `docs/architecture.md`.)_
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

## How this repo bootstraps itself
The apps don't exist yet. The path: `write-a-prd` → `prd-to-slices` → run the ralph loop
(`pnpm ralph:once` / `pnpm ralph:afk`) to scaffold `apps/mobile`, `apps/funnel`,
`packages/shared`, and `functions`. The first build plan is
`docs/plans/ideas/bootstrap-apps.md`.

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
TBD — harnesses are wired up when the apps are scaffolded. Expect: vitest for
`packages/shared`, an emulator harness for `functions/`, `@firebase/rules-unit-testing` for
rules, and Maestro for mobile E2E (mirroring the sibling repos).
