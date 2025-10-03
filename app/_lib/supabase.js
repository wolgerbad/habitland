import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://rljtedqznarkjuoetszf.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsanRlZHF6bmFya2p1b2V0c3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNjM5MTUsImV4cCI6MjA3MzYzOTkxNX0.dvuEmxdlY4q23Er41xMPyXy0UPYQPGxrh8tMwlaixsE';

export const supabase = createClient(supabaseUrl, supabaseKey);
