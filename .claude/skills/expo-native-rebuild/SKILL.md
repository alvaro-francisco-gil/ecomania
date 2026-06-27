---
name: expo-native-rebuild
description: Use after any change to native modules or config plugins in `apps/mobile/` — adding/removing a native dependency (rive-react-native, Reanimated, Lottie, @react-native-firebase), editing `app.json`/config plugins, or when the dev client crashes on launch after pulling a branch with native changes. Encodes the native-rebuild checklist (a JS reload is not enough). Companion to `drive-android-avd` (booting an emulator to verify) and `prepare-release` (version/build implications).
---

## STUB — not yet written

Author this skill once **`apps/mobile/`** is scaffolded. Writing it earlier would bake in guesses.

What it will encode:
- When a native rebuild is required vs. when a JS reload suffices: any native module add/remove, any config-plugin or `app.json` native change, any `@react-native-firebase`/Reanimated/Rive/Lottie version bump.
- The rebuild checklist: clean prebuild, reinstall pods/gradle, rebuild the dev client, reinstall on device/emulator.
- The "native init crash on launch after pulling a branch" symptom → rebuild, don't debug JS.
- Verifying the rebuild with `drive-android-avd`.
