import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In / Register | ABC ARONTONIO',
  description: 'Access your ABC ARONTONIO account or register to start your journey with us today.',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
