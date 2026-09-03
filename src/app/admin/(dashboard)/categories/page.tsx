import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getAdminCategories } from '@/actions/admin'
import CategoriesTable from '@/components/admin/CategoriesTable'

export const metadata: Metadata = { title: 'Categories' }

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories()

  return (
    <div className="p-8">
      <CategoriesTable categories={categories} />
    </div>
  )
}
