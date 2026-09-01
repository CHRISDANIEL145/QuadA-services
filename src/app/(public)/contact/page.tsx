import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'

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
      <div className="bg-[#0D1526] pt-32 pb-16">
        <div className="container-site">
          <h1 className="font-display text-4xl md:text-6xl text-white tracking-tight leading-tight mb-4">
            Get in touch.
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Have a question or a specific requirement? Reach out and our team will respond promptly.
          </p>
        </div>
      </div>

      <div className="bg-[#FAFAF8] py-16">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <div className="space-y-5 mb-10">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0D1526] flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#B8973E]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#A89E8E] uppercase tracking-wider mb-0.5">
                        {label}
                      </div>
                      {href ? (
                        <a href={href} className="text-[#0D1526] font-medium hover:text-[#B8973E] transition-colors">
                          {value}
                        </a>
                      ) : (
                        <span className="text-[#0D1526] font-medium">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#0D1526]/[0.03] border border-[#DDD7CF]">
                <h2 className="font-display text-xl text-[#0D1526] mb-3">
                  Looking for a specific service?
                </h2>
                <p className="text-[#6B6254] text-sm mb-4">
                  For service-specific enquiries, use our dedicated enquiry system for faster processing.
                </p>
                <a
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#B8973E] hover:text-[#8F7230] transition-colors"
                >
                  Browse all services
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-[#DDD7CF] p-8">
              <h2 className="font-display text-2xl text-[#0D1526] mb-6">Send us a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
