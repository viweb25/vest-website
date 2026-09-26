import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { AuthProvider } from '@/providers/AuthProvider';
import { InteractiveDotGrid } from '@/components/canvas/InteractiveDotGrid';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
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
