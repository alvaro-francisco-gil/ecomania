# ralph — the AFK loop

A minimal autonomous loop that picks up **AFK slices** from `implementation-queue/` and works
them one at a time, committing per slice. Ported from the sibling repos.

## Files
- `prompt.md` — the per-iteration instructions handed to `claude`.
- `once.sh` — run a single iteration interactively. `./ralph/once.sh [--plan <slug>]`.
- `afk.sh` — run N iterations non-interactively, stopping on `<promise>NO MORE TASKS</promise>`.
  `./ralph/afk.sh <iterations> [--plan <slug>] [--in-worktree]`.

## How work gets queued
1. `write-a-prd` → a plan in `docs/plans/ideas/`.
2. `managing-plans-lifecycle` → promote to `docs/plans/ready/`.
3. `prd-to-slices` → slice files under `implementation-queue/<slug>/NNN-*.md` (AFK/HITL,
   with `allowed_paths` / `forbidden_paths` / `feedback_loop`).
4. `./ralph/afk.sh N --plan <slug>` (from a worktree) → ralph works the AFK slices.

## Guardrails
The loop will **not** push to `main`, deploy, merge, force-push, amend, or bypass hooks. Run
it from a worktree (see `parallel-agent-workflow`, once written) or pass `--in-worktree`.

> The repo is greenfield — the first plan to slice is `docs/plans/ideas/bootstrap-apps.md`.
