import Link from "next/link";
import { redirect } from "next/navigation";
import { adminDeleteExternalLink, adminUpsertExternalLink } from "@/app/admin/actions";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminSession } from "@/lib/admin-session";
import type { ExternalLinkRow } from "@/types/database";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ saved?: string; error?: string }> };

export default async function AdminLinksPage({ searchParams }: Props) {
  if (!(await isAdminSession())) redirect("/admin");
  const sp = await searchParams;

  const admin = createAdminClient();
  const { data } = await admin.from("external_links").select("*").order("sort_order", { ascending: true });
  const rows = (data ?? []) as ExternalLinkRow[];

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">외부 링크</h1>
          <p className="mt-2 text-sm text-zinc-400">
            좋을텐데 페이지 카드에 노출됩니다. 링크가 비어 있으면 사이트에서는 &quot;연결 예정&quot;으로 보입니다.
          </p>
        </div>
        <Link href="/spotlight" className="text-sm text-fuchsia-200 hover:underline">
          공개 페이지 보기 →
        </Link>
      </div>

      {sp.saved === "1" ? (
        <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          저장되었습니다.
        </p>
      ) : null}
      {sp.error === "invalid" ? (
        <p className="mt-4 text-sm text-red-300">제목은 필수입니다.</p>
      ) : null}

      <div className="mt-10 space-y-8">
        {rows.map((row) => (
          <form
            key={row.id}
            action={adminUpsertExternalLink}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <input type="hidden" name="id" value={row.id} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs text-zinc-400" htmlFor={`title-${row.id}`}>
                  제목
                </label>
                <input
                  id={`title-${row.id}`}
                  name="title"
                  required
                  defaultValue={row.title}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-3 py-2 text-sm text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-zinc-400" htmlFor={`desc-${row.id}`}>
                  설명
                </label>
                <textarea
                  id={`desc-${row.id}`}
                  name="description"
                  rows={3}
                  defaultValue={row.description ?? ""}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-3 py-2 text-sm text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-zinc-400" htmlFor={`href-${row.id}`}>
                  링크 URL (비우면 미연결)
                </label>
                <input
                  id={`href-${row.id}`}
                  name="href"
                  defaultValue={row.href}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-3 py-2 text-sm text-white"
                  placeholder="https://"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400" htmlFor={`order-${row.id}`}>
                  정렬 (숫자 작을수록 앞)
                </label>
                <input
                  id={`order-${row.id}`}
                  name="sort_order"
                  type="number"
                  defaultValue={row.sort_order}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-3 py-2 text-sm text-white"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white"
              >
                수정 저장
              </button>
              <button
                type="submit"
                formAction={adminDeleteExternalLink.bind(null, row.id)}
                className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200"
              >
                삭제
              </button>
            </div>
          </form>
        ))}

        <form action={adminUpsertExternalLink} className="rounded-2xl border border-dashed border-white/20 p-6">
          <h2 className="text-lg font-semibold text-white">새 카드 추가</h2>
          <input type="hidden" name="id" value="" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs text-zinc-400" htmlFor="new-title">
                제목
              </label>
              <input
                id="new-title"
                name="title"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-zinc-400" htmlFor="new-desc">
                설명
              </label>
              <textarea
                id="new-desc"
                name="description"
                rows={3}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-zinc-400" htmlFor="new-href">
                링크 URL
              </label>
              <input
                id="new-href"
                name="href"
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-3 py-2 text-sm text-white"
                placeholder="https://"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400" htmlFor="new-order">
                정렬
              </label>
              <input
                id="new-order"
                name="sort_order"
                type="number"
                defaultValue={rows.length}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#120c1d] px-3 py-2 text-sm text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
          >
            추가
          </button>
        </form>
      </div>
    </div>
  );
}
