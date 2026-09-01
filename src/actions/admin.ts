'use server'

import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/admin'
import { leadUpdateSchema, leadNoteSchema, serviceSchema, categorySchema, serviceAreaSchema } from '@/lib/validations'
import type { ActionResult, LeadFilters, DashboardStats, Lead } from '@/types'
import { redirect } from 'next/navigation'

// ============================================================
// HELPER — Verify Admin Session
// ============================================================
async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  const adminClient = createServiceRoleClient()
  const { data: admin } = await adminClient
    .from('admins')
    .select('*')
    .eq('id', user.id)
    .eq('is_active', true)
    .single()

  if (!admin) {
    redirect('/admin/login')
  }

  return { user, admin, adminClient }
}

// ============================================================
// ADMIN LOGIN
// ============================================================
export async function adminLogin(
  email: string,
  password: string
): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { success: false, error: 'Invalid email or password.' }
    }

    return { success: true }
  } catch (err) {
    console.error('adminLogin error:', err)
    return { success: false, error: 'Login failed. Please try again.' }
  }
}

// ============================================================
// ADMIN LOGOUT
// ============================================================
export async function adminLogout(): Promise<ActionResult> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

// ============================================================
// GET DASHBOARD STATS
// ============================================================
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const { adminClient } = await requireAdmin()

    const { data, error } = await adminClient
      .from('leads')
      .select('status')

    if (error || !data) {
      return {
        total: 0, new: 0, contacted: 0, qualified: 0,
        site_visit: 0, quotation: 0, follow_up: 0, converted: 0, completed: 0, lost: 0, cancelled: 0,
      }
    }

    const counts = data.reduce((acc, lead) => {
      acc.total++
      switch (lead.status) {
        case 'NEW': acc.new++; break
        case 'CONTACTED': acc.contacted++; break
        case 'QUALIFIED': acc.qualified++; break
        case 'SITE_VISIT': acc.site_visit++; break
        case 'QUOTATION': acc.quotation++; break
        case 'FOLLOW_UP': acc.follow_up++; break
        case 'CONVERTED': acc.converted++; break
        case 'COMPLETED': acc.completed++; break
        case 'LOST': acc.lost++; break
        case 'CANCELLED': acc.cancelled++; break
      }
      return acc
    }, {
      total: 0, new: 0, contacted: 0, qualified: 0,
      site_visit: 0, quotation: 0, follow_up: 0, converted: 0, completed: 0, lost: 0, cancelled: 0,
    } as DashboardStats)

    return counts
  } catch {
    return {
      total: 0, new: 0, contacted: 0, qualified: 0,
      site_visit: 0, quotation: 0, follow_up: 0, converted: 0, completed: 0, lost: 0, cancelled: 0,
    }
  }
}

// ============================================================
// GET LEADS (with filters, pagination)
// ============================================================
export async function getLeads(filters: LeadFilters = {}) {
  try {
    const { adminClient } = await requireAdmin()
    const {
      search, status, priority, service_category_id, service_id,
      assigned_to, source, date_from, date_to,
      page = 1, page_size = 20,
    } = filters

    let query = adminClient
      .from('leads')
      .select(`
        *,
        service_categories(id, name, slug),
        services(id, name, slug),
        admins(id, full_name, email)
      `, { count: 'exact' })

    if (search) {
      query = query.or(
        `customer_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%,lead_number.ilike.%${search}%`
      )
    }
    if (status) query = query.eq('status', status)
    if (priority) query = query.eq('priority', priority)
    if (service_category_id) query = query.eq('service_category_id', service_category_id)
    if (service_id) query = query.eq('service_id', service_id)
    if (assigned_to) query = query.eq('assigned_to', assigned_to)
    if (source) query = query.eq('source', source)
    if (date_from) query = query.gte('created_at', date_from)
    if (date_to) query = query.lte('created_at', date_to)

    const from = (page - 1) * page_size
    const to = from + page_size - 1

    query = query
      .order('created_at', { ascending: false })
      .range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error('getLeads error:', error)
      return { leads: [], total: 0 }
    }

    return { leads: data || [], total: count || 0 }
  } catch {
    return { leads: [], total: 0 }
  }
}

// ============================================================
// GET SINGLE LEAD
// ============================================================
export async function getLead(id: string) {
  try {
    const { adminClient } = await requireAdmin()

    const { data, error } = await adminClient
      .from('leads')
      .select(`
        *,
        service_categories(id, name, slug),
        services(id, name, slug),
        admins(id, full_name, email)
      `)
      .eq('id', id)
      .single()

    if (error || !data) return null
    return data
  } catch {
    return null
  }
}

// ============================================================
// GET LEAD ACTIVITIES
// ============================================================
export async function getLeadActivities(leadId: string) {
  try {
    const { adminClient } = await requireAdmin()

    const { data, error } = await adminClient
      .from('lead_activities')
      .select(`
        *,
        admins(id, full_name)
      `)
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

// ============================================================
// GET LEAD NOTES
// ============================================================
export async function getLeadNotes(leadId: string) {
  try {
    const { adminClient } = await requireAdmin()

    const { data, error } = await adminClient
      .from('lead_notes')
      .select(`
        *,
        admins(id, full_name)
      `)
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

// ============================================================
// GET LEAD ATTACHMENTS
// ============================================================
export async function getLeadAttachments(leadId: string) {
  try {
    const { adminClient } = await requireAdmin()

    const { data, error } = await adminClient
      .from('lead_attachments')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

// ============================================================
// GET SIGNED URL FOR ATTACHMENT
// ============================================================
export async function getAttachmentSignedUrl(filePath: string): Promise<string | null> {
  try {
    const { adminClient } = await requireAdmin()

    const { data, error } = await adminClient.storage
      .from('lead-attachments')
      .createSignedUrl(filePath, 3600) // 1 hour expiry

    if (error || !data) return null
    return data.signedUrl
  } catch {
    return null
  }
}

// ============================================================
// UPDATE LEAD
// ============================================================
export async function updateLead(
  leadId: string,
  formData: unknown
): Promise<ActionResult> {
  try {
    const { admin, adminClient } = await requireAdmin()

    const parsed = leadUpdateSchema.safeParse(formData)
    if (!parsed.success) {
      return { success: false, error: 'Invalid data provided.' }
    }

    const data = parsed.data

    // Get current lead for comparison
    const { data: currentLead } = await adminClient
      .from('leads')
      .select('status, priority, assigned_to')
      .eq('id', leadId)
      .single()

    if (!currentLead) {
      return { success: false, error: 'Lead not found.' }
    }

    const { error } = await adminClient
      .from('leads')
      .update(data)
      .eq('id', leadId)

    if (error) {
      console.error('updateLead error:', error)
      return { success: false, error: 'Could not update lead.' }
    }

    // Record activities for important changes
    const activities = []

    if (data.status && data.status !== currentLead.status) {
      activities.push({
        lead_id: leadId,
        admin_id: admin.id,
        activity_type: 'STATUS_CHANGED' as const,
        description: `Status changed from ${currentLead.status} to ${data.status}`,
        metadata: { from: currentLead.status, to: data.status },
      })
    }

    if (data.priority && data.priority !== currentLead.priority) {
      activities.push({
        lead_id: leadId,
        admin_id: admin.id,
        activity_type: 'PRIORITY_CHANGED' as const,
        description: `Priority changed to ${data.priority}`,
        metadata: { from: currentLead.priority, to: data.priority },
      })
    }

    if ('assigned_to' in data && data.assigned_to !== currentLead.assigned_to) {
      activities.push({
        lead_id: leadId,
        admin_id: admin.id,
        activity_type: 'ASSIGNED' as const,
        description: `Lead reassigned`,
        metadata: { from: currentLead.assigned_to, to: data.assigned_to },
      })
    }

    if (activities.length > 0) {
      await adminClient.from('lead_activities').insert(activities)
    }

    return { success: true }
  } catch (err) {
    console.error('updateLead error:', err)
    return { success: false, error: 'Update failed.' }
  }
}

// ============================================================
// ADD LEAD NOTE
// ============================================================
export async function addLeadNote(
  leadId: string,
  formData: unknown
): Promise<ActionResult> {
  try {
    const { admin, adminClient } = await requireAdmin()

    const parsed = leadNoteSchema.safeParse(formData)
    if (!parsed.success) {
      return { success: false, error: 'Invalid note.' }
    }

    const { error: noteError } = await adminClient.from('lead_notes').insert({
      lead_id: leadId,
      admin_id: admin.id,
      note: parsed.data.note,
    })

    if (noteError) {
      return { success: false, error: 'Could not save note.' }
    }

    // Record activity
    await adminClient.from('lead_activities').insert({
      lead_id: leadId,
      admin_id: admin.id,
      activity_type: 'ADMIN_NOTE',
      description: `Note added by ${admin.full_name}`,
      metadata: { preview: parsed.data.note.slice(0, 100) },
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Could not save note.' }
  }
}

// ============================================================
// GET ALL ADMINS (for assignment)
// ============================================================
export async function getAdmins() {
  try {
    const { adminClient } = await requireAdmin()
    const { data, error } = await adminClient
      .from('admins')
      .select('id, full_name, email, role')
      .eq('is_active', true)
      .order('full_name', { ascending: true })

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

// ============================================================
// GET ALL SERVICES (Admin)
// ============================================================
export async function getAdminServices() {
  try {
    const { adminClient } = await requireAdmin()
    const { data, error } = await adminClient
      .from('services')
      .select(`*, service_categories(id, name)`)
      .order('sort_order', { ascending: true })

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

// ============================================================
// GET ALL CATEGORIES (Admin)
// ============================================================
export async function getAdminCategories() {
  try {
    const { adminClient } = await requireAdmin()
    const { data, error } = await adminClient
      .from('service_categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

// ============================================================
// CREATE / UPDATE SERVICE
// ============================================================
export async function upsertService(
  formData: unknown,
  serviceId?: string
): Promise<ActionResult<{ id: string }>> {
  try {
    const { adminClient } = await requireAdmin()

    const parsed = serviceSchema.safeParse(formData)
    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as string
        if (!fieldErrors[field]) fieldErrors[field] = []
        fieldErrors[field].push(issue.message)
      }
      return { success: false, error: 'Validation failed', fieldErrors }
    }

    if (serviceId) {
      const { error } = await adminClient
        .from('services')
        .update(parsed.data)
        .eq('id', serviceId)

      if (error) return { success: false, error: 'Could not update service.' }
      return { success: true, data: { id: serviceId } }
    } else {
      const { data, error } = await adminClient
        .from('services')
        .insert(parsed.data)
        .select('id')
        .single()

      if (error || !data) return { success: false, error: 'Could not create service.' }
      return { success: true, data: { id: data.id } }
    }
  } catch {
    return { success: false, error: 'Operation failed.' }
  }
}

// ============================================================
// CREATE / UPDATE CATEGORY
// ============================================================
export async function upsertCategory(
  formData: unknown,
  categoryId?: string
): Promise<ActionResult<{ id: string }>> {
  try {
    const { adminClient } = await requireAdmin()

    const parsed = categorySchema.safeParse(formData)
    if (!parsed.success) {
      return { success: false, error: 'Validation failed.' }
    }

    if (categoryId) {
      const { error } = await adminClient
        .from('service_categories')
        .update(parsed.data)
        .eq('id', categoryId)

      if (error) return { success: false, error: 'Could not update category.' }
      return { success: true, data: { id: categoryId } }
    } else {
      const { data, error } = await adminClient
        .from('service_categories')
        .insert(parsed.data)
        .select('id')
        .single()

      if (error || !data) return { success: false, error: 'Could not create category.' }
      return { success: true, data: { id: data.id } }
    }
  } catch {
    return { success: false, error: 'Operation failed.' }
  }
}

// ============================================================
// GET ALL SERVICE AREAS (Admin)
// ============================================================
export async function getAdminServiceAreas() {
  try {
    const { adminClient } = await requireAdmin()
    const { data, error } = await adminClient
      .from('service_areas')
      .select('*')
      .order('name', { ascending: true })

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

// ============================================================
// UPSERT SERVICE AREA
// ============================================================
export async function upsertServiceArea(
  formData: unknown,
  areaId?: string
): Promise<ActionResult<{ id: string }>> {
  try {
    const { adminClient } = await requireAdmin()

    const parsed = serviceAreaSchema.safeParse(formData)
    if (!parsed.success) {
      return { success: false, error: 'Validation failed.' }
    }

    if (areaId) {
      const { error } = await adminClient
        .from('service_areas')
        .update(parsed.data)
        .eq('id', areaId)

      if (error) return { success: false, error: 'Could not update area.' }
      return { success: true, data: { id: areaId } }
    } else {
      const { data, error } = await adminClient
        .from('service_areas')
        .insert(parsed.data)
        .select('id')
        .single()

      if (error || !data) return { success: false, error: 'Could not create area.' }
      return { success: true, data: { id: data.id } }
    }
  } catch {
    return { success: false, error: 'Operation failed.' }
  }
}

// ============================================================
// GET RECENT ACTIVITIES (Dashboard)
// ============================================================
export async function getRecentActivities(limit = 10) {
  try {
    const { adminClient } = await requireAdmin()

    const { data, error } = await adminClient
      .from('lead_activities')
      .select(`
        *,
        leads(lead_number, customer_name),
        admins(full_name)
      `)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

// ============================================================
// GET CURRENT ADMIN PROFILE
// ============================================================
export async function getCurrentAdmin() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const adminClient = createServiceRoleClient()
    const { data } = await adminClient
      .from('admins')
      .select('*')
      .eq('id', user.id)
      .single()

    return data
  } catch {
    return null
  }
}
