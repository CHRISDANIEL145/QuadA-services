import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { getDashboardStats, getRecentActivities } from '@/actions/admin'
import { formatRelative } from '@/lib/utils'
import { LEAD_STATUS_CONFIG } from '@/lib/utils'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function AdminDashboardPage() {
  const [stats, recentActivities] = await Promise.all([
    getDashboardStats(),
    getRecentActivities(8),
  ])

  const kpis = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-[#253969]', bg: 'bg-[#EEF4FB]' },
    { label: 'New', value: stats.new, icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'In Progress', value: stats.contacted + stats.qualified + stats.site_visit + stats.quotation + stats.follow_up, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Converted', value: stats.converted + stats.completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]

  const conversionRate = stats.total > 0
    ? Math.round(((stats.converted + stats.completed) / stats.total) * 100)
    : 0

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0D1526] mb-1">Dashboard</h1>
        <p className="text-[#6B6254] text-sm">Overview of your lead management system.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl border border-[#E5E9F2] p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon size={17} className={kpi.color} aria-hidden="true" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-[#0D1526] mb-1 tabular-nums">
              {kpi.value}
            </div>
            <div className="text-sm text-[#6B6254]">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Lead Status Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E9F2] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-[#0D1526]">Lead Pipeline</h2>
            <Link
              href="/admin/leads"
              className="text-xs text-[#B8973E] hover:text-[#8F7230] transition-colors flex items-center gap-1"
            >
              View all <ArrowRight size={11} />
            </Link>
          </div>

          {stats.total === 0 ? (
            <div className="text-center py-10 text-[#6B6254]">
              <Users size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No leads yet. Enquiries will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {(
                [
                  { status: 'NEW', count: stats.new },
                  { status: 'CONTACTED', count: stats.contacted },
                  { status: 'QUALIFIED', count: stats.qualified },
                  { status: 'SITE_VISIT', count: stats.site_visit },
                  { status: 'QUOTATION', count: stats.quotation },
                  { status: 'FOLLOW_UP', count: 0 },
                  { status: 'CONVERTED', count: stats.converted },
                  { status: 'COMPLETED', count: stats.completed },
                  { status: 'LOST', count: stats.lost },
                ] as { status: keyof typeof LEAD_STATUS_CONFIG; count: number }[]
              ).filter(({ count }) => count > 0).map(({ status, count }) => {
                const config = LEAD_STATUS_CONFIG[status]
                const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0
                return (
                  <div key={status} className="flex items-center gap-3">
                    <div className={`text-xs font-medium px-2 py-1 rounded-lg ${config.bgColor} ${config.color} w-24 text-center shrink-0`}>
                      {config.label}
                    </div>
                    <div className="flex-1 h-2 bg-[#F5F2EE] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#253969] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                        role="progressbar"
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${config.label}: ${pct}%`}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#0D1526] w-8 text-right tabular-nums">
                      {count}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {stats.total > 0 && (
            <div className="mt-6 pt-5 border-t border-[#E5E9F2] flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-500" />
              <span className="text-sm text-[#6B6254]">
                Conversion rate: <strong className="text-[#0D1526]">{conversionRate}%</strong>
              </span>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-[#E5E9F2] p-6">
          <h2 className="font-semibold text-[#0D1526] mb-6">Recent Activity</h2>

          {recentActivities.length === 0 ? (
            <div className="text-center py-8 text-[#6B6254]">
              <p className="text-sm">No activity yet.</p>
            </div>
          ) : (
            <ol className="space-y-4" aria-label="Recent activities">
              {recentActivities.map((activity: any) => (
                <li key={activity.id} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B8973E] mt-2 shrink-0" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0D1526] leading-snug">
                      {activity.description}
                    </p>
                    {activity.leads && (
                      <Link
                        href={`/admin/leads/${activity.lead_id}`}
                        className="text-xs text-[#B8973E] hover:underline"
                      >
                        {activity.leads.lead_number}
                      </Link>
                    )}
                    <p className="text-xs text-[#A89E8E] mt-0.5">
                      {formatRelative(activity.created_at)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: '/admin/leads', label: 'Manage Leads', desc: 'Search, filter and update leads' },
          { href: '/admin/services', label: 'Manage Services', desc: 'Add, edit or deactivate services' },
          { href: '/admin/categories', label: 'Categories', desc: 'Organise your service categories' },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-[#E5E9F2] hover:border-[#253969]/30 hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="font-medium text-[#0D1526] text-sm">{action.label}</div>
              <div className="text-[#A89E8E] text-xs mt-0.5">{action.desc}</div>
            </div>
            <ArrowRight size={16} className="text-[#A89E8E] group-hover:text-[#0D1526] group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  )
}
