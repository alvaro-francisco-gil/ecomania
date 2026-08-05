# Sign is identity, magnitude is intensity — the avatar has no neutral state

## Context

The value vector is four bipolar floats in `-1..1` ([`value-axes.md`](value-axes.md)). Turning
those into an avatar is not obvious, because the naive answer — interpolate between a "most
technological" and a "most sufficiency" drawing — produces a midpoint nobody designed. Linear
interpolation between polished metal and mended clay is a brown sludge; between a commanding
crown and a centreless rhizome, a half-broken hierarchy that reads as a defect rather than as a
third way.

This matters more than it looks. The literature that fixed the axis set also predicts that
**users cluster near the origin**: environmental ideology is low-dimensional and our users
self-select into an ecology app, so the general-greenness variance is small. Whatever a
near-zero position looks like is what a large share of the population sees.

## Decision

**No axis has a neutral state.**

- **The sign decides *what* you are.** Positive on `means` is *sufficiency*, at full marker
  strength. There is never a blend of two poles.
- **The magnitude decides only *how strongly* it reads**, and it is expressed by **repeating a
  designed element** — 2 patches vs 12, one branch vs a full rhizome — never by interpolating
  between poles.

So every state a user can reach is composed of authored pieces. Gradation is restored without
reintroducing an unauthored midpoint, which means the onboarding reveal lands at full strength
*and* answering a questionnaire stays visible without having to cross a boundary — otherwise
the whole living-values loop is invisible to most users most of the time.

**Storage is one live vector, not two.** Archetype stability comes from `archetypeId` being a
stored, sticky field, never silently recomputed — not from freezing a second vector. Onboarding
*positions* the vector directly (weighted average of the items); topical questionnaires *nudge*
it by moving average. The answered count is tracked **per axis**, because coverage is uneven by
construction: a questionnaire on nuclear power loads `means` three times and `power` not at all.

## Consequences

- **The base-form count must be even**, split evenly across the two poles of axis 1. An odd
  count makes the middle form a smuggled neutral. Recommended start: 2; growing to 4 is purely
  additive, with magnitude choosing which of the two on your side.
- **No pole may be designed as the absence of its opposite.** Absence cannot be graded, and it
  always reads as the poorer version — which would breach the rule that no pole may look worse
  than its opposite (itself a legal requirement, not just taste: leading visuals bias the
  answers we are measuring). This bites hardest on axis 3, where "individual" must *assert*
  something — a sealed contour, a severed link — rather than merely lack companions.
- **Confidence damping is dead.** An earlier design faded the avatar in as per-axis confidence
  grew. It cannot work here: a damped `0.1` still has a positive sign, so it renders identically
  to `0.9`. The per-axis answered count now serves scoring and survey routing only, never
  rendering.
- **A stored 0 is a data zero, not a visual neutral** — it renders as the faintest expression of
  the positive pole. Absence of evidence and a genuine midpoint are indistinguishable in the
  vector alone; that is what the per-axis count is for.
- **Boundary flips are accepted and are cheap.** A user oscillating around zero moves between
  *one patch* and *one facet*, not between clay and chrome. No code dead-zone is needed. If real
  data ever shows it grating, a dead-zone is a code change that needs no new art.
- **Rive inputs stay numeric `0..100`**, with `50` as the boundary: one input per channel
  carries identity (which side of 50) and intensity (distance from 50) at once.
- **Axis 1 is the exception.** A topology change cannot be interpolated or graded, so it selects
  the artboard rather than driving an input — and it is the only axis whose change is gated
  behind a user-consented morph ceremony.

## Rejected alternatives

- **Continuous blending with an authored centre state (3 states per channel).** Preserves
  gradation and makes boundary crossings imperceptible, but every channel then needs a third
  designed state, and the centre — the most-viewed state of all — carries a third of the art
  budget. Rejected as too expensive for the value it adds over gradation-by-count.
- **Pure binary, no gradation at all (2 states, magnitude unused).** The first form of this
  decision. Cheapest, and everything shown is designed — but it makes the entire
  topical-questionnaire loop visually silent unless a boundary is crossed, which is the one
  thing the loop exists to avoid. Superseded by adding gradation-by-count, which costs almost
  nothing on top.
- **Forbidding an exact 0 in the data.** Proposed as a fix for boundary oscillation; it isn't
  one. Landing exactly on `0.000` is a measure-zero event with floats. The real problem is
  *crossing* zero repeatedly, which forbidding the point does not touch.

## Revisit when

- **Real usage data exists.** The open empirical question is how many users sit close enough to
  a boundary to flip regularly. If it is a large share and the flips read badly even at minimum
  density, the dead-zone lever is available without touching art.
- **The designer answers axis 3.** Its vocabulary (count / fusion / connection) and whether it
  grades at all are deliberately left to the designer —
  [`../plans/ideas/encargo-diseno-avatar.md`](../plans/ideas/encargo-diseno-avatar.md).
