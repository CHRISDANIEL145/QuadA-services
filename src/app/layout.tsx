import type { Metadata, Viewport } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Quad A Life Assist Connect 360° — One Point. Every Service.',
    template: '%s | Quad A Life Assist Connect 360°',
  },
  description:
    'One customer contact. Every service need. Coordinated, followed up, and completed through a verified local partner network across Tirunelveli, Thoothukudi, Kanyakumari, Virudhunagar, and Tenkasi.',
  keywords: [
    'home maintenance', 'senior care', 'event management', 'real estate solutions',
    'financial advisory', 'personal supply', 'Quad A Life Assist', 'Tirunelveli services',
    'Thoothukudi services', 'Kanyakumari services', 'Virudhunagar services', 'Tenkasi services',
  ],
  authors: [{ name: 'Bhrucelin Sahayaraj' }],
  creator: 'Quad A Life Assist Connect 360°',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    siteName: 'Quad A Life Assist Connect 360°',
    title: 'Quad A Life Assist Connect 360°',
    description:
      'One customer contact. Every service need. Coordinated, followed up, and completed across 5 South Indian districts.',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quad A Life Assist Connect 360°',
    description: 'One Point. Every Service. Local. Reliable. Coordinated.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0A0A0A',
              color: '#F9F9F9',
              border: '1px solid #333333',
              borderRadius: '8px',
              fontSize: '0.875rem',
              padding: '0.75rem 1rem',
            },
            success: {
              iconTheme: { primary: '#D4AF37', secondary: '#0A0A0A' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#0A0A0A' },
            },
          }}
        />
      </body>
    </html>
  )
}
