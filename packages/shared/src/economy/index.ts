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
 * **There are no daily caps — supply is the cap.** XP-bearing content arrives on a global
 * content calendar, the same items for everyone, so there is nothing to farm: you cannot answer
 * a questionnaire that has not been published. That removes the whole per-source cap table.
 * It also means editorial output bounds economic throughput
 * (`docs/decisions/xp-economy.md`).
 *
 * No source table lives here, and that is deliberate: **each questionnaire declares its own XP
 * value**, so the amount is content, not a constant. News carries no XP and never touches the
 * value vector. Posts, comments and referrals do not exist yet — when they do, they are
 * unbounded by nature and the supply-as-cap argument will not cover them.
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
