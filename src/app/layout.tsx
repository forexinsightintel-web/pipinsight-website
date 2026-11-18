import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = { themeColor: '#050506' };

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tradingfoundry.co.uk';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'The Trading Foundry — Trade the rules, not the noise', template: '%s · Trading Foundry' },
  description: 'Forex education from the Trading Foundry films: full strategy courses, illustrated playbooks and free films on YouTube. Every rule drawn on a chart, every trade shown with its losing version. Education only.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Trading Foundry — Learn Forex Properly', description: 'Films, full strategy courses and illustrated playbooks.', url: SITE, siteName: 'Trading Foundry', type: 'website', images: ['/media/brand/og.jpg'] },
  twitter: { card: 'summary_large_image', title: 'Trading Foundry', description: 'Learn forex properly. Films, courses and playbooks.' },
  icons: { icon: '/media/brand/mark-192.png', apple: '/media/brand/mark-512.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300..800&family=Montserrat:wght@600;700;800&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
