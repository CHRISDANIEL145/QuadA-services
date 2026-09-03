import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

import type { ServiceCategory } from '@/types'

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

export async function Footer() {
  return (
    <footer
      className="bg-[#0D1526] border-t border-white/5"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container-site section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 overflow-hidden rounded-full bg-white flex-shrink-0">
                <Image src="/new-logo.png" alt="Quad A Logo" fill className="object-cover" />
              </div>
              <div>
                <div className="text-white font-semibold text-lg tracking-tight leading-none">Quad A</div>
                <div className="text-[10px] text-white/60 font-medium mt-0.5">Life Assist Connect 360°</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70 mb-6">
              One point. Every service. Trusted coordination across Tirunelveli, Thoothukudi, Kanyakumari, Virudhunagar & Tenkasi.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+919655955777"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-cream-300" />
                +91 96559 55777
              </a>
              <a
                href="mailto:bruce_mba07@yahoo.co.in"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-cream-300" />
                bruce_mba07@yahoo.co.in
              </a>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={16} className="text-cream-300 mt-0.5 shrink-0" />
                <span>Tirunelveli, Tamil Nadu</span>
              </div>
            </div>
          </div>


          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-6">Company</h3>
            <ul className="space-y-3" role="list">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enquiry CTA */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              Need a Service?
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Tell us what you need. Our team reviews every enquiry and responds promptly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0D1526] text-sm font-semibold rounded-lg hover:bg-cream-50 transition-colors"
            >
              Send Enquiry
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 mt-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Quad A Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/50 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
