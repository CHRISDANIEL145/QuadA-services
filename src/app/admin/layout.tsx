import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Admin — QuadA Services',
    template: '%s | Admin',
  },
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="admin-layout">{children}</div>
}
