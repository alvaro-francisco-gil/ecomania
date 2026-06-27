---
name: i18n-add-string
description: Use whenever adding or changing a user-facing string in the app or funnel. Encodes the message-catalog layout and the dual-app consumption pattern so both the web funnel and the native app read the same source of truth instead of drifting. Reach for it on "add a label", "translate this", "new copy". Companion to `touch-service` only insofar as strings stay out of services.
---

## STUB — not yet written

Author this skill once **the i18n setup is decided** (catalog format + library for each app). Writing it earlier would bake in guesses.

What it will encode:
- The message-catalog layout: where keys live, key naming, and how locales are organized.
- Dual-app consumption: how the funnel (web) and the app (native) both read the shared catalog, and what (if anything) lives in `@ecomania/shared`.
- The add-a-string procedure: add the key + default locale, then any other locales, then reference by key (never hardcode copy in components).
- How missing-key behavior surfaces (no silent fallback to the raw key in production).
