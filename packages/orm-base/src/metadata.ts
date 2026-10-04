import type { AccessSpec, MenuSpec, UiPolicy, ViewSpec } from '@dhgs/orm';

export const baseViews: readonly ViewSpec[] = Object.freeze([
  { id: 'base.jurisdiction_list', model: 'base.jurisdiction', kind: 'list', title: 'Jurisdictions', fields: ['code', 'name', 'timezone', 'status'] },
  { id: 'base.jurisdiction_form', model: 'base.jurisdiction', kind: 'form', title: 'Jurisdiction', fields: ['code', 'name', 'timezone', 'businessCalendar', 'status'] },
  { id: 'base.jurisdiction_search', model: 'base.jurisdiction', kind: 'search', title: 'Search Jurisdictions', fields: ['code', 'name', 'status'] },
  { id: 'base.institution_list', model: 'base.institution', kind: 'list', title: 'Institutions', fields: ['code', 'name', 'kind', 'jurisdictionId', 'status'] },
  { id: 'base.institution_form', model: 'base.institution', kind: 'form', title: 'Institution', fields: ['code', 'name', 'kind', 'parentInstitutionId', 'jurisdictionId', 'status'] },
  { id: 'base.tag_list', model: 'base.tag', kind: 'list', title: 'Tags', fields: ['code', 'name', 'description'] },
  { id: 'base.tag_form', model: 'base.tag', kind: 'form', title: 'Tag', fields: ['code', 'name', 'description'] },
  { id: 'base.tag_search', model: 'base.tag', kind: 'search', title: 'Search Tags', fields: ['code', 'name'] },
  { id: 'base.external_id_list', model: 'base.external_id', kind: 'list', title: 'External IDs', fields: ['namespace', 'externalId', 'model', 'recordId'] }
]);

export const baseMenus: readonly MenuSpec[] = Object.freeze([
  { id: 'base.menu_configuration', label: 'Base Configuration', order: 900 },
  { id: 'base.menu_jurisdictions', label: 'Jurisdictions', parent: 'base.menu_configuration', viewId: 'base.jurisdiction_list', order: 10 },
  { id: 'base.menu_institutions', label: 'Institutions', parent: 'base.menu_configuration', viewId: 'base.institution_list', order: 20 },
  { id: 'base.menu_tags', label: 'Tags', parent: 'base.menu_configuration', viewId: 'base.tag_list', order: 30 },
  { id: 'base.menu_external_ids', label: 'External IDs', parent: 'base.menu_configuration', viewId: 'base.external_id_list', order: 90 }
]);

export const baseUiPolicies: Readonly<Record<string, UiPolicy>> = Object.freeze({
  'base.jurisdiction': { generated: 'read_only' },
  'base.institution': { generated: 'read_only' },
  'base.party': { generated: 'prohibited' },
  'base.user_profile': { generated: 'prohibited' },
  'base.access_group': { generated: 'read_only' },
  'base.group_membership': { generated: 'prohibited' },
  'base.authority_mandate': { generated: 'prohibited' },
  'base.delegation': { generated: 'prohibited' },
  'base.sequence': { generated: 'read_only' },
  'base.attachment': { generated: 'prohibited' },
  'base.tag': { generated: 'allowed', create: true, write: true, archive: true },
  'base.tag_link': { generated: 'read_only' },
  'base.activity': { generated: 'read_only' },
  'base.notification': { generated: 'prohibited' },
  'base.translation': { generated: 'read_only' },
  'base.external_id': { generated: 'read_only' },
  'base.audit_reference': { generated: 'read_only' }
});

export const baseAccess: readonly AccessSpec[] = Object.freeze([
  { id: 'base.access_tag_admin', model: 'base.tag', group: 'base.access_group_system_admin', read: true, create: true, write: true, archive: true },
  { id: 'base.access_jurisdiction_admin', model: 'base.jurisdiction', group: 'base.access_group_system_admin', read: true, create: false, write: false, archive: false },
  { id: 'base.access_external_id_auditor', model: 'base.external_id', group: 'base.access_group_auditor', read: true, create: false, write: false, archive: false }
]);
