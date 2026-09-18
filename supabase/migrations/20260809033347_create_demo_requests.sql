/*
# Create demo_requests table

1. New Tables
- `demo_requests`
  - `id` (uuid, primary key)
  - `name` (text, not null) — requester's full name
  - `shop_name` (text, not null) — repair shop name
  - `phone` (text, not null) — phone / WhatsApp number
  - `email` (text, nullable) — optional email
  - `staff_count` (text, not null) — selected staff-size bucket (1-2, 3-5, 6-10, 10+)
  - `message` (text, nullable) — optional message
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `demo_requests`.
- No sign-in screen on this marketing site, so the public form submits as `anon`.
- Allow anon + authenticated INSERT only (the form only writes, never reads from the client).
- No SELECT/UPDATE/DELETE policies: operators retrieve submissions server-side.
*/

CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  shop_name text NOT NULL,
  phone text NOT NULL,
  email text,
  staff_count text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_demo_requests" ON demo_requests;
CREATE POLICY "anon_insert_demo_requests"
ON demo_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);
