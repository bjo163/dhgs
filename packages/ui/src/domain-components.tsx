import type { ReactNode } from 'react';
import { Button } from './button';
import { Card, Checkbox, Textarea, Timeline } from './primitives';
import { StatusBadge } from './status-badge';

export function CaseHeader({ caseRef, title, status, owner }: { caseRef: string; title: string; status: string; owner?: string }) {
  return <header className="dhgs-case-header"><div><span className="dhgs-meta">{caseRef}</span><h2>{title}</h2></div><div><StatusBadge tone="neutral">{status}</StatusBadge>{owner ? <p className="dhgs-meta">Owner: {owner}</p> : null}</div></header>;
}

export function EvidenceCard({ evidenceRef, title, status, confidentiality, challenge }: { evidenceRef: string; title: string; status: string; confidentiality: string; challenge?: ReactNode }) {
  return <Card title={title}><dl className="dhgs-definition"><dt>Evidence</dt><dd>{evidenceRef}</dd><dt>Status</dt><dd>{status}</dd><dt>Confidentiality</dt><dd>{confidentiality}</dd></dl>{challenge ? <div aria-label="Evidence challenge">{challenge}</div> : null}</Card>;
}

export function MizanGate({ gate, label, outcome, rationale }: { gate: string; label: string; outcome: 'PASS' | 'HOLD' | 'FAIL' | 'UNRESOLVED'; rationale: ReactNode }) {
  const tone = outcome === 'PASS' ? 'positive' : outcome === 'FAIL' ? 'critical' : 'warning';
  return <Card title={`${gate} — ${label}`}><StatusBadge tone={tone}>{outcome}</StatusBadge><div className="dhgs-rationale">{rationale}</div></Card>;
}

export function DecisionSummary({ decisionRef, status, legalStatus, ethicalAssessment, children }: { decisionRef: string; status: string; legalStatus: string; ethicalAssessment: string; children?: ReactNode }) {
  return <Card title="Decision summary"><p className="dhgs-meta">{decisionRef}</p><StatusBadge>{status}</StatusBadge><dl className="dhgs-definition"><dt>Legal status</dt><dd>{legalStatus}</dd><dt>Ethical assessment</dt><dd>{ethicalAssessment}</dd></dl>{children}</Card>;
}

export function CorrectionDiff({ before, after, reason }: { before: ReactNode; after: ReactNode; reason: ReactNode }) {
  return <section className="dhgs-correction" aria-label="Correction comparison"><div><h3>Before</h3>{before}</div><div><h3>After</h3>{after}</div><div><h3>Reason for correction</h3>{reason}</div></section>;
}

export function AuditEvent({ eventId, timestamp, actor, action, detail }: { eventId: string; timestamp: string; actor: string; action: string; detail?: ReactNode }) {
  return <article className="dhgs-audit-event"><p><strong>{action}</strong></p><p className="dhgs-meta"><time dateTime={timestamp}>{timestamp}</time> · {actor} · {eventId}</p>{detail}</article>;
}

export function PublicRecord({ recordRef, title, status, basis, correctionHref }: { recordRef: string; title: string; status: string; basis: ReactNode; correctionHref?: string }) {
  return <article className="dhgs-public-record"><p className="dhgs-meta">{recordRef}</p><h2>{title}</h2><StatusBadge>{status}</StatusBadge><section aria-label="Basis">{basis}</section>{correctionHref ? <a href={correctionHref}>View correction history</a> : null}</article>;
}

export function HighImpactAction({
  actionId,
  label,
  reason,
  confirmed,
  onReasonChange,
  onConfirmedChange,
  onExecute,
  warning
}: {
  actionId: string;
  label: string;
  reason: string;
  confirmed: boolean;
  onReasonChange: (reason: string) => void;
  onConfirmedChange: (confirmed: boolean) => void;
  onExecute: (reason: string) => void;
  warning: ReactNode;
}) {
  const enabled = reason.trim().length > 0 && confirmed;
  return <section className="dhgs-high-impact" aria-labelledby={`${actionId}-title`}>
    <h3 id={`${actionId}-title`}>{label}</h3>
    <div className="dhgs-alert dhgs-alert--critical" role="alert">{warning}</div>
    <Textarea id={`${actionId}-reason`} label="Reason required" value={reason} onChange={(event) => onReasonChange(event.currentTarget.value)} required />
    <Checkbox id={`${actionId}-confirm`} label={`I understand and explicitly confirm: ${label}`} checked={confirmed} onChange={(event) => onConfirmedChange(event.currentTarget.checked)} />
    <Button tone="danger" type="button" disabled={!enabled} aria-disabled={!enabled} onClick={() => enabled && onExecute(reason)}>{label}</Button>
  </section>;
}

export function AuditTimeline({ label, events }: { label: string; events: readonly { id: string; title: string; detail?: ReactNode }[] }) {
  return <Timeline label={label} items={events} />;
}
