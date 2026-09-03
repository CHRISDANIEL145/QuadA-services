'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit2, CheckCircle2, XCircle, Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { deleteServices } from '@/actions/admin'
import { toast } from 'react-hot-toast'

interface ServicesTableProps {
  services: any[]
}

export default function ServicesTable({ services }: ServicesTableProps) {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)

  const toggleAll = () => {
    if (selectedIds.length === services.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(services.map((s) => s.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleDelete = async () => {
    if (selectedIds.length === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} service(s)?`)) return

    setIsDeleting(true)
    try {
      const res = await deleteServices(selectedIds)
      if (res.success) {
        toast.success(`Successfully deleted ${selectedIds.length} service(s)`)
        setSelectedIds([])
        router.refresh()
      } else {
        toast.error(res.error || 'Failed to delete services')
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
          <h1 className="text-2xl font-semibold text-[#0D1526] mb-1">Services</h1>
          <p className="text-[#6B6254] text-sm">
            Manage your service offerings and pricing.
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
            href="/admin/services/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0D1526] text-white text-sm font-medium rounded-xl hover:bg-[#1C2D4F] transition-colors"
          >
            <Plus size={16} />
            Add Service
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E9F2] overflow-hidden">
        {services.length === 0 ? (
          <div className="text-center py-20 text-[#6B6254]">
            <p className="text-lg font-medium mb-2">No services found</p>
            <p className="text-sm">Create your first service to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Services table">
              <thead>
                <tr className="border-b border-[#E5E9F2] bg-[#F8F9FC]">
                  <th scope="col" className="px-5 py-3.5 w-12 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-[#E5E9F2] text-[#0D1526] focus:ring-[#0D1526]"
                      checked={selectedIds.length === services.length && services.length > 0}
                      onChange={toggleAll}
                      aria-label="Select all services"
                    />
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider w-16">
                    Sort
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider hidden md:table-cell">
                    Category
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider">
                    Price
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
                {services.map((service: any, i: number) => (
                  <tr
                    key={service.id}
                    className={cn(
                      'border-b border-[#E5E9F2] hover:bg-[#F8F9FC] transition-colors',
                      i === services.length - 1 && 'border-b-0',
                      selectedIds.includes(service.id) && 'bg-[#F8F9FC]'
                    )}
                  >
                    <td className="px-5 py-4 text-center">
                      <input
                        type="checkbox"
                        className="rounded border-[#E5E9F2] text-[#0D1526] focus:ring-[#0D1526]"
                        checked={selectedIds.includes(service.id)}
                        onChange={() => toggleSelect(service.id)}
                        aria-label={`Select ${service.name}`}
                      />
                    </td>
                    <td className="px-5 py-4 text-sm text-[#A89E8E] font-mono">
                      {service.sort_order}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-[#0D1526] text-sm">{service.name}</div>
                      <div className="text-xs text-[#A89E8E] mt-0.5 font-mono">{service.slug}</div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-sm text-[#6B6254]">
                      {service.service_categories?.name || '—'}
                    </td>
                    <td className="px-5 py-4 text-sm text-[#0D1526]">
                      {service.display_price || '—'}
                      {service.pricing_type && (
                        <span className="block text-[10px] text-[#A89E8E] uppercase tracking-wider mt-0.5">
                          {service.pricing_type}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {service.is_active ? (
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
                        href={`/admin/services/${service.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B8973E] hover:text-[#8F7230] transition-colors"
                        aria-label={`Edit ${service.name}`}
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
