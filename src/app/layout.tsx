import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'QuadA Services — Professional Multi-Service Platform',
    template: '%s | QuadA Services',
  },
  description:
    'QuadA Services provides trusted home, cleaning, senior care, interior, real estate, and corporate services across Tamil Nadu. Submit your enquiry and our expert team will coordinate the right solution.',
  keywords: [
    'home services', 'cleaning services', 'senior care', 'interior design',
    'real estate assistance', 'corporate services', 'Tamil Nadu services',
    'QuadA Services', 'home maintenance',
  ],
  authors: [{ name: 'QuadA Services' }],
  creator: 'QuadA Services',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    siteName: 'QuadA Services',
    title: 'QuadA Services — Professional Multi-Service Platform',
    description:
      'Trusted home, cleaning, senior care, interior, and real estate services across Tamil Nadu.',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuadA Services',
    description: 'Professional multi-service platform for homes, offices, and care.',
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
  themeColor: '#0D1526',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0D1526',
              color: '#FAFAF8',
              borderRadius: '10px',
              fontSize: '0.875rem',
              padding: '0.75rem 1rem',
            },
            success: {
              iconTheme: { primary: '#B8973E', secondary: '#FAFAF8' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#FAFAF8' },
            },
          }}
        />
      </body>
    </html>
  )
}
