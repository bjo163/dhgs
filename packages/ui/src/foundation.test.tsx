import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { HighImpactAction } from './domain-components';
import {
  validateAssetManifest,
  validateChartMetadata,
  validateDesignTokens,
  validateScreenContracts,
  validateSvg,
  type AssetManifest,
  type DesignTokenDocument
} from './design-contracts';
import { Alert, Dialog, Input } from './primitives';
import { CANONICAL_SCREEN_CONTRACTS } from './screen-contracts';
import { StatusBadge } from './status-badge';

const ROOT = resolve(process.cwd(), '../..');

function json<T>(path: string): T {
  return JSON.parse(readFileSync(resolve(ROOT, path), 'utf8')) as T;
}

function gitBlobSha1(bytes: Buffer): string {
  return createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
}

describe('DHGS design foundation contracts', () => {
  it('keeps the canonical token document complete and snapshot-stable', () => {
    const tokens = json<DesignTokenDocument>('design/tokens.json');
    expect(validateDesignTokens(tokens)).toEqual([]);
    expect({
      version: tokens.meta.version,
      groups: ['color','font','typography','size','radius','space','border','elevation','breakpoint','motion','zIndex'],
      focus: tokens.color.focus.value,
      controlMinHeight: tokens.size.controlMinHeight.value
    }).toMatchInlineSnapshot(`
      {
        "controlMinHeight": "44px",
        "focus": "#185ADB",
        "groups": [
          "color",
          "font",
          "typography",
          "size",
          "radius",
          "space",
          "border",
          "elevation",
          "breakpoint",
          "motion",
          "zIndex",
        ],
        "version": "0.2.0",
      }
    `);
  });

  it('validates unique canonical M0 screen contracts', () => {
    expect(validateScreenContracts(CANONICAL_SCREEN_CONTRACTS)).toEqual([]);
    expect(CANONICAL_SCREEN_CONTRACTS).toHaveLength(24);
    expect(new Set(CANONICAL_SCREEN_CONTRACTS.map((screen) => screen.screen_id)).size).toBe(24);
    expect(new Set(CANONICAL_SCREEN_CONTRACTS.map((screen) => screen.screen_id.split('-')[0]))).toEqual(new Set(['PUB','CIT','OPS','MZN','AUD','SHD']));
  });

  it('rejects duplicate screen IDs', () => {
    const duplicate = [CANONICAL_SCREEN_CONTRACTS[0], CANONICAL_SCREEN_CONTRACTS[0]];
    expect(validateScreenContracts(duplicate)).toContain('Duplicate screen ID: PUB-001');
  });

  it('validates every governed canonical asset and its actual git blob hash', () => {
    const manifest = json<AssetManifest>('design/asset-manifest.json');
    expect(validateAssetManifest(manifest)).toEqual([]);
    expect(manifest.assets.length).toBeGreaterThan(0);
    for (const asset of manifest.assets.filter((entry) => entry.canonical)) {
      const file = resolve(ROOT, asset.path);
      expect(existsSync(file), asset.path).toBe(true);
      const bytes = readFileSync(file);
      expect(asset.checksum).toBe(`git-sha1:${gitBlobSha1(bytes)}`);
      if (asset.path.endsWith('.svg')) {
        expect(validateSvg(bytes.toString('utf8'), { decorative: asset.decorative }), asset.path).toEqual([]);
      }
    }
  });

  it('rejects unsafe or inaccessible SVG fixtures', () => {
    expect(validateSvg('<svg><script>alert(1)</script></svg>')).toEqual(expect.arrayContaining([
      'SVG viewBox is required',
      'SVG script is prohibited',
      'Meaningful SVG requires title or ARIA label'
    ]));
    expect(validateSvg('<svg viewBox="0 0 10 10"><title>x</title><image href="https://tracker.invalid/x"/></svg>')).toContain('SVG external/executable references are prohibited');
  });

  it('requires truthful chart accessibility metadata', () => {
    expect(validateChartMetadata({
      title:'Repeat failure rate', unit:'percent', period:'Q1-Q4 2026', source:'DHGS public dataset',
      last_updated:'2026-10-05', uncertainty:'No material sampling uncertainty', table_alternative:'#metric-table',
      uses_3d:false, axis_truncation_disclosed:true
    })).toEqual([]);
    expect(validateChartMetadata({
      title:'', unit:'', period:'', source:'', last_updated:'', uncertainty:'', table_alternative:'',
      uses_3d:false, axis_truncation_disclosed:false
    })).toContain('Chart source is required');
  });

  it('renders accessibility semantics in core primitives', () => {
    const markup = renderToStaticMarkup(<><Input id="case" label="Case reference" /><Alert tone="critical">Blocked</Alert><Dialog id="why" title="Why" open>Explanation</Dialog></>);
    expect(markup).toContain('for="case"');
    expect(markup).toContain('role="alert"');
    expect(markup).toContain('aria-labelledby="why-title"');
  });

  it('does not rely on color alone for status', () => {
    const markup = renderToStaticMarkup(<StatusBadge tone="warning">Needs review</StatusBadge>);
    expect(markup).toContain('data-status-tone="warning"');
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('warning status:');
    expect(markup).toContain('!');
  });

  it('requires explicit reason and confirmation for high-impact action', () => {
    const markup = renderToStaticMarkup(<HighImpactAction
      actionId="finalize"
      label="Finalize decision"
      reason=""
      confirmed={false}
      onReasonChange={() => {}}
      onConfirmedChange={() => {}}
      onExecute={() => {}}
      warning="This action can materially affect rights."
    />);
    expect(markup).toContain('Reason required');
    expect(markup).toContain('explicitly confirm');
    expect(markup).toContain('disabled=""');
    expect(markup).toContain('role="alert"');
  });
});
