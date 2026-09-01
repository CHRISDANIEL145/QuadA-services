'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #B8973E 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[#B8973E] flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            Q
          </div>
          <h1 className="font-display text-2xl text-white mb-1">QuadA Services</h1>
          <p className="text-white/40 text-sm">Admin Portal</p>
        </div>

        {/* Form card */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-white font-semibold text-lg mb-6">Sign in to continue</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
            aria-label="Admin login form"
          >
            {/* Email */}
            <div className="form-field">
              <label htmlFor="admin_email" className="text-white/70 text-sm font-medium">
                Email Address
              </label>
              <input
                id="admin_email"
                type="email"
                autoComplete="email"
                placeholder="admin@quadaservices.com"
                className={cn(
                  'w-full px-4 py-3 rounded-xl bg-white/8 border text-white placeholder:text-white/20 outline-none transition-all duration-200',
                  errors.email
                    ? 'border-red-500/50 focus:border-red-400'
                    : 'border-white/10 focus:border-white/30 focus:bg-white/12'
                )}
                {...register('email')}
              />
              {errors.email && (
                <span className="text-red-400 text-xs" role="alert">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-field">
              <label htmlFor="admin_password" className="text-white/70 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin_password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={cn(
                    'w-full px-4 py-3 pr-11 rounded-xl bg-white/8 border text-white placeholder:text-white/20 outline-none transition-all duration-200',
                    errors.password
                      ? 'border-red-500/50 focus:border-red-400'
                      : 'border-white/10 focus:border-white/30 focus:bg-white/12'
                  )}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 text-xs" role="alert">{errors.password.message}</span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="admin-login-btn"
              className={cn(
                'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-300',
                isSubmitting
                  ? 'bg-white/10 text-white/30 cursor-not-allowed'
                  : 'bg-[#B8973E] text-white hover:bg-[#D4AF5C]'
              )}
            >
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" /> Signing in…</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Admin access only. Customer registration is not available.
        </p>
      </div>
    </div>
  )
}
