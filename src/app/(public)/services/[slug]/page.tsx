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
      <div className="bg-cream-50 section-padding border-b border-cream-200">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-navy-500 mb-8 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-navy-900 transition-colors">Services</Link>
            {category && (
              <>
                <ChevronRight size={12} />
                <span className="text-navy-500">{category.name}</span>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-navy-900">{service.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              {category && (
                <span className="inline-block px-4 py-1.5 border border-cream-200 bg-white text-navy-600 text-[10px] uppercase tracking-widest font-semibold mb-6 rounded-full shadow-sm">
                  {category.name}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-navy-900 tracking-tight leading-tight mb-6">
                {service.name}
              </h1>
              {service.short_description && (
                <p className="text-navy-600 text-sm md:text-lg max-w-xl leading-relaxed">
                  {service.short_description}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start lg:items-end gap-6">
              {service.display_price && (
                <div className="text-left lg:text-right">
                  <div className="text-navy-500 text-[10px] font-semibold uppercase tracking-widest mb-2">Pricing Structure</div>
                  <div className="text-navy-900 text-xl font-bold tracking-tight">{service.display_price}</div>
                </div>
              )}
              <Link
                href={`/services/${service.slug}/enquiry`}
                id="service-enquiry-cta-top"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-navy-900 text-white font-semibold text-sm rounded-lg hover:bg-navy-800 transition-all duration-300 w-full sm:w-auto justify-center shadow-sm hover:shadow-md"
              >
                Request This Service
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Description */}
              {service.description && (
                <section aria-labelledby="about-heading">
                  <h2 id="about-heading" className="text-2xl md:text-3xl font-bold text-navy-900 mb-6 tracking-tight">
                    About This <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Service</span>
                  </h2>
                  <div className="text-navy-600 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                    {service.description}
                  </div>
                </section>
              )}

              {/* What's included */}
              <section aria-labelledby="included-heading">
                <h2 id="included-heading" className="text-2xl md:text-3xl font-bold text-navy-900 mb-8 tracking-tight">
                  What&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Included</span>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
                  {[
                    'Professional assessment of your requirements',
                    'Skilled and verified service professionals',
                    'Coordinated scheduling at your convenience',
                    'Quality check on completion',
                    'Post-service follow-up by our team',
                    'Transparent communication throughout',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-navy-900 mt-1 shrink-0" aria-hidden="true" />
                      <span className="text-navy-600 text-sm md:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Service areas */}
              {areas.length > 0 && (
                <section aria-labelledby="areas-heading">
                  <h2 id="areas-heading" className="text-2xl md:text-3xl font-bold text-navy-900 mb-8 flex items-center gap-3 tracking-tight">
                    <MapPin size={24} className="text-navy-900" aria-hidden="true" />
                    Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Areas</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {areas.map((area: any) => (
                      <span
                        key={area.id}
                        className="px-4 py-2 bg-cream-50 border border-cream-200 text-navy-700 text-xs font-medium rounded-full shadow-sm hover:border-cream-200 hover:bg-cream-100 transition-colors duration-300"
                      >
                        {area.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 relative z-10">
              {/* Enquiry card */}
              <div className="bg-white border border-cream-200 rounded-xl p-8 sticky top-32 shadow-sm">
                <h3 className="font-bold text-xl text-navy-900 mb-3 tracking-tight">
                  Request <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Service</span>
                </h3>
                <p className="text-navy-600 text-sm leading-relaxed mb-8">
                  Fill in your details and our team will review your requirement within one business day.
                </p>
                <Link
                  href={`/services/${service.slug}/enquiry`}
                  id="service-enquiry-cta-sidebar"
                  className="block text-center py-3 bg-navy-900 text-white font-semibold text-sm rounded-lg hover:bg-navy-800 transition-all duration-300 mb-4 shadow-sm"
                >
                  Submit Enquiry
                </Link>
                <Link
                  href="/contact"
                  className="block text-center text-navy-500 text-xs font-medium hover:text-navy-900 transition-colors duration-300"
                >
                  or contact us directly
                </Link>

                <div className="mt-8 pt-8 border-t border-cream-100 space-y-4">
                  <div className="flex items-center gap-3 text-navy-600 text-xs font-medium">
                    <Clock size={16} className="text-navy-900" aria-hidden="true" />
                    We review every enquiry within 1 business day
                  </div>
                  <div className="flex items-center gap-3 text-navy-600 text-xs font-medium">
                    <CheckCircle2 size={16} className="text-navy-900" aria-hidden="true" />
                    No registration or payment required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-cream-50 section-padding border-t border-cream-200 relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cream-200/50 rounded-full blur-[100px]" />
        
        <div className="container-site text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 tracking-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">get started?</span>
          </h2>
          <p className="text-navy-600 mb-10 max-w-lg mx-auto text-base leading-relaxed">
            Submit your enquiry in minutes. Our team will contact you to discuss your requirements.
          </p>
          <Link
            href={`/services/${service.slug}/enquiry`}
            id="service-enquiry-cta-bottom"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-navy-900 text-white font-semibold text-sm rounded-lg hover:bg-navy-800 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Submit Your Enquiry
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </>
  )
}
