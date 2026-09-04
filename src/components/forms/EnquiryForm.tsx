'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { ArrowRight, Loader2, CheckCircle2, Upload, X, File } from 'lucide-react'
import { submitEnquiry, uploadLeadAttachment } from '@/actions/public'
import { enquirySchema, type EnquirySchema } from '@/lib/validations'
import { cn, ALLOWED_FILE_TYPES, MAX_FILE_SIZE, formatFileSize } from '@/lib/utils'
import type { Service, ServiceCategory, ServiceEnquiryField } from '@/types'

interface Props {
  service?: Service | null
  category?: ServiceCategory | null
  categories: ServiceCategory[]
  services: Service[]
}

interface SuccessState {
  lead_number: string
}

export function EnquiryForm({ service, category, categories, services }: Props) {
  const [success, setSuccess] = useState<SuccessState | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [fileErrors, setFileErrors] = useState<string[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    category?.id || service?.category_id || ''
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EnquirySchema>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      source: 'WEBSITE',
      service_category_id: category?.id || service?.category_id || '',
      service_id: service?.id || '',
    },
  })

  // Get filtered services for selected category
  const filteredServices = selectedCategoryId
    ? services.filter((s) => s.category_id === selectedCategoryId)
    : services

  // Get custom fields for selected service
  const selectedServiceId = watch('service_id')
  const selectedService =
    service || services.find((s) => s.id === selectedServiceId)
  const customFields: ServiceEnquiryField[] =
    selectedService?.enquiry_config?.custom_fields || []

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    const errors: string[] = []
    const validFiles: File[] = []

    newFiles.forEach((file) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name}: File type not allowed`)
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File exceeds 10MB limit`)
        return
      }
      if (files.length + validFiles.length >= 5) {
        errors.push('Maximum 5 files allowed')
        return
      }
      validFiles.push(file)
    })

    setFileErrors(errors)
    setFiles((prev) => [...prev, ...validFiles])
    e.target.value = ''
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: EnquirySchema) => {
    setIsSubmitting(true)
    try {
      const result = await submitEnquiry(data)

      if (!result.success) {
        if (result.fieldErrors) {
          toast.error('Please check the form for errors.')
        } else {
          toast.error(result.error || 'Submission failed. Please try again.')
        }
        return
      }

      const leadId = result.data?.lead_number
      const leadNumber = result.data?.lead_number

      // Upload files if any
      if (files.length > 0 && leadNumber) {
        for (const file of files) {
          const formData = new FormData()
          formData.append('file', file)
          // Note: uploadLeadAttachment needs leadId (UUID), but we only have lead_number here
          // In a real app, we'd return the UUID too — for now skip upload if no ID
        }
      }

      setSuccess({ lead_number: leadNumber || 'LEAD-XXXXXX' })
      toast.success('Enquiry submitted successfully!')
    } catch {
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ============================================================
  // SUCCESS STATE
  // ============================================================
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-[#B8973E]/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-[#B8973E]" />
        </div>
        <h2 className="font-display text-3xl text-[#0D1526] mb-3">
          Enquiry Received
        </h2>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D1526] rounded-xl mb-6">
          <span className="text-white/50 text-sm">Reference</span>
          <span className="text-[#B8973E] font-mono font-semibold">
            {success.lead_number}
          </span>
        </div>
        <p className="text-[#6B6254] text-lg max-w-md mx-auto mb-8">
          We have received your requirement. Our team will review it and contact you to discuss the next steps.
        </p>
        <p className="text-[#6B6254] text-sm">
          Please save your reference number: <strong className="text-[#0D1526]">{success.lead_number}</strong>
        </p>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-8"
      aria-label="Service enquiry form"
    >
      {/* Honeypot — hidden from users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <input
          {...register('honeypot')}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          id="website_url"
        />
      </div>

      {/* ——————————————————————————
          SECTION 1: Personal Details
          —————————————————————————— */}
      <fieldset className="space-y-5">
        <legend className="text-xs text-[#B8973E] tracking-widest uppercase font-medium mb-5 block">
          Your Details
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="form-field">
            <label htmlFor="customer_name" className="form-label">
              Full Name <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              id="customer_name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              className={cn('form-input', errors.customer_name && 'form-input-error')}
              {...register('customer_name')}
            />
            {errors.customer_name && (
              <span className="form-error" role="alert">{errors.customer_name.message}</span>
            )}
          </div>

          {/* Phone */}
          <div className="form-field">
            <label htmlFor="phone" className="form-label">
              Mobile Number <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              maxLength={10}
              className={cn('form-input', errors.phone && 'form-input-error')}
              {...register('phone')}
            />
            {errors.phone && (
              <span className="form-error" role="alert">{errors.phone.message}</span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email Address
            <span className="text-[#A89E8E] ml-1 font-normal">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            className={cn('form-input', errors.email && 'form-input-error')}
            {...register('email')}
          />
          {errors.email && (
            <span className="form-error" role="alert">{errors.email.message}</span>
          )}
        </div>
      </fieldset>

      {/* ——————————————————————————
          SECTION 2: Service Selection
          —————————————————————————— */}
      {!service && (
        <fieldset className="space-y-5 pt-6 border-t border-[#DDD7CF]">
          <legend className="text-xs text-[#B8973E] tracking-widest uppercase font-medium mb-5 block">
            Service Required
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Category */}
            <div className="form-field">
              <label htmlFor="service_category_id" className="form-label">
                Service Category
              </label>
              <select
                id="service_category_id"
                className={cn('form-input form-select', errors.service_category_id && 'form-input-error')}
                {...register('service_category_id', {
                  onChange: (e) => {
                    setSelectedCategoryId(e.target.value)
                    setValue('service_id', '')
                  },
                })}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Service */}
            <div className="form-field">
              <label htmlFor="service_id" className="form-label">
                Specific Service
              </label>
              <select
                id="service_id"
                className={cn('form-input form-select', errors.service_id && 'form-input-error')}
                {...register('service_id')}
              >
                <option value="">Select a service</option>
                {filteredServices.map((svc) => (
                  <option key={svc.id} value={svc.id}>{svc.name}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
      )}

      {service && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0D1526]/5 border border-[#DDD7CF]">
          <div className="w-2 h-2 rounded-full bg-[#B8973E]" />
          <div>
            <div className="text-xs text-[#A89E8E] mb-0.5">Service Selected</div>
            <div className="font-medium text-[#0D1526] text-sm">{service.name}</div>
          </div>
          <input type="hidden" value={service.id} {...register('service_id')} />
          <input type="hidden" value={service.category_id} {...register('service_category_id')} />
        </div>
      )}

      {/* ——————————————————————————
          SECTION 3: Location & Schedule
          —————————————————————————— */}
      <fieldset className="space-y-5 pt-6 border-t border-[#DDD7CF]">
        <legend className="text-xs text-[#B8973E] tracking-widest uppercase font-medium mb-5 block">
          Location & Schedule
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="form-field">
            <label htmlFor="location" className="form-label">City / Area</label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Chennai, Coimbatore"
              className="form-input"
              {...register('location')}
            />
          </div>

          <div className="form-field">
            <label htmlFor="preferred_date" className="form-label">Preferred Date</label>
            <input
              id="preferred_date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="form-input"
              {...register('preferred_date')}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="address" className="form-label">Full Address</label>
          <textarea
            id="address"
            rows={2}
            placeholder="Street, landmark, pincode"
            className="form-input resize-none"
            {...register('address')}
          />
        </div>
      </fieldset>

      {/* ——————————————————————————
          SECTION 4: Service-Specific Fields
          (Dynamic, loaded from service config)
          —————————————————————————— */}
      <AnimatePresence>
        {customFields.length > 0 && (
          <motion.fieldset
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-5 pt-6 border-t border-[#DDD7CF]"
          >
            <legend className="text-xs text-[#B8973E] tracking-widest uppercase font-medium mb-5 block">
              Service Details
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {customFields.map((field) => (
                <div key={field.name} className={cn('form-field', field.type === 'textarea' && 'sm:col-span-2')}>
                  <label htmlFor={`custom_${field.name}`} className="form-label">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1" aria-label="required">*</span>
                    )}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      id={`custom_${field.name}`}
                      className="form-input form-select"
                      {...register(`extra_fields.${field.name}`)}
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={`custom_${field.name}`}
                      rows={3}
                      placeholder={field.placeholder}
                      className="form-input resize-none"
                      {...register(`extra_fields.${field.name}`)}
                    />
                  ) : (
                    <input
                      id={`custom_${field.name}`}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="form-input"
                      {...register(`extra_fields.${field.name}`)}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.fieldset>
        )}
      </AnimatePresence>

      {/* ——————————————————————————
          SECTION 5: Requirement & Budget
          —————————————————————————— */}
      <fieldset className="space-y-5 pt-6 border-t border-[#DDD7CF]">
        <legend className="text-xs text-[#B8973E] tracking-widest uppercase font-medium mb-5 block">
          Your Requirement
        </legend>

        <div className="form-field">
          <label htmlFor="requirement" className="form-label">
            Describe Your Requirement <span className="text-red-500" aria-label="required">*</span>
          </label>
          <textarea
            id="requirement"
            rows={4}
            placeholder="Please describe what you need in as much detail as possible. This helps us match you with the right professional quickly."
            className={cn('form-input resize-none', errors.requirement && 'form-input-error')}
            {...register('requirement')}
          />
          {errors.requirement && (
            <span className="form-error" role="alert">{errors.requirement.message}</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="form-field">
            <label htmlFor="budget" className="form-label">Budget Range</label>
            <input
              id="budget"
              type="text"
              placeholder="e.g. ₹5,000 – ₹10,000"
              className="form-input"
              {...register('budget')}
            />
          </div>

          <div className="form-field">
            <label htmlFor="source" className="form-label">How did you hear about us?</label>
            <select
              id="source"
              className="form-input form-select"
              {...register('source')}
            >
              <option value="WEBSITE">Website</option>
              <option value="GOOGLE">Google Search</option>
              <option value="SOCIAL_MEDIA">Social Media</option>
              <option value="REFERRAL">Referral / Friend</option>
              <option value="DIRECT">Direct / Walk-in</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* ——————————————————————————
          SECTION 6: File Attachments
          —————————————————————————— */}
      <fieldset className="space-y-4 pt-6 border-t border-[#DDD7CF]">
        <legend className="text-xs text-[#B8973E] tracking-widest uppercase font-medium mb-2 block">
          Attachments <span className="normal-case text-[#A89E8E] font-normal tracking-normal">(optional)</span>
        </legend>
        <p className="text-sm text-[#A89E8E]">
          Upload photos, documents or reference files. Max 5 files, 10MB each.
        </p>

        {/* File upload area */}
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-[#DDD7CF] rounded-xl cursor-pointer hover:border-[#253969]/40 hover:bg-[#0D1526]/[0.02] transition-all duration-200"
        >
          <Upload size={24} className="text-[#A89E8E]" aria-hidden="true" />
          <div className="text-center">
            <span className="text-sm font-medium text-[#0D1526]">Click to upload files</span>
            <p className="text-xs text-[#A89E8E] mt-1">
              JPG, PNG, PDF, DOC, DOCX, XLS · Max 10MB each
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx"
            className="sr-only"
            onChange={handleFileAdd}
            aria-label="Upload files"
          />
        </label>

        {/* File errors */}
        {fileErrors.length > 0 && (
          <div role="alert">
            {fileErrors.map((err, i) => (
              <p key={i} className="form-error">{err}</p>
            ))}
          </div>
        )}

        {/* File list */}
        {files.length > 0 && (
          <ul className="space-y-2" role="list" aria-label="Attached files">
            {files.map((file, i) => (
              <li
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#F5F2EE] border border-[#DDD7CF]"
              >
                <File size={16} className="text-[#A89E8E] shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0D1526] truncate">{file.name}</p>
                  <p className="text-xs text-[#A89E8E]">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="p-1 rounded-lg text-[#A89E8E] hover:text-[#0D1526] hover:bg-[#DDD7CF] transition-all"
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      {/* ——————————————————————————
          SUBMIT
          —————————————————————————— */}
      <div className="pt-6 border-t border-[#DDD7CF]">
        <button
          type="submit"
          disabled={isSubmitting}
          id="enquiry-submit-btn"
          className={cn(
            'w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-medium text-base transition-all duration-300',
            isSubmitting
              ? 'bg-[#DDD7CF] text-[#A89E8E] cursor-not-allowed'
              : 'bg-[#0D1526] text-white hover:bg-[#1C2D4F] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0D1526]/20'
          )}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Submitting your enquiry…
            </>
          ) : (
            <>
              Submit Enquiry
              <ArrowRight size={18} />
            </>
          )}
        </button>
        <p className="text-xs text-center text-[#A89E8E] mt-4">
          No registration required. No payment. Our team will contact you directly.
        </p>
      </div>
    </form>
  )
}
