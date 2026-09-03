'use server'

import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/admin'
import { customerLoginSchema, customerSignUpSchema, type CustomerLoginSchema, type CustomerSignUpSchema } from '@/lib/validations'
import type { ActionResult } from '@/types'

// ============================================================
// CUSTOMER SIGN UP
// ============================================================
export async function customerSignUp(
  data: CustomerSignUpSchema
): Promise<ActionResult> {
  try {
    const validated = customerSignUpSchema.parse(data)
    const supabase = await createClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
      options: {
        data: {
          full_name: validated.full_name,
        },
      },
    })

    if (authError) {
      return { success: false, error: authError.message }
    }

    if (authData.user) {
      const adminClient = createServiceRoleClient()
      const { error: insertError } = await adminClient
        .from('customers')
        .insert({
          id: authData.user.id,
          email: validated.email,
          full_name: validated.full_name,
          phone: validated.phone,
          password: validated.password, // IMPORTANT: Storing plaintext passwords is not recommended for production
        })
        
      if (insertError) {
        console.error('Failed to create customer profile:', insertError)
        // Note: The auth user is still created, but profile is missing. 
        // We log it, but might not want to fail the whole sign up if auth succeeded.
      }
    }

    return { success: true }
  } catch (err: any) {
    console.error('customerSignUp error:', err)
    return { success: false, error: err.message || 'Sign up failed. Please try again.' }
  }
}

// ============================================================
// CUSTOMER SIGN IN
// ============================================================
export async function customerSignIn(
  data: CustomerLoginSchema
): Promise<ActionResult> {
  try {
    const validated = customerLoginSchema.parse(data)
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: validated.email,
      password: validated.password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: any) {
    console.error('customerSignIn error:', err)
    return { success: false, error: 'Login failed. Please try again.' }
  }
}

// ============================================================
// CUSTOMER SIGN OUT
// ============================================================
export async function customerSignOut(): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return { success: true }
  } catch (err) {
    console.error('customerSignOut error:', err)
    return { success: false, error: 'Failed to sign out.' }
  }
}
