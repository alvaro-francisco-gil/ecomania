import {
  VALUE_AXES,
  VALUE_AXIS_IDS,
  VALUE_AXIS_MAX,
  VALUE_AXIS_MIN,
  type ValueAxisId,
} from './axes.js';

/** A position in the four-axis value space. Every axis is present; every value is in [-1, 1]. */
export type ValueVector = Readonly<Record<ValueAxisId, number>>;

/**
 * The axis contributions carried by a single questionnaire answer. Partial by design — a good
 * item loads on one or two axes, and an axis absent here is left untouched by the nudge rather
 * than pulled toward zero.
 */
export type AxisWeights = Readonly<Partial<Record<ValueAxisId, number>>>;

/**
 * The origin of the value space — every axis at 0. This is a *data* zero (no evidence yet, or
 * evidence that cancels out), **not** a renderable neutral: the avatar has no neutral state on
 * any axis, so a 0 renders as the faintest expression of the positive pole rather than as a
 * third "neither" look. See `docs/plans/ideas/encargo-diseno-avatar.md`.
 */
export const ORIGIN_VALUE_VECTOR: ValueVector = Object.freeze(
  Object.fromEntries(VALUE_AXIS_IDS.map((id) => [id, 0])) as Record<ValueAxisId, number>,
);

/**
 * Moving-average rate for `nudgeValueVector` (architecture §5). Small on purpose: identity
 * should emerge over many topics rather than whiplash on one.
 *
 * NOT yet tuned against real data — 0.15 is the architecture doc's illustrative value. Revisit
 * once onboarding data exists.
 */
export const DEFAULT_LEARNING_RATE = 0.15;

function assertInAxisRange(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${label} must be a finite number, got ${value}`);
  }
  if (value < VALUE_AXIS_MIN || value > VALUE_AXIS_MAX) {
    throw new RangeError(
      `${label} must be within [${VALUE_AXIS_MIN}, ${VALUE_AXIS_MAX}], got ${value}`,
    );
  }
}

export function assertValueVector(vector: ValueVector): void {
  for (const id of VALUE_AXIS_IDS) {
    assertInAxisRange(vector[id], `value vector axis "${id}"`);
  }
}

/**
 * Nudge a value vector toward the position implied by one answer:
 *
 *     next[axis] = current[axis] + rate * (weight[axis] - current[axis])
 *
 * Only axes present in `weights` move. Because both operands are within [-1, 1] and the rate is
 * within (0, 1], the result cannot leave the range — no clamping needed, and none is applied,
 * so an out-of-range input throws rather than being silently corrected.
 *
 * This is a *measurement*, deliberately decoupled from the XP economy: it is uncapped and not
 * gameable. Awarding XP for the same submission is a separate, capped, idempotent call.
 */
export function nudgeValueVector(
  current: ValueVector,
  weights: AxisWeights,
  rate: number = DEFAULT_LEARNING_RATE,
): ValueVector {
  assertValueVector(current);
  if (!Number.isFinite(rate) || rate <= 0 || rate > 1) {
    throw new RangeError(`learning rate must be within (0, 1], got ${rate}`);
  }

  const next: Record<ValueAxisId, number> = { ...current };
  for (const id of VALUE_AXIS_IDS) {
    const weight = weights[id];
    if (weight === undefined) continue;
    assertInAxisRange(weight, `answer weight for axis "${id}"`);
    next[id] = current[id] + rate * (weight - current[id]);
  }
  return Object.freeze(next);
}

/**
 * The dominant axis and its direction — the cheap summary used to pick a headline for a
 * profile. Returns `null` when the vector is entirely neutral, rather than picking an
 * arbitrary axis.
 */
export function dominantAxis(
  vector: ValueVector,
): { readonly axis: ValueAxisId; readonly pole: string; readonly magnitude: number } | null {
  assertValueVector(vector);

  let winner: ValueAxisId | null = null;
  let best = 0;
  for (const id of VALUE_AXIS_IDS) {
    const magnitude = Math.abs(vector[id]);
    if (magnitude > best) {
      best = magnitude;
      winner = id;
    }
  }
  if (winner === null) return null;

  const axis = VALUE_AXES[winner];
  return {
    axis: winner,
    pole: vector[winner] < 0 ? axis.negativePole : axis.positivePole,
    magnitude: best,
  };
}
