/**
 * The level curve — the XP clock.
 *
 * Uncapped and geometric: each level costs ~15% more than the one before. Levels 1–10 arrive
 * fast enough to hook, and by level 50 each one is a real investment. There is no maximum, so
 * the most engaged users are never stranded at a ceiling and the aura always has a next step to
 * grow into.
 *
 * The whole curve is two constants. Retuning is a one-line change — but it silently moves every
 * existing user's level, so treat a change to either as a migration with a communication plan,
 * not a tweak.
 */

/** XP required to go from level 1 to level 2. Every later step scales from this. */
export const BASE_LEVEL_XP = 100;

/** Each level costs this multiple of the previous one. */
export const LEVEL_GROWTH_RATE = 1.15;

/** Levels start at 1 — a user with 0 XP is level 1, never level 0. */
export const FIRST_LEVEL = 1;

function assertValidLevel(level: number): void {
  if (!Number.isInteger(level) || level < FIRST_LEVEL) {
    throw new RangeError(`level must be an integer >= ${FIRST_LEVEL}, got ${level}`);
  }
}

function assertValidXp(totalXp: number): void {
  if (!Number.isInteger(totalXp) || totalXp < 0) {
    throw new RangeError(`total XP must be a non-negative integer, got ${totalXp}`);
  }
}

/**
 * XP needed to advance *from* `level` to the next one.
 *
 * Rounded to a whole number, because XP is a counter users see — and because
 * `xpForNextLevel` and `totalXpForLevel` must agree exactly. Both are built from these same
 * rounded steps rather than from a closed-form sum, so they cannot drift apart.
 */
export function xpForNextLevel(level: number): number {
  assertValidLevel(level);
  return Math.round(BASE_LEVEL_XP * LEVEL_GROWTH_RATE ** (level - FIRST_LEVEL));
}

/**
 * Total lifetime XP needed to *reach* `level`. Level 1 costs nothing.
 *
 * O(level) by construction — see `xpForNextLevel`. Realistic levels are in the low hundreds, so
 * the loop is cheaper than the cache it would take to avoid it.
 */
export function totalXpForLevel(level: number): number {
  assertValidLevel(level);
  let total = 0;
  for (let step = FIRST_LEVEL; step < level; step += 1) {
    total += xpForNextLevel(step);
  }
  return total;
}

/** The level a lifetime XP total buys. */
export function levelFromXp(totalXp: number): number {
  assertValidXp(totalXp);
  let level = FIRST_LEVEL;
  let spent = 0;
  for (;;) {
    const next = spent + xpForNextLevel(level);
    if (next > totalXp) return level;
    spent = next;
    level += 1;
  }
}

export interface LevelProgress {
  readonly level: number;
  /** XP earned since reaching `level`. */
  readonly xpIntoLevel: number;
  /** XP the current level costs in total. */
  readonly xpForLevel: number;
  /** `0..1` through the current level — for progress bars, never for the economy. */
  readonly fraction: number;
}

/**
 * Everything a progress bar needs, computed once so the two clients cannot disagree about how
 * full the ring is.
 */
export function levelProgress(totalXp: number): LevelProgress {
  assertValidXp(totalXp);
  const level = levelFromXp(totalXp);
  const xpIntoLevel = totalXp - totalXpForLevel(level);
  const xpForLevel = xpForNextLevel(level);
  return {
    level,
    xpIntoLevel,
    xpForLevel,
    fraction: xpIntoLevel / xpForLevel,
  };
}
