import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/providers/AuthProvider';
import dynamic from 'next/dynamic';

const InteractiveDotGrid = dynamic(
  () => import('@/components/canvas/InteractiveDotGridDefault'),
  { ssr: false }
);
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'VI WebSync',
  description:
    'The all-in-one app for mobile phone repair shops — track every repair from intake to pickup, bill customers accurately, manage staff attendance and payroll, and keep spare-parts stock under control. A product of VI WebSync Technologies.',
  keywords: [
    'phone repair shop software',
    'repair ticket tracking',
    'mobile repair billing',
    'WhatsApp repair updates',
    'RepairSync',
    'VI WebSync',
  ],
  openGraph: {
    title: 'VI WebSync — run your repair shop without the chaos',
    description:
      'The all-in-one app for mobile phone repair shops. Track repairs, bill accurately, manage staff & stock. A product of VI WebSync Technologies.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VI WebSync — run your repair shop without the chaos',
    description:
      'The all-in-one app for mobile phone repair shops. A product of VI WebSync Technologies.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="use-credentials" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-[var(--ink)] antialiased">
        {/* Google Analytics placeholder — set NEXT_PUBLIC_GA_ID to enable */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}

        {/* Global Interactive Background System */}
        <InteractiveDotGrid />

        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
