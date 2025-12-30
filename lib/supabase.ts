import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client for static data fetching (no auth needed)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
