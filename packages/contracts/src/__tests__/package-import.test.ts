import { describe, expect, it } from 'vitest';

describe('@dhgs/contracts package export', () => {
  it('is importable through the canonical package name', async () => {
    const contracts = await import('@dhgs/contracts');
    expect(contracts.CONTRACT_SCHEMA_VERSION).toBe('1.0.0');
    expect(contracts.EVENT_TYPES).toContain('CASE_CREATED');
  });
});
