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
-- ============================================================
-- QuadA Services — Row Level Security Policies
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- HELPER FUNCTION: Check if user is admin
-- ============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE id = auth.uid()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- HELPER FUNCTION: Check if user is super_admin
-- ============================================================
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE id = auth.uid()
    AND role = 'super_admin'
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- ADMINS TABLE POLICIES
-- ============================================================

-- Admins can read their own profile
CREATE POLICY "admins_read_own"
  ON admins FOR SELECT
  USING (id = auth.uid() AND is_active = true);

-- Admins can read all admin profiles (for assignment dropdowns)
CREATE POLICY "admins_read_all_active"
  ON admins FOR SELECT
  USING (is_admin() AND is_active = true);

-- Only super_admin can insert new admins
CREATE POLICY "admins_insert_super_admin"
  ON admins FOR INSERT
  WITH CHECK (is_super_admin());

-- Admins can update own profile; super_admin can update any
CREATE POLICY "admins_update_own"
  ON admins FOR UPDATE
  USING (id = auth.uid() OR is_super_admin())
  WITH CHECK (id = auth.uid() OR is_super_admin());

-- Only super_admin can delete admins
CREATE POLICY "admins_delete_super_admin"
  ON admins FOR DELETE
  USING (is_super_admin());

-- ============================================================
-- SERVICE CATEGORIES POLICIES
-- ============================================================

-- Public: Read active categories only
CREATE POLICY "categories_public_read_active"
  ON service_categories FOR SELECT
  USING (is_active = true);

-- Admin: Read all categories
CREATE POLICY "categories_admin_read_all"
  ON service_categories FOR SELECT
  USING (is_admin());

-- Admin: Full write access
CREATE POLICY "categories_admin_insert"
  ON service_categories FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "categories_admin_update"
  ON service_categories FOR UPDATE
  USING (is_admin());

CREATE POLICY "categories_admin_delete"
  ON service_categories FOR DELETE
  USING (is_super_admin());

-- ============================================================
-- SERVICES POLICIES
-- ============================================================

-- Public: Read active services only
CREATE POLICY "services_public_read_active"
  ON services FOR SELECT
  USING (is_active = true);

-- Admin: Read all services
CREATE POLICY "services_admin_read_all"
  ON services FOR SELECT
  USING (is_admin());

-- Admin: Full write access
CREATE POLICY "services_admin_insert"
  ON services FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "services_admin_update"
  ON services FOR UPDATE
  USING (is_admin());

CREATE POLICY "services_admin_delete"
  ON services FOR DELETE
  USING (is_super_admin());

-- ============================================================
-- SERVICE AREAS POLICIES
-- ============================================================

-- Public: Read active areas
CREATE POLICY "areas_public_read_active"
  ON service_areas FOR SELECT
  USING (is_active = true);

-- Admin: Read all
CREATE POLICY "areas_admin_read_all"
  ON service_areas FOR SELECT
  USING (is_admin());

-- Admin: Full write
CREATE POLICY "areas_admin_insert"
  ON service_areas FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "areas_admin_update"
  ON service_areas FOR UPDATE
  USING (is_admin());

CREATE POLICY "areas_admin_delete"
  ON service_areas FOR DELETE
  USING (is_super_admin());

-- ============================================================
-- LEADS POLICIES
-- Public can INSERT (submit enquiry) but cannot SELECT/UPDATE/DELETE
-- Admins have full access
-- ============================================================

-- Public: Submit enquiry (INSERT only)
-- Note: honeypot and status are overridden server-side — public cannot set privileged fields
CREATE POLICY "leads_public_insert"
  ON leads FOR INSERT
  WITH CHECK (
    -- Public submissions must have status NEW and no admin assignment
    status = 'NEW' AND
    assigned_to IS NULL AND
    -- Honeypot must be empty (spam check)
    (honeypot IS NULL OR honeypot = '')
  );

-- Admin: Full read/write
CREATE POLICY "leads_admin_select"
  ON leads FOR SELECT
  USING (is_admin());

CREATE POLICY "leads_admin_update"
  ON leads FOR UPDATE
  USING (is_admin());

CREATE POLICY "leads_admin_delete"
  ON leads FOR DELETE
  USING (is_super_admin());

-- ============================================================
-- LEAD ATTACHMENTS POLICIES
-- ============================================================

-- Public: Insert only (no read)
CREATE POLICY "attachments_public_insert"
  ON lead_attachments FOR INSERT
  WITH CHECK (true);

-- Admin: Full read/write
CREATE POLICY "attachments_admin_select"
  ON lead_attachments FOR SELECT
  USING (is_admin());

CREATE POLICY "attachments_admin_delete"
  ON lead_attachments FOR DELETE
  USING (is_admin());

-- ============================================================
-- LEAD NOTES POLICIES
-- Admin only — no public access
-- ============================================================

CREATE POLICY "notes_admin_all"
  ON lead_notes FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- ============================================================
-- LEAD ACTIVITIES POLICIES
-- Admin only — no public access
-- ============================================================

CREATE POLICY "activities_admin_select"
  ON lead_activities FOR SELECT
  USING (is_admin());

CREATE POLICY "activities_admin_insert"
  ON lead_activities FOR INSERT
  WITH CHECK (is_admin());

-- Activities are immutable — no UPDATE or DELETE

-- ============================================================
-- CONTACT MESSAGES POLICIES
-- ============================================================

-- Public: Submit message only
CREATE POLICY "contact_public_insert"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Admin: Full read/write
CREATE POLICY "contact_admin_all"
  ON contact_messages FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());
-- ============================================================
-- QuadA Services — Supabase Storage Setup
-- Run in Supabase SQL Editor AFTER schema.sql
-- ============================================================

-- Create the lead-attachments bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lead-attachments',
  'lead-attachments',
  false,
  10485760, -- 10MB max file size
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- STORAGE RLS POLICIES
-- ============================================================

-- Public can upload (INSERT) to lead-attachments bucket
-- Path pattern: LEAD-XXXXXX/{filename}
CREATE POLICY "storage_public_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'lead-attachments' AND
    auth.role() = 'anon'
  );

-- Admins can read all files in lead-attachments
CREATE POLICY "storage_admin_read"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'lead-attachments' AND
    is_admin()
  );

-- Admins can delete files
CREATE POLICY "storage_admin_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'lead-attachments' AND
    is_admin()
  );
-- ============================================================
-- QuadA Services — Seed Data
-- Run AFTER schema.sql and rls.sql
-- This is development/demo seed data only
-- ============================================================

-- ============================================================
-- SERVICE CATEGORIES
-- ============================================================
INSERT INTO service_categories (id, name, slug, description, sort_order, is_active) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Home & Maintenance', 'home-maintenance', 'Complete home repair, upkeep, and maintenance services for every household need.', 1, true),
  ('10000000-0000-0000-0000-000000000002', 'Cleaning & Housekeeping', 'cleaning-housekeeping', 'Professional cleaning services for homes, offices, and commercial spaces.', 2, true),
  ('10000000-0000-0000-0000-000000000003', 'Senior Citizen Assistance', 'senior-citizen-assistance', 'Compassionate support services designed specifically for elderly individuals.', 3, true),
  ('10000000-0000-0000-0000-000000000004', 'Child Care & Tuition', 'child-care-tuition', 'Trusted child care and educational support for families.', 4, true),
  ('10000000-0000-0000-0000-000000000005', 'Personal & Doorstep Services', 'personal-doorstep-services', 'Convenient services brought directly to your door.', 5, true),
  ('10000000-0000-0000-0000-000000000006', 'Interior & Renovation', 'interior-renovation', 'Expert interior design, furnishing, and renovation services.', 6, true),
  ('10000000-0000-0000-0000-000000000007', 'Real Estate & Property', 'real-estate-property', 'Professional real estate assistance for buying, selling, and rental needs.', 7, true),
  ('10000000-0000-0000-0000-000000000008', 'Office & Corporate Services', 'office-corporate-services', 'Comprehensive support services for businesses and corporate offices.', 8, true),
  ('10000000-0000-0000-0000-000000000009', 'Event & Travel Services', 'event-travel-services', 'End-to-end event planning and travel coordination services.', 9, true),
  ('10000000-0000-0000-0000-000000000010', 'Grocery & Daily Needs', 'grocery-daily-needs', 'Fresh groceries, essentials, and daily supplies delivered to you.', 10, true),
  ('10000000-0000-0000-0000-000000000011', 'Gardening & Farming', 'gardening-farming', 'Professional gardening, landscaping, and farming assistance.', 11, true),
  ('10000000-0000-0000-0000-000000000012', 'On-Demand Services', 'on-demand-services', 'Quick, flexible services available when you need them most.', 12, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SERVICES
-- ============================================================
INSERT INTO services (id, category_id, name, slug, short_description, description, display_price, pricing_type, enquiry_config, sort_order, is_active) VALUES
  -- Home & Maintenance
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Plumbing Repair',
    'plumbing-repair',
    'Fast, reliable plumbing repairs for leaks, blockages, and installations.',
    'Our certified plumbers handle everything from minor leaks to major pipe installations. Available for emergency calls, routine repairs, and new fixture installations across all residential and commercial properties.',
    'Starting from ₹499',
    'from',
    '{"custom_fields": [{"name": "issue_type", "label": "Type of Issue", "type": "select", "options": ["Leak", "Blockage", "Installation", "Other"], "required": true}]}',
    1,
    true
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Electrical Work',
    'electrical-work',
    'Licensed electrical repairs, installations, and safety checks.',
    'Certified electricians for all your electrical needs — wiring, repairs, new installations, safety audits, and emergency services. We ensure all work meets local safety standards.',
    'Starting from ₹599',
    'from',
    '{"custom_fields": [{"name": "work_type", "label": "Type of Work", "type": "select", "options": ["Repair", "New Installation", "Safety Audit", "Emergency"], "required": true}]}',
    2,
    true
  ),
  -- Cleaning
  (
    '20000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000002',
    'Home Deep Cleaning',
    'home-deep-cleaning',
    'Thorough deep cleaning of your entire home by trained professionals.',
    'Our deep cleaning service covers every corner of your home — kitchen, bathrooms, bedrooms, living areas, and more. We use professional-grade equipment and eco-friendly cleaning products.',
    'Starting from ₹1,499',
    'from',
    '{"custom_fields": [{"name": "property_type", "label": "Property Type", "type": "select", "options": ["Apartment", "Independent House", "Villa", "Office"], "required": true}, {"name": "bhk", "label": "Size (BHK)", "type": "select", "options": ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"], "required": true}]}',
    1,
    true
  ),
  (
    '20000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000002',
    'Regular Housekeeping',
    'regular-housekeeping',
    'Trained housekeeping staff for daily, weekly, or monthly schedules.',
    'Professional housekeeping staff available on your preferred schedule. Our staff are background-verified, trained in modern cleaning techniques, and fully insured.',
    'Custom Quote',
    'quote',
    '{"custom_fields": [{"name": "frequency", "label": "Frequency", "type": "select", "options": ["Daily", "Weekly", "Bi-weekly", "Monthly"], "required": true}, {"name": "hours_per_day", "label": "Hours Required", "type": "select", "options": ["2 hours", "4 hours", "6 hours", "Full Day"], "required": true}]}',
    2,
    true
  ),
  -- Senior Care
  (
    '20000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000003',
    'Elder Care Companion',
    'elder-care-companion',
    'Compassionate companionship and assistance for elderly family members.',
    'Trained caregivers provide companionship, medication reminders, meal assistance, and light household help for senior citizens. Available for day, night, or 24-hour shifts.',
    'Custom Quote',
    'quote',
    '{"custom_fields": [{"name": "care_type", "label": "Care Required", "type": "select", "options": ["Companionship", "Medical Assistance", "Mobility Support", "All-round Care"], "required": true}, {"name": "shift", "label": "Shift Required", "type": "select", "options": ["Day (8am-8pm)", "Night (8pm-8am)", "24 Hours"], "required": true}]}',
    1,
    true
  ),
  -- Interior
  (
    '20000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000006',
    'Interior Design Consultation',
    'interior-design-consultation',
    'Expert interior design consultation and project execution for homes and offices.',
    'Our interior design team creates beautiful, functional spaces that reflect your lifestyle and personality. From concept to completion, we handle every detail of your interior project.',
    'Custom Quote',
    'quote',
    '{"custom_fields": [{"name": "project_type", "label": "Project Type", "type": "select", "options": ["New Construction", "Renovation", "Partial Redesign", "Single Room"], "required": true}, {"name": "property_type", "label": "Property Type", "type": "select", "options": ["Apartment", "Villa", "Office", "Commercial Space"], "required": true}, {"name": "area_sqft", "label": "Approximate Area (sq ft)", "type": "text", "required": false}]}',
    1,
    true
  ),
  -- Real Estate
  (
    '20000000-0000-0000-0000-000000000007',
    '10000000-0000-0000-0000-000000000007',
    'Property Buy / Sell Assistance',
    'property-buy-sell',
    'Professional assistance for buying or selling residential and commercial properties.',
    'Our real estate experts guide you through every step of the buying or selling process — property search, legal verification, negotiation, documentation, and registration.',
    'Commission-based',
    'quote',
    '{"custom_fields": [{"name": "transaction_type", "label": "I want to", "type": "select", "options": ["Buy a Property", "Sell a Property", "Both Buy and Sell"], "required": true}, {"name": "property_type", "label": "Property Type", "type": "select", "options": ["Apartment", "Independent House", "Villa", "Plot", "Commercial"], "required": true}]}',
    1,
    true
  ),
  -- Events
  (
    '20000000-0000-0000-0000-000000000008',
    '10000000-0000-0000-0000-000000000009',
    'Event Planning & Management',
    'event-planning',
    'Complete event management for weddings, corporate events, and celebrations.',
    'Our event management team handles end-to-end coordination for events of all sizes — from intimate family gatherings to large corporate conferences and wedding celebrations.',
    'Custom Quote',
    'quote',
    '{"custom_fields": [{"name": "event_type", "label": "Event Type", "type": "select", "options": ["Wedding", "Birthday", "Corporate Event", "Anniversary", "Other"], "required": true}, {"name": "guest_count", "label": "Expected Guests", "type": "select", "options": ["< 50", "50-100", "100-250", "250-500", "500+"], "required": true}]}',
    1,
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SERVICE AREAS
-- ============================================================
INSERT INTO service_areas (name, state, is_active) VALUES
  ('Chennai', 'Tamil Nadu', true),
  ('Coimbatore', 'Tamil Nadu', true),
  ('Madurai', 'Tamil Nadu', true),
  ('Tiruchirappalli', 'Tamil Nadu', true),
  ('Salem', 'Tamil Nadu', true),
  ('Tirunelveli', 'Tamil Nadu', true),
  ('Erode', 'Tamil Nadu', true),
  ('Vellore', 'Tamil Nadu', true),
  ('Thanjavur', 'Tamil Nadu', true),
  ('Dindigul', 'Tamil Nadu', true),
  ('Kancheepuram', 'Tamil Nadu', true),
  ('Tiruppur', 'Tamil Nadu', true)
ON CONFLICT DO NOTHING;
