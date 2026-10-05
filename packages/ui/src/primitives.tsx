import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes
} from 'react';

export function Input({ id, label, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) {
  return <label className="dhgs-field" htmlFor={id}><span>{label}</span><input id={id} {...props} /></label>;
}

export function Select({ id, label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { id: string; label: string; children: ReactNode }) {
  return <label className="dhgs-field" htmlFor={id}><span>{label}</span><select id={id} {...props}>{children}</select></label>;
}

export function Textarea({ id, label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string; label: string }) {
  return <label className="dhgs-field" htmlFor={id}><span>{label}</span><textarea id={id} {...props} /></label>;
}

export function Checkbox({ id, label, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) {
  return <label className="dhgs-choice" htmlFor={id}><input id={id} type="checkbox" {...props} /><span>{label}</span></label>;
}

export function Radio({ id, label, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) {
  return <label className="dhgs-choice" htmlFor={id}><input id={id} type="radio" {...props} /><span>{label}</span></label>;
}

export function DateInput({ id, label, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) {
  return <Input id={id} label={label} type="date" {...props} />;
}

export function FileUpload({ id, label, accept, ...props }: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) {
  return <Input id={id} label={label} type="file" accept={accept} {...props} />;
}

export function Alert({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warning' | 'critical' | 'success' }) {
  return <div className={`dhgs-alert dhgs-alert--${tone}`} role={tone === 'critical' ? 'alert' : 'status'}><strong>{alertMarker(tone)} </strong>{children}</div>;
}

export function Banner({ label, children }: { label: string; children: ReactNode }) {
  return <section className="dhgs-banner" role="region" aria-label={label}>{children}</section>;
}

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return <section className="dhgs-card">{title ? <h3>{title}</h3> : null}{children}</section>;
}

export function Table({ caption, headers, rows }: { caption: string; headers: readonly string[]; rows: readonly (readonly ReactNode[])[] }) {
  return <div className="dhgs-table-wrap"><table className="dhgs-table"><caption>{caption}</caption><thead><tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export function Timeline({ label, items }: { label: string; items: readonly { id: string; title: string; detail?: ReactNode }[] }) {
  return <section aria-label={label}><ol className="dhgs-timeline">{items.map((item) => <li key={item.id}><strong>{item.title}</strong>{item.detail ? <div>{item.detail}</div> : null}</li>)}</ol></section>;
}

export function Tabs({ label, tabs, activeId, onSelect }: { label: string; tabs: readonly { id: string; label: string; panel: ReactNode }[]; activeId: string; onSelect?: (id: string) => void }) {
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  return <div><div role="tablist" aria-label={label}>{tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={tab.id === active?.id} aria-controls={`${tab.id}-panel`} id={`${tab.id}-tab`} onClick={() => onSelect?.(tab.id)}>{tab.label}</button>)}</div>{active ? <section role="tabpanel" id={`${active.id}-panel`} aria-labelledby={`${active.id}-tab`}>{active.panel}</section> : null}</div>;
}

export function Accordion({ items }: { items: readonly { id: string; title: string; content: ReactNode }[] }) {
  return <div className="dhgs-accordion">{items.map((item) => <details key={item.id}><summary>{item.title}</summary><div>{item.content}</div></details>)}</div>;
}

export function Dialog({ id, title, open, children }: { id: string; title: string; open: boolean; children: ReactNode }) {
  return <dialog className="dhgs-dialog" open={open} aria-labelledby={`${id}-title`}><h2 id={`${id}-title`}>{title}</h2>{children}</dialog>;
}

export function Drawer({ id, title, open, children }: { id: string; title: string; open: boolean; children: ReactNode }) {
  if (!open) return null;
  return <aside className="dhgs-drawer" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}><h2 id={`${id}-title`}>{title}</h2>{children}</aside>;
}

export function Pagination({ label, currentPage, pages }: { label: string; currentPage: number; pages: readonly { page: number; href: string }[] }) {
  return <nav aria-label={label}><ul className="dhgs-pagination">{pages.map((item) => <li key={item.page}><a href={item.href} aria-current={item.page === currentPage ? 'page' : undefined}>{item.page}</a></li>)}</ul></nav>;
}

export function Search({ id, label, action = '', defaultValue = '' }: { id: string; label: string; action?: string; defaultValue?: string }) {
  return <form role="search" action={action}><Input id={id} name="q" type="search" label={label} defaultValue={defaultValue} /><button type="submit" className="dhgs-button dhgs-button--primary">Search</button></form>;
}

function alertMarker(tone: 'info' | 'warning' | 'critical' | 'success'): string {
  return ({ info: 'i', warning: '!', critical: '×', success: '✓' } as const)[tone];
}
