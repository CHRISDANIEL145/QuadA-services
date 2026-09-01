import { redirect } from 'next/navigation'

// /admin → /admin/dashboard (the (dashboard) route group)
export default function AdminRootPage() {
  redirect('/admin/leads')
}
