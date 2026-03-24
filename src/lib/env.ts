function requireEnv(name: string, value: string | undefined, allowDevFallback: string) {
  if (value && value.length > 0) return value;
  if (process.env.NODE_ENV !== "production") return allowDevFallback;
  throw new Error(`${name} is not set`);
}

export function getPublicSupabaseUrl() {
  return requireEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "https://placeholder.supabase.co",
  );
}

export function getPublicSupabaseAnonKey() {
  return requireEnv(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder",
  );
}

export function getAuthEmailDomain() {
  return process.env.NEXT_PUBLIC_AUTH_EMAIL_DOMAIN ?? "auth.joeultende.app";
}

export function getServiceRoleKey() {
  return requireEnv(
    "SUPABASE_SERVICE_ROLE_KEY",
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.service-placeholder",
  );
}

export function getAdminPin() {
  return process.env.ADMIN_PIN ?? "";
}

export function getAdminSessionSecret() {
  return requireEnv(
    "ADMIN_SESSION_SECRET",
    process.env.ADMIN_SESSION_SECRET,
    "local-dev-admin-secret-change-in-production-32chars",
  );
}
