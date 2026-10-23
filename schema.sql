-- Velora Studio v2.0 — Production PostgreSQL Schema (Supabase)
-- Aligned with VELORA_STUDIO_PRD_REVISI.md Sections 6 & 9

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 120),
  business_name TEXT,
  email TEXT NOT NULL CHECK (char_length(trim(email)) BETWEEN 5 AND 180),
  whatsapp TEXT,
  service_type TEXT NOT NULL CHECK (service_type IN ('website', 'aplikasi', 'sistem', 'cms', 'maintenance', 'lainnya')),
  selected_package TEXT,
  selected_addons JSONB NOT NULL DEFAULT '[]'::jsonb,
  budget_range TEXT,
  target_date TEXT,
  reference_url TEXT,
  brief TEXT NOT NULL CHECK (char_length(trim(brief)) BETWEEN 20 AND 4000),
  additional_context TEXT,
  privacy_consent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'proposal_sent', 'won', 'lost', 'archived')),
  internal_notes TEXT,
  source TEXT DEFAULT 'web_mulai_proyek',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- Zero public policies: all reads/writes execute strictly on the server via SUPABASE_SERVICE_ROLE_KEY.
