import { ref, seed } from '@dhgs/orm';

export const baseData = Object.freeze([
  seed('base.jurisdiction', 'base.jurisdiction_global_sandbox', {
    code: 'SANDBOX',
    name: 'DHGS Global Sandbox',
    timezone: 'UTC',
    businessCalendar: 'CALENDAR_DAY',
    status: 'SANDBOX'
  }),
  seed('base.institution', 'base.institution_dhgs_sandbox', {
    code: 'DHGS-SANDBOX',
    name: 'DHGS Sandbox Institution',
    kind: 'OPERATOR',
    jurisdictionId: ref('base.jurisdiction_global_sandbox'),
    status: 'SANDBOX'
  }),
  seed('base.access_group', 'base.access_group_system_admin', {
    code: 'SYSTEM_ADMIN',
    name: 'System Administrator',
    description: 'Technical administration only; does not create governance authority.'
  }),
  seed('base.access_group', 'base.access_group_auditor', {
    code: 'AUDITOR',
    name: 'Auditor',
    description: 'Audit/assurance role metadata; authorization is enforced elsewhere.'
  }),
  seed('base.tag', 'base.tag_governance', {
    code: 'GOVERNANCE',
    name: 'Governance',
    description: 'Reference tag for governance-related records.'
  }),
  seed('base.tag', 'base.tag_correction', {
    code: 'CORRECTION',
    name: 'Correction',
    description: 'Reference tag for correction-related records.'
  })
]);
