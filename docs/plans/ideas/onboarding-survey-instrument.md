# The onboarding survey instrument and its funnel UI

**Status:** draft — awaiting user sign-off
**Last reviewed:** 2026-08-06
**Source brief:** chat message 2026-08-06 ("have we defined the initial questionnaire and the UI
of the questionnaires — around 10 questions is more than enough")

## Problem statement

The value space is locked and the code to move a vector exists, but nothing positions a user in
that space. There are no survey items, no answer weights, no submission shape, and no survey UI
on either client — the funnel is a landing placeholder and a reveal placeholder. Every
downstream thing (the archetype snap, the reveal, the handoff into the app, the first XP grant)
is waiting on an instrument that does not exist, and it has to run *pre-signup* in a funnel where
every extra question costs conversion.

## Solution sketch

A **10-question onboarding instrument, version `onboarding-v1`**, frozen once shipped.

Question 1 is the **element pick** — fire, water, air, earth — shown as four animated aura
previews, not four labelled buttons. It is permanent, carries no axis weights, and is never
scored.

Questions 2–10 are nine value items across the four axes, allocated **3 / 2 / 2 / 2**:
`moralStanding` gets three because it alone selects a base form and is irreversible by default;
the other three axes get two each. Items may cross-load onto a second axis where the underlying
question genuinely does.

Items come in **three scored kinds**, mixed deliberately so the run feels like a game rather than
a form — the Duolingo pattern of varying the interaction every screen or two:

- **Either/or** — two opposing statements, pick one. Sets the axis to a full pole.
- **Agree/disagree** — one statement, two-step response. Softer magnitude, no midpoint.
- **Scenario** — a real contested case (nuclear, Mar Menor, the carbon footprint, the French
  citizens' convention) with three positions, one of which may cross-load.

Plus one unscored kind, **element pick**, used exactly once.

The funnel runs **one question per screen** with a progress indicator, auto-advance on answer,
and back-navigation to change a previous answer. **The avatar is not shown during the survey** —
no aura, no partial creature. The reveal page is the payoff and lands at full strength.

At the end, the anonymous visitor's answers are submitted, scored **server-side**, and stored as
their value profile; the reveal reads the result. Nobody signs up first, and nobody ever answers
these ten questions twice.

## User stories

1. As an anonymous web visitor, I want to start the survey from the landing page without creating
   an account, so that nothing blocks me before I have seen what I get.
2. As an anonymous web visitor, I want to be told — before the first question — that my answers
   describe my ecological values and will be stored, and to give explicit consent, so that
   collection of special-category data is lawful (`values-privacy`).
3. As a visitor who declines consent, I want a clear path back to the landing page and no data
   written, so that declining is a real option rather than a dead end.
4. As an anonymous web visitor, I want the first question to be my element and to *see* each of
   the four auras animate before I choose, so that a permanent, irreversible pick is an informed
   one (`avatar-element.md`).
5. As an anonymous web visitor, I want one question per screen with a visible sense of how far in
   I am, so that a ten-question survey does not feel open-ended.
6. As an anonymous web visitor, I want the interaction to change between questions — pick a side,
   agree or disagree, choose a position on a real case — so that answering feels like play.
7. As an anonymous web visitor, I want to go back and change an answer before submitting, so that
   a misread question is recoverable.
8. As an anonymous web visitor who reloads or navigates away mid-survey, I want my answers so far
   to still be there, so that an accidental refresh does not cost me the run.
9. As an anonymous web visitor, I want the survey to work on a phone browser in one hand, since
   that is where the funnel traffic lands.
10. As an anonymous web visitor who finishes, I want to be taken to my reveal, so that the payoff
    is immediate and I have a reason to install.
11. As an anonymous web visitor whose submission fails, I want a retry that does not lose my
    answers and does not create a second profile, so that a flaky network costs me a tap.
12. As a signed-in app player who arrived via the funnel, I want my values and element already
    set, so that I never redo the survey after install (`funnel-handoff`).
13. As a player who somehow reaches the app without a funnel run, I want to be able to take the
    same instrument in-app, so that the app is not unusable without a web visit.
14. As a data scientist, I want every submission to record the instrument version it was answered
    against and a per-axis answered count, so that a confirmatory factor analysis is possible and
    old submissions are never silently re-scored under new weights (L3 in `value-system.md`).
15. As a user, I want to be able to export and delete my answers and my derived vector, so that
    GDPR rights over special-category data are real.

## Implementation decisions

### The instrument lives in `@ecomania/shared` as typed constants

A versioned module owns the item catalogue: item id, kind, copy keys, options, and each option's
`AxisWeights`. Both clients import it; there is no read before the survey can render, which
matters in a pre-signup funnel. It is reviewable in a PR and testable as data.

Freezing follows from versioning, not from where it lives: `onboarding-v1` is immutable once a
real submission exists. Changing an item means publishing `onboarding-v2`, never editing v1.

Topical questionnaires — which need a publishing cadence rather than a deploy — are **out of
scope here** and may well need a different home. This decision covers onboarding only.

Accepted risk: shipping weights in a client bundle makes the instrument inspectable and therefore
gameable. This is acceptable *only* because onboarding grants no XP and moves no economy — the
sole thing a user can "cheat" is which avatar they get, which is what answering does anyway. The
moment any instrument becomes an XP source, weights move server-side.

### Copy is keys, never literals

Items store message-catalog keys, not display strings (`i18n-add-string`). This is doubly
load-bearing here: the pole identifiers in `values/axes.ts` are valence-imbalanced developer
names — nobody self-describes as "technocratic" — and rendering them would bias the measurement.
Axis 4's poles surface to users as *Institutional ↔ Community*, never as the code identifiers.
Item copy must be **balance-checked across both poles** before it ships: neither side may read as
the obviously virtuous answer.

### Scoring is a pure function in shared, executed on the server

Onboarding **positions** the vector directly — a per-axis weighted average over the answers that
loaded on that axis — rather than nudging it (`architecture.md` §5). `nudgeValueVector` is for
topical questionnaires and is not used here. An axis with no answers stays at the origin and is
recorded as zero-coverage, since the vector alone cannot distinguish "no data" from "genuine
midpoint".

The scoring function is pure and lives in shared so it can be unit-tested and so the funnel could
preview a result without a round trip. **It is still only trusted when run in a Cloud Function** —
the value vector is server-authoritative and no client writes it, exactly as with XP.

### Trust boundary

- Client (funnel/app): renders items, collects answers, holds a local draft.
- **Cloud Function callable** `submitOnboardingSurvey`: validates the answer set against the named
  instrument version, rejects unknown item/option ids and duplicate or missing answers, scores it,
  and writes the value profile, the element, and the submission record. Idempotent on a
  per-submission key so a retry cannot double-write or create a second profile
  (`guardrail-enforcement`).
- Firestore rules: the value profile and the submission record are **read-own, write-never** from
  a client. The element is written by the same callable — permanence is enforced server-side by
  refusing a second element write, not by hiding the button.
- Consent is recorded with the submission (version of the notice, timestamp), by the same callable.

### Data shapes

New model entries, all currently absent (`models/index.ts` is deliberately empty):

- **Instrument** — a version id, an ordered item list, item kinds, options, per-option weights.
- **Onboarding answer** — item id + chosen option id. No free text in v1.
- **Submission** — the answer set, the instrument version, the consent record, a submission key,
  and a created-at. Retained for the factor analysis and for the user's export right.
- **Value profile** — the four-axis vector, a per-axis answered count (coverage), the element, and
  the instrument version that produced it.

The archetype is *not* stored yet — the snap depends on the taxonomy, which is still blocked.
The profile must be readable and complete without it.

### Modules

| Responsibility | Side |
|---|---|
| Instrument catalogue + version constant | `@ecomania/shared` |
| Submission scoring (answers → vector + coverage), pure | `@ecomania/shared` |
| Instrument invariant checks (usable as both test and runtime assert) | `@ecomania/shared` |
| Survey flow: one-question-per-screen, progress, back, draft persistence | funnel |
| Per-kind question renderers (either/or, agree/disagree, scenario, element pick) | funnel |
| Element preview player (animated aura, four artboards) | funnel |
| `submitOnboardingSurvey` callable: validate → score → write, idempotent | `functions` |
| In-app fallback run of the same instrument | app (phase 3) |

The two deep ones are **scoring** — a tiny interface hiding weighting, coverage, validation and
range invariants — and the **survey flow**, which should expose "run this instrument, give me an
answer set" and hide draft persistence, navigation and per-kind rendering behind it. Adding a
fifth item kind should touch a renderer and the catalogue, nothing else.

### Draft item allocation

Nine scored items: three on `moralStanding`, two each on `means`, `agency`, `power`. Mixed kinds
so no two adjacent screens use the same interaction. Contested cases are drawn from the ones
already researched in `value-system.md` rather than invented. Exact copy and exact weight
magnitudes are drafted during implementation and reviewed as copy, not as code.

This allocation is also the first real test of whether a *respondent* can tell axes 3 and 4 apart
— statistically orthogonal, but the blur risk can only be settled by drafting items and looking
at answers (`value-axes.md`, "Revisit when").

## Testing decisions

- **Scoring** — the priority. Pure function, behavior tests through its public interface: known
  answer sets produce known vectors; unanswered axes stay at origin with zero coverage;
  cross-loading items contribute to both axes; every output is in `[-1, 1]`; out-of-range weights
  throw rather than clamp (per the existing `values/vector.ts` convention).
- **Instrument invariants** — data-driven tests over the catalogue: every axis has ≥2 scored
  items; `moralStanding` has ≥3; the element item is first and carries no weights; no scored item
  is unweighted; every option resolves to a copy key; option ids are unique within an item; no
  item offers a neutral option.
- **The callable** — rejects unknown versions, unknown item/option ids, partial answer sets and
  replayed submission keys; writes exactly once under retry; refuses a second element write.
- **Funnel flow** — behavior-level: answering advances, back preserves the earlier answer,
  reload restores the draft, the avatar is not rendered at any point before the reveal, and
  declining consent writes nothing.

Harnesses are still being stood up per app; the shared package is the one place with an
established path, which is another reason to put scoring there.

## Rollout

Phased, dev-only until the whole chain works end to end.

1. **Shared** — models, instrument catalogue, scoring, invariant tests. Pure, no infrastructure,
   independently reviewable. This is where the copy review happens.
2. **Backend** — the callable, Firestore rules, indexes. `firestore-deploy` to dev.
3. **Funnel UI** — the flow, the renderers, the element preview, wired to the callable.
4. **App fallback** — the same instrument in-app for users who skipped the funnel.

Funnel and app do **not** need to ship in lockstep; they share the instrument through the shared
package, and a version bump is additive.

No backfill and no migration — there is no existing survey data. No feature flag; the funnel
survey route does not exist today, so shipping it is the flag. Per AGENTS.md there is no
retrocompat shim: if `onboarding-v1` changes before any real submission exists, it is edited in
place; after that, it is frozen and superseded.

The element preview needs the four aura effects from the designer commission. If they are not
ready, phase 3 ships behind them rather than shipping four labelled buttons — picking blind is
the one way the element decision goes wrong.

## Out of scope

- **The archetype taxonomy and the snap.** Still blocked on base-form count. This PRD produces a
  vector and stops there.
- **The reveal page itself** — its visuals depend on the taxonomy. This PRD only guarantees the
  reveal has a scored profile to read.
- **Topical questionnaires** — different cadence, different storage question, own PRD.
- **XP for completing onboarding.** Listed as an XP source in `architecture.md` §7, but XP is a
  separate capped idempotent call (`awarding-xp`) and pre-signup there is no account to credit.
- **The funnel → app handoff mechanics** — `funnel-handoff` owns the anon-auth and account-link
  sequence; this PRD only ensures the data it carries exists and is complete.
- **The confirmatory factor analysis.** This ships the instrument that generates the data.
- **Translations.** Keys and one source locale; additional locales are catalogue work.

## Open questions

Each has a default the implementer can use if this is not resolved first.

- **Weight magnitudes.** Default: either/or sets ±1.0, agree/disagree ±0.7, scenario options are
  authored per option. Revisit after the first data.
- **Element question position.** The element decision says "one of the first questions", not
  strictly first. Default: strictly first — it is the lowest-friction opener and the only one
  needing no reading.
- **Cross-loading budget.** Default: at most two of the nine items cross-load, to keep the
  coverage counts interpretable for the factor analysis.
- **Source locale.** Default: Spanish source copy with English keys, given the existing docs.
  Confirm before copy is drafted — retranslating a balanced instrument is expensive.
- **Consent granularity.** Default: one consent covering collection and derivation of the vector,
  separate from any later consent for exposing it to other users, which `values-privacy` owns.
- **Abandoned runs.** Default: local draft only, nothing written server-side until submit — no
  partial-funnel analytics in v1. If drop-off telemetry is wanted, it must be event-level and must
  not carry answer content (`observability-conventions`).
