---
name: prepare-release
description: Use when cutting a release of the mobile app — drafting the CHANGELOG section and bumping the version. Encodes the safe release-prep flow that drafts and bumps but NEVER tags or pushes (CI/the user owns publishing). Reach for it on "prep a release", "bump the version", "draft the changelog". Companion to `expo-native-rebuild` (a native bump may force a rebuild) and `firestore-deploy` (backend that must ship alongside).
---

## STUB — not yet written

Author this skill once **`apps/mobile/app.json` + the CHANGELOG release flow** exist. Writing it earlier would bake in guesses.

What it will encode:
- Drafting the next CHANGELOG section from the merged commits since the last release.
- Bumping the version in `apps/mobile/app.json` (and build number) per the versioning convention.
- The hard stop: never `git tag`, never push, never trigger an EAS submit — release publishing is CI/user-owned.
- Cross-checks: does this release carry native changes (`expo-native-rebuild`) or backend changes that must deploy in step (`firestore-deploy`)?
