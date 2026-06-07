-- Adds the public contact form inbox table.
-- Run in Supabase SQL editor, or run `npm run db:push` after reviewing.

CREATE TABLE IF NOT EXISTS contact_submissions (
  id serial PRIMARY KEY,
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  subject text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at text NOT NULL DEFAULT ''
);
