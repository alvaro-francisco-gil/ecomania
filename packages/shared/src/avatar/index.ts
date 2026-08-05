/**
 * The Rive input contract — input and data-binding names as constants, plus the mapping from
 * profile data to avatar inputs. Consumed identically by `rive-react-native` (app) and
 * `@rive-app/react-canvas` (funnel), against one `avatar.riv`.
 *
 * Empty on purpose, and the last thing here that should be guessed at. The inputs fall into
 * three groups (`docs/architecture.md` §4): archetype (base form), aspects (voice / knowledge /
 * community), and the value vector — and the first of those is blocked on the archetype
 * taxonomy, which the creative core has not settled.
 *
 * When it lands: renaming an input is a contract change touching both renderers and the `.riv`
 * itself. See `rive-avatar-contract`.
 */
export {};
