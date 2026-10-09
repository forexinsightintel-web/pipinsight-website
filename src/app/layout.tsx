import type { Metadata } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://pip-insight.co.uk';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Trading Foundry — Learn Forex Properly', template: '%s · Trading Foundry' },
  description: 'Forex education from the Trading Foundry films: full strategy courses, illustrated playbooks and free films on YouTube. Every rule drawn on a chart, every trade shown with its losing version. Education only.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Trading Foundry — Learn Forex Properly', description: 'Films, full strategy courses and illustrated playbooks.', url: SITE, siteName: 'Trading Foundry', type: 'website', images: ['/media/thumbs/pullback.webp'] },
  twitter: { card: 'summary_large_image', title: 'Trading Foundry', description: 'Learn forex properly. Films, courses and playbooks.' },
  icons: { icon: '/media/mark.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700;800&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
