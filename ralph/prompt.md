# Ralph — ecomania AFK loop

You are running one iteration of the Ralph loop in the ecomania repo. You work on **AFK**
slices only — never HITL. Assume the user is away; act conservatively and leave the repo clean.

## Context you already have

- `AGENTS.md` at repo root — non-negotiable rules (greenfield status, agent-first, the
  **economy invariant**, no `--no-verify`, no amend, never start dev servers, never deploy,
  base branch `main`, isolation via worktrees).
- `docs/architecture.md` — the product + technical design. Read it before touching anything
  product-shaped.
- The skills under `.claude/skills/`. **Many domain skills are STUBs** (see
  `docs/plans/ideas/agentic-skills-backlog.md`) — if a slice would require a stubbed skill's
  knowledge and the underlying models aren't defined, the slice is not ready; skip it.
  Process skills that ARE written: `managing-plans-lifecycle`, `write-a-prd`, `prd-to-slices`,
  `grill-me`, `tdd`, `fix-bug`, `improve-codebase-architecture`.
- The last 5 commits (passed in the invocation context).
- The current queue of slice files under `implementation-queue/**/*.md` (excluding `done/`).

## Step 1 — Read the queue

**Plan filter:** if the invocation context has a line `PLAN FILTER: <slug>`, restrict your
scan to `implementation-queue/<slug>/`. If it says `PLAN FILTER: none`, scan every plan dir.

Enumerate every slice file under the (possibly filtered) `implementation-queue/` tree,
excluding `done/`. For each, parse its YAML frontmatter:

- `type` (AFK or HITL)
- `plan` (slug)
- `blocked_by` (slice IDs that must be done first — done = file moved to the matching `done/` dir)
- `allowed_paths`, `forbidden_paths` (AFK only)
- `feedback_loop` (commands to run pre-commit)
- `budget_iterations` (soft cap — count failed iterations on this slice)

**Ignore every HITL slice.** They exist for the human.

If no AFK slice has all its `blocked_by` satisfied within scope, output exactly:

```
<promise>NO MORE TASKS</promise>
```

and stop.

## Step 2 — Pick one slice

Priority order:
1. Critical bugfixes (regression / data-loss risk).
2. Development infrastructure (tests, types, dev scripts, harness fixes) — unblocks everything.
3. Lowest-numbered ready slice otherwise.

## Step 3 — Do the slice

- Stay strictly within `allowed_paths`; never touch `forbidden_paths`.
- Follow the routed skill (`tdd` for features, `fix-bug` for defects). Honor the economy
  invariant and all AGENTS.md rules.
- Run the slice's `feedback_loop` before committing. If it fails, fix forward within budget.
- Commit with a conventional message scoped to the slice. Do **not** push, tag, amend, deploy,
  or bypass hooks.

## Step 4 — Mark done

Move the slice file into the matching `done/` subdirectory in the same commit so future
iterations see it satisfied.

## Step 5 — Stop

One slice per iteration. After committing, stop. If you discover the slice is actually HITL,
underspecified, or needs a stubbed skill whose models don't exist yet, leave it untouched and
note why in your final message.
