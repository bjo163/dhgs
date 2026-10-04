import { describe, expect, it } from 'vitest';
import { DataSession, MemoryAdapter, ModelRegistry, defineModel, type BaseRecord, type MutationEvent } from '../index.js';

interface CaseRecord extends BaseRecord {
  caseNumber: string;
  title: string;
}

const caseModel = defineModel<CaseRecord>({
  name: 'case',
  table: 'cases',
  fields: {
    caseNumber: { kind: 'string', required: true, mutable: false },
    title: { kind: 'string', required: true }
  },
  governance: {
    jurisdictionScoped: true,
    optimisticLock: true,
    archiveOnly: true,
    audit: 'required',
    ledger: 'required',
    immutableFields: ['caseNumber']
  }
});

describe('@dhgs/data', () => {
  it('scopes writes, versions updates and emits audit + ledger mutations', async () => {
    const registry = new ModelRegistry().register(caseModel);
    const adapter = new MemoryAdapter();
    const audit: MutationEvent[] = [];
    const ledger: MutationEvent[] = [];
    let id = 0;

    const session = new DataSession(adapter, registry, {
      actorId: 'ACTOR-1',
      purpose: 'CASE_REVIEW',
      requestId: 'REQ-1',
      jurisdictionIds: ['J-1']
    }, {
      now: () => '2026-10-04T10:00:00.000Z',
      idFactory: () => `ID-${++id}`,
      audit: (event) => {
        audit.push(event);
      },
      ledger: (event) => {
        ledger.push(event);
      }
    });

    const cases = session.model<CaseRecord>('case');
    const created = await cases.create({ caseNumber: 'DHGS-2026-000001', title: 'Initial', jurisdictionId: 'J-1' });
    expect(created.version).toBe(1);

    const updated = await cases.update(created.id, { title: 'Reviewed' }, { expectedVersion: 1 });
    expect(updated.version).toBe(2);
    expect(audit.map((event) => event.operation)).toEqual(['CREATE', 'UPDATE']);
    expect(ledger).toHaveLength(2);

    await expect(cases.update(created.id, { caseNumber: 'ILLEGAL' } as never, { expectedVersion: 2 }))
      .rejects.toThrow('Immutable field');

    await expect(cases.create({ caseNumber: 'X', title: 'Wrong jurisdiction', jurisdictionId: 'J-2' }))
      .rejects.toThrow('outside jurisdiction scope');
  });
});
