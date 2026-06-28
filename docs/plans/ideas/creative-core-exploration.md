# Creative core — exploration brief

The *creative core* = the **value axes**, the **archetype taxonomy**, and the **survey
instrument**. These are the long pole: they unblock the data models and the ⭐ domain skills
(`awarding-xp`, `rive-avatar-contract`, `funnel-handoff`, `topical-questionnaire`,
`values-privacy`, `moderation-pipeline`), and they tell the designer exactly which base `.riv`
avatars to build. Being explored in a dedicated session; this file holds the brief, the
straw-men, and what's decided. Nothing here is final except the §"Decided" items.

## The unifying model (working assumption — validate or challenge)
One shared **value-axis space**, two clocks:
- **Onboarding survey** → positions you in the space → snaps you to the nearest **archetype**
  (a named region) = your avatar's **base form**.
- **Topical questionnaires** → keep nudging your **live position** over time (moving average)
  → drive the avatar's **surface** (palette/aura/stance) and the "values-discovery" feel.

## Decided
- **Archetype lifecycle (2026-06-28):** the base form is **stable by default**. When the live
  value vector drifts far enough, the app **proposes a morph** (transformation ceremony) that
  the **user accepts or declines** — user-consented evolution, never automatic. *Open:* what
  "drift far enough" means, and how the proposal should feel.

## Open — to resolve in the exploration session
1. **Value axes** — 4 vs 5, which ones, definitions, independence, visual mapping.
2. **Archetype taxonomy** — count (= designer cost; each = one base `.riv`), identities, axis
   anchors, eco-motifs.
3. **Survey instrument** — onboarding format + scoring; the topical-questionnaire content
   schema (per-answer axis weights; vector nudge; XP decoupled).

## Straw-men (starting points, not commitments)

### Value axes (4 core + optional 5th)
| Axis | − pole | + pole | Captures |
|---|---|---|---|
| Preserve ↔ Transform | protect ecosystems as-is | rebuild a green-engineered future | rewilding vs green megaprojects/nuclear/geoengineering |
| Me ↔ We | personal footprint | regulation / collective action | individualization vs systemic accountability |
| Innovate ↔ Sufficiency | solve with *more* (tech, abundance) | solve with *less* (degrowth) | ecomodernism vs degrowth |
| Human ↔ Wild | nature's value is for people | nature has intrinsic worth | anthropocentric vs ecocentric (NEP) |
| *Local ↔ Planetary* (opt.) | community / bioregion | global systems & policy | grassroots vs planetary framing |

Flag: *Me↔We* and *Innovate↔Sufficiency* may correlate in real data — keep both, merge later only if collinear.

### Archetypes (straw-man 6 + 2 expansion) — each = one base `.riv`
| Archetype | Anchor | Identity | Eco-motif |
|---|---|---|---|
| Warden | Preserve · Wild · We | protector of wild/old-growth places | ancient mossy tree-guardian |
| Maker | Transform · Innovate · Human | solarpunk builder of green abundance | solar/urban-green tinkerer |
| Tender | balanced · Earth · Local | regenerative soil, food, gardens | seed/sprout/soil creature |
| Rallier | We · Transform · urgency | movement & policy mobilizer | mycelial-network / flock |
| Drifter | Sufficiency · Me · Wild | quiet low-footprint minimalist | lichen / slow moth |
| Voyager | Planetary · Innovate · We | global systems / climate-scale thinker | ocean-current / migratory creature |
| *Spark* (exp.) | high-urgency activist | radical, urgent | fire / energy |
| *Weaver* (exp.) | local ecocentric bridge-builder | connector | woven roots / pollinator |

### Survey instrument (straw-man)
- **Onboarding:** ~8–10 short **scenario** questions ("what would you do"), each option
  carrying weights on 1–2 axes; score = weighted average per axis → nearest archetype anchor.
  Example: *"A patch of empty land opens up in your city — what happens to it?"* →
  rewild `[Preserve+ Wild+]` · community garden `[We+ Local+ Earth+]` · solar+tech hub
  `[Transform+ Innovate+]` · tiny eco-homes `[Sufficiency+ Me+]`.
- **Topical questionnaire contract:**
  ```
  Questionnaire { id, version, topic, activeWindow, questions[] }
    Question { prompt, options[] }
      Option { label, axisWeights: { [axis]: -1..1 } }
  ```
  On submit: award XP (knowledge aspect, capped + idempotent) **and separately** nudge the
  value vector `newPos[axis] = oldPos[axis] + η·(weight − oldPos[axis])` + confidence bump.

## Constraints any final design must respect
- Onboarding survey short (pre-signup funnel; friction kills conversion).
- Archetype count drives designer/Rive cost (one base `.riv` each).
- Eco-values are **GDPR special-category data** — questionnaire weights must not be leading/biased.
- Everything reduces to **numeric values** that drive Rive avatar inputs.
- Don't collapse ecology to a left-right political axis — keep it ecology-specific and richer.

## The exploration prompt
A self-contained prompt for the dedicated session is kept alongside this brief; paste it into
a fresh agent to run the exploration (interview-first, research-grounded). When that session
produces a final axis list + archetype table + survey design, fold the results back here,
promote via `managing-plans-lifecycle`, and unblock the models + ⭐ skills.
