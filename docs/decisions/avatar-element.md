# The element is the one thing the user picks

## Context

Everything visible about the ecoavatar is *derived*: the base form, surface, companions and
geometry all fall out of the value vector ([`avatar-rendering.md`](avatar-rendering.md)), and
the aura's intensity is earned on the XP clock. That is deliberate — the avatar is a
measurement, not a dress-up doll.

But a fully derived avatar gives the user no agency at the exact moment agency helps most: the
first seconds of a pre-signup funnel survey, where friction kills conversion.

## Decision

**Four elements — fire, water, air, earth — chosen by the user in one of the first questions of
the onboarding survey.**

- **It is the only thing the user picks.** Every other visual stays derived. The rule is now:
  *you choose your element; your answers choose everything else.*
- **It carries no value information.** It does not feed the value vector, does not affect the
  archetype snap, and is never an input to scoring. An answer that picks an element is not a
  value item.
- **It renders as the *material* of the aura, not as a new channel.** The XP clock keeps owning
  *how much* aura there is; the element owns *what it is made of* — embers, droplets, motes,
  dust. So: "the material is yours, the intensity is earned."
- **It never touches the body.** No surface, no geometry, no companions, no topology. Ambient
  only.

In an ecology app the four elements are not mystical — they are the four planetary systems:
energy, hydrosphere, atmosphere, lithosphere. Visual language should follow that reading, not a
zodiac one.

## Why chosen rather than derived

The alternative seriously considered was deriving the element from `dominantAxis()` — the axis a
user has defined themselves on most. It was attractive because it costs no new data and reuses
existing code, and because it would have given two orthogonal readings (the body says *which
side you are on*, the element says *what you care about most*).

It was rejected because a derived element is **volatile**: the dominant axis flips easily when
magnitudes are small and similar, which is most users early on. Fixing that needs a margin plus
stickiness — real machinery for a purely ambient effect. A user-picked element is stable by
construction and buys agency in the funnel instead.

Deriving it from the archetype was also considered; stable, but it adds nothing the archetype
was not already saying.

## What this binds

- **It is not special-category data.** Unlike the value vector, the element is an aesthetic
  preference. It can be displayed publicly, logged, and used in telemetry without the
  consent/exposure machinery `values-privacy` imposes on the vector — and it is a safe public
  handle when the vector is not.
- **Storage is a separate field** (`elementId`) on the profile, never inside the value vector.
  Putting it in the vector would corrupt every scoring, snapping and factor-analysis path that
  assumes all four slots are measured values.
- **Designer cost is one-off.** Four ambient effects, authored once. Because they are ambient
  rather than on the body, they do **not** multiply by base form — the cheapest thing in the
  commission.
- **The avatar can start existing before the survey ends.** Since the element is picked in the
  first questions, the funnel can show an aura immediately and let the rest of the creature
  resolve as the user answers. Cheap conversion mechanic, available for free.

## Permanent

**The element cannot be changed.** Picked once, kept forever — there is no re-pick in settings
and no cosmetic unlock that overrides it. It is the user's one authored mark on an otherwise
fully derived avatar, and it means something precisely because it is not adjustable.

The consequence lands on the survey and on the designer, not on the code: **an irreversible
choice must be an informed one.** The element question has to *show* what each of the four looks
like — an animated preview of the aura, not four words on buttons. Picking blind and being stuck
is the one way this decision goes wrong.

## Considered and dismissed

- **Priming.** An evocative aesthetic opener may mildly bias the value answers that follow.
  Accepted: the conversion gain from an immediate, low-friction first question outweighs a
  second-order measurement effect.
- **Element / surface correlation.** Users picking fire will skew technological, earth will skew
  sufficiency. Accepted: it costs some avatar variety and nothing else. The element stays
  ambient-only and never borrows the surface's vocabulary, which is enough to keep the two
  channels from visually merging.
