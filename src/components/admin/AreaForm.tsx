'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { upsertServiceArea } from '@/actions/admin'
import { serviceAreaSchema, type ServiceAreaSchema } from '@/lib/validations'
import { cn } from '@/lib/utils'

interface Props {
  initialData?: any
}

export function AreaForm({ initialData }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const isEdit = !!initialData

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceAreaSchema>({
    resolver: zodResolver(serviceAreaSchema),
    defaultValues: {
      name: initialData?.name || '',
      state: initialData?.state || '',
      is_active: initialData !== undefined ? initialData.is_active : true,
    },
  })

  const onSubmit = async (data: ServiceAreaSchema) => {
    setIsSubmitting(true)
    try {
      const result = await upsertServiceArea(data, initialData?.id)
      if (result.success) {
        toast.success(isEdit ? 'Service area updated' : 'Service area created')
        router.push('/admin/service-areas')
        router.refresh()
      } else {
        toast.error(result.error || 'Failed to save service area')
      }
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Area Name (City/Region) <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            className={cn('form-input', errors.name && 'form-input-error')}
            {...register('name')}
          />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="state" className="form-label">
            State <span className="text-red-500">*</span>
          </label>
          <input
            id="state"
            type="text"
            className={cn('form-input', errors.state && 'form-input-error')}
            {...register('state')}
          />
          {errors.state && <span className="form-error">{errors.state.message}</span>}
        </div>

        <div className="form-field flex items-center gap-3 pt-6 md:col-span-2">
          <input
            id="is_active"
            type="checkbox"
            className="w-4 h-4 rounded border-[#E5E9F2] text-[#0D1526] focus:ring-[#0D1526]/20"
            {...register('is_active')}
          />
          <label htmlFor="is_active" className="text-sm font-medium text-[#0D1526] cursor-pointer">
            Area is Active
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-[#E5E9F2] flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push('/admin/service-areas')}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B6254] hover:bg-[#F8F9FC] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-colors',
            isSubmitting
              ? 'bg-[#E5E9F2] text-[#A89E8E] cursor-not-allowed'
              : 'bg-[#0D1526] hover:bg-[#1C2D4F]'
          )}
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isEdit ? 'Save Changes' : 'Create Area'}
        </button>
      </div>
    </form>
  )
}
