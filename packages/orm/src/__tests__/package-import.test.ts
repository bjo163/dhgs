import { describe, expect, it } from 'vitest';
import { fields, ModelRegistry } from '@dhgs/orm';

describe('@dhgs/orm package contract', () => {
  it('resolves through the declared package export', () => {
    expect(fields.string({ required: true }).kind).toBe('string');
    expect(new ModelRegistry().list()).toEqual([]);
  });
});
