import { notFound } from 'next/navigation';
import { GeneratedUiError, installAddons, resolveGeneratedAdminMetadata } from '@dhgs/orm';
import { manifest } from '@dhgs/orm-base';
import { GenericAdminShell } from '@dhgs/ui';

const registry = installAddons([manifest]);

export default async function AdminModelPage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  let metadata;
  try {
    metadata = resolveGeneratedAdminMetadata(manifest, registry, decodeURIComponent(model));
  } catch (error) {
    if (error instanceof GeneratedUiError) notFound();
    throw error;
  }

  const rows = manifest.data
    .filter((record) => record.model === metadata.model)
    .map((record) => ({ id: record.externalId, ...record.values }));

  return <GenericAdminShell metadata={metadata} rows={rows} />;
}
