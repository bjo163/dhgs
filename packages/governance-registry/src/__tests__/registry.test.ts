import { describe, expect, it } from 'vitest';
import {
  RegistryValidationError,
  createRegistry,
  governanceRegistry,
  registrySeed,
  validateRegistrySeed,
  type InvariantRunner,
  type RegistrySeed
} from '../index';

describe('@dhgs/governance-registry', () => {
  it('validates the canonical seed and enumerates all named Blueprint requirements', () => {
    expect(() => validateRegistrySeed(registrySeed)).not.toThrow();
    expect(governanceRegistry.list('requirement')).toHaveLength(40);
    expect(governanceRegistry.get('REQ-ORM-004').statement).toBe('High-stakes governance actions cannot be exposed as generic CRUD actions.');
    expect(governanceRegistry.get('REQ-UX-007').statement).toContain('MUST NOT use dark patterns');
  });

  it('enumerates critical software invariants programmatically', () => {
    const ids = governanceRegistry.listInvariants().map((entry) => entry.id);
    expect(ids).toHaveLength(10);
    expect(ids).toContain('ORM-INV-005');
    expect(ids).toContain('ORM-INV-009');
  });

  it('traces a requirement through control, rule/invariant, test, evidence and KPI', () => {
    const trace = governanceRegistry.trace('REQ-ORM-004');
    const ids = trace.entries.map((entry) => entry.id);
    expect(ids).toEqual(expect.arrayContaining(['REQ-ORM-004', 'CTRL-ORM-004', 'RULE-ORM-004', 'ORM-INV-005', 'TEST-ORM-004', 'KPI-ORM-004']));
    expect(trace.evidence.map((item) => item.id)).toContain('EVID-ORM-004-001');
  });

  it('rejects duplicate IDs', () => {
    const broken: RegistrySeed = { entries: [...registrySeed.entries, registrySeed.entries[0]!], links: registrySeed.links };
    expect(() => validateRegistrySeed(broken)).toThrow(/Duplicate registry ID/);
  });

  it('rejects dangling references', () => {
    const broken: RegistrySeed = { entries: registrySeed.entries, links: [...registrySeed.links, { from: 'REQ-ORM-001', to: 'CTRL-MISSING-999', relation: 'implemented_by' }] };
    expect(() => validateRegistrySeed(broken)).toThrow(/Dangling registry link target/);
  });

  it('rejects namespace-kind mismatch and invalid version/status', () => {
    const first = registrySeed.entries[0]!;
    expect(() => validateRegistrySeed({ entries: [{ ...first, id: 'RULE-GOV-001' }], links: [] })).toThrow(/does not match kind requirement/);
    expect(() => validateRegistrySeed({ entries: [{ ...first, version: 'v1' }], links: [] })).toThrow(/invalid semantic version/);
    expect(() => validateRegistrySeed({ entries: [{ ...first, status: 'unknown' as never }], links: [] })).toThrow(/invalid status/);
  });

  it('requires supersession metadata for deprecated entries', () => {
    const first = registrySeed.entries[0]!;
    expect(() => validateRegistrySeed({ entries: [{ ...first, status: 'deprecated' }], links: [] })).toThrow(/requires supersededBy/);
  });

  it('rejects invalid KPI metadata', () => {
    const kpi = governanceRegistry.get('KPI-ORM-004');
    if (kpi.kind !== 'kpi') throw new Error('fixture');
    expect(() => validateRegistrySeed({ entries: [{ ...kpi, formula: '' }], links: [] })).toThrow(/requires formula/);
  });

  it('runs an invariant only when its stable ID resolves to an invariant', async () => {
    const runner: InvariantRunner<{ allowed: boolean }> = {
      invariantId: 'ORM-INV-005',
      run: ({ allowed }) => ({ passed: !allowed, message: allowed ? 'generic approval exposed' : 'blocked' })
    };
    await expect(governanceRegistry.runInvariant(runner, { allowed: false })).resolves.toMatchObject({ passed: true });
    const invalid = { ...runner, invariantId: 'REQ-ORM-004' };
    await expect(governanceRegistry.runInvariant(invalid, { allowed: false })).rejects.toThrow(/is not an invariant/);
  });

  it('serializes deterministically for CI, docs and admin tooling', () => {
    const one = governanceRegistry.serialize();
    const two = createRegistry(registrySeed).serialize();
    expect(one).toBe(two);
    expect(JSON.parse(one).entries[0].id).toBe('CTRL-ORM-001');
  });

  it('keeps the intentional invalid fixture as an expected failure while the suite remains green', () => {
    const invalid: RegistrySeed = { entries: [], links: [{ from: 'REQ-NOPE-001', to: 'CTRL-NOPE-001', relation: 'implemented_by' }] };
    expect(() => createRegistry(invalid)).toThrow(RegistryValidationError);
  });
});
