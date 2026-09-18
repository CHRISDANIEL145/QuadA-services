import { ArrowRight, Phone, Mail, MapPin, Youtube, Instagram, Facebook, Linkedin, Send } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import Link from 'next/link'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with ABC ARONTONIO People Service Assist. We\'re here to help coordinate the right service for your needs.',
}

const socialLinks = [
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://youtube.com/@abrucelinsahayaraj3898?si=BJNUJGDInLC2Smf_',
    color: 'hover:text-[#FF0000]',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/antonybrucelin?utm_source=qr&stkn=MWt1ZnJqejJsYXc0ZA==',
    color: 'hover:text-[#E1306C]',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/share/19UKGn3QzU/',
    color: 'hover:text-[#1877F2]',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abc-arontonio-people-service-assist-company-04aba973?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    color: 'hover:text-[#0A66C2]',
  },
  {
    icon: Send,
    label: 'Telegram',
    href: 'https://t.me/ABCARONTONIO',
    color: 'hover:text-[#2AABEE]',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-navy-900 text-white section-padding relative overflow-hidden" style={{ paddingTop: 'clamp(140px, 15vw, 220px)' }}>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-900/90 pointer-events-none"></div>
        
        <div className="container-site relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-cream-300 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-white/90">We are here to help</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 text-center">
            Let&apos;s start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-200 to-white">conversation.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-center">
            Have a question, a specific requirement, or need a custom solution? Reach out and our coordination team will respond promptly.
          </p>
        </div>
      </div>

      <div className="bg-cream-50 section-padding relative">
        <div className="container-site">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Contact info - Left Sidebar */}
            <div className="lg:col-span-5 space-y-6">

              {/* Quick contact */}
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-cream-200 shadow-sm">
                <h3 className="text-2xl font-bold text-navy-900 mb-8">Contact Details</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-cream-50 border border-cream-200 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:border-navy-900 transition-all duration-300 shadow-sm">
                      <Phone size={20} className="text-navy-700 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs text-navy-500 uppercase tracking-widest font-semibold mb-1">Phone</div>
                      <a href="tel:+919655955777" className="text-navy-900 font-semibold text-base hover:text-navy-500 transition-colors duration-300">+91 96559 55777</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-cream-50 border border-cream-200 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:border-navy-900 transition-all duration-300 shadow-sm">
                      <Mail size={20} className="text-navy-700 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs text-navy-500 uppercase tracking-widest font-semibold mb-1">Email</div>
                      <a href="mailto:bruce_mba07@yahoo.co.in" className="text-navy-900 font-semibold text-base hover:text-navy-500 transition-colors duration-300">bruce_mba07@yahoo.co.in</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Addresses */}
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-cream-200 shadow-sm space-y-8">
                <h3 className="text-lg font-bold text-navy-900">Our Offices</h3>

                {/* Main Office */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-cream-50 border border-cream-200 flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={20} className="text-navy-700" />
                  </div>
                  <div>
                    <div className="text-xs text-navy-500 uppercase tracking-widest font-semibold mb-2">Main Office — Tirunelveli</div>
                    <address className="not-italic text-navy-800 text-sm leading-relaxed">
                      No. 18, Jamal Nagar,<br />
                      Bharathi Nagar (Extn.),<br />
                      STC College Road, Palayamkottai,<br />
                      Tirunelveli – 627007,<br />
                      Tamil Nadu, India
                    </address>
                  </div>
                </div>

                <div className="border-t border-cream-100" />

                {/* Chennai Branch */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={20} className="text-navy-600" />
                  </div>
                  <div>
                    <div className="text-xs text-navy-500 uppercase tracking-widest font-semibold mb-2">Chennai Office (Branch)</div>
                    <address className="not-italic text-navy-800 text-sm leading-relaxed">
                      No. 7/65, Sannacherry,<br />
                      Pondaveerammal Koil Street,<br />
                      Kovalam, Kanchipuram District,<br />
                      Chennai – 603119,<br />
                      Tamil Nadu, India
                    </address>
                  </div>
                </div>
              </div>

              {/* Social & Telegram */}
              <div className="bg-white p-8 rounded-2xl border border-cream-200 shadow-sm">
                <h3 className="text-sm font-bold text-navy-900 mb-5 uppercase tracking-wider">Follow Us</h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  {socialLinks.map(({ icon: Icon, label, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} — ABC ARONTONIO`}
                      title={label}
                      className={`w-10 h-10 rounded-xl bg-cream-50 border border-cream-200 flex items-center justify-center text-navy-600 transition-all duration-300 hover:shadow-md ${color}`}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
                <div className="pt-4 border-t border-cream-100">
                  <p className="text-xs text-navy-500 uppercase tracking-wider font-semibold mb-2">Telegram</p>
                  <a
                    href="https://t.me/ABCARONTONIO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-navy-700 hover:text-[#2AABEE] text-sm font-medium transition-colors"
                    aria-label="Message us on Telegram @ABCARONTONIO"
                  >
                    <Send size={14} className="text-[#2AABEE]" />
                    @ABCARONTONIO
                  </a>
                </div>
              </div>

              {/* Browse services CTA */}
              <div className="p-8 md:p-10 bg-navy-900 text-white rounded-2xl relative overflow-hidden group shadow-lg">
                <div className="absolute top-0 right-0 p-6 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                  <ArrowRight size={100} />
                </div>
                <h2 className="text-2xl font-bold mb-4 tracking-tight relative z-10">
                  Looking for a <span className="text-cream-300">specific service?</span>
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-8 relative z-10">
                  For service-specific enquiries, use our dedicated enquiry system for faster processing and better matching.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center w-full gap-3 py-4 bg-white text-navy-900 text-sm font-bold rounded-xl hover:bg-cream-50 transition-colors duration-300 relative z-10"
                >
                  Browse all services
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Form - Right Content */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl border border-cream-200 shadow-xl shadow-navy-900/5 relative">
              <h2 className="text-3xl font-bold text-navy-900 mb-2 tracking-tight">
                Send us a message
              </h2>
              <p className="text-navy-600 mb-10">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
              
              <ContactForm />
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}
