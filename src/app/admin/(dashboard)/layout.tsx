import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/actions/admin'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      {/* Sidebar */}
      <AdminSidebar admin={admin} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main
          id="admin-main"
          className="flex-1 overflow-y-auto"
          aria-label="Admin dashboard content"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
