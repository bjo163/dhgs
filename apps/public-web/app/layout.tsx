import type { Metadata } from 'next';
import Link from 'next/link';
import '@dhgs/ui/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'DHGS — Open Book',
  description: 'Governance that can explain, review, correct and learn.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="dhgs-skip" href="#main">Skip to content</a><div className="dhgs-shell"><header className="dhgs-header"><Link className="dhgs-brand" href="/"><img src="/brand/dhgs-mark.svg" alt="" aria-hidden="true"/>DHGS</Link><nav className="dhgs-nav" aria-label="Primary"><Link href="/open">Open Book</Link><Link href="/portal">My Portal</Link><Link href="/#how">How it works</Link></nav></header><main id="main" className="dhgs-main">{children}</main><footer className="dhgs-footer">DHGS prototype · Governance assurance, not sovereign authority.</footer></div></body></html>;
}
