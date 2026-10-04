import type { GeneratedAdminField, GeneratedAdminMetadata } from '@dhgs/orm';

export interface GenericAdminShellProps {
  metadata: GeneratedAdminMetadata;
  rows?: readonly Readonly<Record<string, unknown>>[];
}

export function GenericAdminShell({ metadata, rows = [] }: GenericAdminShellProps) {
  const listView = metadata.views.find((view) => view.kind === 'list');
  const formView = metadata.views.find((view) => view.kind === 'form');
  const searchView = metadata.views.find((view) => view.kind === 'search');
  const fields = new Map(metadata.fields.map((field) => [field.name, field]));
  const formFields = formView
    ? [...formView.fields, ...formView.sections.flatMap((section) => section.fields)]
    : [];

  return <section className="dhgs-admin" aria-labelledby="dhgs-admin-title">
    <header className="dhgs-admin__header">
      <div>
        <div className="dhgs-kicker">Generated admin · {metadata.mode.replace('_', ' ')}</div>
        <h1 id="dhgs-admin-title">{listView?.title ?? formView?.title ?? metadata.model}</h1>
        <p className="dhgs-lead">Metadata-driven administration is limited to low-risk models. Backend authorization remains mandatory for every mutation.</p>
      </div>
      <code className="dhgs-admin__model">{metadata.model}</code>
    </header>

    {searchView ? <form className="dhgs-admin__search" role="search">
      <label htmlFor="dhgs-admin-search">Search {searchView.title}</label>
      <input id="dhgs-admin-search" name="q" type="search" autoComplete="off" />
      <p id="dhgs-admin-search-help" className="dhgs-meta">Searchable fields: {searchView.fields.map((name) => fields.get(name)?.label ?? name).join(', ')}</p>
    </form> : null}

    {listView ? <div className="dhgs-admin__table-wrap">
      <table className="dhgs-admin__table">
        <caption>{listView.title}</caption>
        <thead><tr>{listView.fields.map((name) => <th key={name} scope="col">{fields.get(name)?.label ?? name}</th>)}</tr></thead>
        <tbody>{rows.length > 0 ? rows.map((row, index) => <tr key={String(row.id ?? index)}>
          {listView.fields.map((name) => <td key={name}>{renderValue(row[name])}</td>)}
        </tr>) : <tr><td colSpan={Math.max(1, listView.fields.length)} className="dhgs-meta">No records in this sandbox view.</td></tr>}</tbody>
      </table>
    </div> : null}

    {formView ? <form className="dhgs-admin__form" aria-describedby="dhgs-admin-auth-note">
      <fieldset disabled={metadata.mode === 'read_only'}>
        <legend>{formView.title}</legend>
        <div className="dhgs-admin__fields">{formFields.map((name) => {
          const field = fields.get(name);
          return field ? <AdminField key={name} field={field} /> : null;
        })}</div>
      </fieldset>
      <p id="dhgs-admin-auth-note" className="dhgs-meta">Mutations are fail-closed until a backend authorizer approves the operation. Menu visibility is not authorization.</p>
      <button className="dhgs-button dhgs-button--primary" type="button" disabled={!metadata.capabilities.create} aria-describedby="dhgs-admin-auth-note">Create</button>
    </form> : null}
  </section>;
}

function AdminField({ field }: { field: GeneratedAdminField }) {
  const id = `admin-field-${field.name}`;
  const helpId = `${id}-help`;
  return <div className="dhgs-admin__field">
    <label htmlFor={id}>{field.label}{field.required ? ' *' : ''}</label>
    {field.selection ? <select id={id} name={field.name} disabled={field.readOnly} aria-describedby={field.help || field.immutable ? helpId : undefined}>
      <option value="">Select…</option>
      {field.selection.map((value) => <option value={value} key={value}>{value}</option>)}
    </select> : <input id={id} name={field.name} type={inputType(field)} readOnly={field.readOnly} aria-describedby={field.help || field.immutable ? helpId : undefined} />}
    {field.help || field.immutable ? <small id={helpId}>{field.help ?? 'Immutable after creation.'}</small> : null}
  </div>;
}

function inputType(field: GeneratedAdminField): 'text' | 'number' | 'date' | 'datetime-local' {
  if (field.kind === 'integer' || field.kind === 'number') return 'number';
  if (field.kind === 'date') return 'date';
  if (field.kind === 'datetime') return 'datetime-local';
  return 'text';
}

function renderValue(value: unknown): string {
  if (value == null) return '—';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
  return JSON.stringify(value);
}
