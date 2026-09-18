import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight, Youtube, Instagram, Facebook, Linkedin, Send } from 'lucide-react'

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

const SOCIAL = [
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://youtube.com/@abrucelinsahayaraj3898?si=BJNUJGDInLC2Smf_',
    hoverColor: 'hover:text-[#FF0000]',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/antonybrucelin?utm_source=qr&stkn=MWt1ZnJqejJsYXc0ZA==',
    hoverColor: 'hover:text-[#E1306C]',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/share/19UKGn3QzU/',
    hoverColor: 'hover:text-[#1877F2]',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abc-arontonio-people-service-assist-company-04aba973?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    hoverColor: 'hover:text-[#0A66C2]',
  },
  {
    icon: Send,
    label: 'Telegram — @ABCARONTONIO',
    href: 'https://t.me/ABCARONTONIO',
    hoverColor: 'hover:text-[#2AABEE]',
  },
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
              <div className="relative h-10 w-44 flex-shrink-0">
                <Image src="/abc-logo.png" alt="ABC ARONTONIO Logo" fill className="object-contain" sizes="176px" />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70 mb-6">
              One point. Every service. Trusted coordination across Tirunelveli, Thoothukudi, Kanyakumari, Virudhunagar &amp; Tenkasi.
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

              {/* Main Office */}
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={16} className="text-cream-300 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mb-1">Main Office</p>
                  <address className="not-italic leading-relaxed">
                    No. 18, Jamal Nagar,<br />
                    Bharathi Nagar (Extn.),<br />
                    STC College Road, Palayamkottai,<br />
                    Tirunelveli – 627007, Tamil Nadu
                  </address>
                </div>
              </div>

              {/* Chennai Branch */}
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={16} className="text-cream-300 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mb-1">Chennai Office (Branch)</p>
                  <address className="not-italic leading-relaxed">
                    No. 7/65, Sannacherry,<br />
                    Pondaveerammal Koil Street,<br />
                    Kovalam, Kanchipuram District,<br />
                    Chennai – 603119, Tamil Nadu
                  </address>
                </div>
              </div>

              {/* Social Icons */}
              <div className="pt-3 flex items-center gap-4" aria-label="Social media links">
                {SOCIAL.map(({ icon: Icon, label, href, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`text-white/50 transition-colors duration-200 ${hoverColor} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
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

            {/* Telegram callout */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mb-3">Telegram</p>
              <a
                href="https://t.me/ABCARONTONIO"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#2AABEE] transition-colors"
                aria-label="Message us on Telegram @ABCARONTONIO"
              >
                <Send size={14} className="text-[#2AABEE]" />
                @ABCARONTONIO
              </a>
              <p className="text-white/40 text-xs mt-1">Tap to open Telegram</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 mt-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} ABC ARONTONIO People Service Assist Pvt Ltd. All rights reserved.
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
