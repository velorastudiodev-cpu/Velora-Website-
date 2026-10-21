CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  name TEXT NOT NULL,
  business_name TEXT,
  email TEXT NOT NULL,
  whatsapp TEXT,
  service_type TEXT NOT NULL,
  selected_package TEXT,
  budget_range TEXT,
  target_date TEXT,
  reference_url TEXT,
  brief TEXT NOT NULL,
  additional_context TEXT,
  privacy_consent_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewed','contacted','proposal_sent','won','lost','archived')),
  internal_notes TEXT,
  source TEXT
);
CREATE INDEX IF NOT EXISTS leads_status_created_idx ON leads(status, created_at DESC);

-- Optional content tables for the protected Phase 4 admin. Keep them server-side
-- and publish only records marked is_published.
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  cover_image TEXT,
  challenge TEXT,
  solution TEXT,
  outcome TEXT,
  stack TEXT,
  is_concept INTEGER NOT NULL DEFAULT 1,
  is_featured INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS packages (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  summary TEXT NOT NULL,
  price_type TEXT NOT NULL CHECK (price_type IN ('fixed','starting_from','custom','consultation')),
  price_amount INTEGER,
  currency TEXT NOT NULL DEFAULT 'IDR',
  features TEXT NOT NULL,
  exclusions TEXT,
  recommended INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
