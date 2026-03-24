import { defaultExternalChannels } from "@/content/external-channels";
import { createClient } from "@/lib/supabase/server";
import type { ExternalLinkRow } from "@/types/database";

export const dynamic = "force-dynamic";

function mergeChannels(rows: ExternalLinkRow[]) {
  if (rows.length === 0) return defaultExternalChannels;
  return [...rows]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description ?? "",
      href: r.href,
      sort_order: r.sort_order,
    }));
}

export default async function SpotlightPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("external_links").select("*").order("sort_order", {
    ascending: true,
  });

  const channels = mergeChannels((data ?? []) as ExternalLinkRow[]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#a78bfa]">Spotlight</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#2d2640] sm:text-4xl">
          좋을텐데가 전하는 소식
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          이벤트, SNS, 블로그 등 외부 채널로 만남 이야기를 더 가까이에서 만나보세요. 링크는 준비되는
          대로 연결됩니다.
        </p>
      </header>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((ch, idx) => {
          const hasLink = ch.href.trim().length > 0;
          return (
            <article
              key={ch.id}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <span className="text-xs font-medium text-[#c026d3]">Channel {idx + 1}</span>
              <h2 className="mt-2 text-xl font-semibold text-[#2d2640]">{ch.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{ch.description}</p>
              <div className="mt-6">
                {hasLink ? (
                  <a
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#ddd6fe] to-[#fbcfe8] px-4 py-3 text-sm font-semibold text-[#4c1d95] transition hover:brightness-105 active:scale-[0.99]"
                  >
                    바로가기
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[#faf8ff] px-4 py-3 text-sm font-semibold text-[var(--muted)]"
                  >
                    링크 연결 예정
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
