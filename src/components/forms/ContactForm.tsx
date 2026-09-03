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
        <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-navy-900" />
        </div>
        <h3 className="text-2xl font-bold text-navy-900 mb-3 tracking-tight">Message <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-500">Received</span></h3>
        <p className="text-navy-600 text-sm leading-relaxed">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 relative z-10" aria-label="Contact form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="form-field space-y-1.5">
          <label htmlFor="contact_name" className="block text-xs font-semibold text-navy-700">
            Name <span className="text-cream-300">*</span>
          </label>
          <input
            id="contact_name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={cn('w-full bg-white border border-cream-200 text-navy-900 placeholder-navy-300 text-base p-4 focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 transition-all duration-300 rounded-xl shadow-sm hover:border-cream-300', errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500')}
            {...register('name')}
          />
          {errors.name && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.name.message}</span>}
        </div>

        <div className="form-field space-y-1.5">
          <label htmlFor="contact_phone" className="block text-xs font-semibold text-navy-700">Mobile Number</label>
          <input
            id="contact_phone"
            type="tel"
            autoComplete="tel"
            placeholder="10-digit mobile"
            maxLength={10}
            className={cn('w-full bg-white border border-cream-200 text-navy-900 placeholder-navy-300 text-base p-4 focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 transition-all duration-300 rounded-xl shadow-sm hover:border-cream-300', errors.phone && 'border-red-500 focus:border-red-500 focus:ring-red-500')}
            {...register('phone')}
          />
          {errors.phone && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="form-field space-y-1.5">
        <label htmlFor="contact_email" className="block text-xs font-semibold text-navy-700">
          Email Address <span className="text-cream-300">*</span>
        </label>
        <input
          id="contact_email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          className={cn('w-full bg-white border border-cream-200 text-navy-900 placeholder-navy-300 text-base p-4 focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 transition-all duration-300 rounded-xl shadow-sm hover:border-cream-300', errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500')}
          {...register('email')}
        />
        {errors.email && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.email.message}</span>}
      </div>

      <div className="form-field space-y-1.5">
        <label htmlFor="contact_message" className="block text-xs font-semibold text-navy-700">
          Message <span className="text-cream-300">*</span>
        </label>
        <textarea
          id="contact_message"
          rows={5}
          placeholder="Tell us how we can help you…"
          className={cn('w-full bg-white border border-cream-200 text-navy-900 placeholder-navy-300 text-base p-4 focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 transition-all duration-300 resize-none rounded-xl shadow-sm hover:border-cream-300', errors.message && 'border-red-500 focus:border-red-500 focus:ring-red-500')}
          {...register('message')}
        />
        {errors.message && <span className="text-red-500 text-xs mt-1 block font-medium">{errors.message.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        id="contact-submit-btn"
        className={cn(
          'group w-full flex items-center justify-center gap-3 py-4 mt-4 bg-navy-900 text-white font-bold text-base rounded-xl hover:bg-navy-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
          isSubmitting && 'opacity-70 cursor-not-allowed transform-none'
        )}
      >
        {isSubmitting ? (
          <><Loader2 size={20} className="animate-spin" /> Sending…</>
        ) : (
          <>Send Message <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" /></>
        )}
      </button>
    </form>
  )
}
