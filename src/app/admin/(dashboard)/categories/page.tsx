import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Edit2, CheckCircle2, XCircle } from 'lucide-react'
import { getAdminCategories } from '@/actions/admin'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Categories' }

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#0D1526] mb-1">Categories</h1>
          <p className="text-[#6B6254] text-sm">
            Manage your service categories.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0D1526] text-white text-sm font-medium rounded-xl hover:bg-[#1C2D4F] transition-colors"
        >
          <Plus size={16} />
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E9F2] overflow-hidden">
        {categories.length === 0 ? (
          <div className="text-center py-20 text-[#6B6254]">
            <p className="text-lg font-medium mb-2">No categories found</p>
            <p className="text-sm">Create your first category to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b border-[#E5E9F2] bg-[#F8F9FC]">
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider w-16">
                    Sort
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {categories.map((cat: any, i: number) => (
                  <tr
                    key={cat.id}
                    className={cn(
                      'border-b border-[#E5E9F2] hover:bg-[#F8F9FC] transition-colors',
                      i === categories.length - 1 && 'border-b-0'
                    )}
                  >
                    <td className="px-5 py-4 text-sm text-[#A89E8E] font-mono">
                      {cat.sort_order}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-[#0D1526] text-sm">{cat.name}</div>
                      <div className="text-xs text-[#A89E8E] mt-0.5 font-mono">{cat.slug}</div>
                    </td>
                    <td className="px-5 py-4">
                      {cat.is_active ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          <CheckCircle2 size={12} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg">
                          <XCircle size={12} /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/categories/${cat.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B8973E] hover:text-[#8F7230] transition-colors"
                      >
                        <Edit2 size={13} /> Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
