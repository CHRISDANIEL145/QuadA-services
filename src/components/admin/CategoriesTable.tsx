'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit2, CheckCircle2, XCircle, Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { deleteCategories } from '@/actions/admin'
import { toast } from 'react-hot-toast'

interface CategoriesTableProps {
  categories: any[]
}

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)

  const toggleAll = () => {
    if (selectedIds.length === categories.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(categories.map((c) => c.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleDelete = async () => {
    if (selectedIds.length === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} categor(ies)? WARNING: This will also permanently delete all services inside these categories!`)) return

    setIsDeleting(true)
    try {
      const res = await deleteCategories(selectedIds)
      if (res.success) {
        toast.success(`Successfully deleted ${selectedIds.length} categor(ies)`)
        setSelectedIds([])
        router.refresh()
      } else {
        toast.error(res.error || 'Failed to delete categories')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#0D1526] mb-1">Categories</h1>
          <p className="text-[#6B6254] text-sm">
            Manage your service categories.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-20">
          {selectedIds.length > 0 && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <Trash2 size={16} />
              {isDeleting ? 'Deleting...' : `Delete Selected (${selectedIds.length})`}
            </button>
          )}
          <Link
            href="/admin/categories/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0D1526] text-white text-sm font-medium rounded-xl hover:bg-[#1C2D4F] transition-colors"
          >
            <Plus size={16} />
            Add Category
          </Link>
        </div>
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
                  <th scope="col" className="px-5 py-3.5 w-12 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-[#E5E9F2] text-[#0D1526] focus:ring-[#0D1526]"
                      checked={selectedIds.length === categories.length && categories.length > 0}
                      onChange={toggleAll}
                      aria-label="Select all categories"
                    />
                  </th>
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
                      i === categories.length - 1 && 'border-b-0',
                      selectedIds.includes(cat.id) && 'bg-[#F8F9FC]'
                    )}
                  >
                    <td className="px-5 py-4 text-center">
                      <input
                        type="checkbox"
                        className="rounded border-[#E5E9F2] text-[#0D1526] focus:ring-[#0D1526]"
                        checked={selectedIds.includes(cat.id)}
                        onChange={() => toggleSelect(cat.id)}
                        aria-label={`Select ${cat.name}`}
                      />
                    </td>
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
    </>
  )
}
