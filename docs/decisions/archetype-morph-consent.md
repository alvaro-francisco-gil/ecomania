# A base form never changes without the user accepting it

## Context

A user's archetype — their avatar's base form — is derived from the onboarding survey. Topical
questionnaires then keep nudging their live value position, so the position that produced the
base form can drift away from it over time. Something has to decide what happens when it does.

The obvious implementation is to recompute: snap the live vector to the nearest archetype on
every submission and let the avatar follow. That is wrong for this product.

## Decision

**The base form is stable by default.** When the live vector drifts far enough from the stored
`archetypeId`, the app **proposes** a morph — a transformation ceremony — that the user
**accepts or declines**. Evolution is user-consented, never automatic.

`archetypeId` is a stored, sticky field. It is never silently recomputed; drift changes the
*live vector*, and the vector only reaches the base form through an accepted proposal.

## Why

- **The avatar is an identity, not a readout.** A creature that mutates because of one
  questionnaire answer is a dashboard widget. Users invest in a base form precisely because it
  persists; silently rewriting it spends that investment without asking.
- **Axis 1 cannot be graded anyway.** The base form is a topology change — it selects the Rive
  artboard rather than driving a numeric input, so there is no smooth path between forms. Any
  change is necessarily a discontinuity, which makes an unannounced one jarring by
  construction. See [`avatar-rendering.md`](avatar-rendering.md).
- **A morph is the strongest moment the loop has.** Turning it into a ceremony the user opts
  into makes it a reward. Automatic morphing spends that moment and gets nothing for it.
- **Values data is GDPR special-category.** A visible identity change driven by inferred values,
  applied without consent, is exactly the kind of automated treatment that warrants a human in
  the loop.

## What this binds

- `archetypeId` is **written only by an accepted morph** (or by onboarding). No trigger, no
  scheduled job, and no client may recompute it from the live vector.
- The morph gate is `snap(live) ≠ archetypeId` sustained for K consecutive submissions with a
  hysteresis margin — a proposal trigger, not an apply trigger.
- A **declined** morph must be remembered. Re-proposing the same morph on the next submission
  turns consent into nagging.

## Rejected alternative

**Recompute the archetype continuously from the live vector.** Simpler, no stored field, no
proposal state to manage — and it makes the base form flicker for any user sitting near a
boundary, removes the ceremony, and changes a user's visible identity without asking.

## Open

The numbers are not set: the drift threshold, K, the hysteresis margin, the snap metric, the
cooldown, and how long a declined morph is remembered. Also unresolved is how the proposal
should *feel* — what the ceremony actually is. Tracked in
[`../plans/ideas/creative-core-exploration.md`](../plans/ideas/creative-core-exploration.md).

## Revisit when

Real drift data exists. If almost nobody ever triggers a proposal, the gate is too tight and
the loop's biggest payoff never fires; if users are declining repeatedly, either the gate is
too loose or the archetype taxonomy has regions that are too small.
