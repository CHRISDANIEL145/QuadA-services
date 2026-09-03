import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation/Navigation'
import { Footer } from '@/components/navigation/Footer'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: {
    default: 'QuadA Services — Professional Multi-Service Platform',
    template: '%s | QuadA Services',
  },
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation user={user} />
      <main id="main-content" tabIndex={-1} className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}
