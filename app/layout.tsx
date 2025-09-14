import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'CreatorDAO Share',
  description: 'Empower creators with revenue-sharing and community engagement on Base.',
  openGraph: {
    title: 'CreatorDAO Share',
    description: 'Empower creators with revenue-sharing and community engagement on Base.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorDAO Share',
    description: 'Empower creators with revenue-sharing and community engagement on Base.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="gradient-bg">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
