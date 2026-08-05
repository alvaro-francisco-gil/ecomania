# The value space is four axes

## Context

The ecoavatar is derived from a user's position in a shared value-axis space. Choosing that
axis set is load-bearing: the axes fix the value-vector shape in `packages/shared`, the
archetype taxonomy, the survey instrument, and the visual channels a Rive designer can drive
independently.

The environmental-values literature constrains the answer hard. The most rigorously
factor-analysed instrument (Milfont & Duckitt's EAI) collapses 12 attitude facets into 2
higher-order factors; NEP is essentially one dimension. Environmental ideology is
low-dimensional — roughly 2.5–3 robust axes. Spending axes on facets of *how green you are*
would collapse the avatar space onto a diagonal and make archetypes visually
indistinguishable, especially for users who self-selected into an ecology app and are already
green.

## Decision

**Four axes, locked 2026-08-05. There is no fifth.** Axes buy *what kind of green*
(orientation); *how much* green lives on the XP/engagement clock, not in the value space.

| # | Axis | Visual channel |
|---|---|---|
| 1 | Anthropocentric ↔ Ecocentric | **base form** — which creature (picks the `.riv`) |
| 2 | Technological ↔ Sufficiency | **surface** — how the body was made |
| 3 | Individual ↔ Collective *(group)* | **companions** |
| 4 | Technocratic ↔ Grassroots *(grid)* | **geometry** — whether the body has a boss |

The fourth axis earns its slot on the archetype taxonomy alone: axes 3 × 4 (group × grid) are
exactly the plane that generates Cultural Theory's four myths of nature, giving validated
archetype anchors for free.

Full grounding, per-axis definitions, independence analysis, and references:
[`../projects/value-system.md`](../projects/value-system.md).

## Rejected alternatives

- **Reformist ↔ Radical / urgency as a 4th axis.** ~50% collinear with axis 2 — Dryzek's
  radical discourses bundle with sufficiency, reformist ones with pro-tech; this is the
  bright→dark-green diagonal. It is a *magnitude* construct, not an orientation one. Making it
  a static axis would either double-count the XP clock or force us to give the clock up.
  **Used as the clock instead.**
- **Local ↔ Global.** Genuinely distinct from the grid axis in principle (the off-diagonal
  global-grassroots and local-technocratic cells are real and populated), but the correlation
  lives on the dominant diagonal, and those off-diagonal cells are thin payoff for a whole
  extra axis, an extra Rive channel, and extra survey length. Dropped. The "global systems
  thinker" flavor it carried moves into **archetype motif**, not axis geometry.
- **Nature fragile ↔ robust**, and **Hope ↔ Doom.** Both collinear with axis 2 or with the
  clock. The affective hope/doom construct is expressed through the clock's aura channel.

## What this binds

- The value vector is **four bipolar floats** in `-1..1` — `packages/shared/src/values/axes.ts`.
- How those floats become pixels is a separate decision:
  [`avatar-rendering.md`](avatar-rendering.md).
- Each axis maps to **one non-overlapping visual channel**. This is the test that the set is
  well-separated: a Rive designer must be able to move any one slider without visually
  contradicting the others. Adding an axis whose channel overlaps an existing one breaks the
  avatar, not just the model.
- **Intensity is never an axis.** Anything that reads as "how much / how urgently" belongs on
  the XP clock's aura channel.
- **User-facing copy must never label axis 4's poles "technocratic" / "grassroots"** — the pair
  is valence-imbalanced and reads as a judgement. Use neutral pairs: *Institutional ↔
  Community*, *Vertical ↔ Horizontal*.

## Revisit when

- **Real onboarding data exists.** Run a confirmatory factor analysis. Two known risks are
  accepted rather than solved: axes 3 and 4 are statistically orthogonal but may blur for a
  *respondent* (a survey-instrument problem, to be settled when drafting items — not on
  paper); and cultural cognition's grid dimension replicates only weakly outside Anglo
  contexts (Pröpper 2022), so the signal may be thinner in non-Anglo markets. The mitigation
  is the CFA, not a pre-emptive swap — the alternative axis was empirically *thinner*, not
  stronger.
