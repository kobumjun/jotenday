import Link from "next/link";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminSession } from "@/lib/admin-session";
import type { ReviewRow } from "@/types/database";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminReviewsListPage({ searchParams }: Props) {
  if (!(await isAdminSession())) redirect("/admin");
  const sp = await searchParams;

  const admin = createAdminClient();
  const { data } = await admin.from("reviews").select("*").order("created_at", { ascending: false });
  const rows = (data ?? []) as ReviewRow[];

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-white">후기 관리</h1>
        <Link
          href="/admin/reviews/new"
          className="inline-flex justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
        >
          새 후기
        </Link>
      </div>

      {sp.error === "invalid" ? (
        <p className="mt-4 text-sm text-red-300">필수 항목을 입력해 주세요.</p>
      ) : null}
      {sp.error === "toobig" ? (
        <p className="mt-4 text-sm text-red-300">이미지는 2MB 이하만 가능합니다.</p>
      ) : null}
      {sp.error === "type" ? (
        <p className="mt-4 text-sm text-red-300">이미지 파일만 업로드할 수 있습니다.</p>
      ) : null}
      {sp.error === "upload" ? (
        <p className="mt-4 text-sm text-red-300">스토리지 업로드에 실패했습니다. 버킷과 정책을 확인하세요.</p>
      ) : null}
      {sp.error === "save" ? <p className="mt-4 text-sm text-red-300">저장에 실패했습니다.</p> : null}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase text-zinc-400">
            <tr>
              <th className="px-4 py-3">제목</th>
              <th className="px-4 py-3">작성자</th>
              <th className="px-4 py-3">공개</th>
              <th className="px-4 py-3">날짜</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3">
                  <Link href={`/admin/reviews/${r.id}`} className="font-medium text-fuchsia-200 hover:underline">
                    {r.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-zinc-300">{r.author_name}</td>
                <td className="px-4 py-3 text-zinc-300">{r.is_published ? "Y" : "N"}</td>
                <td className="px-4 py-3 text-zinc-400">
                  {new Date(r.created_at).toLocaleString("ko-KR")}
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-zinc-500">
                  등록된 후기가 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
