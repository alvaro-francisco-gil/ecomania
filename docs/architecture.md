# ecomania — Architecture & Decisions

The single source of truth for *what we're building and why*. Data models are intentionally
**not** pinned here yet (see "Open questions"); this captures the product concept, the
technology decisions, and the cross-cutting designs that constrain everything else.

---

## 1. Product concept

You take an **ecology survey** and get an **ecoavatar** — a creature that reflects your
ecological personality. You level it up by interacting with a social network: answering
**topical questionnaires** about new ecology policies, posting opinions, commenting, and
**referring** friends. It is heavily visual, animation-driven, and gamified — it should feel
like a *game* whose core actions happen to be "do surveys and share opinions."

Two retention engines:
1. **Avatar evolution** — every meaningful action visibly grows/changes your avatar (juicy, game-like).
2. **Identity discovery** — over time, your answers resolve your eco-values into a sharper position.

---

## 2. Technology decisions

| Area | Decision | Why |
|---|---|---|
| Architecture | **Split (ordago-style):** native Expo app + Next.js funnel + shared package | Web is funnel-only, so a single react-native-web codebase buys nothing; split gives best native game feel + SEO funnel. |
| Mobile | Expo + React Native (New Arch), `@react-native-firebase` | Matches the team's strongest muscle (ordago). |
| Web | Next.js (App Router) | SEO + server-rendered OG images for shareable referral/avatar pages. |
| Backend | **Firebase** — Auth, Firestore, Functions, Storage, FCM | Deep team fluency; fits social + gamification + push. |
| Avatar | **Rive** (state-machine, data-bound), designer-owned | The avatar is *stateful & evolving* — Rive's core use case. One `.riv` drives web + native. |
| Other animation | **Lottie + code-driven** (Reanimated / Skia) | The ~95% of motion that is one-shot/UI; this is the AI-authorable layer (see §7). |
| Economy | **Server-authoritative** Cloud Functions + read-models | Anti-cheat + scale (no hot docs). |

**Web is the funnel, the app is the game.** The browser experience is: landing → survey →
avatar reveal → "continue in app". The full social game lives only in the native app.

---

## 3. High-level architecture

```
   Next.js FUNNEL                         Expo APP (the game)
   landing / survey / reveal / invite     feed · avatar · XP · social · leaderboards
        |  anon auth + deep link               |  linked auth
        |  (carries survey result)             |
        v                                       v
   ┌──────────────────────────────────────────────────────┐
   │                       FIREBASE                          │
   │  Auth (anon → linked) · Firestore · Storage · FCM      │
   │  Cloud Functions — the ONLY writer of the economy:     │
   │    callable: submitSurvey · awardXp · claimReferral    │
   │    triggers: post fan-out · level-up · leaderboard     │
   └──────────────────────────────────────────────────────┘
        |
   packages/shared  ·  avatar.riv  →  same inputs drive funnel reveal AND app
```

---

## 4. The avatar (Rive)

The ecoavatar is driven by **three independent numeric systems**, all expressed as Rive
inputs / data-binding on one `.riv` file:

1. **Archetype** — set from the onboarding survey; picks the base form (`ecoTrait`). The base
   form is **stable by default**, but when the live value vector drifts far enough the app
   **proposes a morph** (a transformation ceremony) that the **user accepts or declines** —
   user-consented evolution, never automatic. *(Decided 2026-06-28; "drift far enough" + the
   proposal UX are part of the creative-core exploration.)*
2. **Aspects** — activity volume in three dimensions, each growing different parts:
   `voice` (posting), `knowledge` (surveys/questionnaires), `community` (comments/referrals).
3. **Value vector** — the evolving eco-identity (see §5); drives surface, companions and body
   geometry.

Plus triggers for juice (`xpPulse`, `levelUpBurst`) and booleans for unlockable cosmetics.

**How a value becomes a visual: sign is identity, magnitude is intensity.** **No axis has a
neutral state.** The sign picks *which* pole marker shows — never a blend of the two — and the
magnitude picks only *how strongly* it reads, expressed by repeating a designed element (2
patches vs 12) rather than by interpolating between poles. Everything a user sees is therefore
authored, the onboarding reveal lands at full strength, and answering a questionnaire stays
visible without having to cross a boundary. Two consequences worth knowing before touching
either renderer: the number of base forms must be **even** (an odd count makes the middle one a
smuggled neutral), and no pole may be designed as the *absence* of its opposite. Full designer
specification: [`docs/plans/ideas/encargo-diseno-avatar.md`](plans/ideas/encargo-diseno-avatar.md).

**Designer ↔ developer contract.** The designer owns *what can happen* (art, rig, animations,
state-machine logic) in the Rive editor; code owns *when, with what data* by setting inputs.
The **input names are a shared contract** living in `packages/shared/src/avatar/` — consumed
identically by the app (`rive-react-native`) and funnel (`@rive-app/react-canvas`). Renaming
an input is a contract change touching both renderers and the `.riv`.

**Rive facts:** runtimes are open source (MIT); the editor is proprietary but free, with a
**$9/mo Cadet** plan required to *export* `.riv` for runtime use. Plan: design + build
integration against placeholder/sample `.riv` for free; turn on Cadet when exporting the real
avatar. The subscription gates *export*, not playback.

→ Designer workflow, the clip-vs-component reasoning, alternatives, where `avatar.riv` lives,
and the full pricing ladder: [`docs/rive-and-animation.md`](rive-and-animation.md).

---

## 5. The "living values" dynamic

Distinct from the one-time archetype. **Topical questionnaires** about new ecology policies
appear in the app over time. Each is content tagged against the shared **value axes** —
**four, locked 2026-08-05**, implemented in `packages/shared/src/values/`:

| Axis | − pole | + pole | Avatar channel |
|---|---|---|---|
| `moralStanding` | anthropocentric | ecocentric | base form *(picks the `.riv`)* |
| `means` | technological | sufficiency | surface |
| `agency` | individual | collective | companions |
| `power` | technocratic | grassroots | geometry |

There is **no fifth axis**. Local↔Global was considered and dropped as too close to `power`;
reformist↔radical is the *intensity clock* (the XP/engagement dimension), not an axis. The
decision and the rejected candidates: [`docs/decisions/value-axes.md`](decisions/value-axes.md).
The literature grounding and per-axis independence analysis:
[`docs/projects/value-system.md`](projects/value-system.md).

Each answer carries small weighted contributions on one or two axes; on submit, a Function
nudges the user's value vector via a moving average:

```
newPos[axis] = oldPos[axis] + η · (answerWeight − oldPos[axis])   // η small, e.g. 0.15
```

so identity emerges over many topics rather than whiplashing.

There is **one** live vector, not a frozen snapshot plus a live one: archetype stability comes
from `archetypeId` being a stored, sticky field, never recomputed silently. Onboarding
*positions* the vector directly (weighted average of the items); topical questionnaires *nudge*
it. Coverage is uneven by construction — a questionnaire on nuclear power hits `means` three
times and `power` not at all — so the answered count is tracked **per axis**, not globally. It
drives scoring and which axis to ask about next; it does **not** damp the avatar, which reads
the sign at full strength from the first answer (§4).

**Critical separations:**
- **XP vs values.** Completing a questionnaire *earns XP* (capped, anti-cheat) **and
  separately** *measures* your value shift. The value update is not gameable and not capped —
  it's a measurement, not a reward.
- **Values are GDPR special-category data** (ecological/political stance). Explicit consent,
  careful storage, and deliberate rules about any public exposure / matching. See the
  `values-privacy` skill (to be written).

---

## 6. The gamification economy

- **XP sources** (each with a daily cap): onboarding survey, answer a topical questionnaire,
  create post, comment, receive like, daily streak, **referral converted**.
- **Aspects.** Each source feeds one aspect (`voice` / `knowledge` / `community`), so *how*
  you play shapes *how* the avatar grows.
- **Referral mechanic** (native to the product): a converted referral levels up the referrer's
  `community` aspect + fires FCM — the avatar visibly grows from inviting friends.
- **Server-authoritative & append-only.** Every XP-bearing action is a callable Function with
  an **idempotency key**; it appends to the `xpEvents` ledger and enforces caps there. Clients
  never write `xp`/`level`/`avatarState`/`aspects`/`counters`. Firestore rules + a rules test
  enforce the denial.

---

## 7. Animation strategy (for an AI-leveraged team)

Three layers, ranked by how much AI can author:
- **Code-driven** (Reanimated / Skia / CSS) — AI writes this brilliantly. The biggest lever.
- **Lottie** (JSON) — AI-generatable + a huge ready-made library. Good for standard one-shots.
- **Rive** (`.riv` binary) — AI **cannot** author the art (GUI/binary); it's the designer's job.
  AI writes the *integration code* that drives inputs.

**Implication:** reserve Rive for the one thing that needs it (the evolving avatar, designer-owned);
do everything else with code + Lottie, where the team moves fast with AI. Details in
[`docs/rive-and-animation.md`](rive-and-animation.md).

---

## 8. Scale-from-day-one constraints

1. **No hot documents.** Global counters use sharded/distributed counters or read-models.
2. **Feed fan-out** — decide on-write (`feeds/<uid>`) vs on-read (large followings); hybrid is
   standard. MVP may start with a single ranked feed.
3. **Moderation pipeline** — required from the start (XP-for-comments invites spam): a Function
   (heuristics + LLM/Perspective pass) + a report queue.
4. **Leaderboards** via maintained read-model docs; add Redis/RTDB sorted sets if they get hot.

---

## 9. The funnel → app handoff (make-or-break)

```
1. Web survey — no signup → Firebase ANON auth (anonId)
2. submitSurvey → Function computes archetype + seeds avatarState
3. Reveal: live avatar (@rive-app/react-canvas) + shareable OG card
4. CTA "Continue in app" → deep link ecomania://claim?anon=<token>
5. App signup → Function LINKS the anon account → survey + avatar carry over (zero re-entry)
6. ?invite=<code> rides along → claimReferral credits referrer's community aspect + FCM
```

Invariant: **never make the user redo the survey after install.**

---

## 10. Open questions (deliberately unresolved)

These are **not** decided yet and block the model/skill work that depends on them:
- The exact **survey instrument** and the **archetype taxonomy** (= the set of base `.riv`
  avatars the designer must build). With the axes locked, these are the remaining two thirds of
  the *creative core* — see the brief in
  [`docs/plans/ideas/creative-core-exploration.md`](plans/ideas/creative-core-exploration.md).
  The archetype taxonomy is gated on one product call: **how many base forms to pay for** (2 or
  4 — it must be even). Until that lands, the designer commission cannot be issued.
- The **data models** (`profiles`, `posts`, `surveys`, `questionnaires`, `valueProfile`,
  `xpEvents`, `feeds`, …) and the precise XP values / level curve.
- i18n strategy (multi-language from launch?).
- Where the real `avatar.riv` comes from, and which placeholder to develop against until then.

**Decided so far:**
- The **value axes** — four, locked 2026-08-05, implemented in `packages/shared/src/values/`
  (see §5). Record: [`docs/decisions/value-axes.md`](decisions/value-axes.md).
- **How a value becomes a visual** — sign is identity, magnitude is intensity, no neutral on any
  axis (see §4). Record: [`docs/decisions/avatar-rendering.md`](decisions/avatar-rendering.md).
- The avatar's base **form is stable**, with **user-consented morphs** proposed when the value
  vector drifts far enough (see §4).

Until the rest land, the model-dependent skills (`awarding-xp`, `rive-avatar-contract`,
`funnel-handoff`, `topical-questionnaire`, `moderation-pipeline`) stay **stubbed** — see
`docs/plans/ideas/agentic-skills-backlog.md`, which now separates those from the ones the
scaffold unblocked.
