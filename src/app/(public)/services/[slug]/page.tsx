import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowRight, CheckCircle2, MapPin, Clock } from 'lucide-react'
import { getServiceBySlug, getPublicServiceAreas } from '@/actions/public'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: service.name,
    description: service.short_description || service.description || '',
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const [service, areas] = await Promise.all([
    getServiceBySlug(slug),
    getPublicServiceAreas(),
  ])

  if (!service) notFound()

  const category = (service as any).service_categories

  return (
    <>
      {/* Hero */}
      <div className="bg-[#0D1526] pt-32 pb-16">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
            {category && (
              <>
                <ChevronRight size={12} />
                <span className="text-white/40">{category.name}</span>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-white/60">{service.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              {category && (
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#B8973E] text-xs font-medium mb-4">
                  {category.name}
                </span>
              )}
              <h1 className="font-display text-4xl md:text-6xl text-white tracking-tight leading-tight mb-4">
                {service.name}
              </h1>
              {service.short_description && (
                <p className="text-white/60 text-lg leading-relaxed">
                  {service.short_description}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start lg:items-end gap-4">
              {service.display_price && (
                <div className="text-center lg:text-right">
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Pricing</div>
                  <div className="text-white text-2xl font-medium">{service.display_price}</div>
                </div>
              )}
              <Link
                href={`/services/${service.slug}/enquiry`}
                id="service-enquiry-cta-top"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#B8973E] text-white font-medium text-base rounded-xl hover:bg-[#D4AF5C] transition-all duration-300 hover:shadow-xl hover:shadow-[#B8973E]/25"
              >
                Request This Service
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-[#FAFAF8] py-16">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              {service.description && (
                <section aria-labelledby="about-heading">
                  <h2 id="about-heading" className="font-display text-2xl text-[#0D1526] mb-4">
                    About This Service
                  </h2>
                  <div className="text-[#6B6254] leading-relaxed whitespace-pre-wrap">
                    {service.description}
                  </div>
                </section>
              )}

              {/* What's included */}
              <section aria-labelledby="included-heading">
                <h2 id="included-heading" className="font-display text-2xl text-[#0D1526] mb-6">
                  What&apos;s Included
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                  {[
                    'Professional assessment of your requirements',
                    'Skilled and verified service professionals',
                    'Coordinated scheduling at your convenience',
                    'Quality check on completion',
                    'Post-service follow-up by our team',
                    'Transparent communication throughout',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#B8973E] mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="text-[#6B6254] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Service areas */}
              {areas.length > 0 && (
                <section aria-labelledby="areas-heading">
                  <h2 id="areas-heading" className="font-display text-2xl text-[#0D1526] mb-6 flex items-center gap-2">
                    <MapPin size={20} className="text-[#B8973E]" aria-hidden="true" />
                    Service Areas
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {areas.map((area: any) => (
                      <span
                        key={area.id}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#DDD7CF] text-[#0D1526] text-sm"
                      >
                        {area.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Enquiry card */}
              <div className="bg-[#0D1526] rounded-2xl p-6 sticky top-24">
                <h3 className="font-display text-xl text-white mb-2">
                  Request This Service
                </h3>
                <p className="text-white/50 text-sm mb-6">
                  Fill in your details and our team will review your requirement within one business day.
                </p>
                <Link
                  href={`/services/${service.slug}/enquiry`}
                  id="service-enquiry-cta-sidebar"
                  className="block text-center py-3.5 bg-[#B8973E] text-white font-medium rounded-xl hover:bg-[#D4AF5C] transition-all duration-200 mb-4"
                >
                  Submit Enquiry
                </Link>
                <Link
                  href="/contact"
                  className="block text-center py-3 text-white/60 text-sm hover:text-white transition-colors"
                >
                  or contact us directly
                </Link>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-2.5 text-white/40 text-xs">
                    <Clock size={13} aria-hidden="true" />
                    We review every enquiry within 1 business day
                  </div>
                  <div className="flex items-center gap-2.5 text-white/40 text-xs">
                    <CheckCircle2 size={13} aria-hidden="true" />
                    No registration or payment required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#0D1526] py-16">
        <div className="container-site text-center">
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Submit your enquiry in minutes. Our team will contact you to discuss your requirements.
          </p>
          <Link
            href={`/services/${service.slug}/enquiry`}
            id="service-enquiry-cta-bottom"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#B8973E] text-white font-medium rounded-xl hover:bg-[#D4AF5C] transition-all duration-300"
          >
            Submit Your Enquiry
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  )
}
