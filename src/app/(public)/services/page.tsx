import type { Metadata } from 'next'
import Image from 'next/image'
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
      <div className="bg-navy-900 section-padding border-b border-navy-800" style={{ paddingTop: 'clamp(140px, 15vw, 220px)' }}>
        <div className="container-site">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-cream-200 mb-10" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white">Services</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-relaxed mb-8">
            Our Services
          </h1>
          <p className="text-cream-100 text-sm md:text-lg max-w-2xl leading-relaxed">
            Professional services across 12 categories. Tell us what you need — we'll coordinate the right expert for you.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        {servicesByCategory.length === 0 ? (
          <div className="bg-white section-padding">
            <div className="container-site text-center section-padding">
              <p className="text-navy-500 text-sm md:text-lg tracking-wide uppercase font-semibold mb-6">Services are being loaded. Please check back soon.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-cream-200 text-navy-700 font-semibold text-sm rounded-lg hover:bg-cream-50 hover:text-navy-900 transition-all shadow-sm"
              >
                Contact us directly
              </Link>
            </div>
          </div>
        ) : (
          servicesByCategory.map(({ category, services }, idx) => {
            const isFinancial = category.name === "Financial Solutions & Advisory";
            const bgStyles = [
              'bg-cream-50',
              'bg-white',
              'bg-navy-50/50',
              'bg-cream-100'
            ];
            const boxClass = isFinancial ? 'bg-navy-900' : bgStyles[idx % bgStyles.length];
            const borderClass = isFinancial ? 'border-navy-800' : 'border-cream-200/50';
            
            return (
              <section key={category.id} id={category.slug} className={`section-padding ${boxClass} border-b ${borderClass} last:border-0 relative overflow-hidden`}>
                <div className="container-site relative z-10">
                  {/* Category header */}
                  <div className={`flex items-end justify-between mb-10 pb-6 border-b ${isFinancial ? 'border-navy-800' : 'border-cream-200/60'}`}>
                    <div>

                      <p className={`text-[10px] ${isFinancial ? 'text-cream-200' : 'text-navy-500'} tracking-widest uppercase font-semibold mb-3`}>
                        Category
                      </p>
                      <h2 className={`text-3xl md:text-4xl font-bold ${isFinancial ? 'text-white' : 'text-navy-900'} tracking-tight`}>
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className={`${isFinancial ? 'text-cream-100' : 'text-navy-600'} text-sm md:text-base mt-4 max-w-2xl leading-relaxed`}>
                          {category.description}
                        </p>
                      )}
                    </div>
                    <span className={`hidden sm:block ${isFinancial ? 'text-white/10' : 'text-navy-900/10'} text-5xl md:text-7xl font-bold tabular-nums -mb-4 tracking-tighter`}>
                      {String(services.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Services grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service: Service) => (
                      <article
                        key={service.id}
                        className="group relative flex flex-col bg-white border border-cream-200 rounded-xl overflow-hidden hover:border-navy-300 transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col flex-1 z-10 relative">
                          <h3 className="font-bold text-navy-900 text-xl mb-3 group-hover:text-navy-700 transition-colors duration-300">
                            {service.name}
                          </h3>
                          {service.short_description && (
                            <p className="text-navy-600 text-sm leading-relaxed flex-1 mb-8">
                              {service.short_description}
                            </p>
                          )}
                          <div className="mt-auto flex items-center justify-between border-t border-cream-100 pt-5 group-hover:border-cream-200 transition-colors duration-300">
                            {service.display_price && (
                              <span className="text-xs font-semibold tracking-wide text-navy-700">
                                {service.display_price}
                              </span>
                            )}
                            <div className="flex gap-4 ml-auto items-center">
                              <Link
                                href={`/services/${service.slug}`}
                                className="text-[10px] uppercase tracking-wider font-semibold text-navy-500 hover:text-navy-900 transition-colors"
                                aria-label={`View details for ${service.name}`}
                              >
                                Details
                              </Link>
                              <Link
                                href={`/services/${service.slug}/enquiry`}
                                className="flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-navy-600 transition-colors"
                                aria-label={`Request ${service.name}`}
                              >
                                Enquire
                                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );
          })
        )}
      </div>
    </>
  )
}
