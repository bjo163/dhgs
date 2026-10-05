import { describe, expect, it } from 'vitest';
import {
  MemoryAdapter,
  createEnvironment,
  installAddons,
  validateSeedReferences,
  type MutationEvent
} from '@dhgs/orm';
import {
  AuthorityMandate,
  UserProfile,
  baseData,
  baseModels,
  baseUiPolicies,
  manifest
} from '@dhgs/orm-base';

describe('@dhgs/orm-base', () => {
  it('declares the canonical semantic base addon and all reviewed models', () => {
    expect(manifest.name).toBe('base');
    expect(manifest.version).toBe('0.1.0');
    expect(manifest.depends).toEqual([]);
    expect(baseModels).toHaveLength(17);
    expect(baseModels.map((model) => model.name)).toEqual([
      'base.jurisdiction', 'base.institution', 'base.party', 'base.user_profile',
      'base.access_group', 'base.group_membership', 'base.authority_mandate',
      'base.delegation', 'base.sequence', 'base.attachment', 'base.tag',
      'base.tag_link', 'base.activity', 'base.notification', 'base.translation',
      'base.external_id', 'base.audit_reference'
    ]);
  });

  it('installs deterministically into an ORM registry', () => {
    const registry = installAddons([manifest]);
    expect(registry.list()).toHaveLength(17);
    expect(registry.get('base.authority_mandate')).toBe(AuthorityMandate);
  });

  it('keeps seed identifiers stable and references resolvable', () => {
    expect(new Set(baseData.map((item) => item.externalId)).size).toBe(baseData.length);
    expect(() => validateSeedReferences([manifest])).not.toThrow();
    expect(baseData.map((item) => item.externalId)).toContain('base.jurisdiction_global_sandbox');
    expect(baseData.some((item) => item.externalId.includes('statutory'))).toBe(false);
  });

  it('declares relation metadata and a complete generated-UI policy', () => {
    expect(UserProfile.fields.partyId?.relation).toBe('base.party');
    expect(baseUiPolicies['base.authority_mandate']).toEqual({ generated: 'prohibited' });
    expect(baseUiPolicies['base.party']).toEqual({ generated: 'prohibited' });
    expect(baseUiPolicies['base.tag']).toEqual({ generated: 'allowed', create: true, write: true, archive: true });
    expect(Object.keys(baseUiPolicies)).toHaveLength(17);
  });

  it('models the machine-readable authority mandate schema without granting authority', () => {
    expect(Object.keys(AuthorityMandate.fields)).toEqual(expect.arrayContaining([
      'holderType', 'holderReference', 'authorityType', 'sourceOfLaw', 'sourceVersion',
      'permittedActions', 'prohibitedActions', 'delegable', 'validFrom', 'validUntil',
      'reviewStatus', 'supersedesId'
    ]));
    expect(AuthorityMandate.governance.ledger).toBe('required');
    expect(manifest.data.some((item) => item.model === 'base.authority_mandate')).toBe(false);
  });

  it('keeps domain-specific governance models out of base', () => {
    const forbiddenPrefixes = ['case.', 'evidence.', 'governance.', 'ledger.', 'openbook.', 'audit.'];
    expect(baseModels.some((model) => forbiddenPrefixes.some((prefix) => model.name.startsWith(prefix)))).toBe(false);
  });

  it('makes safe base models queryable through the ORM contract', async () => {
    const audit: MutationEvent[] = [];
    const registry = installAddons([manifest]);
    const env = createEnvironment({
      adapter: new MemoryAdapter(),
      registry,
      context: { actorId: 'ACTOR-1', purpose: 'BASE_TEST', requestId: 'REQ-BASE-1' },
      runtime: {
        now: () => '2026-10-04T13:00:00.000Z',
        id: () => 'TAG-1',
        audit: (event) => { audit.push(event); }
      }
    });
    const Tags = env.model('base.tag');
    await Tags.create({ code: 'TEST', name: 'Test Tag' });
    expect(await Tags.count([['code', '=', 'TEST']])).toBe(1);
    expect(audit[0]?.model).toBe('base.tag');
  });
});
