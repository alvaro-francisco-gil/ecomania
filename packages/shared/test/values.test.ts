import { describe, expect, it } from 'vitest';

import {
  DEFAULT_LEARNING_RATE,
  ORIGIN_VALUE_VECTOR,
  VALUE_AXES,
  VALUE_AXIS_IDS,
  dominantAxis,
  isValueAxisId,
  nudgeValueVector,
  type ValueVector,
} from '../src/values/index.js';

describe('the axis set', () => {
  it('is the four locked axes, in order', () => {
    expect(VALUE_AXIS_IDS).toEqual(['moralStanding', 'means', 'agency', 'power']);
  });

  it('gives every axis a distinct visual channel', () => {
    const channels = VALUE_AXIS_IDS.map((id) => VALUE_AXES[id].visualChannel);
    expect(new Set(channels).size).toBe(channels.length);
  });

  it('keys each axis by its own id', () => {
    for (const id of VALUE_AXIS_IDS) {
      expect(VALUE_AXES[id].id).toBe(id);
    }
  });

  it('rejects an unknown axis id', () => {
    expect(isValueAxisId('moralStanding')).toBe(true);
    expect(isValueAxisId('localGlobal')).toBe(false);
  });
});

describe('nudgeValueVector', () => {
  it('moves an axis a fraction of the way toward the answer', () => {
    const next = nudgeValueVector(ORIGIN_VALUE_VECTOR, { means: 1 }, 0.15);
    expect(next.means).toBeCloseTo(0.15);
  });

  it('leaves axes the answer carries no weight on untouched', () => {
    const current: ValueVector = { moralStanding: 0.4, means: -0.2, agency: 0, power: 0.9 };
    const next = nudgeValueVector(current, { means: 1 });

    expect(next.moralStanding).toBe(0.4);
    expect(next.agency).toBe(0);
    expect(next.power).toBe(0.9);
    expect(next.means).not.toBe(-0.2);
  });

  it('converges toward the answer without overshooting it', () => {
    let vector = ORIGIN_VALUE_VECTOR;
    for (let i = 0; i < 200; i += 1) {
      vector = nudgeValueVector(vector, { agency: 1 });
      expect(vector.agency).toBeLessThanOrEqual(1);
    }
    expect(vector.agency).toBeCloseTo(1, 5);
  });

  it('never leaves the axis range for in-range inputs', () => {
    const extreme: ValueVector = { moralStanding: 1, means: -1, agency: 1, power: -1 };
    const next = nudgeValueVector(extreme, {
      moralStanding: -1,
      means: 1,
      agency: -1,
      power: 1,
    });
    for (const id of VALUE_AXIS_IDS) {
      expect(next[id]).toBeGreaterThanOrEqual(-1);
      expect(next[id]).toBeLessThanOrEqual(1);
    }
  });

  it('does not mutate the vector it was given', () => {
    const current: ValueVector = { ...ORIGIN_VALUE_VECTOR };
    nudgeValueVector(current, { power: 1 });
    expect(current.power).toBe(0);
  });

  it('throws rather than clamping an out-of-range weight', () => {
    expect(() => nudgeValueVector(ORIGIN_VALUE_VECTOR, { means: 1.5 })).toThrow(RangeError);
  });

  it('throws on an out-of-range starting vector', () => {
    const bad = { ...ORIGIN_VALUE_VECTOR, agency: -2 };
    expect(() => nudgeValueVector(bad, { means: 0.5 })).toThrow(RangeError);
  });

  it('throws on a learning rate outside (0, 1]', () => {
    expect(() => nudgeValueVector(ORIGIN_VALUE_VECTOR, { means: 1 }, 0)).toThrow(RangeError);
    expect(() => nudgeValueVector(ORIGIN_VALUE_VECTOR, { means: 1 }, 1.5)).toThrow(RangeError);
  });

  it('defaults to the documented learning rate', () => {
    const explicit = nudgeValueVector(ORIGIN_VALUE_VECTOR, { means: 1 }, DEFAULT_LEARNING_RATE);
    const implicit = nudgeValueVector(ORIGIN_VALUE_VECTOR, { means: 1 });
    expect(implicit).toEqual(explicit);
  });
});

describe('dominantAxis', () => {
  it('returns null for a neutral vector rather than picking arbitrarily', () => {
    expect(dominantAxis(ORIGIN_VALUE_VECTOR)).toBeNull();
  });

  it('names the pole matching the sign', () => {
    const leaning: ValueVector = { moralStanding: -0.8, means: 0.1, agency: 0, power: 0 };
    expect(dominantAxis(leaning)).toEqual({
      axis: 'moralStanding',
      pole: 'anthropocentric',
      magnitude: 0.8,
    });
  });

  it('ranks by magnitude, not signed value', () => {
    const leaning: ValueVector = { moralStanding: 0.5, means: -0.9, agency: 0, power: 0 };
    expect(dominantAxis(leaning)?.axis).toBe('means');
  });
});
