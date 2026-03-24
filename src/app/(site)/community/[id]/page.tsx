import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteCommunityPost } from "@/app/actions/community";
import { createClient } from "@/lib/supabase/server";
import type { CommunityPostRow } from "@/types/database";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };

export default async function CommunityPostPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post } = await supabase.from("community_posts").select("*").eq("id", id).maybeSingle();

  if (!post) notFound();
  const row = post as CommunityPostRow;
  const isOwner = user?.id === row.user_id;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/community" className="text-sm font-medium text-[#7c3aed] hover:underline">
        ← 목록으로
      </Link>

      {sp.error === "delete" ? (
        <p className="mt-4 text-sm text-red-600">삭제에 실패했습니다. 권한을 확인해 주세요.</p>
      ) : null}

      <article className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-[#2d2640]">{row.title}</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {row.author_name} · {new Date(row.created_at).toLocaleString("ko-KR")}
        </p>
        <div className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-[#3b3155]">
          {row.content}
        </div>
      </article>

      {isOwner ? (
        <form action={deleteCommunityPost.bind(null, row.id)} className="mt-6">
          <button
            type="submit"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            삭제하기
          </button>
        </form>
      ) : null}
    </div>
  );
}
