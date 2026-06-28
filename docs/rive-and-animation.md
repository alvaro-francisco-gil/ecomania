# Rive & animation — designer workflow and tooling

Companion to `architecture.md` §4 (the avatar) and §7 (animation strategy). This is the
practical reference for **how the designer works with Rive** and **why the tooling is split
the way it is**. The cross-cutting *contract* (input names as shared constants) lives in §4;
this doc is the workflow + rationale.

## Clip vs component — the mental model

> **Lottie is a video clip. Rive is a tiny interactive component.**

- **Lottie** is a *file format* for pre-rendered vector playback — "an animated GIF, but
  vector, tiny, scriptable." Control surface is thin (play/pause/segment/speed); any
  reactivity is coded around it. A **deliverable** you drop in.
- **Rive** is a *runtime system* — a little state machine with a public API (inputs +
  data binding) that reacts to your app in real time. A **component**, not a clip.

That is exactly why the **evolving avatar wants Rive** (stateful, reacts, grows) and why
one-shot juice (confetti, level-up burst) is happiest as **Lottie or code**.

## Why Rive for the avatar (alternatives surveyed)

| Option | Verdict for ecomania |
|---|---|
| **Rive** | ✅ The avatar. Stateful, data-driven, one `.riv` runs web + native. |
| **Lottie** | ✅ Complementary — one-shot juice + a huge ready-made library (AI-generatable). Not for a stateful avatar. |
| **Spine / DragonBones** | ❌ Game-engine skeletal animation; heavier, weak RN/web ergonomics, Spine is paid. |
| **Spline** | ❌ Interactive **3D** — different niche. |
| **Code-driven** (Reanimated / Skia / Pixi) | ✅ For UI motion; ❌ for a designer-owned avatar (authoring in code defeats the point). |

Open-source posture: Rive **runtimes are MIT** (incl. the renderer) — no runtime lock-in; the
**editor is proprietary** (the only paid/closed part). The `.riv` format is read by the open
runtimes.

## Who authors which layer (AI-leveraged team)

See `architecture.md` §7. Summary: **code-driven** and **Lottie** are the AI-authorable layers
(the ~95% of motion); **Rive art is the designer's job** (AI can't emit a `.riv`), while AI
writes the *integration code* that drives Rive inputs.

## The designer's Rive workflow

The designer works in the **Rive editor** (browser-based, collaborative like Figma):

1. **Design** the avatar — vector tools, or import from Figma/Illustrator, onto an *artboard*.
2. **Rig** it — bones/meshes so parts move organically (breathing, blinking).
3. **Animate** discrete timelines: `idle`, `blink`, `grow_stage_2`, `level_up_burst`, trait variants.
4. **Build the state machine** — drag states, draw transitions, set **conditions on inputs**
   ("when `level` ≥ 5 → `stage_2`"; "on `xpPulse` trigger → play burst, return to idle").
5. **Add listeners** for direct interaction (tap avatar → it waves) — inside Rive, no code.
6. **Data binding / View Models** — bind structured data (a level number, a name label, a
   progress ring) directly to the art; two-way at runtime.
7. **Export `.riv`** (needs the Cadet plan — see below) and hand it off.

The key property: the designer can freely re-animate, re-rig, add states — and **as long as the
input/binding names hold, code keeps working with zero changes.** That decoupling is why the
input names are a frozen contract (§4).

## Where it lives & versioning

- Asset: `packages/shared/assets/avatar.riv` (one file, both runtimes).
- Contract: `packages/shared/src/avatar/` — input-name constants + `computeInputs()`.
- Runtimes: app = `rive-react-native`; funnel = `@rive-app/react-canvas`. Same file, same names.
- The `.riv` is binary — commit it with a CHANGELOG note whenever the **contract** changes; the
  contract constants give the human-readable diff the binary can't.

## Pricing & when to pay

| Plan | What you get | For us |
|---|---|---|
| **Free** | editor + unlimited personal files; **no runtime export** | design + build integration against placeholder/sample `.riv` |
| **Cadet — $9/mo** (≤3 seats) | **export `.riv` for runtimes** | turn on when exporting the real avatar; covers you + designer |
| **Voyager — $32/mo** (≤25 seats) | Libraries, scaled collaboration | later, if the team/asset library grows |
| **Enterprise — $120/mo** | SSO, SOC2, custom runtime | not needed near-term |

The subscription gates **export**, not playback — once exported, the `.riv` plays forever under
the MIT runtimes. So you pay only during periods of active avatar export/iteration.
