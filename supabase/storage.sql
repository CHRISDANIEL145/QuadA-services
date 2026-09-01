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
