import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { ReviewRow } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  const reviews = (data ?? []) as ReviewRow[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#a78bfa]">Stories</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#2d2640] sm:text-4xl">
          만남 후기
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          실제 참가자의 이야기를 엄선해 소개합니다. 텍스트와 이미지는 운영팀이 등록·관리합니다.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {reviews.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[var(--border)] bg-white/80 px-6 py-16 text-center text-sm text-[var(--muted)] lg:col-span-2">
            등록된 후기가 없습니다.
          </p>
        ) : (
          reviews.map((r) => (
            <article
              key={r.id}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow-card)]"
            >
              {r.image_url ? (
                <div className="relative aspect-[16/10] w-full bg-[#f6f2ff]">
                  <Image
                    src={r.image_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#2d2640]">{r.title}</h2>
                {r.summary ? (
                  <p className="mt-2 text-sm font-medium text-[#6d28d9]">{r.summary}</p>
                ) : null}
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--muted)]">
                  {r.content}
                </p>
                <p className="mt-6 text-xs text-[#9b8fb8]">
                  {r.author_name} · {new Date(r.created_at).toLocaleDateString("ko-KR")}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
