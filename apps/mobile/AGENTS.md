# apps/mobile — Agent Notes

**Not scaffolded yet.** This will be the Expo native app — *the game*: feed, the evolving
Rive ecoavatar, XP/leveling juice, social interactions, leaderboards.

Planned stack (mirrors `ordago-apps/apps/ordago-app`): Expo + React Native (New
Architecture), `@react-native-firebase/*`, React Navigation, **`rive-react-native`** for the
avatar, **Reanimated** for UI micro-interactions, **`lottie-react-native`** for one-shot juice.

Until it exists, see the root [`AGENTS.md`](../../AGENTS.md) and
[`docs/architecture.md`](../../docs/architecture.md). Scaffolding is tracked in
[`docs/plans/ideas/bootstrap-apps.md`](../../docs/plans/ideas/bootstrap-apps.md).

Key constraints that will apply here:
- The avatar renders via `rive-react-native` and is driven **only** through the shared Rive
  input contract (`packages/shared` — see `rive-avatar-contract`, once written). Same input
  names as the funnel's web renderer.
- Never write economy fields from the client (see root AGENTS.md). Read them; mutate via Functions.
