import { createClient } from "@supabase/supabase-js";
import { getClientEnv } from "@/lib/env";

export function createServerSupabaseClient() {
  const env = getClientEnv();

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false
    }
  });
}

