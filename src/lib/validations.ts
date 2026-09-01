import { z } from 'zod'

// ============================================================
// Enquiry / Lead Submission Schema
// ============================================================
export const enquirySchema = z.object({
  customer_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .trim(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(200, 'Email is too long')
    .optional()
    .or(z.literal('')),
  service_category_id: z.string().uuid('Invalid category').optional().or(z.literal('')),
  service_id: z.string().uuid('Invalid service').optional().or(z.literal('')),
  location: z.string().max(100, 'Location is too long').optional().or(z.literal('')),
  address: z.string().max(500, 'Address is too long').optional().or(z.literal('')),
  preferred_date: z.string().optional().or(z.literal('')),
  preferred_time: z.string().optional().or(z.literal('')),
  requirement: z
    .string()
    .min(10, 'Please describe your requirement (at least 10 characters)')
    .max(2000, 'Description is too long')
    .trim(),
  budget: z.string().max(100, 'Budget text is too long').optional().or(z.literal('')),
  source: z
    .enum(['WEBSITE', 'GOOGLE', 'SOCIAL_MEDIA', 'REFERRAL', 'DIRECT', 'OTHER'])
    .optional()
    .default('WEBSITE'),
  custom_fields: z.record(z.string().max(500)).optional().default({}),
  honeypot: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
})

export type EnquirySchema = z.infer<typeof enquirySchema>

// ============================================================
// Contact Form Schema
// ============================================================
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .trim(),
  email: z.string().email('Please enter a valid email address').max(200).trim(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long')
    .trim(),
})

export type ContactSchema = z.infer<typeof contactSchema>

// ============================================================
// Admin Login Schema
// ============================================================
export const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>

// ============================================================
// Lead Update Schema (Admin)
// ============================================================
export const leadUpdateSchema = z.object({
  status: z
    .enum([
      'NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT',
      'QUOTATION', 'FOLLOW_UP', 'CONVERTED', 'COMPLETED', 'LOST', 'CANCELLED',
    ])
    .optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  assigned_to: z.string().uuid().nullable().optional(),
  location: z.string().max(100).optional(),
  address: z.string().max(500).optional(),
  preferred_date: z.string().nullable().optional(),
  preferred_time: z.string().nullable().optional(),
  budget: z.string().max(100).optional(),
})

export type LeadUpdateSchema = z.infer<typeof leadUpdateSchema>

// ============================================================
// Lead Note Schema
// ============================================================
export const leadNoteSchema = z.object({
  note: z
    .string()
    .min(1, 'Note cannot be empty')
    .max(2000, 'Note is too long')
    .trim(),
})

export type LeadNoteSchema = z.infer<typeof leadNoteSchema>

// ============================================================
// Service Schema (Admin CRUD)
// ============================================================
export const serviceSchema = z.object({
  category_id: z.string().uuid('Please select a valid category'),
  name: z.string().min(2).max(200).trim(),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only')
    .min(2)
    .max(200),
  short_description: z.string().max(300).optional().or(z.literal('')),
  description: z.string().max(5000).optional().or(z.literal('')),
  image_url: z.string().url().optional().or(z.literal('')),
  display_price: z.string().max(100).optional().or(z.literal('')),
  pricing_type: z.enum(['fixed', 'from', 'range', 'quote']).default('quote'),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().min(0).default(0),
})

export type ServiceSchema = z.infer<typeof serviceSchema>

// ============================================================
// Category Schema (Admin CRUD)
// ============================================================
export const categorySchema = z.object({
  name: z.string().min(2).max(200).trim(),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only')
    .min(2)
    .max(200),
  description: z.string().max(1000).optional().or(z.literal('')),
  image_url: z.string().url().optional().or(z.literal('')),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().min(0).default(0),
})

export type CategorySchema = z.infer<typeof categorySchema>

// ============================================================
// Service Area Schema (Admin CRUD)
// ============================================================
export const serviceAreaSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  state: z.string().min(2).max(100).trim().default('Tamil Nadu'),
  is_active: z.boolean().default(true),
})

export type ServiceAreaSchema = z.infer<typeof serviceAreaSchema>
