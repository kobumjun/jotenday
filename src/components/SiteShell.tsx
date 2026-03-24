import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export async function SiteShell({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string | null;
}) {
  return (
    <div className="flex min-h-full flex-col bg-[radial-gradient(1200px_circle_at_20%_-10%,#f5e9ff_0%,transparent_55%),radial-gradient(900px_circle_at_95%_0%,#ffe8f4_0%,transparent_50%)]">
      <Header initialLoggedIn={!!userId} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
