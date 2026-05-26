import type { Metadata } from 'next';
import { Syne, Space_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GridBackground } from '@/components/GridBackground';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { StructuredData } from '@/components/StructuredData';
import { organizationSchema } from '@/lib/seo';
import { site } from '@/lib/site';

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' })
const syne = Syne({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: 'InkwellCX - High-Converting Websites & Web Design Services',
    template: '%s | InkwellCX',
  },
  description: site.description,
  keywords: [
    'web design South Africa',
    'website design',
    'SEO services',
    'website maintenance',
    'website audits',
    'conversion optimisation',
    'small business websites',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'Web Design',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' }],
    other: [
      { rel: 'manifest', url: '/manifest.json' }
    ],
  },
  openGraph: {
    title: 'InkwellCX - High-Converting Websites & Web Design Services',
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'InkwellCX - Websites that convert',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InkwellCX - High-Converting Websites & Web Design Services',
    description: site.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport = 'width=device-width, initial-scale=1.0';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" sizes="any" href="/favicon.svg" />
        {/* Optimize theme injection to prevent flash */}
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
          `
        }} />
        <StructuredData data={organizationSchema()} />
      </head>
      <body className={`${syne.className} ${spaceMono.className}`}>
        <ThemeProvider>
          <GridBackground />
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="page-wrapper">
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>
              <Navbar />
              {children}
              <SpeedInsights />
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
