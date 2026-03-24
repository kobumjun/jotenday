import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { CommunityPostRow } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("community_posts")
    .select("id,title,author_name,created_at")
    .order("created_at", { ascending: false });

  const list = (posts ?? []) as Pick<CommunityPostRow, "id" | "title" | "author_name" | "created_at">[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#a78bfa]">Community</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#2d2640]">커뮤니티</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            로그인한 회원만 글을 쓸 수 있습니다. 둘러보기는 누구나 가능해요.
          </p>
        </div>
        <Link
          href="/community/new"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#ddd6fe] to-[#fbcfe8] px-5 py-3 text-sm font-semibold text-[#4c1d95] shadow-sm transition hover:brightness-105 active:scale-[0.99]"
        >
          글쓰기
        </Link>
      </div>

      <ul className="mt-10 flex flex-col gap-3">
        {list.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-[var(--border)] bg-white/80 px-6 py-12 text-center text-sm text-[var(--muted)]">
            첫 글을 남겨보세요.
          </li>
        ) : (
          list.map((p) => (
            <li key={p.id}>
              <Link
                href={`/community/${p.id}`}
                className="block rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm transition hover:border-[#e9d5ff] hover:shadow-md"
              >
                <h2 className="text-base font-semibold text-[#2d2640]">{p.title}</h2>
                <p className="mt-2 text-xs text-[var(--muted)]">
                  {p.author_name} · {new Date(p.created_at).toLocaleString("ko-KR")}
                </p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
