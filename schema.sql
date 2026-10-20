CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  name TEXT NOT NULL,
  business_name TEXT,
  email TEXT NOT NULL,
  whatsapp TEXT,
  service_type TEXT NOT NULL,
  budget_range TEXT,
  target_date TEXT,
  brief TEXT NOT NULL,
  privacy_consent_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewed','contacted','proposal_sent','won','lost','archived')),
  internal_notes TEXT,
  source TEXT
);
CREATE INDEX IF NOT EXISTS leads_status_created_idx ON leads(status, created_at DESC);
