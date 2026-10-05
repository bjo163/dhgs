import { defineModel, fields, type BaseRecord, type ModelGovernance } from '@dhgs/orm';

const ordinary = {
  optimisticLock: true,
  audit: 'required',
  ledger: 'none',
  archiveOnly: true
} satisfies ModelGovernance;

const scoped = {
  ...ordinary,
  jurisdictionScoped: true
} satisfies ModelGovernance;

const scopedSignificant = {
  ...scoped,
  ledger: 'required'
} satisfies ModelGovernance;

export const Jurisdiction = defineModel<BaseRecord>('base.jurisdiction', {
  table: 'base_jurisdictions',
  fields: {
    code: fields.string({ required: true, unique: true, mutable: false }),
    name: fields.string({ required: true }),
    timezone: fields.string({ required: true }),
    businessCalendar: fields.string(),
    status: fields.enum(['ACTIVE', 'INACTIVE', 'SANDBOX'], { required: true })
  },
  governance: ordinary
});

export const Institution = defineModel<BaseRecord>('base.institution', {
  table: 'base_institutions',
  fields: {
    code: fields.string({ required: true, unique: true, mutable: false }),
    name: fields.string({ required: true }),
    kind: fields.enum(['GOVERNANCE', 'OVERSIGHT', 'OPERATOR', 'AUDIT', 'OTHER'], { required: true }),
    parentInstitutionId: fields.belongsTo('base.institution'),
    status: fields.enum(['ACTIVE', 'INACTIVE', 'SANDBOX'], { required: true })
  },
  governance: scoped
});

export const Party = defineModel<BaseRecord>('base.party', {
  table: 'base_parties',
  fields: {
    partyType: fields.enum(['PERSON', 'ORGANIZATION', 'UNKNOWN'], { required: true }),
    displayName: fields.string({ required: true, sensitive: true }),
    referenceCode: fields.string({ sensitive: true })
  },
  governance: { ...scoped, immutableFields: ['partyType'] }
});

export const UserProfile = defineModel<BaseRecord>('base.user_profile', {
  table: 'base_user_profiles',
  fields: {
    actorId: fields.string({ required: true, unique: true, mutable: false }),
    partyId: fields.belongsTo('base.party'),
    locale: fields.string({ required: true, default: 'id-ID' }),
    timezone: fields.string(),
    status: fields.enum(['ACTIVE', 'SUSPENDED', 'DISABLED'], { required: true })
  },
  governance: scoped
});

export const AccessGroup = defineModel<BaseRecord>('base.access_group', {
  table: 'base_access_groups',
  fields: {
    code: fields.string({ required: true, unique: true, mutable: false }),
    name: fields.string({ required: true }),
    description: fields.text()
  },
  governance: ordinary
});

export const GroupMembership = defineModel<BaseRecord>('base.group_membership', {
  table: 'base_group_memberships',
  fields: {
    groupId: fields.belongsTo('base.access_group', { required: true }),
    actorId: fields.string({ required: true }),
    startsAt: fields.datetime({ required: true }),
    expiresAt: fields.datetime(),
    active: fields.boolean({ required: true, default: true })
  },
  governance: scoped
});

export const AuthorityMandate = defineModel<BaseRecord>('base.authority_mandate', {
  table: 'base_authority_mandates',
  fields: {
    holderType: fields.enum(['PARTY', 'INSTITUTION', 'ROLE'], { required: true }),
    holderReference: fields.string({ required: true }),
    authorityType: fields.string({ required: true }),
    sourceOfLaw: fields.string({ required: true }),
    sourceVersion: fields.string({ required: true }),
    permittedActions: fields.json({ required: true }),
    prohibitedActions: fields.json({ required: true }),
    delegable: fields.boolean({ required: true }),
    validFrom: fields.datetime({ required: true }),
    validUntil: fields.datetime(),
    reviewStatus: fields.enum(['DRAFT', 'ACTIVE', 'SUSPENDED', 'EXPIRED', 'REVOKED'], { required: true }),
    supersedesId: fields.belongsTo('base.authority_mandate')
  },
  governance: { ...scopedSignificant, immutableFields: ['sourceOfLaw', 'sourceVersion'] }
});

export const Delegation = defineModel<BaseRecord>('base.delegation', {
  table: 'base_delegations',
  fields: {
    mandateId: fields.belongsTo('base.authority_mandate', { required: true }),
    delegatorId: fields.string({ required: true }),
    delegateId: fields.string({ required: true }),
    permissions: fields.json({ required: true }),
    purpose: fields.text({ required: true }),
    startsAt: fields.datetime({ required: true }),
    expiresAt: fields.datetime({ required: true }),
    revocable: fields.boolean({ required: true, default: true }),
    status: fields.enum(['ACTIVE', 'REVOKED', 'EXPIRED'], { required: true })
  },
  governance: scopedSignificant
});

export const Sequence = defineModel<BaseRecord>('base.sequence', {
  table: 'base_sequences',
  fields: {
    code: fields.string({ required: true, unique: true, mutable: false }),
    prefix: fields.string(),
    nextNumber: fields.integer({ required: true, default: 1 }),
    padding: fields.integer({ required: true, default: 6 })
  },
  governance: ordinary
});

export const Attachment = defineModel<BaseRecord>('base.attachment', {
  table: 'base_attachments',
  fields: {
    storageKey: fields.string({ required: true, sensitive: true, mutable: false }),
    filename: fields.string({ required: true }),
    mimeType: fields.string({ required: true }),
    sizeBytes: fields.integer({ required: true }),
    sha256: fields.string({ required: true, mutable: false }),
    classification: fields.enum(['P0', 'P1', 'P2', 'P3'], { required: true }),
    uploadedBy: fields.string({ required: true, mutable: false }),
    antivirusStatus: fields.enum(['PENDING', 'CLEAR', 'QUARANTINED', 'REJECTED'], { required: true })
  },
  governance: scoped
});

export const Tag = defineModel<BaseRecord>('base.tag', {
  table: 'base_tags',
  fields: {
    code: fields.string({ required: true, unique: true, mutable: false }),
    name: fields.string({ required: true }),
    description: fields.text()
  },
  governance: ordinary
});

export const TagLink = defineModel<BaseRecord>('base.tag_link', {
  table: 'base_tag_links',
  fields: {
    tagId: fields.belongsTo('base.tag', { required: true }),
    targetModel: fields.string({ required: true, mutable: false }),
    targetId: fields.string({ required: true, mutable: false })
  },
  governance: scoped
});

export const Activity = defineModel<BaseRecord>('base.activity', {
  table: 'base_activities',
  fields: {
    activityType: fields.string({ required: true }),
    summary: fields.text({ required: true }),
    targetModel: fields.string({ required: true }),
    targetId: fields.string({ required: true }),
    ownerActorId: fields.string(),
    dueAt: fields.datetime(),
    status: fields.enum(['OPEN', 'DONE', 'CANCELLED'], { required: true })
  },
  governance: scoped
});

export const Notification = defineModel<BaseRecord>('base.notification', {
  table: 'base_notifications',
  fields: {
    notificationType: fields.string({ required: true }),
    recipientActorId: fields.string({ required: true, sensitive: true }),
    title: fields.string({ required: true }),
    body: fields.text({ required: true, sensitive: true }),
    canonicalUrl: fields.string(),
    status: fields.enum(['QUEUED', 'SENT', 'DELIVERED', 'FAILED', 'READ'], { required: true })
  },
  governance: scoped
});

export const Translation = defineModel<BaseRecord>('base.translation', {
  table: 'base_translations',
  fields: {
    sourceContentId: fields.string({ required: true, mutable: false }),
    sourceVersion: fields.string({ required: true, mutable: false }),
    locale: fields.string({ required: true, mutable: false }),
    translatedVersion: fields.string({ required: true }),
    text: fields.text({ required: true }),
    reviewerActorId: fields.string(),
    status: fields.enum(['DRAFT', 'REVIEWED', 'APPROVED', 'SUPERSEDED'], { required: true })
  },
  governance: ordinary
});

export const ExternalId = defineModel<BaseRecord>('base.external_id', {
  table: 'base_external_ids',
  fields: {
    namespace: fields.string({ required: true, mutable: false }),
    externalId: fields.string({ required: true, mutable: false }),
    model: fields.string({ required: true, mutable: false }),
    recordId: fields.string({ required: true, mutable: false })
  },
  governance: { ...ordinary, immutableFields: ['namespace', 'externalId', 'model', 'recordId'] }
});

export const AuditReference = defineModel<BaseRecord>('base.audit_reference', {
  table: 'base_audit_references',
  fields: {
    auditEventId: fields.string({ required: true, mutable: false }),
    model: fields.string({ required: true, mutable: false }),
    recordId: fields.string({ required: true, mutable: false }),
    referenceType: fields.string({ required: true, mutable: false }),
    details: fields.json()
  },
  governance: { ...ordinary, immutableFields: ['auditEventId', 'model', 'recordId', 'referenceType'] }
});

export const baseModels = Object.freeze([
  Jurisdiction,
  Institution,
  Party,
  UserProfile,
  AccessGroup,
  GroupMembership,
  AuthorityMandate,
  Delegation,
  Sequence,
  Attachment,
  Tag,
  TagLink,
  Activity,
  Notification,
  Translation,
  ExternalId,
  AuditReference
]);
