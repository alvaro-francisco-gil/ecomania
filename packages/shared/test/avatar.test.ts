import { describe, expect, it } from 'vitest';

import {
  BASE_FORMS,
  BASE_FORMS_PER_POLE,
  ELEMENTS,
  RIVE_INPUTS,
  RIVE_INPUT_BOUNDARY,
  axisToRiveInput,
  computeAvatarInputs,
  isElementId,
  selectBaseForm,
} from '../src/avatar/index.js';
import { ORIGIN_VALUE_VECTOR, type ValueVector } from '../src/values/index.js';

describe('the input contract', () => {
  it('is frozen — these names must match the .riv and both renderers', () => {
    expect(RIVE_INPUTS).toEqual({
      means: 'surface',
      agency: 'companions',
      power: 'geometry',
    });
  });

  it('has no input for moralStanding — it selects an artboard, not a knob', () => {
    expect(RIVE_INPUTS).not.toHaveProperty('moralStanding');
  });
});

describe('axisToRiveInput', () => {
  it('maps the poles to the ends of the range and zero to the boundary', () => {
    expect(axisToRiveInput(-1)).toBe(0);
    expect(axisToRiveInput(0)).toBe(RIVE_INPUT_BOUNDARY);
    expect(axisToRiveInput(1)).toBe(100);
  });

  it('puts a faint positive value just above the boundary, not at an extreme', () => {
    expect(axisToRiveInput(0.1)).toBeCloseTo(55);
    expect(axisToRiveInput(-0.1)).toBeCloseTo(45);
  });

  it('keeps sign and magnitude in one number: side of 50 is identity, distance is density', () => {
    const faint = axisToRiveInput(0.1);
    const strong = axisToRiveInput(0.9);

    expect(faint).toBeGreaterThanOrEqual(RIVE_INPUT_BOUNDARY);
    expect(strong).toBeGreaterThanOrEqual(RIVE_INPUT_BOUNDARY);
    expect(strong - RIVE_INPUT_BOUNDARY).toBeGreaterThan(faint - RIVE_INPUT_BOUNDARY);
  });

  it('throws on a corrupt axis value rather than rendering something plausible', () => {
    expect(() => axisToRiveInput(1.2)).toThrow(RangeError);
    expect(() => axisToRiveInput(Number.NaN)).toThrow(RangeError);
  });
});

describe('base forms', () => {
  it('has an even count — an odd one would smuggle in a neutral', () => {
    expect(BASE_FORMS.length % 2).toBe(0);
  });

  it('splits evenly across the two poles', () => {
    const anthropocentric = BASE_FORMS.filter((f) => f.pole === 'anthropocentric');
    const ecocentric = BASE_FORMS.filter((f) => f.pole === 'ecocentric');

    expect(anthropocentric).toHaveLength(BASE_FORMS_PER_POLE);
    expect(ecocentric).toHaveLength(BASE_FORMS_PER_POLE);
  });

  it('gives every form a distinct id and .riv', () => {
    expect(new Set(BASE_FORMS.map((f) => f.id)).size).toBe(BASE_FORMS.length);
    expect(new Set(BASE_FORMS.map((f) => f.riv)).size).toBe(BASE_FORMS.length);
  });

  it('picks by sign', () => {
    expect(selectBaseForm(-1).pole).toBe('anthropocentric');
    expect(selectBaseForm(-0.05).pole).toBe('anthropocentric');
    expect(selectBaseForm(0.05).pole).toBe('ecocentric');
    expect(selectBaseForm(1).pole).toBe('ecocentric');
  });

  it('resolves a data zero to the ecocentric side, matching the input boundary', () => {
    expect(selectBaseForm(0).pole).toBe('ecocentric');
  });

  it('is total across the whole axis', () => {
    for (let v = -1; v <= 1.0001; v += 0.01) {
      const clamped = Math.min(v, 1);
      expect(() => selectBaseForm(clamped)).not.toThrow();
    }
  });

  it('throws outside the axis range', () => {
    expect(() => selectBaseForm(-1.5)).toThrow(RangeError);
  });
});

describe('elements', () => {
  it('gives every element a distinct id, planetary system and aura material', () => {
    expect(new Set(ELEMENTS.map((e) => e.id)).size).toBe(ELEMENTS.length);
    expect(new Set(ELEMENTS.map((e) => e.system)).size).toBe(ELEMENTS.length);
    expect(new Set(ELEMENTS.map((e) => e.auraMaterial)).size).toBe(ELEMENTS.length);
  });

  it('rejects an unknown id', () => {
    expect(isElementId('fire')).toBe(true);
    expect(isElementId('aether')).toBe(false);
  });
});

describe('computeAvatarInputs', () => {
  const vector: ValueVector = {
    moralStanding: 0.6,
    means: 0.4,
    agency: -0.8,
    power: 0,
  };

  it('produces one input per knob plus the aura', () => {
    const { inputs } = computeAvatarInputs({ vector, elementId: 'water', auraIntensity: 30 });

    expect(Object.keys(inputs).sort()).toEqual(['aura', 'companions', 'geometry', 'surface']);
  });

  it('routes each axis to its own channel', () => {
    const { inputs } = computeAvatarInputs({ vector, elementId: 'water', auraIntensity: 30 });

    expect(inputs.surface).toBeCloseTo(70);
    expect(inputs.companions).toBeCloseTo(10);
    expect(inputs.geometry).toBe(RIVE_INPUT_BOUNDARY);
    expect(inputs.aura).toBe(30);
  });

  it('selects the artboard from axis 1 and the aura material from the element', () => {
    const result = computeAvatarInputs({ vector, elementId: 'water', auraIntensity: 30 });

    expect(result.baseForm.pole).toBe('ecocentric');
    expect(result.element.auraMaterial).toBe('droplets');
  });

  it('keeps the element out of the body — it changes nothing but the material', () => {
    const withFire = computeAvatarInputs({ vector, elementId: 'fire', auraIntensity: 30 });
    const withEarth = computeAvatarInputs({ vector, elementId: 'earth', auraIntensity: 30 });

    expect(withFire.inputs).toEqual(withEarth.inputs);
    expect(withFire.baseForm).toEqual(withEarth.baseForm);
    expect(withFire.element).not.toEqual(withEarth.element);
  });

  it('renders an origin vector without a neutral state', () => {
    const { inputs } = computeAvatarInputs({
      vector: ORIGIN_VALUE_VECTOR,
      elementId: 'air',
      auraIntensity: 0,
    });

    for (const name of ['surface', 'companions', 'geometry']) {
      expect(inputs[name]).toBe(RIVE_INPUT_BOUNDARY);
    }
  });

  it('is pure — the same source always yields the same avatar', () => {
    const source = { vector, elementId: 'fire', auraIntensity: 42 } as const;
    expect(computeAvatarInputs(source)).toEqual(computeAvatarInputs(source));
  });

  it('throws on an out-of-range aura intensity', () => {
    expect(() =>
      computeAvatarInputs({ vector, elementId: 'fire', auraIntensity: 120 }),
    ).toThrow(RangeError);
  });
});
