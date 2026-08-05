# Creative core — exploration brief

The *creative core* = the **value axes**, the **archetype taxonomy**, and the **survey
instrument**. These are the long pole: they unblock the data models and the ⭐ domain skills
(`awarding-xp`, `rive-avatar-contract`, `funnel-handoff`, `topical-questionnaire`,
`values-privacy`, `moderation-pipeline`), and they tell the designer exactly which base `.riv`
avatars to build.

**One of the three is settled.** The value axes are decided; the archetype taxonomy and the
survey instrument are not. This file is the brief for the remaining two.

## The unifying model

One shared **value-axis space**, two clocks:

- **Onboarding survey** → positions you in the space → snaps you to the nearest **archetype**
  (a named region) = your avatar's **base form**.
- **Topical questionnaires** → keep nudging your **live position** over time (moving average)
  → drive the avatar's surface, companions and geometry.
- **The XP/engagement clock** is separate from both, and carries everything that reads as *how
  much / how urgently* (aura, level, charge).

## Settled — do not reopen without a decision record

| What | Where |
|---|---|
| **Four value axes**, no fifth; their poles and visual channels; the candidates rejected | [`../../decisions/value-axes.md`](../../decisions/value-axes.md) |
| Literature grounding, per-axis definitions, independence analysis, limitations | [`../../projects/value-system.md`](../../projects/value-system.md) |
| **Sign = identity, magnitude = intensity**; no neutral on any axis; one live vector + sticky `archetypeId`; even base-form count | [`../../decisions/avatar-rendering.md`](../../decisions/avatar-rendering.md) |
| The designer-facing build spec — visual vocabulary per axis, the parametric (non-catalogue) model, deliverables *(in Spanish)* | [`encargo-diseno-avatar.md`](encargo-diseno-avatar.md) |
| **The base form never changes without the user accepting it** — stable by default, drift *proposes* a morph, `archetypeId` is sticky | [`../../decisions/archetype-morph-consent.md`](../../decisions/archetype-morph-consent.md) |
| **The element** — four, user-picked in the first survey questions, renders as the aura's material, carries no value data | [`../../decisions/avatar-element.md`](../../decisions/avatar-element.md) |
| Implemented axis contract | `packages/shared/src/values/` |

## Open

### 1. Archetype taxonomy — *the expensive one*

Names, count, anchor placement in the 4-axis space, eco-motifs, and **which archetypes share a
base form**. Note archetype count is *not* base-form count: only axis 1 forces a separate
`.riv`; archetypes differing mainly on axes 2–4 can share one and be told apart by their
channels and motif. Anchors for four of them come free from the axis 3 × 4 plane (Cultural
Theory's myths of nature).

**Blocked on:** how many base forms to pay for — 2 or 4, and 2 is recommended. This is the
single decision gating the designer commission.

### 2. Survey instrument

- **Onboarding:** format, length, and per-answer axis weights. Two hard constraints pull against
  each other — it runs pre-signup in the funnel, where friction kills conversion, but four axes
  need enough items to carry signal, and **axis 1 needs more than the others** because it alone
  picks a base form that is irreversible by default.
- **The element question comes first** and is *not* a value item — it carries no axis weights and
  must not be scored. The pick is **permanent**, so the question must show an animated preview of
  each aura rather than four labelled buttons
  ([`../../decisions/avatar-element.md`](../../decisions/avatar-element.md)).
- This is also where the **axes 3 vs 4 blur risk** gets settled: they are statistically
  orthogonal, but whether a *respondent* can tell them apart can only be answered by drafting
  real items.
- **Topical questionnaire schema:** versioning (a submission records the version it was answered
  against, never silently re-scored), where definitions live, and how both apps consume them.
- **User-facing copy** must use neutral pole pairs (*Institutional ↔ Community*,
  *Vertical ↔ Horizontal*) — the identifiers in code are valence-imbalanced by design and are
  never display copy.

### 3. Loose ends

- **Numbers:** η, the per-axis confidence constant, the morph confirmation streak K and its
  hysteresis margin, the snap metric, morph cooldown, and declined-morph memory.
- **News as a third write path.** Only questionnaires currently move the vector. If reacting to
  a news item also nudges it, it needs a *much* smaller weight than a deliberate answer — and
  should probably not raise the answered count at all.
- **Aspect carriers.** `voice`, `knowledge` and `community` have no visual home yet.
  `community` depends on what axis 3 takes; the candidate left for it is the *movement* of the
  companions (dormant ↔ bustling), which is disjoint from their number.
- **Privacy beyond copy balance:** explicit consent before collection, what is exposed to other
  users (archetype yes, raw vector no), telemetry that must not leak it, export/delete.
- **Funnel → app handoff:** how the anonymous visitor's vector crosses into the account without
  anyone redoing the survey.
- **Validation:** a confirmatory factor analysis on the first real onboarding data — the standing
  mitigation for the two accepted risks in [`../../decisions/value-axes.md`](../../decisions/value-axes.md).

## Constraints any final design must respect

- Onboarding survey short — pre-signup funnel, friction kills conversion.
- Base-form count drives designer/Rive cost. Archetype count does not, directly.
- Eco-values are **GDPR special-category data** — items and labels must not be leading.
- Everything reduces to **numeric values** that drive Rive inputs.
- Don't collapse ecology to a left-right political axis — keep it ecology-specific and richer.
