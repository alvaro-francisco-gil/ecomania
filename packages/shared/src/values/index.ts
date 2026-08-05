/**
 * The value-axis contract — the eco-identity space shared by the funnel, the app, and the
 * Cloud Functions that own the writes.
 *
 * The vector is GDPR special-category data. Storing, exposing, or matching on it needs explicit
 * consent and deliberate exposure rules (`values-privacy`, still a stub).
 *
 * Still open (creative core): the survey instrument that positions a user in this space, and
 * the archetype taxonomy that names its regions.
 */
export {
  VALUE_AXES,
  VALUE_AXIS_IDS,
  VALUE_AXIS_MAX,
  VALUE_AXIS_MIN,
  isValueAxisId,
  type ValueAxis,
  type ValueAxisId,
} from './axes.js';

export {
  DEFAULT_LEARNING_RATE,
  NEUTRAL_VALUE_VECTOR,
  assertValueVector,
  dominantAxis,
  nudgeValueVector,
  type AxisWeights,
  type ValueVector,
} from './vector.js';
