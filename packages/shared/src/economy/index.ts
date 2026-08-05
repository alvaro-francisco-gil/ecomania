/**
 * XP rules — sources, daily caps, the level curve, and the mapping from action to aspect.
 *
 * Empty until the numbers are decided (`docs/architecture.md` §10). Note the asymmetry with
 * `../values`: XP is *earned* — capped, idempotent, anti-cheat — while the value vector is
 * *measured*. They are updated by the same submission and share nothing else.
 *
 * Whatever lands here is a description of the rules the Cloud Functions enforce. Clients read
 * it to render; they never apply it to a write.
 */
export {};
