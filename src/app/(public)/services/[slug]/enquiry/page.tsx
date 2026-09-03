import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getServiceBySlug, getPublicCategories, getPublicServices } from '@/actions/public'
import { EnquiryForm } from '@/components/forms/EnquiryForm'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Service Not Found' }
  
  const desc = `Submit your enquiry for ${service.name}. Our team will review your requirement and contact you within one business day.`
  
  return {
    title: `Enquiry — ${service.name}`,
    description: desc,
    openGraph: {
      title: `Enquiry — ${service.name} | Quad A Life Assist Connect 360°`,
      description: desc,
      type: 'website',
    },
    robots: { index: false, follow: false },
  }
}

export default async function ServiceEnquiryPage({ params }: Props) {
  const { slug } = await params
  const [service, categories, services] = await Promise.all([
    getServiceBySlug(slug),
    getPublicCategories(),
    getPublicServices(),
  ])

  if (!service) notFound()

  const category = (service as any).service_categories
  const categorySlug: string | null = category?.slug || null

  return (
    <>
      {/* Header */}
      <div className="bg-[#0D1526] section-padding">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
            <ChevronRight size={12} />
            <Link href={`/services/${slug}`} className="hover:text-white/70 transition-colors">
              {service.name}
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/60">Enquiry</span>
          </nav>

          <h1 className="font-display text-3xl md:text-5xl text-white tracking-tight leading-tight mb-3">
            Request: {service.name}
          </h1>
          <p className="text-white/50 max-w-xl">
            Fill in the details below. Our team will review your requirement and contact you within one business day.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-[#FAFAF8] section-padding">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-[#DDD7CF] p-8">
                <EnquiryForm
                  service={service as any}
                  category={category}
                  categories={categories as any}
                  services={services as any}
                />
              </div>
            </div>

            {/* Info sidebar */}
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#0D1526]/[0.03] border border-[#DDD7CF] p-6">
                <h2 className="font-display text-lg text-[#0D1526] mb-4">
                  What happens next?
                </h2>
                <ol className="space-y-4" role="list">
                  {[
                    { num: '1', text: 'We receive and review your enquiry' },
                    { num: '2', text: 'Our team calls you to discuss the requirement' },
                    { num: '3', text: 'We match you with the right professional' },
                    { num: '4', text: 'Service is scheduled at your convenience' },
                    { num: '5', text: 'Follow-up to confirm your satisfaction' },
                  ].map((step) => (
                    <li key={step.num} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#B8973E] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                        {step.num}
                      </span>
                      <span className="text-[#6B6254] text-sm">{step.text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-[#DDD7CF] p-6 bg-white">
                <h3 className="font-medium text-[#0D1526] text-sm mb-3">Need help?</h3>
                <p className="text-[#6B6254] text-xs leading-relaxed mb-4">
                  Prefer to speak with someone? Call us directly and we'll help you place your enquiry.
                </p>
                <a
                  href="tel:+919655955777"
                  className="block text-center py-2.5 border border-[#DDD7CF] rounded-xl text-sm text-[#0D1526] hover:bg-[#F5F2EE] transition-colors"
                >
                  +91 96559 55777
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
