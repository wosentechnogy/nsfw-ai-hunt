import type { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service";

createBrowserSupabaseClient() satisfies SupabaseClient;
createServerSupabaseClient() satisfies SupabaseClient;
createServiceRoleSupabaseClient() satisfies SupabaseClient;

