import type { ReactNode } from 'react';

type StatusTone = 'neutral' | 'positive' | 'warning' | 'critical';

const MARKERS: Record<StatusTone, string> = {
  neutral: '•',
  positive: '✓',
  warning: '!',
  critical: '×'
};

export function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: StatusTone }) {
  return <span className={`dhgs-status dhgs-status--${tone}`} data-status-tone={tone}>
    <span aria-hidden="true" className="dhgs-status__marker">{MARKERS[tone]}</span>
    <span className="dhgs-sr-only">{tone} status: </span>
    {children}
  </span>;
}
