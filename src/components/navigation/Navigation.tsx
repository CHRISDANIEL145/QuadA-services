'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  const isHeroPage = pathname === '/'

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          scrolled || !isHeroPage
            ? 'bg-[#0D1526]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
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
            <div className="w-8 h-8 rounded-lg bg-[#B8973E] flex items-center justify-center text-white font-bold text-sm tracking-tight transition-transform group-hover:scale-110">
              Q
            </div>
            <span className="text-white font-semibold text-lg tracking-tight leading-none">
              QuadA
              <span className="block text-[10px] font-normal text-white/50 tracking-widest uppercase -mt-0.5">
                Services
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm rounded-lg transition-all duration-200',
                  pathname === link.href
                    ? 'text-[#B8973E] bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919999999999"
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              aria-label="Call us"
            >
              <Phone size={15} />
              <span>+91 99999 99999</span>
            </a>
            <Link
              href="/services"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#B8973E] text-white text-sm font-medium rounded-lg hover:bg-[#D4AF5C] transition-all duration-200 hover:shadow-lg hover:shadow-[#B8973E]/30"
            >
              Explore Services
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-[99] bg-[#0D1526]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="container-site pt-20 pb-8">
              {/* Nav links */}
              <div className="flex flex-col gap-1 mt-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block px-4 py-3.5 text-lg rounded-xl transition-all',
                        pathname === link.href
                          ? 'text-[#B8973E] bg-white/10'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                <a
                  href="tel:+919999999999"
                  className="flex items-center gap-3 text-white/70 text-base"
                >
                  <Phone size={16} />
                  +91 99999 99999
                </a>
                <Link
                  href="/services"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B8973E] text-white font-medium rounded-xl"
                >
                  Explore Services
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
