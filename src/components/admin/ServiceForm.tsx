'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { upsertService } from '@/actions/admin'
import { serviceSchema, type ServiceSchema } from '@/lib/validations'
import { cn, generateSlug } from '@/lib/utils'
import type { ServiceCategory, PricingType } from '@/types'

interface Props {
  categories: ServiceCategory[]
  initialData?: any // The DB row
}

export function ServiceForm({ categories, initialData }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const isEdit = !!initialData

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      category_id: initialData?.category_id || '',
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      short_description: initialData?.short_description || '',
      description: initialData?.description || '',
      image_url: initialData?.image_url || '',
      display_price: initialData?.display_price || '',
      pricing_type: initialData?.pricing_type || 'quote',
      is_active: initialData !== undefined ? initialData.is_active : true,
      sort_order: initialData?.sort_order || 0,
    },
  })

  const nameValue = watch('name')

  const handleGenerateSlug = () => {
    if (nameValue) {
      setValue('slug', generateSlug(nameValue), { shouldValidate: true })
    }
  }

  const onSubmit = async (data: ServiceSchema) => {
    setIsSubmitting(true)
    try {
      const result = await upsertService(data, initialData?.id)
      if (result.success) {
        toast.success(isEdit ? 'Service updated' : 'Service created')
        router.push('/admin/services')
        router.refresh()
      } else {
        toast.error(result.error || 'Failed to save service')
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
        <div className="form-field md:col-span-2">
          <label htmlFor="category_id" className="form-label">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category_id"
            className={cn('form-input', errors.category_id && 'form-input-error')}
            {...register('category_id')}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && <span className="form-error">{errors.category_id.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="name" className="form-label">
            Service Name <span className="text-red-500">*</span>
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
          <div className="flex items-center justify-between">
            <label htmlFor="slug" className="form-label">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleGenerateSlug}
              className="text-[10px] text-[#B8973E] hover:underline uppercase tracking-wider font-medium mb-1.5"
            >
              Generate from Name
            </button>
          </div>
          <input
            id="slug"
            type="text"
            className={cn('form-input font-mono text-sm', errors.slug && 'form-input-error')}
            {...register('slug')}
          />
          {errors.slug && <span className="form-error">{errors.slug.message}</span>}
        </div>

        <div className="form-field md:col-span-2">
          <label htmlFor="short_description" className="form-label">
            Short Description (Card summary)
          </label>
          <textarea
            id="short_description"
            rows={2}
            className={cn('form-input resize-none', errors.short_description && 'form-input-error')}
            {...register('short_description')}
          />
          {errors.short_description && <span className="form-error">{errors.short_description.message}</span>}
        </div>

        <div className="form-field md:col-span-2">
          <label htmlFor="description" className="form-label">
            Full Description (Markdown supported)
          </label>
          <textarea
            id="description"
            rows={6}
            className={cn('form-input resize-none font-mono text-sm', errors.description && 'form-input-error')}
            {...register('description')}
          />
          {errors.description && <span className="form-error">{errors.description.message}</span>}
        </div>

        <div className="form-field md:col-span-2">
          <label htmlFor="image_url" className="form-label">Hero Image URL</label>
          <input
            id="image_url"
            type="url"
            placeholder="https://..."
            className={cn('form-input', errors.image_url && 'form-input-error')}
            {...register('image_url')}
          />
          {errors.image_url && <span className="form-error">{errors.image_url.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="pricing_type" className="form-label">Pricing Type</label>
          <select
            id="pricing_type"
            className={cn('form-input', errors.pricing_type && 'form-input-error')}
            {...register('pricing_type')}
          >
            <option value="fixed">Fixed Price</option>
            <option value="from">Starting From</option>
            <option value="range">Price Range</option>
            <option value="quote">Custom Quote</option>
          </select>
          {errors.pricing_type && <span className="form-error">{errors.pricing_type.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="display_price" className="form-label">Display Price String</label>
          <input
            id="display_price"
            type="text"
            placeholder="e.g. ₹5,000 / $99"
            className={cn('form-input', errors.display_price && 'form-input-error')}
            {...register('display_price')}
          />
          {errors.display_price && <span className="form-error">{errors.display_price.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="sort_order" className="form-label">Sort Order</label>
          <input
            id="sort_order"
            type="number"
            min="0"
            className={cn('form-input', errors.sort_order && 'form-input-error')}
            {...register('sort_order', { valueAsNumber: true })}
          />
          {errors.sort_order && <span className="form-error">{errors.sort_order.message}</span>}
        </div>

        <div className="form-field flex items-center gap-3 pt-6">
          <input
            id="is_active"
            type="checkbox"
            className="w-4 h-4 rounded border-[#E5E9F2] text-[#0D1526] focus:ring-[#0D1526]/20"
            {...register('is_active')}
          />
          <label htmlFor="is_active" className="text-sm font-medium text-[#0D1526] cursor-pointer">
            Service is Active
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-[#E5E9F2] flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push('/admin/services')}
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
          {isEdit ? 'Save Changes' : 'Create Service'}
        </button>
      </div>
    </form>
  )
}
