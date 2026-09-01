import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh the session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect /admin routes (except /admin/login)
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAdminLogin = request.nextUrl.pathname === '/admin/login'

  if (isAdminRoute && !isAdminLogin) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    // Verify admin privileges via database
    const { data: admin } = await supabase
      .from('admins')
      .select('id')
      .eq('id', user.id)
      .eq('is_active', true)
      .single()

    if (!admin) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  // If logged in and visiting login page, redirect to dashboard if they are an admin
  if (isAdminLogin && user) {
    const { data: admin } = await supabase
      .from('admins')
      .select('id')
      .eq('id', user.id)
      .eq('is_active', true)
      .single()

    if (admin) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
