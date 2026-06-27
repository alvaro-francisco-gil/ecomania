# apps/funnel — Agent Notes

**Not scaffolded yet.** This will be the Next.js **web funnel** — top-of-funnel only, *not*
a full peer of the game:

- Marketing landing (SEO).
- The ecology **survey** (no signup — Firebase **anonymous auth**).
- **Avatar reveal** (renders the same `avatar.riv` via **`@rive-app/react-canvas`**) + a
  shareable **OG image** of the avatar.
- `/invite/[code]` referral pages.
- CTA: "Continue in app" → deep link that carries the anonymous result into the mobile app.

Planned stack (mirrors `ordago-apps/apps/ordago-web`): Next.js (App Router) + Firebase web SDK
+ `@rive-app/react-canvas`.

Until it exists, see the root [`AGENTS.md`](../../AGENTS.md) and
[`docs/architecture.md`](../../docs/architecture.md). The funnel→app handoff invariant
("never make the user redo the survey") is the make-or-break flow — see `funnel-handoff`, once written.
