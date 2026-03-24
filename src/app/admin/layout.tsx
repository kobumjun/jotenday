import Link from "next/link";
import { isAdminSession } from "@/lib/admin-session";
import { AdminLogoutButton } from "./logout-button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const ok = await isAdminSession();

  return (
    <div className="min-h-full bg-[#1b1428] text-zinc-100">
      <div className="border-b border-white/10 bg-[#120c1d]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link href="/admin" className="text-sm font-semibold tracking-tight text-white">
            좋을텐데 · 관리자
          </Link>
          {ok ? (
            <nav className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
              <Link href="/admin/reviews" className="hover:text-white">
                후기
              </Link>
              <Link href="/admin/inquiries" className="hover:text-white">
                문의
              </Link>
              <Link href="/admin/links" className="hover:text-white">
                외부 링크
              </Link>
              <Link href="/" className="hover:text-white">
                사이트로
              </Link>
              <AdminLogoutButton />
            </nav>
          ) : null}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
