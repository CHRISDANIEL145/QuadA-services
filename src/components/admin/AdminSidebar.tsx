'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Users, Settings, Package, Tag, MapPin,
  LogOut, ChevronRight, Activity
} from 'lucide-react'
import { adminLogout } from '@/actions/admin'
import { cn } from '@/lib/utils'
import type { Admin } from '@/types'

interface Props {
  admin: Admin
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/services', label: 'Services', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/service-areas', label: 'Service Areas', icon: MapPin },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar({ admin }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await adminLogout()
  }

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  return (
    <aside
      className="flex flex-col w-[260px] min-h-screen bg-[#0D1526] border-r border-white/8 shrink-0"
      role="navigation"
      aria-label="Admin navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-white/8">
        <div className="w-7 h-7 rounded-lg bg-[#B8973E] flex items-center justify-center text-white font-bold text-xs">
          Q
        </div>
        <div>
          <div className="text-white text-sm font-semibold leading-none">QuadA Admin</div>
          <div className="text-white/30 text-[10px] mt-0.5">Management Portal</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4" aria-label="Main admin navigation">
        <ul className="space-y-0.5" role="list">
          {navItems.map((item) => {
            const active = isActive(item)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
                    active
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <item.icon size={16} aria-hidden="true" />
                  {item.label}
                  {active && (
                    <ChevronRight size={12} className="ml-auto text-white/40" aria-hidden="true" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User info + logout */}
      <div className="px-3 py-4 border-t border-white/8">
        <div className="flex items-center gap-3 px-3 py-3 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#253969] flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {admin.full_name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">{admin.full_name}</div>
            <div className="text-white/30 text-[10px] truncate capitalize">{admin.role?.replace('_', ' ')}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all duration-150"
          aria-label="Sign out of admin"
        >
          <LogOut size={15} aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
