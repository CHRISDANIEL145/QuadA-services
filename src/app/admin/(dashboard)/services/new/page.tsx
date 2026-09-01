import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getAdminCategories } from '@/actions/admin'
import { ServiceForm } from '@/components/admin/ServiceForm'

export const metadata: Metadata = { title: 'Add Service' }

export default async function NewServicePage() {
  const categories = await getAdminCategories()

  return (
    <div className="p-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#A89E8E] mb-6" aria-label="Breadcrumb">
        <Link href="/admin" className="hover:text-[#0D1526] transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <Link href="/admin/services" className="hover:text-[#0D1526] transition-colors">Services</Link>
        <ChevronRight size={12} />
        <span className="text-[#0D1526] font-medium">Add New</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0D1526] mb-1">Add Service</h1>
        <p className="text-[#6B6254] text-sm">
          Create a new service offering.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E9F2] p-6 md:p-8">
        <ServiceForm categories={categories} />
      </div>
    </div>
  )
}
