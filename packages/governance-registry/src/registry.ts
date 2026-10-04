import { assertRegistryId } from './ids';
import {
  REGISTRY_KINDS,
  REGISTRY_RELATIONS,
  REGISTRY_STATUSES,
  type EvidenceReference,
  type InvariantEntry,
  type InvariantResult,
  type InvariantRunner,
  type RegistryEntry,
  type RegistryKind,
  type RegistryLink,
  type RegistrySeed,
  type RegistryTrace
} from './types';

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EVIDENCE_ID = /^EVID-[A-Z0-9]+(?:-[A-Z0-9]+)*-\d{3}$/;
const statusSet = new Set<string>(REGISTRY_STATUSES);
const kindSet = new Set<string>(REGISTRY_KINDS);
const relationSet = new Set<string>(REGISTRY_RELATIONS);

export class RegistryValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RegistryValidationError';
  }
}

export function validateRegistrySeed(seed: RegistrySeed): void {
  if (!Array.isArray(seed.entries) || !Array.isArray(seed.links)) {
    throw new RegistryValidationError('Registry seed must contain entries and links arrays');
  }

  const byId = new Map<string, RegistryEntry>();
  for (const entry of seed.entries) {
    validateEntry(entry);
    if (byId.has(entry.id)) throw new RegistryValidationError(`Duplicate registry ID: ${entry.id}`);
    byId.set(entry.id, entry);
  }

  for (const entry of seed.entries) {
    if (entry.supersedes) requireReference(byId, entry.id, entry.supersedes, 'supersedes');
    if (entry.supersededBy) requireReference(byId, entry.id, entry.supersededBy, 'supersededBy');
    if ((entry.status === 'deprecated' || entry.status === 'superseded') && !entry.supersededBy) {
      throw new RegistryValidationError(`${entry.id} status ${entry.status} requires supersededBy`);
    }
  }

  const seenLinks = new Set<string>();
  for (const link of seed.links) {
    if (!relationSet.has(link.relation)) throw new RegistryValidationError(`Invalid registry relation: ${String(link.relation)}`);
    const from = byId.get(link.from);
    const to = byId.get(link.to);
    if (!from) throw new RegistryValidationError(`Dangling registry link source: ${link.from}`);
    if (!to) throw new RegistryValidationError(`Dangling registry link target: ${link.to}`);
    const key = `${link.from}|${link.relation}|${link.to}`;
    if (seenLinks.has(key)) throw new RegistryValidationError(`Duplicate registry link: ${key}`);
    seenLinks.add(key);
    validateRelation(from.kind, to.kind, link);
  }
}

function validateEntry(entry: RegistryEntry): void {
  if (!kindSet.has(entry.kind)) throw new RegistryValidationError(`Invalid registry kind for ${entry.id}: ${String(entry.kind)}`);
  try { assertRegistryId(entry.id, entry.kind); } catch (error) { throw new RegistryValidationError(messageOf(error)); }
  for (const [field, value] of [['title', entry.title], ['statement', entry.statement], ['owner', entry.owner], ['jurisdiction', entry.jurisdiction]] as const) {
    if (typeof value !== 'string' || value.trim().length === 0) throw new RegistryValidationError(`${entry.id} requires ${field}`);
  }
  if (!statusSet.has(entry.status)) throw new RegistryValidationError(`${entry.id} has invalid status: ${String(entry.status)}`);
  if (!SEMVER.test(entry.version)) throw new RegistryValidationError(`${entry.id} has invalid semantic version: ${entry.version}`);
  if (!Array.isArray(entry.legalBasis) || entry.legalBasis.length === 0 || entry.legalBasis.some((item) => !item.trim())) {
    throw new RegistryValidationError(`${entry.id} requires legalBasis references`);
  }
  if (entry.reviewDue && (!ISO_DATE.test(entry.reviewDue) || Number.isNaN(Date.parse(`${entry.reviewDue}T00:00:00Z`)))) {
    throw new RegistryValidationError(`${entry.id} has invalid reviewDue: ${entry.reviewDue}`);
  }
  if (!Array.isArray(entry.evidenceRefs)) throw new RegistryValidationError(`${entry.id} requires evidenceRefs array`);
  for (const evidence of entry.evidenceRefs) validateEvidence(entry.id, evidence);

  if (entry.kind === 'test' && (!entry.testRef || !entry.testRef.trim())) {
    throw new RegistryValidationError(`${entry.id} requires testRef`);
  }
  if (entry.kind === 'kpi') {
    for (const [field, value] of [
      ['formula', entry.formula], ['dataSource', entry.dataSource], ['reviewCadence', entry.reviewCadence], ['targetStrategy', entry.targetStrategy]
    ] as const) {
      if (!value.trim()) throw new RegistryValidationError(`${entry.id} requires ${field}`);
    }
  }
}

function validateEvidence(entryId: string, evidence: EvidenceReference): void {
  if (!EVIDENCE_ID.test(evidence.id)) throw new RegistryValidationError(`${entryId} has invalid evidence ID: ${evidence.id}`);
  if (!['document', 'test-source', 'ci-check', 'artifact'].includes(evidence.kind)) {
    throw new RegistryValidationError(`${entryId} has invalid evidence kind: ${String(evidence.kind)}`);
  }
  if (!evidence.locator.trim()) throw new RegistryValidationError(`${entryId} evidence ${evidence.id} requires locator`);
}

function requireReference(byId: Map<string, RegistryEntry>, source: string, target: string, field: string): void {
  if (source === target) throw new RegistryValidationError(`${source} cannot ${field} itself`);
  if (!byId.has(target)) throw new RegistryValidationError(`${source} ${field} references missing ID: ${target}`);
}

function validateRelation(from: RegistryKind, to: RegistryKind, link: RegistryLink): void {
  const valid =
    (link.relation === 'implemented_by' && from === 'requirement' && to === 'control') ||
    (link.relation === 'enforced_by' && from === 'control' && (to === 'rule' || to === 'invariant')) ||
    (link.relation === 'verified_by' && (from === 'rule' || from === 'invariant') && to === 'test') ||
    (link.relation === 'measured_by' && from === 'test' && to === 'kpi');
  if (!valid) throw new RegistryValidationError(`Invalid ${link.relation} edge: ${link.from} (${from}) -> ${link.to} (${to})`);
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export class GovernanceRegistry {
  private readonly byId: ReadonlyMap<string, RegistryEntry>;
  private readonly links: readonly RegistryLink[];

  constructor(seed: RegistrySeed) {
    validateRegistrySeed(seed);
    this.byId = new Map(seed.entries.map((entry) => [entry.id, deepFreezeEntry(entry)]));
    this.links = Object.freeze([...seed.links].map((link) => Object.freeze({ ...link })));
  }

  get(id: string): RegistryEntry {
    const entry = this.byId.get(id);
    if (!entry) throw new RegistryValidationError(`Unknown registry ID: ${id}`);
    return entry;
  }

  list(kind?: RegistryKind): readonly RegistryEntry[] {
    return Object.freeze([...this.byId.values()]
      .filter((entry) => !kind || entry.kind === kind)
      .sort((a, b) => a.id.localeCompare(b.id)));
  }

  listInvariants(): readonly InvariantEntry[] {
    return Object.freeze(this.list('invariant') as InvariantEntry[]);
  }

  trace(startId: string): RegistryTrace {
    this.get(startId);
    const visited = new Set<string>([startId]);
    const queue = [startId];
    const links: RegistryLink[] = [];
    while (queue.length > 0) {
      const current = queue.shift()!;
      for (const link of this.links.filter((candidate) => candidate.from === current)) {
        links.push(link);
        if (!visited.has(link.to)) {
          visited.add(link.to);
          queue.push(link.to);
        }
      }
    }
    const entries = [...visited].map((id) => this.get(id)).sort((a, b) => a.id.localeCompare(b.id));
    const evidence = dedupeEvidence(entries.flatMap((entry) => [...entry.evidenceRefs]));
    return Object.freeze({
      startId,
      entries: Object.freeze(entries),
      links: Object.freeze(links.sort((a, b) => `${a.from}|${a.to}`.localeCompare(`${b.from}|${b.to}`))),
      evidence: Object.freeze(evidence)
    });
  }

  async runInvariant<Context>(runner: InvariantRunner<Context>, context: Context): Promise<InvariantResult> {
    const invariant = this.get(runner.invariantId);
    if (invariant.kind !== 'invariant') throw new RegistryValidationError(`${runner.invariantId} is not an invariant`);
    return runner.run(context);
  }

  serialize(): string {
    const payload = {
      entries: this.list(),
      links: [...this.links].sort((a, b) => `${a.from}|${a.relation}|${a.to}`.localeCompare(`${b.from}|${b.relation}|${b.to}`))
    };
    return `${JSON.stringify(payload, null, 2)}\n`;
  }
}

export function createRegistry(seed: RegistrySeed): GovernanceRegistry {
  return new GovernanceRegistry(seed);
}

function deepFreezeEntry(entry: RegistryEntry): RegistryEntry {
  return Object.freeze({
    ...entry,
    legalBasis: Object.freeze([...entry.legalBasis]),
    evidenceRefs: Object.freeze(entry.evidenceRefs.map((evidence) => Object.freeze({ ...evidence })))
  }) as RegistryEntry;
}

function dedupeEvidence(items: readonly EvidenceReference[]): EvidenceReference[] {
  const byId = new Map<string, EvidenceReference>();
  for (const item of items) {
    const existing = byId.get(item.id);
    if (existing && (existing.kind !== item.kind || existing.locator !== item.locator)) {
      throw new RegistryValidationError(`Evidence ID ${item.id} has conflicting definitions`);
    }
    byId.set(item.id, item);
  }
  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
}
