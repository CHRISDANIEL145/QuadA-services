'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { User } from '@supabase/supabase-js'
import { customerSignOut } from '@/actions/customer-auth'
import toast from 'react-hot-toast'

const baseNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setTimeout(() => setIsOpen(false), 0) }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const handleSignOut = async () => {
    const res = await customerSignOut()
    if (res.success) {
      toast.success('Signed out successfully')
      router.refresh()
    } else {
      toast.error('Failed to sign out')
    }
  }

  const isHeroPage = pathname === '/'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
          scrolled || !isHeroPage
            ? 'bg-white/80 backdrop-blur-xl border-b border-cream-200 shadow-sm'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <nav
          className="container-site flex items-center justify-between h-16 lg:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="QuadA Services — Home"
          >
            <div className={cn(
              "relative w-10 h-10 overflow-hidden rounded-full bg-white flex-shrink-0 transition-all duration-300 border-2",
              scrolled || !isHeroPage ? "border-cream-200" : "border-white/30"
            )}>
              <Image src="/new-logo.png" alt="Quad A Logo" fill className="object-cover" />
            </div>
            <span className={cn(
              "font-semibold text-lg tracking-tight",
              scrolled || !isHeroPage ? "text-navy-900" : "text-white"
            )}>
              Quad A
              <span className={cn(
                "block text-[10px] font-medium mt-0.5 opacity-70",
                scrolled || !isHeroPage ? "text-navy-500" : "text-white/70"
              )}>
                Life Assist
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {baseNavLinks.map((link) => {
              const isActive = pathname === link.href;
              const linkColor = scrolled || !isHeroPage 
                ? (isActive ? 'text-navy-900 bg-cream-100' : 'text-navy-600 hover:text-navy-900 hover:bg-cream-50')
                : (isActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10');
                
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                    linkColor
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Auth Link */}
            {user ? (
              <button
                onClick={handleSignOut}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2',
                  scrolled || !isHeroPage ? 'text-navy-600 hover:text-navy-900 hover:bg-cream-50' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  pathname === '/login'
                    ? (scrolled || !isHeroPage ? 'text-navy-900 bg-cream-100' : 'text-white bg-white/10')
                    : (scrolled || !isHeroPage ? 'text-navy-600 hover:text-navy-900 hover:bg-cream-50' : 'text-white/80 hover:text-white hover:bg-white/10')
                )}
              >
                Login
              </Link>
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919655955777"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors duration-200",
                scrolled || !isHeroPage ? "text-navy-600 hover:text-navy-900" : "text-white/80 hover:text-white"
              )}
              aria-label="Call us"
            >
              <Phone size={16} />
              <span>+91 96559 55777</span>
            </a>
            <Link
              href="/services"
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm",
                scrolled || !isHeroPage 
                  ? "bg-navy-900 text-white hover:bg-navy-800"
                  : "bg-white text-navy-900 hover:bg-white/90"
              )}
            >
              Explore Services
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors",
              scrolled || !isHeroPage ? "text-navy-600 hover:bg-cream-100" : "text-white hover:bg-white/10"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] bg-white border-b border-cream-200 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="container-site pt-24 pb-8 min-h-full flex flex-col">
              {/* Nav links */}
              <div className="flex flex-col gap-2 mt-4 flex-1">
                {baseNavLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block px-4 py-3 text-lg font-medium rounded-lg transition-colors',
                        pathname === link.href
                          ? 'text-navy-900 bg-cream-50'
                          : 'text-navy-600 hover:text-navy-900 hover:bg-cream-50'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: baseNavLinks.length * 0.05 + 0.1 }}
                >
                  {user ? (
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                      className="w-full text-left px-4 py-3 text-lg font-medium rounded-lg transition-colors text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className={cn(
                        'block px-4 py-3 text-lg font-medium rounded-lg transition-colors',
                        pathname === '/login'
                          ? 'text-navy-900 bg-cream-50'
                          : 'text-navy-600 hover:text-navy-900 hover:bg-cream-50'
                      )}
                    >
                      Login
                    </Link>
                  )}
                </motion.div>
              </div>

              <div className="mt-8 pt-6 border-t border-cream-200 flex flex-col gap-4">
                <a
                  href="tel:+919655955777"
                  className="flex items-center justify-center gap-2 text-navy-600 font-medium py-3 hover:text-navy-900 transition-colors"
                >
                  <Phone size={18} />
                  +91 96559 55777
                </a>
                <Link
                  href="/services"
                  className="flex items-center justify-center w-full py-4 bg-navy-900 text-white rounded-xl font-medium hover:bg-navy-800 transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
