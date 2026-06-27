---
name: drive-android-avd
description: Use to drive the mobile app on an Android emulator from WSL2 — boot an AVD, expose Metro to it, deep-link into a screen, capture a screenshot, and read logcat. Reach for it when verifying a UI fix/feature on a real runtime (the avatar reveal, survey flow) or reproducing a native crash. Companion to `expo-native-rebuild` (rebuild before driving after native changes), `fix-bug` (re-walking a repro), and `parallel-agent-workflow` (per-slot AVD isolation).
---

## STUB — not yet written

Author this skill once **`apps/mobile/`** is scaffolded. Writing it earlier would bake in guesses.

What it will encode:
- Booting an AVD from WSL2 and the host/adb networking needed to reach it.
- Exposing the Metro bundler to the emulator (port forwarding / host resolution from WSL2).
- Deep-linking into a specific screen for fast verification (avatar reveal, `/invite`, survey).
- Capturing a screenshot and pulling it back for visual confirmation.
- Reading `logcat` filtered to the app to diagnose native crashes.
