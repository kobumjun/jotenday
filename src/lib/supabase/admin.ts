import { createClient } from "@supabase/supabase-js";
import { getPublicSupabaseUrl, getServiceRoleKey } from "@/lib/env";

/** 서버 전용 — RLS 우회 (관리자 작업) */
export function createAdminClient() {
  return createClient(getPublicSupabaseUrl(), getServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
