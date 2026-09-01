import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/navigation/Footer'

export const metadata: Metadata = {
  title: {
    default: 'QuadA Services — Professional Multi-Service Platform',
    template: '%s | QuadA Services',
  },
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}
