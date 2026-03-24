import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { adminDeleteReview, adminUpsertReview } from "@/app/admin/actions";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminSession } from "@/lib/admin-session";
import type { ReviewRow } from "@/types/database";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function AdminReviewEditPage({ params, searchParams }: Props) {
  if (!(await isAdminSession())) redirect("/admin");
  const { id } = await params;
  const sp = await searchParams;

  const admin = createAdminClient();
  const { data } = await admin.from("reviews").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const r = data as ReviewRow;

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/reviews" className="text-sm text-fuchsia-200 hover:underline">
        ← 목록
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-white">후기 수정</h1>

      {sp.saved === "1" ? (
        <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          저장되었습니다.
        </p>
      ) : null}
      {sp.error === "save" ? (
        <p className="mt-4 text-sm text-red-300">저장에 실패했습니다.</p>
      ) : null}

      <form action={adminUpsertReview} encType="multipart/form-data" className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="id" value={r.id} />
        <input type="hidden" name="existing_image_url" value={r.image_url ?? ""} />
        <input type="hidden" name="existing_image_path" value={r.image_path ?? ""} />
        <div>
          <label className="text-sm text-zinc-300" htmlFor="title">
            제목
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={r.title}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400"
          />
        </div>
        <div>
          <label className="text-sm text-zinc-300" htmlFor="summary">
            요약 (선택)
          </label>
          <input
            id="summary"
            name="summary"
            defaultValue={r.summary ?? ""}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400"
          />
        </div>
        <div>
          <label className="text-sm text-zinc-300" htmlFor="content">
            본문
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            defaultValue={r.content}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400"
          />
        </div>
        <div>
          <label className="text-sm text-zinc-300" htmlFor="author_name">
            작성자 표시명
          </label>
          <input
            id="author_name"
            name="author_name"
            required
            defaultValue={r.author_name}
            className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400"
          />
        </div>
        <div>
          <label className="text-sm text-zinc-300" htmlFor="image">
            새 이미지로 교체 (선택, 최대 2MB)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="mt-2 block w-full text-sm text-zinc-300"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" name="is_published" defaultChecked={r.is_published} className="size-4" />
          공개 (사이트 노출)
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white"
          >
            저장
          </button>
        </div>
      </form>

      <form action={adminDeleteReview.bind(null, r.id)} className="mt-8 border-t border-white/10 pt-8">
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
