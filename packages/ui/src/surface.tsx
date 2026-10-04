import type { ReactNode } from 'react';

export function Surface({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`dhgs-surface ${className}`.trim()}>{children}</section>;
}
