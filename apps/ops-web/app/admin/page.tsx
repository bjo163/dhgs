import Link from 'next/link';
import { GeneratedUiError, installAddons, resolveGeneratedAdminMetadata } from '@dhgs/orm';
import { manifest } from '@dhgs/orm-base';
import { Surface } from '@dhgs/ui';

const registry = installAddons([manifest]);

export default function AdminIndexPage() {
  const entries = manifest.menus.flatMap((menu) => {
    if (!menu.viewId) return [];
    const view = manifest.views.find((candidate) => candidate.id === menu.viewId);
    if (!view) return [];
    try {
      const metadata = resolveGeneratedAdminMetadata(manifest, registry, view.model);
      return [{ menu, metadata }];
    } catch (error) {
      if (error instanceof GeneratedUiError) return [];
      throw error;
    }
  });

  return <>
    <div className="dhgs-kicker">Low-risk administration</div>
    <h1>Generated Admin</h1>
    <p className="dhgs-lead">Only models explicitly approved for generated administration appear here. High-stakes governance workflows require purpose-built interfaces.</p>
    <div className="dhgs-grid">{entries.map(({ menu, metadata }) => <Surface key={menu.id}>
      <div className="dhgs-kicker">{metadata.mode.replace('_', ' ')}</div>
      <h2>{menu.label}</h2>
      <p className="dhgs-meta">{metadata.model}</p>
      <Link href={`/admin/${encodeURIComponent(metadata.model)}`}>Open metadata view</Link>
    </Surface>)}</div>
  </>;
}
