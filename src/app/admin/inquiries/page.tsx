import Link from "next/link";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminSession } from "@/lib/admin-session";
import type { InquiryRow } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  if (!(await isAdminSession())) redirect("/admin");

  const admin = createAdminClient();
  const { data } = await admin.from("inquiries").select("*").order("created_at", { ascending: false });
  const rows = (data ?? []) as InquiryRow[];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">1:1 문의</h1>
      <p className="mt-2 text-sm text-zinc-400">접수된 문의를 확인하세요.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase text-zinc-400">
            <tr>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">연락처</th>
              <th className="px-4 py-3">내용</th>
              <th className="px-4 py-3">접수</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((q) => (
              <tr key={q.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 text-zinc-200">{q.name}</td>
                <td className="px-4 py-3 text-zinc-300">{q.phone}</td>
                <td className="max-w-md truncate px-4 py-3 text-zinc-400">
                  <Link href={`/admin/inquiries/${q.id}`} className="text-fuchsia-200 hover:underline">
                    {q.content}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-500">
                  {new Date(q.created_at).toLocaleString("ko-KR")}
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-zinc-500">
                  문의가 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
