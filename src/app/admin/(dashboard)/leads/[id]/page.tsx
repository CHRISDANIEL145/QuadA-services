import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Phone, Mail, MapPin, Calendar, Clock, FileText } from 'lucide-react'
import { getLead, getLeadActivities, getLeadNotes, getLeadAttachments, getAdmins } from '@/actions/admin'
import { LeadEditPanel } from '@/components/admin/LeadEditPanel'
import { LeadNotes } from '@/components/admin/LeadNotes'
import { LeadActivity } from '@/components/admin/LeadActivity'
import { formatDate, formatRelative, LEAD_STATUS_CONFIG, LEAD_PRIORITY_CONFIG, cn } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const lead = await getLead(id)
  if (!lead) return { title: 'Lead Not Found' }
  return { title: `${lead.lead_number} — ${lead.customer_name}` }
}

export default async function AdminLeadDetailPage({ params }: Props) {
  const { id } = await params
  const [lead, activities, notes, attachments, admins] = await Promise.all([
    getLead(id),
    getLeadActivities(id),
    getLeadNotes(id),
    getLeadAttachments(id),
    getAdmins(),
  ])

  if (!lead) notFound()

  const statusConfig = LEAD_STATUS_CONFIG[(lead as any).status as keyof typeof LEAD_STATUS_CONFIG]
  const priorityConfig = LEAD_PRIORITY_CONFIG[(lead as any).priority as keyof typeof LEAD_PRIORITY_CONFIG]

  return (
    <div className="p-8">
      {/* Breadcrumb + Header */}
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-xs text-[#A89E8E] mb-4" aria-label="Breadcrumb">
          <Link href="/admin" className="hover:text-[#0D1526] transition-colors">Dashboard</Link>
          <ChevronRight size={12} />
          <Link href="/admin/leads" className="hover:text-[#0D1526] transition-colors">Leads</Link>
          <ChevronRight size={12} />
          <span className="text-[#0D1526] font-mono">{(lead as any).lead_number}</span>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-[#0D1526]">
                {(lead as any).customer_name}
              </h1>
              {statusConfig && (
                <span className={cn('px-2.5 py-1 rounded-lg text-xs font-medium', statusConfig.bgColor, statusConfig.color)}>
                  {statusConfig.label}
                </span>
              )}
              {priorityConfig && (
                <span className={cn('px-2 py-0.5 rounded-md text-xs font-medium', priorityConfig.bgColor, priorityConfig.color)}>
                  {priorityConfig.label}
                </span>
              )}
            </div>
            <div className="font-mono text-sm text-[#B8973E]">{(lead as any).lead_number}</div>
          </div>

          <div className="flex items-center gap-3 text-sm text-[#6B6254]">
            <Clock size={13} aria-hidden="true" />
            <span>Received {formatRelative((lead as any).created_at)}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT — Lead info + Edit */}
        <div className="lg:col-span-1 space-y-5">
          {/* Customer info */}
          <div className="bg-white rounded-2xl border border-[#E5E9F2] p-5">
            <h2 className="font-semibold text-[#0D1526] text-sm mb-4">Customer Details</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Phone size={14} className="text-[#B8973E] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-[10px] text-[#A89E8E] uppercase tracking-wider">Phone</div>
                  <a href={`tel:${(lead as any).phone}`} className="text-sm text-[#0D1526] hover:text-[#B8973E] transition-colors font-medium">
                    {(lead as any).phone}
                  </a>
                </div>
              </div>
              {(lead as any).email && (
                <div className="flex items-start gap-2.5">
                  <Mail size={14} className="text-[#B8973E] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-[10px] text-[#A89E8E] uppercase tracking-wider">Email</div>
                    <a href={`mailto:${(lead as any).email}`} className="text-sm text-[#0D1526] hover:text-[#B8973E] transition-colors break-all">
                      {(lead as any).email}
                    </a>
                  </div>
                </div>
              )}
              {(lead as any).location && (
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-[#B8973E] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-[10px] text-[#A89E8E] uppercase tracking-wider">Location</div>
                    <span className="text-sm text-[#0D1526]">{(lead as any).location}</span>
                  </div>
                </div>
              )}
              {(lead as any).preferred_date && (
                <div className="flex items-start gap-2.5">
                  <Calendar size={14} className="text-[#B8973E] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-[10px] text-[#A89E8E] uppercase tracking-wider">Preferred Date</div>
                    <span className="text-sm text-[#0D1526]">{formatDate((lead as any).preferred_date)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Requirement */}
          {(lead as any).requirement && (
            <div className="bg-white rounded-2xl border border-[#E5E9F2] p-5">
              <h2 className="font-semibold text-[#0D1526] text-sm mb-3 flex items-center gap-2">
                <FileText size={14} className="text-[#B8973E]" aria-hidden="true" />
                Requirement
              </h2>
              <p className="text-sm text-[#6B6254] leading-relaxed whitespace-pre-wrap">
                {(lead as any).requirement}
              </p>
              {(lead as any).budget && (
                <div className="mt-3 pt-3 border-t border-[#E5E9F2]">
                  <span className="text-xs text-[#A89E8E] uppercase tracking-wider">Budget</span>
                  <p className="text-sm text-[#0D1526] font-medium mt-0.5">{(lead as any).budget}</p>
                </div>
              )}
            </div>
          )}

          {/* Service info */}
          {((lead as any).services || (lead as any).service_categories) && (
            <div className="bg-white rounded-2xl border border-[#E5E9F2] p-5">
              <h2 className="font-semibold text-[#0D1526] text-sm mb-3">Service Requested</h2>
              {(lead as any).service_categories && (
                <div className="text-xs text-[#A89E8E] uppercase tracking-wider mb-1">Category</div>
              )}
              {(lead as any).service_categories && (
                <p className="text-sm text-[#6B6254] mb-2">{(lead as any).service_categories.name}</p>
              )}
              {(lead as any).services && (
                <>
                  <div className="text-xs text-[#A89E8E] uppercase tracking-wider mb-1">Service</div>
                  <p className="text-sm font-medium text-[#0D1526]">{(lead as any).services.name}</p>
                </>
              )}
            </div>
          )}

          {/* Lead Edit Panel (client component) */}
          <LeadEditPanel lead={lead as any} admins={admins as any} />

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E5E9F2] p-5">
              <h2 className="font-semibold text-[#0D1526] text-sm mb-4">
                Attachments ({attachments.length})
              </h2>
              <ul className="space-y-2" role="list">
                {attachments.map((att: any) => (
                  <li key={att.id} className="flex items-center gap-2.5 text-sm">
                    <FileText size={13} className="text-[#B8973E] shrink-0" aria-hidden="true" />
                    <span className="flex-1 truncate text-[#0D1526]">{att.file_name}</span>
                    <span className="text-[10px] text-[#A89E8E] shrink-0">
                      {Math.round(att.file_size / 1024)}KB
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT — Notes + Activity */}
        <div className="lg:col-span-2 space-y-5">
          <LeadNotes leadId={id} notes={notes as any} />
          <LeadActivity activities={activities as any} />
        </div>
      </div>
    </div>
  )
}
