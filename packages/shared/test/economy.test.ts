import { describe, expect, it } from 'vitest';

import {
  BASE_LEVEL_XP,
  FIRST_LEVEL,
  LEVEL_GROWTH_RATE,
  levelFromXp,
  levelProgress,
  totalXpForLevel,
  xpForNextLevel,
} from '../src/economy/index.js';

describe('the level curve', () => {
  it('starts at level 1 with zero XP — never level 0', () => {
    expect(levelFromXp(0)).toBe(FIRST_LEVEL);
    expect(totalXpForLevel(FIRST_LEVEL)).toBe(0);
  });

  it('charges the base cost for the first level', () => {
    expect(xpForNextLevel(1)).toBe(BASE_LEVEL_XP);
  });

  it('grows each level by the growth rate', () => {
    for (const level of [1, 5, 20, 60]) {
      const ratio = xpForNextLevel(level + 1) / xpForNextLevel(level);
      expect(ratio).toBeCloseTo(LEVEL_GROWTH_RATE, 2);
    }
  });

  it('is uncapped — level 500 is a real, finite level', () => {
    expect(xpForNextLevel(500)).toBeGreaterThan(0);
    expect(Number.isFinite(totalXpForLevel(500))).toBe(true);
  });

  it('never rounds a level cost to zero', () => {
    for (let level = 1; level <= 200; level += 1) {
      expect(xpForNextLevel(level)).toBeGreaterThan(0);
    }
  });
});

describe('levelFromXp and totalXpForLevel agree', () => {
  it('lands exactly on each level boundary', () => {
    for (let level = FIRST_LEVEL; level <= 80; level += 1) {
      expect(levelFromXp(totalXpForLevel(level))).toBe(level);
    }
  });

  it('one XP short of a boundary is still the previous level', () => {
    for (let level = FIRST_LEVEL + 1; level <= 80; level += 1) {
      expect(levelFromXp(totalXpForLevel(level) - 1)).toBe(level - 1);
    }
  });

  it('is monotonic — more XP never means a lower level', () => {
    let previous = FIRST_LEVEL;
    for (let xp = 0; xp < 60_000; xp += 137) {
      const level = levelFromXp(xp);
      expect(level).toBeGreaterThanOrEqual(previous);
      previous = level;
    }
  });
});

describe('the shape is what was decided', () => {
  it('reaches level 10 quickly enough to hook', () => {
    // A handful of actions' worth, not a grind.
    expect(totalXpForLevel(10)).toBeLessThan(2_500);
  });

  it('makes level 50 a genuine investment', () => {
    expect(totalXpForLevel(50)).toBeGreaterThan(50 * totalXpForLevel(10));
  });
});

describe('levelProgress', () => {
  it('reports zero progress exactly at a level boundary', () => {
    const progress = levelProgress(totalXpForLevel(7));
    expect(progress).toMatchObject({ level: 7, xpIntoLevel: 0, fraction: 0 });
  });

  it('reports a fraction strictly inside the level', () => {
    const start = totalXpForLevel(7);
    const progress = levelProgress(start + Math.floor(xpForNextLevel(7) / 2));

    expect(progress.level).toBe(7);
    expect(progress.fraction).toBeGreaterThan(0.4);
    expect(progress.fraction).toBeLessThan(0.6);
  });

  it('never reports a full bar — a full bar is the next level', () => {
    for (let xp = 0; xp < 20_000; xp += 97) {
      expect(levelProgress(xp).fraction).toBeLessThan(1);
    }
  });
});

describe('input validation', () => {
  it('rejects a negative or fractional XP total', () => {
    expect(() => levelFromXp(-1)).toThrow(RangeError);
    expect(() => levelFromXp(10.5)).toThrow(RangeError);
  });

  it('rejects a level below the first', () => {
    expect(() => xpForNextLevel(0)).toThrow(RangeError);
    expect(() => totalXpForLevel(-3)).toThrow(RangeError);
  });
});
