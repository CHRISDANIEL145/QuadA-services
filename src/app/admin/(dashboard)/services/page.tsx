import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getAdminServices } from '@/actions/admin'
import ServicesTable from '@/components/admin/ServicesTable'

export const metadata: Metadata = { title: 'Services' }

export default async function AdminServicesPage() {
  const services = await getAdminServices()

  return (
    <div className="p-8">
      <ServicesTable services={services} />
    </div>
  )
}
