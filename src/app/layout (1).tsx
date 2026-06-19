import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PIP:Insight — Daily Forex Analysis. 9 Pairs. Every Morning.',
  description: 'Real technical and macro analysis across 9 major currency pairs including Gold — published automatically every weekday before the London open. Free.',
  keywords: 'forex analysis, daily forex, currency pairs, GBP/USD, EUR/USD, XAU/USD, gold, trading signals, PIP Insight',
  openGraph: {
    title: 'PIP:Insight — Daily Forex Analysis',
    description: '9 pairs. Every morning. Before the London open. Free.',
    url: 'https://pip-insight.co.uk',
    siteName: 'PIP:Insight',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PIP:Insight — Daily Forex Analysis',
    description: '9 pairs. Every morning. Before the London open.',
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
