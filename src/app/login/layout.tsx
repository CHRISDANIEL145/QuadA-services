import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In / Register | Quad A',
  description: 'Access your Quad A account or register to start your journey with us today.',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
