'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { customerLoginSchema, customerSignUpSchema, type CustomerLoginSchema, type CustomerSignUpSchema } from '@/lib/validations'
import { customerSignIn, customerSignUp } from '@/actions/customer-auth'
import toast from 'react-hot-toast'

function LoginForm({ isSignUp }: { isSignUp: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'

  const loginForm = useForm<CustomerLoginSchema>({
    resolver: zodResolver(customerLoginSchema),
    defaultValues: { email: '', password: '' },
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (data: CustomerLoginSchema) => {
    const res = await customerSignIn(data)
    if (res.success) {
      toast.success('Successfully logged in!')
      router.push(redirectTo)
      router.refresh()
    } else {
      toast.error(res.error || 'Login failed')
    }
  }

  return (
    <div className={cn(
      "absolute top-0 left-0 z-10 flex flex-col items-center justify-center p-8 md:p-20 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] bg-white",
      "w-full h-1/2 overflow-y-auto md:overflow-visible",
      !isSignUp ? "translate-y-0 opacity-100" : "translate-y-[20%] opacity-0 pointer-events-none",
      "md:w-1/2 md:h-full md:translate-y-0",
      !isSignUp ? "md:translate-x-0" : "md:translate-x-[-20%]"
    )}>
      <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-2">Sign In</h2>
      <p className="text-base text-navy-600 mb-12 text-center">Access your Quad A account</p>

      <form className="w-full flex flex-col gap-6" onSubmit={loginForm.handleSubmit(handleLogin)}>
        <div className="relative shrink-0 w-full min-h-[4rem]">
          <input 
            type="email" 
            placeholder="Email address" 
            {...loginForm.register('email')}
            className="w-full h-16 min-h-[4rem] px-6 bg-cream-50 border-2 border-cream-200 rounded-xl text-base focus:outline-none focus:border-navy-500 focus:ring-4 focus:ring-navy-600/20 transition-all text-navy-900 placeholder:text-navy-500/50"
          />
          {loginForm.formState.errors.email && (
            <span className="text-red-500 text-sm mt-1 block">{loginForm.formState.errors.email.message}</span>
          )}
        </div>
        <div className="relative shrink-0 w-full min-h-[4rem]">
          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              {...loginForm.register('password')}
              className="w-full h-16 min-h-[4rem] pl-6 pr-14 bg-cream-50 border-2 border-cream-200 rounded-xl text-base focus:outline-none focus:border-navy-500 focus:ring-4 focus:ring-navy-600/20 transition-all text-navy-900 placeholder:text-navy-500/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-900 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {loginForm.formState.errors.password && (
            <span className="text-red-500 text-sm mt-1 block">{loginForm.formState.errors.password.message}</span>
          )}
        </div>
        <div className="flex justify-center pt-2 shrink-0">
          <button type="button" className="text-base font-bold text-navy-600 hover:text-navy-900 transition-colors border-b-2 border-transparent hover:border-navy-900 pb-0.5">
            Forgot Password?
          </button>
        </div>
        <button 
          disabled={loginForm.formState.isSubmitting}
          className="w-full h-16 min-h-[4rem] bg-navy-600 text-white rounded-xl font-bold uppercase tracking-wider text-base hover:bg-navy-700 hover:shadow-xl hover:shadow-navy-600/30 transition-all active:scale-[0.98] mt-6 flex items-center justify-center shrink-0 disabled:opacity-70"
        >
          {loginForm.formState.isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

function SignUpForm({ isSignUp }: { isSignUp: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'

  const signUpForm = useForm<CustomerSignUpSchema>({
    resolver: zodResolver(customerSignUpSchema),
    defaultValues: { full_name: '', email: '', phone: '', password: '' },
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleSignUp = async (data: CustomerSignUpSchema) => {
    const res = await customerSignUp(data)
    if (res.success) {
      toast.success('Account created! You are now logged in.')
      router.push(redirectTo)
      router.refresh()
    } else {
      toast.error(res.error || 'Sign up failed')
    }
  }

  return (
    <div className={cn(
      "absolute z-10 flex flex-col items-center justify-center p-8 md:p-20 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] bg-white",
      "bottom-0 left-0 w-full h-1/2 overflow-y-auto md:overflow-visible",
      isSignUp ? "translate-y-0 opacity-100" : "translate-y-[-20%] opacity-0 pointer-events-none",
      "md:bottom-auto md:top-0 md:right-0 md:left-auto md:w-1/2 md:h-full md:translate-y-0",
      isSignUp ? "md:translate-x-0 md:opacity-100" : "md:translate-x-[20%] md:opacity-0 pointer-events-none"
    )}>
      <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-2">Create Account</h2>
      <p className="text-base text-navy-600 mb-12 text-center">Join Quad A today</p>

      <form className="w-full flex flex-col gap-6" onSubmit={signUpForm.handleSubmit(handleSignUp)}>
        <div className="relative shrink-0 w-full min-h-[4rem]">
          <input 
            type="text" 
            placeholder="Full Name" 
            {...signUpForm.register('full_name')}
            className="w-full h-16 min-h-[4rem] px-6 bg-cream-50 border-2 border-cream-200 rounded-xl text-base focus:outline-none focus:border-navy-500 focus:ring-4 focus:ring-navy-600/20 transition-all text-navy-900 placeholder:text-navy-500/50"
          />
          {signUpForm.formState.errors.full_name && (
            <span className="text-red-500 text-sm mt-1 block">{signUpForm.formState.errors.full_name.message}</span>
          )}
        </div>
        <div className="relative shrink-0 w-full min-h-[4rem]">
          <input 
            type="email" 
            placeholder="Email address" 
            {...signUpForm.register('email')}
            className="w-full h-16 min-h-[4rem] px-6 bg-cream-50 border-2 border-cream-200 rounded-xl text-base focus:outline-none focus:border-navy-500 focus:ring-4 focus:ring-navy-600/20 transition-all text-navy-900 placeholder:text-navy-500/50"
          />
          {signUpForm.formState.errors.email && (
            <span className="text-red-500 text-sm mt-1 block">{signUpForm.formState.errors.email.message}</span>
          )}
        </div>
        <div className="relative shrink-0 w-full min-h-[4rem]">
          <input 
            type="tel" 
            placeholder="Phone number" 
            {...signUpForm.register('phone')}
            className="w-full h-16 min-h-[4rem] px-6 bg-cream-50 border-2 border-cream-200 rounded-xl text-base focus:outline-none focus:border-navy-500 focus:ring-4 focus:ring-navy-600/20 transition-all text-navy-900 placeholder:text-navy-500/50"
          />
          {signUpForm.formState.errors.phone && (
            <span className="text-red-500 text-sm mt-1 block">{signUpForm.formState.errors.phone.message}</span>
          )}
        </div>
        <div className="relative shrink-0 w-full min-h-[4rem]">
          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              {...signUpForm.register('password')}
              className="w-full h-16 min-h-[4rem] pl-6 pr-14 bg-cream-50 border-2 border-cream-200 rounded-xl text-base focus:outline-none focus:border-navy-500 focus:ring-4 focus:ring-navy-600/20 transition-all text-navy-900 placeholder:text-navy-500/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-900 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {signUpForm.formState.errors.password && (
            <span className="text-red-500 text-sm mt-1 block">{signUpForm.formState.errors.password.message}</span>
          )}
        </div>
        
        <button 
          disabled={signUpForm.formState.isSubmitting}
          className="w-full h-16 min-h-[4rem] bg-navy-600 text-white rounded-xl font-bold uppercase tracking-wider text-base hover:bg-navy-700 hover:shadow-xl hover:shadow-navy-600/30 transition-all active:scale-[0.98] mt-4 flex items-center justify-center shrink-0 disabled:opacity-70"
        >
          {signUpForm.formState.isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

function LoginContent() {
  const [isSignUp, setIsSignUp] = useState(false)
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  return (
    <div className="min-h-screen w-full bg-cream-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-navy-600/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-navy-400/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Back to Home */}
      <div className="absolute top-8 left-4 md:left-8 z-30">
        <Link href="/" className="flex items-center gap-2 text-navy-500 hover:text-navy-900 transition-colors text-sm font-medium">
          <ArrowLeft size={16} />
          Back to site
        </Link>
      </div>

      <div className="relative w-full max-w-[1200px] h-[1000px] md:h-[800px] bg-white rounded-[3rem] shadow-2xl shadow-navy-900/10 border border-white/50 overflow-hidden flex flex-col md:flex-row">
        
        {redirectTo && (
          <div className="absolute top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div className="bg-navy-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg pointer-events-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Please sign in to access that page
            </div>
          </div>
        )}

        <LoginForm isSignUp={isSignUp} />
        <SignUpForm isSignUp={isSignUp} />

        {/* =========================================
            ANIMATED OVERLAY
            ========================================= */}
        <div className={cn(
          "absolute z-20 bg-navy-600 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden",
          // Base (Mobile)
          "top-0 left-0 w-full h-1/2",
          isSignUp ? "translate-y-0" : "translate-y-full",
          // Desktop
          "md:h-full md:w-1/2 md:translate-y-0",
          isSignUp ? "md:translate-x-0" : "md:translate-x-full"
        )}>
          {/* Parallax Content Container inside Overlay */}
          <div className={cn(
            "relative flex transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
            // Mobile (Vertical parallax)
            "w-full h-[200%] flex-col top-[-100%]",
            isSignUp ? "translate-y-1/2" : "translate-y-0",
            // Desktop (Horizontal parallax)
            "md:w-[200%] md:h-full md:flex-row md:top-0 md:left-[-100%] md:translate-y-0",
            isSignUp ? "md:translate-x-1/2" : "md:translate-x-0"
          )}>
            
            {/* Left/Top side of overlay (shown when panel is on left/top - Sign Up mode) */}
            <div className="w-full h-1/2 md:w-1/2 md:h-full flex flex-col items-center justify-center p-10 md:p-20 text-white text-center">
              <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6 rounded-full overflow-hidden bg-white shadow-xl">
                <Image src="/new-logo.png" alt="Quad A Logo" fill className="object-cover" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Welcome To<br/>QUAD A</h2>
              <p className="text-base md:text-lg text-white/90 mb-10 max-w-sm leading-relaxed">
                Already have an account? Sign in to access your dashboard and services.
              </p>
              <button 
                onClick={() => setIsSignUp(false)}
                className="px-12 py-4 rounded-full border-[3px] border-white text-white font-bold uppercase tracking-wider text-base hover:bg-white hover:text-navy-600 transition-all active:scale-[0.98]"
              >
                Sign In
              </button>
            </div>
            
            {/* Right/Bottom side of overlay (shown when panel is on right/bottom - Sign In mode) */}
            <div className="w-full h-1/2 md:w-1/2 md:h-full flex flex-col items-center justify-center p-10 md:p-20 text-white text-center">
              <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6 rounded-full overflow-hidden bg-white shadow-xl">
                <Image src="/new-logo.png" alt="Quad A Logo" fill className="object-cover" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Hello World!</h2>
              <p className="text-base md:text-lg text-white/90 mb-10 max-w-sm leading-relaxed">
                Enter your personal details and start your journey with us today.
              </p>
              <div className="flex flex-col gap-4 items-center">
                <button 
                  onClick={() => setIsSignUp(true)}
                  className="px-12 py-4 rounded-full border-[3px] border-white text-white font-bold uppercase tracking-wider text-base hover:bg-white hover:text-navy-600 transition-all active:scale-[0.98]"
                >
                  Sign Up
                </button>
                <Link 
                  href="/admin/login"
                  className="px-12 py-3 rounded-full border-2 border-transparent text-white/80 font-bold uppercase tracking-wider text-sm hover:text-white hover:bg-white/10 transition-all active:scale-[0.98]"
                >
                  Admin Login
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50 flex items-center justify-center"><Loader2 className="animate-spin text-navy-600" /></div>}>
      <LoginContent />
    </Suspense>
  )
}
