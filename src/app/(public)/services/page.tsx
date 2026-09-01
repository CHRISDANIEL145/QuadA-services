import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { getPublicCategories, getPublicServices } from '@/actions/public'
import type { ServiceCategory, Service } from '@/types'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore QuadA Services — home maintenance, cleaning, senior care, interior design, real estate, corporate services and more across Tamil Nadu.',
}

export const revalidate = 3600 // Revalidate every hour

export default async function ServicesPage() {
  const [categories, services] = await Promise.all([
    getPublicCategories(),
    getPublicServices(),
  ])

  // Group services by category
  const servicesByCategory = categories.map((cat: ServiceCategory) => ({
    category: cat,
    services: services.filter((s: Service) => s.category_id === cat.id),
  })).filter(({ services }) => services.length > 0)

  return (
    <>
      {/* Header */}
      <div className="bg-[#0D1526] pt-32 pb-16">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/60">Services</span>
          </nav>
          <h1 className="font-display text-4xl md:text-6xl text-white tracking-tight leading-tight mb-4">
            Our Services
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Professional services across 12 categories. Tell us what you need — we'll coordinate the right expert for you.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#FAFAF8] py-16">
        <div className="container-site">
          {servicesByCategory.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#6B6254] text-lg">Services are being loaded. Please check back soon.</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#0D1526] text-white rounded-xl"
              >
                Contact us directly
              </Link>
            </div>
          ) : (
            <div className="space-y-20">
              {servicesByCategory.map(({ category, services }) => (
                <div key={category.id} id={category.slug}>
                  {/* Category header */}
                  <div className="flex items-end justify-between mb-8 pb-6 border-b border-[#DDD7CF]">
                    <div>
                      <p className="text-xs text-[#B8973E] tracking-widest uppercase font-medium mb-2">
                        Category
                      </p>
                      <h2 className="font-display text-3xl md:text-4xl text-[#0D1526] tracking-tight">
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="text-[#6B6254] text-base mt-2 max-w-lg">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <span className="hidden sm:block text-[#DDD7CF] text-5xl font-display font-light tabular-nums">
                      {String(services.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Services grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service: Service) => (
                      <article
                        key={service.id}
                        className="group relative flex flex-col bg-white rounded-2xl border border-[#DDD7CF] overflow-hidden hover:border-[#253969]/30 hover:shadow-lg hover:shadow-[#0D1526]/8 transition-all duration-300"
                      >
                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="font-semibold text-[#0D1526] text-base mb-2 group-hover:text-[#253969] transition-colors">
                            {service.name}
                          </h3>
                          {service.short_description && (
                            <p className="text-[#6B6254] text-sm leading-relaxed flex-1">
                              {service.short_description}
                            </p>
                          )}
                          <div className="mt-4 flex items-center justify-between">
                            {service.display_price && (
                              <span className="text-sm font-medium text-[#0D1526]">
                                {service.display_price}
                              </span>
                            )}
                            <div className="flex gap-3 ml-auto">
                              <Link
                                href={`/services/${service.slug}`}
                                className="text-sm text-[#6B6254] hover:text-[#0D1526] transition-colors"
                                aria-label={`View details for ${service.name}`}
                              >
                                Details
                              </Link>
                              <Link
                                href={`/services/${service.slug}/enquiry`}
                                className="flex items-center gap-1.5 text-sm font-medium text-[#B8973E] hover:text-[#8F7230] transition-colors"
                                aria-label={`Request ${service.name}`}
                              >
                                Enquire
                                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
