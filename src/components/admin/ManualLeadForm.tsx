'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { createManualLead, getAdminCategories } from '@/actions/admin'
import { cn } from '@/lib/utils'

const schema = z.object({
  customer_name: z.string().min(2, 'Name required'),
  phone: z.string().min(10, 'Valid phone required'),
  email: z.string().email().optional().or(z.literal('')),
  location: z.string().min(1, 'Location required'),
  address: z.string().optional(),
  service_category_id: z.string().optional(),
  service_id: z.string().optional(),
  requirement: z.string().min(5, 'Please describe the requirement'),
  budget: z.string().optional(),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  source: z.enum(['WEBSITE', 'GOOGLE', 'SOCIAL_MEDIA', 'REFERRAL', 'DIRECT', 'OTHER']),
})

type FormData = z.infer<typeof schema>

interface Props {
  categories: { id: string; name: string }[]
  services: { id: string; name: string; category_id: string }[]
  admins: { id: string; full_name: string }[]
}

export function ManualLeadForm({ categories, services, admins }: Props) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { priority: 'MEDIUM', source: 'DIRECT' },
  })

  const selectedCategory = watch('service_category_id')
  const filteredServices = services.filter(
    (s) => !selectedCategory || s.category_id === selectedCategory
  )

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const result = await createManualLead(data as any)
      if (result.success) {
        toast.success(`Lead ${result.lead_number} created successfully`)
        router.push('/admin/leads')
        router.refresh()
      } else {
        toast.error(result.error || 'Failed to create lead')
      }
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Manual lead creation form">
      {/* Customer Details */}
      <div className="bg-white rounded-2xl border border-[#E5E9F2] p-6">
        <h2 className="font-semibold text-[#0D1526] text-sm mb-5">Customer Details</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="customer_name" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="customer_name"
              type="text"
              placeholder="e.g. Raj Kumar"
              className={cn('form-input', errors.customer_name && 'form-input-error')}
              {...register('customer_name')}
            />
            {errors.customer_name && <span className="form-error">{errors.customer_name.message}</span>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. 9876543210"
              className={cn('form-input', errors.phone && 'form-input-error')}
              {...register('phone')}
            />
            {errors.phone && <span className="form-error">{errors.phone.message}</span>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. raj@example.com"
              className={cn('form-input', errors.email && 'form-input-error')}
              {...register('email')}
            />
            {errors.email && <span className="form-error">{errors.email.message}</span>}
          </div>

          <div>
            <label htmlFor="location" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              City / Area <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Tirunelveli"
              className={cn('form-input', errors.location && 'form-input-error')}
              {...register('location')}
            />
            {errors.location && <span className="form-error">{errors.location.message}</span>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Full Address (optional)
            </label>
            <textarea
              id="address"
              rows={2}
              placeholder="Full address if known"
              className="form-input resize-none"
              {...register('address')}
            />
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-white rounded-2xl border border-[#E5E9F2] p-6">
        <h2 className="font-semibold text-[#0D1526] text-sm mb-5">Service Details</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="service_category_id" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Service Category
            </label>
            <select id="service_category_id" className="form-input" {...register('service_category_id')}>
              <option value="">Select category…</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="service_id" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Specific Service
            </label>
            <select id="service_id" className="form-input" {...register('service_id')} disabled={!selectedCategory}>
              <option value="">Select service…</option>
              {filteredServices.map((svc) => (
                <option key={svc.id} value={svc.id}>{svc.name}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="requirement" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Requirement Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="requirement"
              rows={4}
              placeholder="Describe what the customer needs in detail…"
              className={cn('form-input resize-none', errors.requirement && 'form-input-error')}
              {...register('requirement')}
            />
            {errors.requirement && <span className="form-error">{errors.requirement.message}</span>}
          </div>

          <div>
            <label htmlFor="budget" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Budget (optional)
            </label>
            <input
              id="budget"
              type="text"
              placeholder="e.g. ₹5,000–₹10,000"
              className="form-input"
              {...register('budget')}
            />
          </div>

          <div>
            <label htmlFor="preferred_date" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Preferred Date (optional)
            </label>
            <input id="preferred_date" type="date" className="form-input" {...register('preferred_date')} />
          </div>

          <div>
            <label htmlFor="preferred_time" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Preferred Time (optional)
            </label>
            <input id="preferred_time" type="text" placeholder="e.g. Morning / 10 AM" className="form-input" {...register('preferred_time')} />
          </div>
        </div>
      </div>

      {/* Assignment & Meta */}
      <div className="bg-white rounded-2xl border border-[#E5E9F2] p-6">
        <h2 className="font-semibold text-[#0D1526] text-sm mb-5">Lead Details</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="priority" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Priority
            </label>
            <select id="priority" className="form-input" {...register('priority')}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          <div>
            <label htmlFor="source" className="block text-xs font-medium text-[#6B6254] mb-1.5">
              Lead Source
            </label>
            <select id="source" className="form-input" {...register('source')}>
              <option value="DIRECT">Direct Call</option>
              <option value="WEBSITE">Website</option>
              <option value="GOOGLE">Google</option>
              <option value="SOCIAL_MEDIA">Social Media</option>
              <option value="REFERRAL">Referral</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3">
        <Link
          href="/admin/leads"
          className="px-5 py-2.5 text-sm text-[#6B6254] border border-[#E5E9F2] rounded-xl hover:bg-[#F8F9FC] transition-colors"
        >
          Cancel
        </Link>
        <button
          id="create-lead-submit-btn"
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#0D1526] text-white text-sm font-medium rounded-xl hover:bg-[#1C2D4F] transition-colors disabled:opacity-60"
        >
          {isSubmitting && <Loader2 size={14} className="animate-spin" />}
          {isSubmitting ? 'Creating…' : 'Create Lead'}
        </button>
      </div>
    </form>
  )
}
