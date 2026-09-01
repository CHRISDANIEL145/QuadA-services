import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getAdminCategories } from '@/actions/admin'
import { createServiceRoleClient } from '@/lib/supabase/admin'
import { ServiceForm } from '@/components/admin/ServiceForm'

export const metadata: Metadata = { title: 'Edit Service' }

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditServicePage({ params }: Props) {
  const { id } = await params
  const adminClient = createServiceRoleClient()

  const [{ data: service, error }, categories] = await Promise.all([
    adminClient.from('services').select('*').eq('id', id).single(),
    getAdminCategories(),
  ])

  if (error || !service) notFound()

  return (
    <div className="p-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#A89E8E] mb-6" aria-label="Breadcrumb">
        <Link href="/admin" className="hover:text-[#0D1526] transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <Link href="/admin/services" className="hover:text-[#0D1526] transition-colors">Services</Link>
        <ChevronRight size={12} />
        <span className="text-[#0D1526] font-medium">{service.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0D1526] mb-1">Edit Service</h1>
        <p className="text-[#6B6254] text-sm font-mono">
          {service.slug}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E9F2] p-6 md:p-8">
        <ServiceForm categories={categories} initialData={service} />
      </div>
    </div>
  )
}
