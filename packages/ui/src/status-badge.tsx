import type { ReactNode } from 'react';

export function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'positive' | 'warning' | 'critical' }) {
  return <span className={`dhgs-status dhgs-status--${tone}`}>{children}</span>;
}
