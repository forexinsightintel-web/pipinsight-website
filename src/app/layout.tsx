import type { Metadata } from 'next';
import './globals.css';
import SiteFooter from '../components/SiteFooter';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://pip-insight.co.uk';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'The Trading Foundry — Learn Forex Properly',
  description: 'Forex education from your first candle to advanced execution. Complete strategy films, illustrated playbooks, a free trading journal and tools. Educational only — no signals, no promises.',
  keywords: 'forex education, learn forex, trading strategies, price action, RSI divergence, MACD, trend pullback, trading journal, Trading Foundry',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'The Trading Foundry — Learn Forex Properly',
    description: 'Complete strategy films, illustrated playbooks and free tools. From your first candle to advanced execution.',
    url: SITE,
    siteName: 'The Trading Foundry',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'The Trading Foundry', description: 'Learn forex properly. From your first candle to advanced execution.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap" />
      </head>
      <body style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>{children}<SiteFooter /></body>
    </html>
  );
}
