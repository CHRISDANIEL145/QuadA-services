'use client'

import { Activity } from 'lucide-react'
import { formatRelative, cn } from '@/lib/utils'

interface ActivityItem {
  id: string
  activity_type: string
  description: string
  created_at: string
  admins?: { full_name: string } | null
  metadata?: Record<string, any>
}

interface Props {
  activities: ActivityItem[]
}

const activityTypeConfig: Record<string, { color: string; dot: string }> = {
  LEAD_CREATED: { color: 'text-blue-600', dot: 'bg-blue-500' },
  STATUS_CHANGED: { color: 'text-[#B8973E]', dot: 'bg-[#B8973E]' },
  PRIORITY_CHANGED: { color: 'text-amber-600', dot: 'bg-amber-500' },
  ASSIGNED: { color: 'text-purple-600', dot: 'bg-purple-500' },
  ADMIN_NOTE: { color: 'text-[#253969]', dot: 'bg-[#253969]' },
  CONTACTED: { color: 'text-emerald-600', dot: 'bg-emerald-500' },
  FILE_UPLOADED: { color: 'text-teal-600', dot: 'bg-teal-500' },
}

export function LeadActivity({ activities }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E9F2] p-5">
      <h2 className="font-semibold text-[#0D1526] text-sm mb-5 flex items-center gap-2">
        <Activity size={15} className="text-[#B8973E]" aria-hidden="true" />
        Activity Timeline ({activities.length})
      </h2>

      {activities.length === 0 ? (
        <div className="text-center py-6 text-[#A89E8E] text-sm">
          No activity recorded yet.
        </div>
      ) : (
        <ol className="relative space-y-0" aria-label="Lead activity timeline">
          {activities.map((activity, i) => {
            const config = activityTypeConfig[activity.activity_type] || {
              color: 'text-[#6B6254]',
              dot: 'bg-[#A89E8E]',
            }

            return (
              <li key={activity.id} className="relative flex gap-4 pb-5">
                {/* Timeline line */}
                {i < activities.length - 1 && (
                  <div
                    className="absolute left-[7px] top-4 bottom-0 w-px bg-[#E5E9F2]"
                    aria-hidden="true"
                  />
                )}

                {/* Dot */}
                <div
                  className={cn(
                    'w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 border-2 border-white ring-2 ring-[#E5E9F2]',
                    config.dot
                  )}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0D1526] leading-snug">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {activity.admins && (
                      <span className={cn('text-[10px] font-medium', config.color)}>
                        {activity.admins.full_name}
                      </span>
                    )}
                    <span className="text-[10px] text-[#A89E8E]">
                      {formatRelative(activity.created_at)}
                    </span>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
