import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

const serviceLinks = [
  { href: '/services/home-maintenance', label: 'Home & Maintenance' },
  { href: '/services/cleaning-housekeeping', label: 'Cleaning Services' },
  { href: '/services/senior-citizen-assistance', label: 'Senior Care' },
  { href: '/services/interior-renovation', label: 'Interior & Renovation' },
  { href: '/services/real-estate-property', label: 'Real Estate' },
  { href: '/services/event-travel-services', label: 'Events & Travel' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

export function Footer() {
  return (
    <footer
      className="bg-[#0A0F1C] text-white/70"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#B8973E] flex items-center justify-center text-white font-bold text-sm">
                Q
              </div>
              <div>
                <div className="text-white font-semibold text-base leading-none">QuadA</div>
                <div className="text-[10px] text-white/40 tracking-widest uppercase">Services</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-6">
              Connecting you with trusted professionals for every home, office, and personal service need across Tamil Nadu.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+919999999999"
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
              >
                <Phone size={14} className="text-[#B8973E]" />
                +91 99999 99999
              </a>
              <a
                href="mailto:hello@quadaservices.com"
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
              >
                <Mail size={14} className="text-[#B8973E]" />
                hello@quadaservices.com
              </a>
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin size={14} className="text-[#B8973E] mt-0.5 shrink-0" />
                <span>Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-medium text-sm uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#B8973E]"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-medium text-sm uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enquiry CTA */}
          <div>
            <h3 className="text-white font-medium text-sm uppercase tracking-widest mb-5">
              Need a Service?
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              Tell us what you need. Our team reviews every enquiry and responds promptly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#B8973E] text-white text-sm font-medium rounded-lg hover:bg-[#D4AF5C] transition-all duration-200"
            >
              Send Enquiry
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} QuadA Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
