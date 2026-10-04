import { describe, expect, it } from 'vitest';
import {
  ModelRegistry,
  defineAddon,
  defineModel,
  fields,
  installAddons,
  ref,
  resolveAddonOrder,
  seed,
  validateSeedReferences,
  type BaseRecord
} from '../index.js';

interface Demo extends BaseRecord { code: string }
const DemoModel = defineModel<Demo>('demo.record', {
  table: 'demo_records',
  fields: { code: fields.string({ required: true }) },
  governance: { audit: 'optional', ledger: 'none', archiveOnly: true }
});

describe('addon primitives', () => {
  it('defines a deterministic semantic addon manifest', () => {
    const manifest = defineAddon({
      name: 'demo',
      version: '0.1.0',
      models: [DemoModel],
      data: [seed('demo.record', 'demo.record_default', { code: 'DEFAULT' })],
      views: [{ id: 'demo.view_list', model: 'demo.record', kind: 'list', title: 'Demo', fields: ['code'] }],
      menus: [{ id: 'demo.menu', label: 'Demo', viewId: 'demo.view_list' }],
      uiPolicies: { 'demo.record': { generated: 'allowed', create: true, write: true, archive: true } }
    });
    expect(manifest.name).toBe('demo');
    expect(Object.isFrozen(manifest)).toBe(true);
    expect(() => defineAddon({ name: 'bad', version: 'v1', models: [] })).toThrow('semantic');
  });

  it('resolves dependencies and installs models in dependency order', () => {
    const base = defineAddon({ name: 'base', version: '0.1.0', models: [DemoModel] });
    const childModel = defineModel<Demo>('child.record', {
      table: 'child_records', fields: { code: fields.string() }, governance: {}
    });
    const child = defineAddon({ name: 'child', version: '0.1.0', depends: ['base'], models: [childModel] });
    expect(resolveAddonOrder([child, base]).map((item) => item.name)).toEqual(['base', 'child']);
    const registry = installAddons([child, base]);
    expect(registry.list().map((model) => model.name)).toEqual(['child.record', 'demo.record']);
  });

  it('fails missing dependencies and dependency cycles', () => {
    const a = defineAddon({ name: 'a', version: '0.1.0', depends: ['b'] });
    expect(() => resolveAddonOrder([a])).toThrow('Missing addon dependency');
    const b = defineAddon({ name: 'b', version: '0.1.0', depends: ['a'] });
    expect(() => resolveAddonOrder([a, b])).toThrow('cycle');
  });

  it('validates seed references across manifests', () => {
    const base = defineAddon({
      name: 'base', version: '0.1.0', models: [DemoModel],
      data: [seed('demo.record', 'base.demo_one', { code: 'ONE' })]
    });
    const childModel = defineModel<Demo>('child.record', { table: 'child_records', fields: { code: fields.string() }, governance: {} });
    const child = defineAddon({
      name: 'child', version: '0.1.0', depends: ['base'], models: [childModel],
      data: [seed('child.record', 'child.demo_two', { source: ref('base.demo_one') })]
    });
    expect(() => validateSeedReferences([base, child])).not.toThrow();
    const bad = defineAddon({
      name: 'bad', version: '0.1.0', models: [childModel],
      data: [seed('child.record', 'bad.record_one', { source: ref('base.missing') })]
    });
    expect(() => validateSeedReferences([bad])).toThrow('unknown external id');
  });

  it('rejects unsafe generated-UI policy and duplicate registry installs', () => {
    expect(() => defineAddon({
      name: 'unsafe', version: '0.1.0', models: [DemoModel],
      uiPolicies: { 'demo.record': { generated: 'prohibited', write: true } }
    })).toThrow('cannot enable mutation');

    const manifest = defineAddon({ name: 'demo', version: '0.1.0', models: [DemoModel] });
    const registry = new ModelRegistry().register(DemoModel);
    expect(() => installAddons([manifest], registry)).toThrow('already registered');
  });
});
