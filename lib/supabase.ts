'use client';

import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anon) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars missing — demo form will not persist.');
}

export const supabase = createClient(
  url || 'https://dummy.supabase.co', 
  anon || 'dummy', 
  {
    auth: { persistSession: false },
  }
);
