'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { submitContactMessage } from '@/actions/public'
import { contactSchema, type ContactSchema } from '@/lib/validations'
import { cn } from '@/lib/utils'

export function ContactForm() {
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSchema>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactSchema) => {
    setIsSubmitting(true)
    try {
      const result = await submitContactMessage(data)
      if (result.success) {
        setSuccess(true)
        toast.success('Message sent successfully!')
      } else {
        toast.error(result.error || 'Could not send message. Please try again.')
      }
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-14 h-14 rounded-full bg-[#B8973E]/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={28} className="text-[#B8973E]" />
        </div>
        <h3 className="font-display text-2xl text-[#0D1526] mb-2">Message Received</h3>
        <p className="text-[#6B6254]">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label="Contact form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="form-field">
          <label htmlFor="contact_name" className="form-label">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact_name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={cn('form-input', errors.name && 'form-input-error')}
            {...register('name')}
          />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="contact_phone" className="form-label">Mobile Number</label>
          <input
            id="contact_phone"
            type="tel"
            autoComplete="tel"
            placeholder="10-digit mobile"
            maxLength={10}
            className="form-input"
            {...register('phone')}
          />
          {errors.phone && <span className="form-error">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contact_email" className="form-label">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="contact_email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          className={cn('form-input', errors.email && 'form-input-error')}
          {...register('email')}
        />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="contact_message" className="form-label">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact_message"
          rows={5}
          placeholder="Tell us how we can help you…"
          className={cn('form-input resize-none', errors.message && 'form-input-error')}
          {...register('message')}
        />
        {errors.message && <span className="form-error">{errors.message.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        id="contact-submit-btn"
        className={cn(
          'w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-medium text-base transition-all duration-300',
          isSubmitting
            ? 'bg-[#DDD7CF] text-[#A89E8E] cursor-not-allowed'
            : 'bg-[#0D1526] text-white hover:bg-[#1C2D4F]'
        )}
      >
        {isSubmitting ? (
          <><Loader2 size={18} className="animate-spin" /> Sending…</>
        ) : (
          <>Send Message <ArrowRight size={18} /></>
        )}
      </button>
    </form>
  )
}
