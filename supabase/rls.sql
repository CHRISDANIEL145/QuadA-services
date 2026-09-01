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
-- EVENT TRIGGER: Automatically Enable RLS on New Tables
-- ============================================================

CREATE OR REPLACE FUNCTION enable_rls_on_new_table()
RETURNS event_trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    obj record;
BEGIN
    FOR obj IN SELECT * FROM pg_event_trigger_ddl_commands() WHERE command_tag = 'CREATE TABLE'
    LOOP
        IF obj.schema_name = 'public' THEN
            EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY;', obj.object_identity);
        END IF;
    END LOOP;
END;
$$;

DROP EVENT TRIGGER IF EXISTS trg_enable_rls_on_new_table;
CREATE EVENT TRIGGER trg_enable_rls_on_new_table
ON ddl_command_end
WHEN TAG IN ('CREATE TABLE')
EXECUTE FUNCTION enable_rls_on_new_table();
