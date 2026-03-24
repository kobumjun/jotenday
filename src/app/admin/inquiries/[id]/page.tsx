import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { adminDeleteInquiry } from "@/app/admin/actions";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminSession } from "@/lib/admin-session";
import type { InquiryRow } from "@/types/database";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminInquiryDetailPage({ params }: Props) {
  if (!(await isAdminSession())) redirect("/admin");
  const { id } = await params;

  const admin = createAdminClient();
  const { data } = await admin.from("inquiries").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const q = data as InquiryRow;

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/inquiries" className="text-sm text-fuchsia-200 hover:underline">
        ← 목록
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-white">문의 상세</h1>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-zinc-500">이름</dt>
            <dd className="mt-1 text-zinc-100">{q.name}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">연락처</dt>
            <dd className="mt-1 text-zinc-100">{q.phone}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">접수일</dt>
            <dd className="mt-1 text-zinc-300">{new Date(q.created_at).toLocaleString("ko-KR")}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">내용</dt>
            <dd className="mt-3 whitespace-pre-wrap text-zinc-200">{q.content}</dd>
          </div>
        </dl>
      </div>
      <form action={adminDeleteInquiry.bind(null, q.id)} className="mt-8">
        <button
          type="submit"
          className="rounded-xl border border-red-400/50 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/20"
        >
          삭제
        </button>
      </form>
    </div>
  );
}
