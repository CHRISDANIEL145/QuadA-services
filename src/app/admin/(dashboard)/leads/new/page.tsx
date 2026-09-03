import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { createServiceRoleClient } from '@/lib/supabase/admin'
import { getAdmins } from '@/actions/admin'
import { ManualLeadForm } from '@/components/admin/ManualLeadForm'

export const metadata: Metadata = { title: 'New Lead' }

export default async function NewLeadPage() {
  const adminClient = createServiceRoleClient()

  const [{ data: categories }, { data: services }, admins] = await Promise.all([
    adminClient
      .from('service_categories')
      .select('id, name')
      .eq('is_active', true)
      .order('sort_order'),
    adminClient
      .from('services')
      .select('id, name, category_id')
      .eq('is_active', true)
      .order('name'),
    getAdmins(),
  ])

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#A89E8E] mb-5" aria-label="Breadcrumb">
        <Link href="/admin" className="hover:text-[#0D1526] transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <Link href="/admin/leads" className="hover:text-[#0D1526] transition-colors">Leads</Link>
        <ChevronRight size={12} />
        <span className="text-[#0D1526] font-medium">New Lead</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0D1526] mb-1">Create New Lead</h1>
        <p className="text-[#6B6254] text-sm">
          Manually enter a lead received via phone call, walk-in, or referral.
        </p>
      </div>

      <ManualLeadForm
        categories={categories || []}
        services={(services || []).map((s: any) => ({ ...s, category_id: s.category_id }))}
        admins={admins as any}
      />
    </div>
  )
}
