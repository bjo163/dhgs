import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: 'primary' | 'quiet' | 'danger';
};

export function Button({ children, tone = 'primary', className = '', ...props }: Props) {
  return <button className={`dhgs-button dhgs-button--${tone} ${className}`.trim()} {...props}>{children}</button>;
}
