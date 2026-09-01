// ============================================================
// QuadA Services — Core Domain Types
// ============================================================

export type AdminRole = 'super_admin' | 'admin' | 'manager' | 'staff'

export interface Admin {
  id: string
  email: string
  full_name: string
  role: AdminRole
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type PricingType = 'fixed' | 'from' | 'range' | 'quote'

export interface ServiceEnquiryFieldOption {
  label: string
  value: string
}

export interface ServiceEnquiryField {
  name: string
  label: string
  type: 'text' | 'select' | 'textarea' | 'number' | 'date'
  options?: string[]
  required: boolean
  placeholder?: string
}

export interface ServiceEnquiryConfig {
  custom_fields?: ServiceEnquiryField[]
}

export interface Service {
  id: string
  category_id: string
  name: string
  slug: string
  short_description: string | null
  description: string | null
  image_url: string | null
  gallery: string[]
  display_price: string | null
  pricing_type: PricingType
  enquiry_config: ServiceEnquiryConfig
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
  // Joined
  service_categories?: ServiceCategory
}

export interface ServiceArea {
  id: string
  name: string
  state: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'SITE_VISIT'
  | 'QUOTATION'
  | 'FOLLOW_UP'
  | 'CONVERTED'
  | 'COMPLETED'
  | 'LOST'
  | 'CANCELLED'

export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export type LeadSource =
  | 'WEBSITE'
  | 'GOOGLE'
  | 'SOCIAL_MEDIA'
  | 'REFERRAL'
  | 'DIRECT'
  | 'OTHER'

export interface Lead {
  id: string
  lead_number: string
  customer_name: string
  phone: string
  email: string | null
  service_category_id: string | null
  service_id: string | null
  location: string | null
  address: string | null
  preferred_date: string | null
  preferred_time: string | null
  requirement: string
  budget: string | null
  source: LeadSource
  status: LeadStatus
  priority: LeadPriority
  assigned_to: string | null
  custom_fields: Record<string, string>
  created_at: string
  updated_at: string
  // Joined
  service_categories?: ServiceCategory | null
  services?: Service | null
  admins?: Admin | null
}

export interface LeadAttachment {
  id: string
  lead_id: string
  file_name: string
  file_path: string
  file_type: string
  file_size: number
  created_at: string
}

export interface LeadNote {
  id: string
  lead_id: string
  admin_id: string
  note: string
  created_at: string
  // Joined
  admins?: Admin
}

export type ActivityType =
  | 'LEAD_CREATED'
  | 'STATUS_CHANGED'
  | 'ADMIN_NOTE'
  | 'CUSTOMER_CONTACTED'
  | 'SITE_VISIT_SCHEDULED'
  | 'QUOTATION_CREATED'
  | 'FOLLOW_UP'
  | 'CONVERTED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'ASSIGNED'
  | 'PRIORITY_CHANGED'
  | 'FILE_UPLOADED'
  | 'LEAD_UPDATED'

export interface LeadActivity {
  id: string
  lead_id: string
  admin_id: string | null
  activity_type: ActivityType
  description: string
  metadata: Record<string, unknown>
  created_at: string
  // Joined
  admins?: Admin | null
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  is_read: boolean
  created_at: string
}

// ============================================================
// Form / Server Action Types
// ============================================================

export interface EnquiryFormData {
  customer_name: string
  phone: string
  email?: string
  service_category_id?: string
  service_id?: string
  location?: string
  address?: string
  preferred_date?: string
  preferred_time?: string
  requirement: string
  budget?: string
  source?: LeadSource
  custom_fields?: Record<string, string>
  honeypot?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ActionResult<T = null> {
  success: boolean
  data?: T
  error?: string
  fieldErrors?: Record<string, string[]>
}

// ============================================================
// Dashboard / KPI Types
// ============================================================

export interface DashboardStats {
  total: number
  new: number
  contacted: number
  qualified: number
  site_visit: number
  quotation: number
  follow_up: number
  converted: number
  completed: number
  lost: number
  cancelled: number
}

export interface LeadFilters {
  search?: string
  status?: LeadStatus
  priority?: LeadPriority
  service_category_id?: string
  service_id?: string
  assigned_to?: string
  source?: LeadSource
  date_from?: string
  date_to?: string
  page?: number
  page_size?: number
}
