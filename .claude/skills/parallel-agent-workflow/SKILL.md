---
name: parallel-agent-workflow
description: Use when running multiple agents in parallel against ecomania (e.g. several Ralph slots, or git worktrees under `.claude/worktrees/`) and they would otherwise collide on Metro ports, Firebase emulator ports, or the Android emulator. Encodes per-slot port-slot isolation so concurrent agents don't fight over shared infra. Companion to `prd-to-slices` (which produces the slices the slots consume) and `drive-android-avd`.
---

## STUB — not yet written

Author this skill once **per-slot Metro/emulator/port infrastructure under `.claude/worktrees/`** exists. Writing it earlier would bake in guesses.

What it will encode:
- The port-slot scheme: each parallel agent/worktree gets a deterministic offset for Metro, the Firebase emulator suite, and any dev server, so slots never collide.
- How a slot derives its ports from its slot index, and where that mapping is configured.
- Emulator/AVD isolation between slots (separate data dirs, separate AVD instances).
- Cleanup of a slot's worktree and ports when it finishes.
