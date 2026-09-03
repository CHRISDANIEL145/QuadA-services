import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Shield, User, Mail, Key, Users } from 'lucide-react'
import { createServiceRoleClient } from '@/lib/supabase/admin'
import { getCurrentAdmin } from '@/actions/admin'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Settings' }

export default async function AdminSettingsPage() {
  const [currentAdmin, adminClient] = await Promise.all([
    getCurrentAdmin(),
    Promise.resolve(createServiceRoleClient()),
  ])

  const { data: allAdmins } = await adminClient
    .from('admins')
    .select('id, full_name, email, role, is_active, created_at')
    .order('created_at', { ascending: true })

  const admins = allAdmins || []

  const roleLabel = (role: string) =>
    role?.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Admin'

  const roleBadge = (role: string) => {
    if (role === 'super_admin') return 'bg-amber-50 text-amber-700 border border-amber-100'
    if (role === 'manager') return 'bg-violet-50 text-violet-700 border border-violet-100'
    return 'bg-blue-50 text-blue-700 border border-blue-100'
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#A89E8E] mb-5" aria-label="Breadcrumb">
        <Link href="/admin" className="hover:text-[#0D1526] transition-colors">Dashboard</Link>
        <ChevronRight size={12} />
        <span className="text-[#0D1526] font-medium">Settings</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0D1526] mb-1">Settings</h1>
        <p className="text-[#6B6254] text-sm">Manage your admin profile and team access.</p>
      </div>

      <div className="space-y-6">
        {/* Admin Profile */}
        <div className="bg-white rounded-2xl border border-[#E5E9F2] p-6">
          <h2 className="font-semibold text-[#0D1526] text-sm mb-5 flex items-center gap-2">
            <User size={15} className="text-[#B8973E]" />
            Your Profile
          </h2>
          {currentAdmin ? (
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <div className="text-[10px] text-[#A89E8E] uppercase tracking-wider mb-1">Full Name</div>
                <div className="text-sm font-medium text-[#0D1526]">{currentAdmin.full_name}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#A89E8E] uppercase tracking-wider mb-1">Email</div>
                <div className="flex items-center gap-1.5">
                  <Mail size={12} className="text-[#A89E8E]" />
                  <span className="text-sm text-[#0D1526] break-all">{currentAdmin.email}</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] text-[#A89E8E] uppercase tracking-wider mb-1">Role</div>
                <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium ${roleBadge(currentAdmin.role)}`}>
                  <Shield size={10} className="inline mr-1" />
                  {roleLabel(currentAdmin.role)}
                </span>
              </div>
              <div>
                <div className="text-[10px] text-[#A89E8E] uppercase tracking-wider mb-1">Member Since</div>
                <div className="text-sm text-[#6B6254]">{formatDate(currentAdmin.created_at)}</div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#A89E8E]">Could not load profile information.</p>
          )}
        </div>

        {/* Password / Security */}
        <div className="bg-white rounded-2xl border border-[#E5E9F2] p-6">
          <h2 className="font-semibold text-[#0D1526] text-sm mb-4 flex items-center gap-2">
            <Key size={15} className="text-[#B8973E]" />
            Security
          </h2>
          <div className="flex items-center justify-between p-4 bg-[#F8F9FC] rounded-xl border border-[#E5E9F2]">
            <div>
              <div className="text-sm font-medium text-[#0D1526]">Password</div>
              <div className="text-xs text-[#A89E8E] mt-0.5">Managed through Supabase Auth</div>
            </div>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-medium text-[#0D1526] border border-[#E5E9F2] rounded-xl hover:bg-white transition-colors"
            >
              Change Password
            </a>
          </div>
        </div>

        {/* Admin Team */}
        <div className="bg-white rounded-2xl border border-[#E5E9F2] p-6">
          <h2 className="font-semibold text-[#0D1526] text-sm mb-5 flex items-center gap-2">
            <Users size={15} className="text-[#B8973E]" />
            Admin Team ({admins.length})
          </h2>
          {admins.length === 0 ? (
            <div className="text-center py-8 text-[#A89E8E] text-sm">No admin accounts found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" role="table" aria-label="Admin team table">
                <thead>
                  <tr className="border-b border-[#E5E9F2]">
                    <th scope="col" className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#A89E8E] uppercase tracking-wider">Name</th>
                    <th scope="col" className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#A89E8E] uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th scope="col" className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#A89E8E] uppercase tracking-wider">Role</th>
                    <th scope="col" className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#A89E8E] uppercase tracking-wider">Status</th>
                    <th scope="col" className="text-left py-2.5 px-3 text-[10px] font-semibold text-[#A89E8E] uppercase tracking-wider hidden md:table-cell">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin: any) => (
                    <tr key={admin.id} className="border-b border-[#E5E9F2] last:border-b-0 hover:bg-[#F8F9FC] transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#253969] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                            {admin.full_name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-[#0D1526]">{admin.full_name}</span>
                          {currentAdmin?.id === admin.id && (
                            <span className="text-[10px] text-[#B8973E] font-medium">(you)</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 hidden sm:table-cell">
                        <span className="text-xs text-[#6B6254]">{admin.email}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${roleBadge(admin.role)}`}>
                          {roleLabel(admin.role)}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                          admin.is_active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}>
                          {admin.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-3 hidden md:table-cell">
                        <span className="text-xs text-[#A89E8E]">{formatDate(admin.created_at)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-[#E5E9F2]">
            <p className="text-xs text-[#A89E8E]">
              To add or deactivate admin accounts, use the Supabase dashboard and insert a record into the <code className="font-mono bg-[#F8F9FC] px-1 py-0.5 rounded">admins</code> table linked to an auth user.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
