/**
 * lib/services/leads.ts
 * Pure query layer for leads — no 'use server', no auth guards.
 * Functions accept a Supabase client so callers control auth context.
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  Lead,
  LeadActivity,
  LeadNote,
  LeadAttachment,
  LeadFilters,
  DashboardStats,
  LeadStatus,
} from '@/types'

// ============================================================
// LEAD QUERIES
// ============================================================

export interface GetLeadsResult {
  leads: Lead[]
  total: number
}

export async function queryLeads(
  supabase: SupabaseClient,
  filters: LeadFilters = {}
): Promise<GetLeadsResult> {
  const {
    search,
    status,
    priority,
    service_category_id,
    service_id,
    assigned_to,
    source,
    date_from,
    date_to,
    page = 1,
    page_size = 20,
  } = filters

  let query = supabase
    .from('leads')
    .select(
      `
      *,
      service_categories(id, name, slug),
      services(id, name, slug),
      admins(id, full_name, email)
    `,
      { count: 'exact' }
    )

  if (search) {
    query = query.or(
      `customer_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%,lead_number.ilike.%${search}%,requirement.ilike.%${search}%`
    )
  }
  if (status) query = query.eq('status', status)
  if (priority) query = query.eq('priority', priority)
  if (service_category_id) query = query.eq('service_category_id', service_category_id)
  if (service_id) query = query.eq('service_id', service_id)
  if (assigned_to) query = query.eq('assigned_to', assigned_to)
  if (source) query = query.eq('source', source)
  if (date_from) query = query.gte('created_at', date_from)
  if (date_to) query = query.lte('created_at', `${date_to}T23:59:59Z`)

  const from = (page - 1) * page_size
  const to = from + page_size - 1

  query = query.order('created_at', { ascending: false }).range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error('[leads.queryLeads]', error.message)
    return { leads: [], total: 0 }
  }

  return { leads: (data as Lead[]) || [], total: count || 0 }
}

// ============================================================
// SINGLE LEAD
// ============================================================

export async function queryLead(
  supabase: SupabaseClient,
  id: string
): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .select(
      `
      *,
      service_categories(id, name, slug, description),
      services(id, name, slug, short_description),
      admins(id, full_name, email, role)
    `
    )
    .eq('id', id)
    .single()

  if (error || !data) {
    if (error?.code !== 'PGRST116') console.error('[leads.queryLead]', error?.message)
    return null
  }
  return data as Lead
}

// ============================================================
// LEAD BY LEAD NUMBER
// ============================================================

export async function queryLeadByNumber(
  supabase: SupabaseClient,
  leadNumber: string
): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .select(
      `
      *,
      service_categories(id, name, slug),
      services(id, name, slug),
      admins(id, full_name, email)
    `
    )
    .eq('lead_number', leadNumber)
    .single()

  if (error || !data) return null
  return data as Lead
}

// ============================================================
// LEAD ACTIVITIES
// ============================================================

export async function queryLeadActivities(
  supabase: SupabaseClient,
  leadId: string
): Promise<LeadActivity[]> {
  const { data, error } = await supabase
    .from('lead_activities')
    .select(
      `
      *,
      admins(id, full_name, role)
    `
    )
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[leads.queryLeadActivities]', error.message)
    return []
  }
  return (data as LeadActivity[]) || []
}

// ============================================================
// LEAD NOTES
// ============================================================

export async function queryLeadNotes(
  supabase: SupabaseClient,
  leadId: string
): Promise<LeadNote[]> {
  const { data, error } = await supabase
    .from('lead_notes')
    .select(
      `
      *,
      admins(id, full_name, role)
    `
    )
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[leads.queryLeadNotes]', error.message)
    return []
  }
  return (data as LeadNote[]) || []
}

// ============================================================
// LEAD ATTACHMENTS
// ============================================================

export async function queryLeadAttachments(
  supabase: SupabaseClient,
  leadId: string
): Promise<LeadAttachment[]> {
  const { data, error } = await supabase
    .from('lead_attachments')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[leads.queryLeadAttachments]', error.message)
    return []
  }
  return (data as LeadAttachment[]) || []
}

// ============================================================
// DASHBOARD STATS
// ============================================================

export async function queryDashboardStats(
  supabase: SupabaseClient
): Promise<DashboardStats> {
  const empty: DashboardStats = {
    total: 0, new: 0, contacted: 0, qualified: 0,
    site_visit: 0, quotation: 0, follow_up: 0,
    converted: 0, completed: 0, lost: 0, cancelled: 0,
  }

  const { data, error } = await supabase
    .from('leads')
    .select('status')

  if (error || !data) {
    console.error('[leads.queryDashboardStats]', error?.message)
    return empty
  }

  return data.reduce((acc, row) => {
    acc.total++
    const s = row.status as LeadStatus
    if (s === 'NEW') acc.new++
    else if (s === 'CONTACTED') acc.contacted++
    else if (s === 'QUALIFIED') acc.qualified++
    else if (s === 'SITE_VISIT') acc.site_visit++
    else if (s === 'QUOTATION') acc.quotation++
    else if (s === 'FOLLOW_UP') acc.follow_up++
    else if (s === 'CONVERTED') acc.converted++
    else if (s === 'COMPLETED') acc.completed++
    else if (s === 'LOST') acc.lost++
    else if (s === 'CANCELLED') acc.cancelled++
    return acc
  }, { ...empty })
}

// ============================================================
// LEADS BY CATEGORY (for dashboard chart)
// ============================================================

export async function queryLeadsByCategory(
  supabase: SupabaseClient
): Promise<Array<{ category_name: string; count: number }>> {
  const { data, error } = await supabase
    .from('leads')
    .select(`
      service_category_id,
      service_categories(name)
    `)

  if (error || !data) return []

  const counts: Record<string, { name: string; count: number }> = {}
  for (const row of data) {
    const id = row.service_category_id || 'unknown'
    const name = (row as { service_categories?: { name: string } }).service_categories?.name || 'Other'
    if (!counts[id]) counts[id] = { name, count: 0 }
    counts[id].count++
  }

  return Object.values(counts)
    .map(({ name, count }) => ({ category_name: name, count }))
    .sort((a, b) => b.count - a.count)
}

// ============================================================
// RECENT ACTIVITIES (Dashboard feed)
// ============================================================

export async function queryRecentActivities(
  supabase: SupabaseClient,
  limit = 10
) {
  const { data, error } = await supabase
    .from('lead_activities')
    .select(`
      *,
      leads(id, lead_number, customer_name),
      admins(id, full_name)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[leads.queryRecentActivities]', error.message)
    return []
  }
  return data || []
}

// ============================================================
// URGENT LEADS (priority=URGENT, status not CONVERTED/COMPLETED/LOST/CANCELLED)
// ============================================================

export async function queryUrgentLeads(
  supabase: SupabaseClient,
  limit = 5
): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select(`
      *,
      service_categories(id, name, slug),
      services(id, name, slug),
      admins(id, full_name)
    `)
    .eq('priority', 'URGENT')
    .not('status', 'in', '("CONVERTED","COMPLETED","LOST","CANCELLED")')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[leads.queryUrgentLeads]', error.message)
    return []
  }
  return (data as Lead[]) || []
}

// ============================================================
// UPDATE LEAD (returns updated lead)
// ============================================================

export async function mutateUpdateLead(
  supabase: SupabaseClient,
  leadId: string,
  updates: Partial<Pick<Lead,
    | 'status' | 'priority' | 'assigned_to'
    | 'location' | 'address'
    | 'preferred_date' | 'preferred_time'
    | 'budget' | 'customer_name' | 'phone' | 'email'
  >>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('leads')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', leadId)

  if (error) {
    console.error('[leads.mutateUpdateLead]', error.message)
    return { success: false, error: error.message }
  }
  return { success: true }
}

// ============================================================
// ADD NOTE
// ============================================================

export async function mutateAddNote(
  supabase: SupabaseClient,
  leadId: string,
  adminId: string,
  note: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('lead_notes').insert({
    lead_id: leadId,
    admin_id: adminId,
    note: note.trim(),
  })

  if (error) {
    console.error('[leads.mutateAddNote]', error.message)
    return { success: false, error: error.message }
  }
  return { success: true }
}

// ============================================================
// LOG ACTIVITY
// ============================================================

export async function mutateLogActivity(
  supabase: SupabaseClient,
  payload: {
    lead_id: string
    admin_id?: string | null
    activity_type: string
    description: string
    metadata?: Record<string, unknown>
  }
): Promise<void> {
  const { error } = await supabase.from('lead_activities').insert({
    ...payload,
    admin_id: payload.admin_id ?? null,
    metadata: payload.metadata ?? {},
  })
  if (error) console.error('[leads.mutateLogActivity]', error.message)
}

// ============================================================
// DELETE LEAD (super admin only)
// ============================================================

export async function mutateDeleteLead(
  supabase: SupabaseClient,
  leadId: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('leads').delete().eq('id', leadId)
  if (error) {
    console.error('[leads.mutateDeleteLead]', error.message)
    return { success: false, error: error.message }
  }
  return { success: true }
}

// ============================================================
// SIGNED URL for attachment
// ============================================================

export async function queryAttachmentSignedUrl(
  supabase: SupabaseClient,
  filePath: string,
  expiresIn = 3600
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from('lead-attachments')
    .createSignedUrl(filePath, expiresIn)

  if (error || !data) return null
  return data.signedUrl
}
