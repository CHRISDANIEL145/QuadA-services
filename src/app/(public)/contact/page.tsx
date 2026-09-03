import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import Link from 'next/link'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with QuadA Services. We\'re here to help coordinate the right service for your needs.',
}

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 99999 99999', href: 'tel:+919999999999' },
  { icon: Mail, label: 'Email', value: 'hello@quadaservices.com', href: 'mailto:hello@quadaservices.com' },
  { icon: MapPin, label: 'Coverage', value: 'Tamil Nadu, India', href: null },
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
            Let's start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream-200 to-white">conversation.</span>
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
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-cream-200 shadow-sm">
                <h3 className="text-2xl font-bold text-navy-900 mb-8">Contact Details</h3>
                <div className="space-y-8">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-5 group">
                      <div className="w-12 h-12 rounded-xl bg-cream-50 border border-cream-200 flex items-center justify-center shrink-0 group-hover:bg-navy-900 group-hover:border-navy-900 transition-all duration-300 shadow-sm">
                        <Icon size={20} className="text-navy-700 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="text-xs text-navy-500 uppercase tracking-widest font-semibold mb-1">
                          {label}
                        </div>
                        {href ? (
                          <a href={href} className="text-navy-900 font-semibold text-base hover:text-navy-500 transition-colors duration-300">
                            {value}
                          </a>
                        ) : (
                          <span className="text-navy-900 font-semibold text-base">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
              <p className="text-navy-600 mb-10">Fill out the form below and we'll get back to you within 24 hours.</p>
              
              <ContactForm />
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}
