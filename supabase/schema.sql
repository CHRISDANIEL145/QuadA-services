-- ============================================================
-- QuadA Services — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ADMINS TABLE
-- Linked to Supabase Auth users
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'manager', 'staff')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SERVICE CATEGORIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SERVICES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  description TEXT,
  image_url TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  display_price TEXT,
  pricing_type TEXT DEFAULT 'quote' CHECK (pricing_type IN ('fixed', 'from', 'range', 'quote')),
  enquiry_config JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SERVICE AREAS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS service_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Tamil Nadu',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LEAD NUMBER SEQUENCE
-- ============================================================
CREATE SEQUENCE IF NOT EXISTS lead_number_seq START 1;

-- ============================================================
-- LEADS TABLE
-- Core business entity — the product
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_number TEXT NOT NULL UNIQUE DEFAULT 'LEAD-' || LPAD(NEXTVAL('lead_number_seq')::TEXT, 6, '0'),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service_category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  location TEXT,
  address TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  requirement TEXT NOT NULL,
  budget TEXT,
  source TEXT DEFAULT 'WEBSITE' CHECK (source IN ('WEBSITE', 'GOOGLE', 'SOCIAL_MEDIA', 'REFERRAL', 'DIRECT', 'OTHER')),
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (
    status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT', 'QUOTATION', 'FOLLOW_UP', 'CONVERTED', 'COMPLETED', 'LOST', 'CANCELLED')
  ),
  priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
  assigned_to UUID REFERENCES admins(id) ON DELETE SET NULL,
  custom_fields JSONB DEFAULT '{}'::jsonb,
  honeypot TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LEAD ATTACHMENTS TABLE
-- File metadata — actual files in Supabase Storage
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LEAD NOTES TABLE
-- Admin notes per lead
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE RESTRICT,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LEAD ACTIVITIES TABLE
-- Immutable audit trail
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL CHECK (
    activity_type IN (
      'LEAD_CREATED', 'STATUS_CHANGED', 'ADMIN_NOTE', 'CUSTOMER_CONTACTED',
      'SITE_VISIT_SCHEDULED', 'QUOTATION_CREATED', 'FOLLOW_UP',
      'CONVERTED', 'COMPLETED', 'CANCELLED', 'ASSIGNED', 'PRIORITY_CHANGED',
      'FILE_UPLOADED', 'LEAD_UPDATED'
    )
  ),
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CONTACT MESSAGES TABLE
-- General enquiries from /contact page
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_leads_lead_number ON leads(lead_number);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_service_id ON leads(service_id);
CREATE INDEX IF NOT EXISTS idx_leads_category_id ON leads(service_category_id);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_attachments_lead_id ON lead_attachments(lead_id);
CREATE INDEX IF NOT EXISTS idx_services_category_id ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_service_categories_slug ON service_categories(slug);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_categories_updated_at
  BEFORE UPDATE ON service_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_areas_updated_at
  BEFORE UPDATE ON service_areas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
