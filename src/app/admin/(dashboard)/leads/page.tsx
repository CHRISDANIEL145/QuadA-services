import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, Filter, ArrowRight, Phone, Mail, Plus } from 'lucide-react'
import { getLeads, getAdminCategories } from '@/actions/admin'
import { formatDate, LEAD_STATUS_CONFIG, LEAD_PRIORITY_CONFIG } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { LeadFilters } from '@/types'

export const metadata: Metadata = { title: 'Leads' }

interface Props {
  searchParams: Promise<{
    page?: string
    search?: string
    status?: string
    priority?: string
    category?: string
  }>
}

export default async function AdminLeadsPage({ searchParams }: Props) {
  const params = await searchParams

  const filters: LeadFilters = {
    page: Number(params.page) || 1,
    page_size: 25,
    search: params.search || undefined,
    status: (params.status as any) || undefined,
    priority: (params.priority as any) || undefined,
    service_category_id: params.category || undefined,
  }

  const [{ leads, total }, categories] = await Promise.all([
    getLeads(filters),
    getAdminCategories(),
  ])

  const totalPages = Math.ceil(total / (filters.page_size || 25))

  const statusOptions = Object.entries(LEAD_STATUS_CONFIG).map(([key, val]) => ({
    value: key,
    label: val.label,
  }))

  const priorityOptions = Object.entries(LEAD_PRIORITY_CONFIG).map(([key, val]) => ({
    value: key,
    label: val.label,
  }))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#0D1526] mb-1">Leads</h1>
          <p className="text-[#6B6254] text-sm">
            {total} total lead{total !== 1 ? 's' : ''}
            {filters.search ? ` matching "${filters.search}"` : ''}
          </p>
        </div>
        <Link
          href="/admin/leads/new"
          id="new-lead-btn"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0D1526] text-white text-sm font-medium rounded-xl hover:bg-[#1C2D4F] transition-colors"
        >
          <Plus size={14} />
          New Lead
        </Link>
      </div>

      {/* Filters */}
      <form
        method="GET"
        action="/admin/leads"
        className="bg-white rounded-2xl border border-[#E5E9F2] p-4 mb-6 flex flex-wrap gap-3 items-center"
        aria-label="Filter leads"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="search"
            name="search"
            defaultValue={params.search}
            placeholder="Search by name, phone, lead number…"
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E5E9F2] bg-[#F8F9FC] focus:outline-none focus:border-[#253969]/40 focus:bg-white transition-all"
            aria-label="Search leads"
          />
        </div>

        {/* Status filter */}
        <select
          name="status"
          defaultValue={params.status || ''}
          className="py-2.5 px-3.5 text-sm rounded-xl border border-[#E5E9F2] bg-[#F8F9FC] focus:outline-none focus:border-[#253969]/40 cursor-pointer text-[#0D1526]"
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Priority filter */}
        <select
          name="priority"
          defaultValue={params.priority || ''}
          className="py-2.5 px-3.5 text-sm rounded-xl border border-[#E5E9F2] bg-[#F8F9FC] focus:outline-none focus:border-[#253969]/40 cursor-pointer text-[#0D1526]"
          aria-label="Filter by priority"
        >
          <option value="">All Priorities</option>
          {priorityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Category filter */}
        <select
          name="category"
          defaultValue={params.category || ''}
          className="py-2.5 px-3.5 text-sm rounded-xl border border-[#E5E9F2] bg-[#F8F9FC] focus:outline-none focus:border-[#253969]/40 cursor-pointer text-[#0D1526]"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0D1526] text-white text-sm rounded-xl hover:bg-[#1C2D4F] transition-colors"
          aria-label="Apply filters"
        >
          <Filter size={14} aria-hidden="true" />
          Filter
        </button>

        {(params.search || params.status || params.priority || params.category) && (
          <Link
            href="/admin/leads"
            className="text-sm text-[#A89E8E] hover:text-[#6B6254] transition-colors"
            aria-label="Clear all filters"
          >
            Clear
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5E9F2] overflow-hidden">
        {leads.length === 0 ? (
          <div className="text-center py-20 text-[#6B6254]">
            <p className="text-lg font-medium mb-2">No leads found</p>
            <p className="text-sm">
              {filters.search
                ? 'Try adjusting your search or filters.'
                : 'Leads submitted through the website will appear here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Leads table">
              <thead>
                <tr className="border-b border-[#E5E9F2] bg-[#F8F9FC]">
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider">
                    Lead
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider hidden md:table-cell">
                    Service
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider hidden lg:table-cell">
                    Priority
                  </th>
                  <th scope="col" className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6254] uppercase tracking-wider hidden lg:table-cell">
                    Date
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {leads.map((lead: any, i: number) => {
                  const statusConfig = LEAD_STATUS_CONFIG[lead.status as keyof typeof LEAD_STATUS_CONFIG]
                  const priorityConfig = LEAD_PRIORITY_CONFIG[lead.priority as keyof typeof LEAD_PRIORITY_CONFIG]
                  return (
                    <tr
                      key={lead.id}
                      className={cn(
                        'border-b border-[#E5E9F2] hover:bg-[#F8F9FC] transition-colors',
                        i === leads.length - 1 && 'border-b-0'
                      )}
                    >
                      {/* Lead number */}
                      <td className="px-5 py-4">
                        <div className="font-mono text-xs font-medium text-[#B8973E]">
                          {lead.lead_number}
                        </div>
                        {lead.source && (
                          <div className="text-[#A89E8E] text-[10px] mt-0.5 uppercase tracking-wider">
                            {lead.source}
                          </div>
                        )}
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <div className="font-medium text-[#0D1526] text-sm">{lead.customer_name}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1 text-[10px] text-[#A89E8E] hover:text-[#B8973E] transition-colors"
                            aria-label={`Call ${lead.customer_name}`}
                          >
                            <Phone size={10} aria-hidden="true" />
                            {lead.phone}
                          </a>
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="flex items-center gap-1 text-[10px] text-[#A89E8E] hover:text-[#B8973E] transition-colors"
                              aria-label={`Email ${lead.customer_name}`}
                            >
                              <Mail size={10} aria-hidden="true" />
                              <span className="truncate max-w-[120px]">{lead.email}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        {lead.services ? (
                          <div className="text-sm text-[#0D1526]">{lead.services.name}</div>
                        ) : lead.service_categories ? (
                          <div className="text-sm text-[#6B6254]">{lead.service_categories.name}</div>
                        ) : (
                          <span className="text-[#A89E8E] text-sm">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        {statusConfig && (
                          <span
                            className={cn(
                              'inline-flex px-2.5 py-1 rounded-lg text-xs font-medium',
                              statusConfig.bgColor,
                              statusConfig.color
                            )}
                          >
                            {statusConfig.label}
                          </span>
                        )}
                      </td>

                      {/* Priority */}
                      <td className="px-5 py-4 hidden lg:table-cell">
                        {priorityConfig && (
                          <span
                            className={cn(
                              'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium',
                              priorityConfig.bgColor,
                              priorityConfig.color
                            )}
                          >
                            {priorityConfig.label}
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="text-sm text-[#6B6254]">{formatDate(lead.created_at)}</div>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#B8973E] hover:text-[#8F7230] transition-colors group"
                          aria-label={`View lead ${lead.lead_number}`}
                        >
                          View
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-[#E5E9F2] bg-[#F8F9FC]">
            <div className="text-sm text-[#6B6254]">
              Page {filters.page} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              {filters.page! > 1 && (
                <Link
                  href={{
                    pathname: '/admin/leads',
                    query: { ...params, page: filters.page! - 1 },
                  }}
                  className="px-3 py-1.5 text-sm rounded-lg border border-[#E5E9F2] hover:bg-white transition-colors"
                >
                  Previous
                </Link>
              )}
              {filters.page! < totalPages && (
                <Link
                  href={{
                    pathname: '/admin/leads',
                    query: { ...params, page: filters.page! + 1 },
                  }}
                  className="px-3 py-1.5 text-sm rounded-lg border border-[#E5E9F2] hover:bg-white transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
