# packages/shared — Agent Notes

`@ecomania/shared` — the shared brain used by **both** apps and (via mirrored types) the
Cloud Functions. TypeScript, vitest (once wired).

Intended structure (mostly empty for now):
- `src/models/` — the data shapes. **Source of truth.** _TBD — see `docs/architecture.md`._
- `src/services/` — the **only** place client code imports the Firestore SDK. Indexed by
  `_services-map.md`. See `touch-service` (once written).
- `src/avatar/` — the **Rive input contract**: input/data-binding names as constants, plus
  `computeInputs()` mapping profile data → avatar inputs. Consumed identically by the mobile
  (`rive-react-native`) and funnel (`@rive-app/react-canvas`) renderers. _TBD._
- `src/values/` — the **value-axis contract**: the eco-value axes referenced by questionnaires
  and mapped to avatar inputs. _TBD._
- `src/economy/` — XP rules: sources, daily caps, level curve, aspect mapping. _TBD._

These three contracts (`avatar`, `values`, `economy`) are the cross-cutting agreements that
keep the funnel, the app, the Functions, and the designer's `.riv` in lockstep. Treat a
rename in any of them as a contract change touching every consumer.

See the root [`AGENTS.md`](../../AGENTS.md) and [`docs/architecture.md`](../../docs/architecture.md).
