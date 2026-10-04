import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { GeneratedAdminMetadata } from '@dhgs/orm';
import { GenericAdminShell } from './generic-admin.js';

const metadata: GeneratedAdminMetadata = {
  model: 'base.tag', table: 'base_tags', mode: 'allowed',
  capabilities: { create: true, write: true, archive: true },
  fields: [
    { name: 'code', kind: 'string', label: 'Code', required: true, readOnly: false, immutable: true },
    { name: 'name', kind: 'string', label: 'Name', required: true, readOnly: false, immutable: false }
  ],
  views: [
    { id: 'tag.list', kind: 'list', title: 'Tags', fields: ['code', 'name'], sections: [], filters: [] },
    { id: 'tag.form', kind: 'form', title: 'Tag', fields: ['code', 'name'], sections: [], filters: [] },
    { id: 'tag.search', kind: 'search', title: 'Search Tags', fields: ['code', 'name'], sections: [], filters: [] }
  ],
  menus: []
};

describe('GenericAdminShell accessibility', () => {
  it('uses native keyboard-accessible search, table and form controls', () => {
    const html = renderToStaticMarkup(<GenericAdminShell metadata={metadata} rows={[{ id: '1', code: 'A', name: 'Alpha' }]} />);
    expect(html).toContain('role="search"');
    expect(html).toContain('for="dhgs-admin-search"');
    expect(html).toContain('<caption>Tags</caption>');
    expect(html).toContain('<fieldset>');
    expect(html).toContain('aria-describedby="dhgs-admin-auth-note"');
    expect(html).not.toContain('tabindex="-1"');
  });

  it('disables the form and mutation control in read-only mode', () => {
    const html = renderToStaticMarkup(<GenericAdminShell metadata={{ ...metadata, mode: 'read_only', capabilities: { create: false, write: false, archive: false } }} />);
    expect(html).toContain('<fieldset disabled="">');
    expect(html).toContain('<button');
    expect(html).toContain('disabled=""');
  });
});
