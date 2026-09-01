'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { updateLead } from '@/actions/admin'
import { LEAD_STATUS_CONFIG, LEAD_PRIORITY_CONFIG, cn } from '@/lib/utils'
import type { Lead, Admin } from '@/types'

interface Props {
  lead: Lead & { admins?: Admin | null }
  admins: Pick<Admin, 'id' | 'full_name' | 'role'>[]
}

export function LeadEditPanel({ lead, admins }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(lead.status)
  const [priority, setPriority] = useState(lead.priority)
  const [assignedTo, setAssignedTo] = useState(lead.assigned_to || '')
  const router = useRouter()

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      const result = await updateLead(lead.id, {
        status,
        priority,
        assigned_to: assignedTo || null,
      })
      if (result.success) {
        toast.success('Lead updated successfully')
        router.refresh()
      } else {
        toast.error(result.error || 'Update failed.')
      }
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9F2] p-5">
      <h2 className="font-semibold text-[#0D1526] text-sm mb-4">Pipeline Management</h2>

      <div className="space-y-4">
        {/* Status */}
        <div>
          <label htmlFor={`status-${lead.id}`} className="text-xs text-[#A89E8E] uppercase tracking-wider block mb-1.5">
            Status
          </label>
          <select
            id={`status-${lead.id}`}
            value={status}
            onChange={(e) => setStatus(e.target.value as Lead['status'])}
            className="w-full py-2 px-3 text-sm rounded-xl border border-[#E5E9F2] bg-[#F8F9FC] focus:outline-none focus:border-[#253969]/40 focus:bg-white transition-all cursor-pointer"
          >
            {Object.entries(LEAD_STATUS_CONFIG).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor={`priority-${lead.id}`} className="text-xs text-[#A89E8E] uppercase tracking-wider block mb-1.5">
            Priority
          </label>
          <select
            id={`priority-${lead.id}`}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Lead['priority'])}
            className="w-full py-2 px-3 text-sm rounded-xl border border-[#E5E9F2] bg-[#F8F9FC] focus:outline-none focus:border-[#253969]/40 focus:bg-white transition-all cursor-pointer"
          >
            {Object.entries(LEAD_PRIORITY_CONFIG).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>

        {/* Assign to */}
        {admins.length > 0 && (
          <div>
            <label htmlFor={`assign-${lead.id}`} className="text-xs text-[#A89E8E] uppercase tracking-wider block mb-1.5">
              Assigned To
            </label>
            <select
              id={`assign-${lead.id}`}
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full py-2 px-3 text-sm rounded-xl border border-[#E5E9F2] bg-[#F8F9FC] focus:outline-none focus:border-[#253969]/40 focus:bg-white transition-all cursor-pointer"
            >
              <option value="">Unassigned</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.full_name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className={cn(
            'w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
            isSubmitting
              ? 'bg-[#E5E9F2] text-[#A89E8E] cursor-not-allowed'
              : 'bg-[#0D1526] text-white hover:bg-[#1C2D4F]'
          )}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              Saving…
            </span>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  )
}
