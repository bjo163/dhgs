import type { Metadata } from 'next';
import Link from 'next/link';
import '@dhgs/ui/styles.css';
import './globals.css';
export const metadata: Metadata={title:'DHGS — Operations'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><a className="dhgs-skip" href="#main">Skip to content</a><div className="dhgs-shell"><header className="dhgs-header"><Link className="dhgs-brand" href="/">DHGS OPS</Link><nav className="dhgs-nav"><Link href="/">Dashboard</Link><Link href="/mizan">Mizan</Link><Link href="/audit">Audit</Link></nav></header><main id="main" className="dhgs-main">{children}</main><footer className="dhgs-footer">Prototype only · Technical administration is not governance authority.</footer></div></body></html>}
