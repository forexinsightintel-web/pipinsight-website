import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://pip-insight.co.uk'),
  title: 'PIP:Insight — Daily Market Analysis. Every Instrument, Every Morning.',
  description: 'Daily technical and macro analysis across 27 instruments — majors, metals, crosses and exotics including Gold — published before the London open. Every settled trade on the public Tape, wins and losses. Educational only. Free.',
  keywords: 'forex analysis, daily forex, currency pairs, GBP/USD, EUR/USD, XAU/USD, gold analysis, forex education, PIP Insight',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PIP:Insight — Daily Forex Analysis',
    description: 'Majors, metals, crosses and exotics. Every morning. Before the London open. Free.',
    url: 'https://pip-insight.co.uk',
    siteName: 'PIP:Insight',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PIP:Insight — Daily Forex Analysis',
    description: 'Majors, metals, crosses and exotics. Every morning. Before the London open.',
    site: '@Forexxinsight',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
