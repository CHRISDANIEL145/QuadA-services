import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import type { LeadStatus, LeadPriority, ActivityType } from '@/types'

// ============================================================
// Class Merging Utility
// ============================================================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================================
// Date Formatting
// ============================================================
export function formatDate(date: string | Date, pattern = 'dd MMM yyyy') {
  try {
    return format(new Date(date), pattern)
  } catch {
    return 'Invalid date'
  }
}

export function formatDateTime(date: string | Date) {
  try {
    return format(new Date(date), 'dd MMM yyyy, h:mm a')
  } catch {
    return 'Invalid date'
  }
}

export function formatRelative(date: string | Date) {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
  } catch {
    return 'Unknown time'
  }
}

// ============================================================
// Lead Status Display
// ============================================================
export const LEAD_STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  NEW: {
    label: 'New',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  CONTACTED: {
    label: 'Contacted',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
  QUALIFIED: {
    label: 'Qualified',
    color: 'text-violet-700',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
  },
  SITE_VISIT: {
    label: 'Site Visit',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  QUOTATION: {
    label: 'Quotation',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  FOLLOW_UP: {
    label: 'Follow Up',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  CONVERTED: {
    label: 'Converted',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  COMPLETED: {
    label: 'Completed',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  LOST: {
    label: 'Lost',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
  },
}

export const LEAD_PRIORITY_CONFIG: Record<
  LeadPriority,
  { label: string; color: string; bgColor: string }
> = {
  LOW: { label: 'Low', color: 'text-slate-600', bgColor: 'bg-slate-100' },
  MEDIUM: { label: 'Medium', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  HIGH: { label: 'High', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  URGENT: { label: 'Urgent', color: 'text-red-600', bgColor: 'bg-red-100' },
}

// ============================================================
// Activity Icon / Label mapping
// ============================================================
export const ACTIVITY_CONFIG: Record<ActivityType, { label: string; icon: string }> = {
  LEAD_CREATED: { label: 'Lead created', icon: 'plus-circle' },
  STATUS_CHANGED: { label: 'Status updated', icon: 'refresh-cw' },
  ADMIN_NOTE: { label: 'Note added', icon: 'file-text' },
  CUSTOMER_CONTACTED: { label: 'Customer contacted', icon: 'phone' },
  SITE_VISIT_SCHEDULED: { label: 'Site visit scheduled', icon: 'map-pin' },
  QUOTATION_CREATED: { label: 'Quotation created', icon: 'file-text' },
  FOLLOW_UP: { label: 'Follow up recorded', icon: 'clock' },
  CONVERTED: { label: 'Lead converted', icon: 'check-circle' },
  COMPLETED: { label: 'Service completed', icon: 'check-circle-2' },
  CANCELLED: { label: 'Lead cancelled', icon: 'x-circle' },
  ASSIGNED: { label: 'Lead assigned', icon: 'user-check' },
  PRIORITY_CHANGED: { label: 'Priority changed', icon: 'alert-triangle' },
  FILE_UPLOADED: { label: 'File uploaded', icon: 'paperclip' },
  LEAD_UPDATED: { label: 'Lead updated', icon: 'edit-3' },
}

// ============================================================
// File Utilities
// ============================================================
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function isValidFileType(file: File): boolean {
  return ALLOWED_FILE_TYPES.includes(file.type)
}

export function isValidFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE
}

// ============================================================
// Slug Generator
// ============================================================
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// ============================================================
// Lead Status Pipeline
// ============================================================
export const LEAD_STATUS_PIPELINE: LeadStatus[] = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'SITE_VISIT',
  'QUOTATION',
  'FOLLOW_UP',
  'CONVERTED',
  'COMPLETED',
]

export function getStatusIndex(status: LeadStatus): number {
  const idx = LEAD_STATUS_PIPELINE.indexOf(status)
  return idx === -1 ? -1 : idx
}

// ============================================================
// Source Display Labels
// ============================================================
export const SOURCE_LABELS: Record<string, string> = {
  WEBSITE: 'Website',
  GOOGLE: 'Google',
  SOCIAL_MEDIA: 'Social Media',
  REFERRAL: 'Referral',
  DIRECT: 'Direct',
  OTHER: 'Other',
}

