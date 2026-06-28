# App design — exploration brief

The UX/product design of the **native app** (the game): information architecture, navigation,
screen inventory, the core gameplay loops as real UX, and the visual + **motion** language.
To be explored in a dedicated session; this file holds the brief + handoff prompt. The web
funnel is designed separately (it's just landing → survey → reveal → invite).

## What's independent vs blocked

**Can design now (independent of the creative core):**
- Information architecture & navigation (tabs, stacks, the home/avatar/feed/profile structure).
- Screen inventory + the core gameplay loops as flows (do-action → XP → avatar reacts → notify).
- The visual design system & **motion language** (how juice feels; where Rive vs Lottie vs code).
- Social surfaces: feed, post composer, comments, leaderboards, referral/invite.

**Wait on the creative core** (`creative-core-exploration.md`):
- The survey UX and the **avatar reveal/morph** screens (need archetypes + axes).
- Archetype-specific theming.

## Constraints any design must respect
- **Feels like a game**, not a form app — the avatar and juicy feedback are the centerpiece.
- The app is **native-only** (web is funnel) — design for iOS/Android, not responsive web.
- The **Rive avatar** is the hero element; design around it reacting to actions (see §4 + `rive-and-animation.md`).
- **Server-authoritative economy** — UI shows XP/level/avatar state but never authors it.
- **Scale-day-1** patterns (FlatList feeds, loading/error states) per `AGENTS.md`.
- Eco-value displays are **GDPR special-category** — design consent + exposure carefully.

## Deliverables (target)
A nav/IA map, a screen inventory, wireframes of the key screens (home/avatar, feed, action→reward
loop, profile, leaderboard, invite), and a motion-language spec (what's Rive, Lottie, code).
Fold the result into a PRD via `write-a-prd`, then `prd-to-slices`.

## Handoff prompt
Paste the block below into a fresh session (point it at this repo). It's self-contained.

```
You are the product/UX design partner for "ecomania", a gamified ecology social app. Read the
repo's docs/architecture.md and docs/rive-and-animation.md first — they are the source of
truth. Interview me one decision at a time before committing, and challenge weak ideas.

WHAT IT IS: take an ecology survey → get an evolving "ecoavatar" (built in Rive) → level it up
by answering topical ecology-policy questionnaires, posting opinions, commenting, and referring
friends. Heavily visual/animated; it must FEEL LIKE A GAME whose core actions are surveys and
opinions. Web is a funnel only (landing → survey → avatar reveal → "continue in app"); the full
game is a NATIVE app (Expo/React Native). Design for iOS/Android, not responsive web.

DESIGN THIS (the native app's UX):
1. Information architecture & navigation — the tab/stack structure; where the avatar, feed,
   questionnaires, profile, leaderboard, and invite live.
2. Screen inventory + the core gameplay LOOPS as flows — especially "do an action → earn XP →
   the avatar visibly reacts/grows → get notified". Make the reward loop feel juicy.
3. Wireframes of the key screens: home/avatar, the feed, a topical-questionnaire flow, the
   action→reward moment, profile (with the three avatar drivers: archetype, aspects, value
   vector), leaderboard, invite/referral.
4. The visual design system + MOTION LANGUAGE — what is Rive (the avatar), what is Lottie
   (one-shot juice), what is code-driven (UI micro-interactions). See docs/rive-and-animation.md.

RESPECT THESE CONSTRAINTS:
- The Rive avatar is the hero; design around it reacting to actions. It's driven by numeric
  inputs (archetype/base form, three "aspects" = voice/knowledge/community growth, and a live
  value vector for palette/aura/stance) plus triggers (xpPulse, levelUpBurst).
- The economy is server-authoritative — UI displays XP/level/avatar state, never authors it.
- Scale-day-1: virtualized feeds, loading/error states.
- Eco-values are GDPR special-category data — be careful about showing them publicly.

DEPENDENCY — do NOT finalize these (they're being designed in a separate "creative core"
session): the survey instrument, the value axes, the archetype list, and therefore the survey
UX and archetype-specific theming. Design those screens as parameterized placeholders.

START by interviewing me on: the navigation model, what the home screen centers on (avatar vs
feed), and how the action→reward loop should feel — one at a time. Then produce the IA map,
screen inventory, key wireframes, and the motion-language spec.
```
