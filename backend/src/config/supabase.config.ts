import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey: string = process.env.SUPABASE_KEY || 'YOUR_SUPABASE_KEY';

let supabase: SupabaseClient;

function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
  }
  return supabase;
}

export { getSupabaseClient };
