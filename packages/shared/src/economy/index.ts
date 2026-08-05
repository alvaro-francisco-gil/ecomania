/**
 * The XP economy — the clock.
 *
 * Note the asymmetry with `../values`: XP is **earned** (anti-cheat applies) while the value
 * vector is **measured** (uncapped, not gameable). The same submission updates both and they
 * share nothing else. Never fuse them.
 *
 * What lives here is a *description* of the rules the Cloud Functions enforce. Clients read it
 * to render a progress bar; they never apply it to a write. Every XP-bearing mutation is a
 * callable with an idempotency key, appending to the `xpEvents` ledger.
 *
 * Still open: the XP **sources** and their amounts, which depend on the anti-farming design (do
 * posts and comments earn XP at all, or does XP flow only from finite content?). Until that is
 * settled, no source table is invented here.
 */
export {
  BASE_LEVEL_XP,
  FIRST_LEVEL,
  LEVEL_GROWTH_RATE,
  levelFromXp,
  levelProgress,
  totalXpForLevel,
  xpForNextLevel,
  type LevelProgress,
} from './levels.js';
