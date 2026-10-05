import { describe, it } from 'vitest';
import {
  MemoryAdapter,
  defineModel,
  fields,
  verifyAdapterContract,
  type BaseRecord
} from '../index.js';

interface ContractRecord extends BaseRecord {
  name: string;
}

const ContractModel = defineModel<ContractRecord>('contract.record', {
  table: 'contract_records',
  fields: { name: fields.string({ required: true }) },
  governance: {}
});

describe('common ORM adapter contract', () => {
  it('is satisfied by MemoryAdapter', async () => {
    const adapter = new MemoryAdapter();
    const now = '2026-10-04T00:00:00.000Z';
    await verifyAdapterContract({
      adapter,
      model: ContractModel,
      context: { actorId: 'ACTOR-1', purpose: 'CONTRACT', requestId: 'REQ-MEMORY' },
      prefix: 'MEMORY',
      makeRecord: (id) => ({
        id,
        name: 'Initial',
        createdAt: now,
        updatedAt: now,
        createdBy: 'ACTOR-1',
        updatedBy: 'ACTOR-1',
        version: 1,
        archivedAt: null,
        jurisdictionId: null,
        institutionId: null
      }),
      makePatch: (version) => ({ name: `Version ${version}`, updatedAt: now, version })
    });
  });
});
