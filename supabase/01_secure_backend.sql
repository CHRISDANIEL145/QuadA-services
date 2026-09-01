-- ============================================================
-- QuadA Services — Secure Backend Refactor
-- Run this to implement rate limiting, auto-admin creation, 
-- and fix RLS privilege escalation.
-- ============================================================

-- 1. RATE LIMITING TABLE & FUNCTION
CREATE TABLE IF NOT EXISTS public.rate_limits (
  ip_address TEXT PRIMARY KEY,
  submissions INTEGER NOT NULL DEFAULT 1,
  last_submission TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS (No public access by default)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Security Definer function to safely check and increment rate limits
CREATE OR REPLACE FUNCTION public.check_rate_limit(client_ip TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_time TIMESTAMPTZ := NOW();
  record RECORD;
BEGIN
  -- Cleanup old records (older than 1 minute)
  DELETE FROM public.rate_limits WHERE last_submission < current_time - INTERVAL '1 minute';

  SELECT * INTO record FROM public.rate_limits WHERE ip_address = client_ip;
  IF FOUND THEN
    IF record.submissions >= 3 THEN
      RETURN FALSE;
    ELSE
      UPDATE public.rate_limits 
      SET submissions = submissions + 1, last_submission = current_time 
      WHERE ip_address = client_ip;
      RETURN TRUE;
    END IF;
  ELSE
    INSERT INTO public.rate_limits (ip_address, submissions, last_submission) 
    VALUES (client_ip, 1, current_time);
    RETURN TRUE;
  END IF;
END;
$$;

-- Grant execute to anon and authenticated
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT) TO anon, authenticated;

-- ============================================================

-- 2. AUTO-ADMIN CREATION TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.admins (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'New Admin'), 
    'staff'
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================

-- 3. FIX PRIVILEGE ESCALATION IN RLS
-- Revoke global UPDATE on admins table from authenticated users
REVOKE UPDATE ON public.admins FROM authenticated;
REVOKE UPDATE ON public.admins FROM anon;

-- Grant UPDATE only on non-sensitive columns to authenticated users
GRANT UPDATE (full_name, is_active) ON public.admins TO authenticated;
-- Note: updating email usually requires updating auth.users first, so we omit it here for simplicity,
-- or allow it if the app logic syncs it. Let's include email just in case.
GRANT UPDATE (email) ON public.admins TO authenticated;

-- (The role column remains untouched by standard authenticated users, preventing privilege escalation)
