import { SiteShell } from "@/components/SiteShell";
import { createClient } from "@/lib/supabase/server";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <SiteShell userId={user?.id ?? null}>{children}</SiteShell>;
}
