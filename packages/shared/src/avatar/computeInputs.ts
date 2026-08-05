import type { ValueVector } from '../values/vector.js';

import { selectBaseForm, type BaseForm } from './baseForms.js';
import { getElement, type Element, type ElementId } from './elements.js';
import {
  RIVE_AURA_INPUT,
  RIVE_INPUTS,
  RIVE_INPUT_MAX,
  RIVE_INPUT_MIN,
  axisToRiveInput,
} from './inputs.js';

/**
 * Everything a renderer needs to show one user's avatar. Both `rive-react-native` and
 * `@rive-app/react-canvas` consume this identically — that sameness is the whole point of the
 * contract living here rather than in either app.
 */
export interface AvatarPresentation {
  /** Which `.riv` to load. Axis 1 selects an artboard, not an input. */
  readonly baseForm: BaseForm;
  /** Numeric state-machine inputs, keyed by their frozen Rive names. */
  readonly inputs: Readonly<Record<string, number>>;
  /** Drives the aura's material. Not an input — it selects which effect is authored in. */
  readonly element: Element;
}

export interface AvatarSource {
  readonly vector: ValueVector;
  readonly elementId: ElementId;
  /**
   * The aura's intensity as a `0..100` input.
   *
   * Passed in rather than derived, because the XP curve does not exist yet
   * (`docs/architecture.md` §10) and inventing one here would bury a product decision in a
   * mapping function. When the curve lands, the level→aura mapping belongs in `../economy/`,
   * and this stays the thing that renders it.
   */
  readonly auraIntensity: number;
}

/**
 * Map a user's stored state onto their avatar.
 *
 * Pure and total: same input, same output, no I/O. That is what makes the funnel's reveal and
 * the app's home screen provably show the same creature for the same data — the bug this
 * function exists to make impossible.
 */
export function computeAvatarInputs(source: AvatarSource): AvatarPresentation {
  const { vector, elementId, auraIntensity } = source;

  if (
    !Number.isFinite(auraIntensity) ||
    auraIntensity < RIVE_INPUT_MIN ||
    auraIntensity > RIVE_INPUT_MAX
  ) {
    throw new RangeError(
      `auraIntensity must be within [${RIVE_INPUT_MIN}, ${RIVE_INPUT_MAX}], got ${auraIntensity}`,
    );
  }

  const inputs: Record<string, number> = {
    [RIVE_AURA_INPUT]: auraIntensity,
  };
  for (const [axisId, inputName] of Object.entries(RIVE_INPUTS)) {
    inputs[inputName] = axisToRiveInput(vector[axisId as keyof ValueVector]);
  }

  return {
    baseForm: selectBaseForm(vector.moralStanding),
    inputs: Object.freeze(inputs),
    element: getElement(elementId),
  };
}
