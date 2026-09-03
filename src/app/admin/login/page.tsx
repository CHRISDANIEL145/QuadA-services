'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { adminLogin } from '@/actions/admin'
import { adminLoginSchema, type AdminLoginSchema } from '@/lib/validations'
import { cn } from '@/lib/utils'

export default function AdminLoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
  })

  const onSubmit = async (data: AdminLoginSchema) => {
    setIsSubmitting(true)
    try {
      const result = await adminLogin(data.email, data.password)
      if (result.success) {
        toast.success('Welcome back!')
        router.push('/admin')
        router.refresh()
      } else {
        toast.error(result.error || 'Login failed.')
      }
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #354a76 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl text-navy-900 mb-1 font-bold">QuadA Services</h1>
          <p className="text-navy-500 text-base">Admin Portal</p>
        </div>

        {/* Form card */}
        <div className="bg-white border-2 border-navy-500/30 rounded-3xl p-10 md:p-14 shadow-2xl shadow-navy-900/5">
          <h2 className="text-navy-900 font-bold text-2xl mb-8 text-center">Sign in to continue</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
            aria-label="Admin login form"
          >
            {/* Email */}
            <div className="form-field space-y-2">
              <label htmlFor="admin_email" className="text-navy-700 text-base font-bold">
                Email Address
              </label>
              <input
                id="admin_email"
                type="email"
                autoComplete="email"
                placeholder="admin@quadaservices.com"
                className={cn(
                  'w-full h-16 px-6 text-lg rounded-xl bg-cream-50 border-2 text-navy-900 placeholder:text-navy-500/50 outline-none transition-all duration-200 focus:ring-4 focus:ring-navy-600/20 focus:border-navy-500',
                  errors.email
                    ? 'border-red-500'
                    : 'border-navy-500/30'
                )}
                {...register('email')}
              />
              {errors.email && (
                <span className="text-red-500 text-sm font-medium" role="alert">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-field space-y-2">
              <label htmlFor="admin_password" className="text-navy-700 text-base font-bold">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin_password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={cn(
                    'w-full h-16 px-6 pr-14 text-lg rounded-xl bg-cream-50 border-2 text-navy-900 placeholder:text-navy-500/50 outline-none transition-all duration-200 focus:ring-4 focus:ring-navy-600/20 focus:border-navy-500',
                    errors.password
                      ? 'border-red-500'
                      : 'border-navy-500/30'
                  )}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 transition-colors p-2"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm font-medium" role="alert">{errors.password.message}</span>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                id="admin-login-btn"
                className={cn(
                  'w-full flex items-center justify-center gap-3 h-16 rounded-xl font-bold uppercase tracking-wider text-base transition-all duration-300 hover:shadow-xl hover:shadow-navy-600/30 mt-2',
                  isSubmitting
                    ? 'bg-cream-200 text-navy-400 cursor-not-allowed'
                    : 'bg-navy-600 text-white hover:bg-navy-700 active:scale-[0.98]'
                )}
              >
                {isSubmitting ? (
                  <><Loader2 size={20} className="animate-spin" /> Signing in…</>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col items-center mt-6 space-y-4">
          <p className="text-center text-navy-500 text-sm font-medium">
            Admin access only. Customer registration is not available.
          </p>
          
          <Link
            href="/login"
            className="flex items-center justify-center w-full max-w-[200px] h-12 rounded-xl font-bold text-sm transition-all duration-300 border-2 border-navy-500/30 text-navy-600 hover:bg-navy-50"
          >
            Return to Customer
          </Link>
        </div>
      </div>
    </div>
  )
}
