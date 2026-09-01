import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { createServiceRoleClient } from '@/lib/supabase/admin'
import { CategoryForm } from '@/components/admin/CategoryForm'

export const metadata: Metadata = { title: 'Edit Category' }

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params
  const adminClient = createServiceRoleClient()

  const { data: category, error } = await adminClient
    .from('service_categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !category) notFound()

  return (
    <div className="p-8 max-w-4xl">
      <nav className="flex items-center gap-2 text-xs text-[#A89E8E] mb-6" aria-label="Breadcrumb">
        <Link href="/admin" className="hover:text-[#0D1526] transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <Link href="/admin/categories" className="hover:text-[#0D1526] transition-colors">Categories</Link>
        <ChevronRight size={12} />
        <span className="text-[#0D1526] font-medium">{category.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0D1526] mb-1">Edit Category</h1>
        <p className="text-[#6B6254] text-sm font-mono">{category.slug}</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E9F2] p-6 md:p-8">
        <CategoryForm initialData={category} />
      </div>
    </div>
  )
}
