# Rive assets

One `.riv` per avatar, loaded by **both** renderers — `rive-react-native` in the app and
`@rive-app/react-canvas` in the funnel. Never copy a `.riv` into an app directory; the funnel's
`public/` copy is generated at build time from here (`apps/funnel/scripts/copy-rive-assets.mjs`).

`.riv` is binary, so a diff tells you nothing. When the **contract** changes — an input renamed,
added, or removed — say so in `CHANGELOG.md` and update the constants in
`packages/shared/src/avatar/`. Those constants are the human-readable diff the binary cannot give.

## `avatar.sample.riv` — PLACEHOLDER, replace before launch

| | |
|---|---|
| Source | Rive Community, "Avatar Pack" use-case file |
| URL | `https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv` |
| Retrieved | 2026-08-05 |
| Artboard | `Avatar 2` |
| Purpose | development placeholder so both renderers can be wired before the real avatar exists |

**This is not our avatar and must not ship.** It is here so the integration code — loading,
sizing, the input-driving layer — can be written and reviewed while the designer works. It
carries none of our archetypes, none of our value-axis channels, and its rig is a face, not an
ecoavatar.

**Licence: unverified.** Rive Community files are shared under per-file terms that we have not
checked for this one. That is acceptable for a local development placeholder and **not**
acceptable for anything distributed. Before any build reaches a real user — TestFlight, a
Play track, a deployed funnel — either confirm this file's terms or replace it with the
designer's export.

Rive's own runtimes are MIT and impose no restriction on playback. The **editor** subscription
(Cadet, $9/mo) gates *export*, so consuming an already-exported file like this one needs no
subscription. See [`docs/rive-and-animation.md`](../../../docs/rive-and-animation.md).
