export const SCREEN_ID_PATTERN = /^(PUB|CIT|OPS|MZN|AUD|SHD)-\d{3}$/;
export const ASSET_ID_PATTERN = /^AST-[A-Z]+-\d{3}$/;
export const GIT_SHA1_PATTERN = /^git-sha1:[0-9a-f]{40}$/;

export interface DangerousActionContract {
  id: string;
  label: string;
  requires_confirmation: true;
  requires_reason: true;
}

export interface ScreenContract {
  screen_id: string;
  title: string;
  purpose: string;
  primary_user: string;
  allowed_roles: readonly string[];
  required_data: readonly string[];
  primary_actions: readonly string[];
  dangerous_actions: readonly DangerousActionContract[];
  states: readonly string[];
  accessibility_notes: readonly string[];
  audit_events: readonly string[];
}

export interface DesignTokenDocument {
  meta: { name: string; version: string; status: string };
  color: Record<string, { value: string }>;
  font: Record<string, { value: string }>;
  typography: Record<string, { value: string | number }>;
  size: Record<string, { value: string }>;
  radius: Record<string, { value: string }>;
  space: Record<string, { value: string }>;
  border: Record<string, { value: string }>;
  elevation: Record<string, { value: string }>;
  breakpoint: Record<string, { value: string }>;
  motion: Record<string, { value: string }>;
  zIndex: Record<string, { value: number }>;
}

export type AssetApprovalStatus = 'EXPLORATORY' | 'DRAFT' | 'APPROVED' | 'NON_CANONICAL';
export type ConsentStatus = 'NOT_APPLICABLE' | 'OBTAINED' | 'REQUIRED' | 'UNKNOWN';

export interface AssetManifestEntry {
  asset_id: string;
  path: string;
  type: string;
  version: string;
  creator: string;
  source: string;
  license: string;
  consent_status: ConsentStatus;
  ai_generated: boolean;
  synthetic_disclosure?: string;
  decorative: boolean;
  alt_text: string;
  checksum: string;
  approval_status: AssetApprovalStatus;
  canonical: boolean;
}

export interface AssetManifest {
  manifestVersion: string;
  assets: readonly AssetManifestEntry[];
}

export interface ChartMetadata {
  title: string;
  unit: string;
  period: string;
  source: string;
  last_updated: string;
  uncertainty: string;
  table_alternative: string;
  uses_3d: false;
  axis_truncation_disclosed: boolean;
}

export function validateScreenContracts(contracts: readonly ScreenContract[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const contract of contracts) {
    if (!SCREEN_ID_PATTERN.test(contract.screen_id)) errors.push(`Invalid screen ID: ${contract.screen_id}`);
    if (ids.has(contract.screen_id)) errors.push(`Duplicate screen ID: ${contract.screen_id}`);
    ids.add(contract.screen_id);
    if (!contract.title.trim() || !contract.purpose.trim() || !contract.primary_user.trim()) errors.push(`${contract.screen_id}: title, purpose and primary_user are required`);
    if (contract.allowed_roles.length === 0) errors.push(`${contract.screen_id}: allowed_roles is required`);
    if (contract.states.length === 0) errors.push(`${contract.screen_id}: states are required`);
    if (contract.accessibility_notes.length === 0) errors.push(`${contract.screen_id}: accessibility_notes are required`);
    for (const action of contract.dangerous_actions) {
      if (!action.requires_confirmation || !action.requires_reason) errors.push(`${contract.screen_id}: dangerous action ${action.id} must require confirmation and reason`);
    }
  }
  return errors;
}

export function validateDesignTokens(tokens: DesignTokenDocument): string[] {
  const errors: string[] = [];
  const requiredGroups: Array<keyof DesignTokenDocument> = [
    'color', 'font', 'typography', 'size', 'radius', 'space', 'border', 'elevation', 'breakpoint', 'motion', 'zIndex'
  ];
  if (!tokens.meta?.name || !tokens.meta?.version || !tokens.meta?.status) errors.push('Token metadata name/version/status is required');
  for (const group of requiredGroups) {
    const value = tokens[group];
    if (!value || typeof value !== 'object' || Object.keys(value).length === 0) errors.push(`Missing token group: ${group}`);
  }
  if (!tokens.color?.focus?.value) errors.push('A dedicated focus color token is required');
  if (!tokens.size?.controlMinHeight?.value) errors.push('controlMinHeight token is required');
  return errors;
}

export function validateAssetManifest(manifest: AssetManifest): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const paths = new Set<string>();
  if (!manifest.manifestVersion?.trim()) errors.push('manifestVersion is required');
  for (const asset of manifest.assets ?? []) {
    if (!ASSET_ID_PATTERN.test(asset.asset_id)) errors.push(`Invalid asset ID: ${asset.asset_id}`);
    if (ids.has(asset.asset_id)) errors.push(`Duplicate asset ID: ${asset.asset_id}`);
    if (paths.has(asset.path)) errors.push(`Duplicate asset path: ${asset.path}`);
    ids.add(asset.asset_id);
    paths.add(asset.path);
    if (!asset.path.startsWith('assets/')) errors.push(`${asset.asset_id}: governed asset must live under assets/`);
    if (!asset.creator || !asset.source || !asset.license) errors.push(`${asset.asset_id}: creator/source/license are required`);
    if (!GIT_SHA1_PATTERN.test(asset.checksum)) errors.push(`${asset.asset_id}: checksum must be git-sha1:<40 hex>`);
    if (!asset.decorative && !asset.alt_text.trim()) errors.push(`${asset.asset_id}: non-decorative asset requires alt_text`);
    if (asset.ai_generated && !asset.synthetic_disclosure?.trim()) errors.push(`${asset.asset_id}: synthetic asset requires disclosure`);
    if (asset.canonical && asset.approval_status === 'NON_CANONICAL') errors.push(`${asset.asset_id}: canonical asset cannot be NON_CANONICAL`);
    if (!asset.canonical && asset.approval_status !== 'NON_CANONICAL') errors.push(`${asset.asset_id}: non-canonical asset must be visibly NON_CANONICAL`);
  }
  return errors;
}

export function validateSvg(svg: string, options: { decorative?: boolean } = {}): string[] {
  const errors: string[] = [];
  if (!/<svg\b/i.test(svg)) errors.push('SVG root element is required');
  if (!/\bviewBox\s*=\s*["'][^"']+["']/i.test(svg)) errors.push('SVG viewBox is required');
  if (/<script\b/i.test(svg)) errors.push('SVG script is prohibited');
  if (/\bon[a-z]+\s*=/i.test(svg)) errors.push('SVG event-handler attributes are prohibited');
  if (/<foreignObject\b/i.test(svg)) errors.push('SVG foreignObject is prohibited');
  if (/\b(?:href|xlink:href)\s*=\s*["']\s*(?:https?:|\/\/|data:text\/html)/i.test(svg)) errors.push('SVG external/executable references are prohibited');
  if (!options.decorative && !/<title\b/i.test(svg) && !/\baria-label(?:ledby)?\s*=/i.test(svg)) errors.push('Meaningful SVG requires title or ARIA label');
  return errors;
}

export function validateChartMetadata(metadata: ChartMetadata): string[] {
  const errors: string[] = [];
  for (const field of ['title', 'unit', 'period', 'source', 'last_updated', 'uncertainty', 'table_alternative'] as const) {
    if (!metadata[field]?.trim()) errors.push(`Chart ${field} is required`);
  }
  if (metadata.uses_3d !== false) errors.push('3D charts are prohibited');
  if (metadata.axis_truncation_disclosed !== true) errors.push('Axis truncation policy must be explicitly disclosed');
  return errors;
}
