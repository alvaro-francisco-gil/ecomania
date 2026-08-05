/**
 * The data shapes — source of truth for anything crossing a service, component, or hook
 * boundary.
 *
 * Empty on purpose. The collections (`profiles`, `posts`, `surveys`, `questionnaires`,
 * `valueProfile`, `xpEvents`, `feeds`, …) are blocked on the creative core; see
 * `docs/architecture.md` §10. Do not invent a shape here to unblock a feature — resolve the
 * open question first.
 */
export {};
