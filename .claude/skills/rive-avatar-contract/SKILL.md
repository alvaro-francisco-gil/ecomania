---
name: rive-avatar-contract
description: Use whenever touching the avatar's Rive inputs / data-binding names, or either renderer. The Rive input and data-binding names are shared constants in `packages/shared`; the app (`rive-react-native`) and the funnel (`@rive-app/react-canvas`) must consume them in lockstep. Reach for it on "change the avatar", "add a Rive input", "avatar looks different on web vs app". NEVER rename an input without a contract PR. Companion to `funnel-handoff` (same avatar across the boundary) and `prd-to-slices` (such slices are HITL).
---

## STUB — not yet written

Author this skill once **the data models are defined (see docs/architecture.md)**. Writing it earlier would bake in guesses.

What it will encode:
- Rive input and data-binding names live as shared constants in `packages/shared` — never hardcoded in either renderer.
- The app (`rive-react-native`) and funnel (`@rive-app/react-canvas`) renderers move in lockstep off those constants.
- Renaming or removing an input is a contract change: a dedicated PR updating the constant + both renderers + the `.riv` asset together, never a silent rename.
- How avatar state (value vector, level, element) maps onto Rive inputs via `computeAvatarInputs()`. There are no activity aspects.
- Verifying parity between the two renderers before merge.
