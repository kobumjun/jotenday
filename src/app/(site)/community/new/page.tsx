import Link from "next/link";
import { createCommunityPost } from "@/app/actions/community";
import { FormButton } from "@/components/ui/FormButton";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function CommunityNewPage({ searchParams }: Props) {
  const sp = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <Link href="/community" className="text-sm font-medium text-[#7c3aed] hover:underline">
        ← 목록으로
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-[#2d2640]">글쓰기</h1>

      {sp.error === "empty" ? (
        <p className="mt-4 text-sm text-red-600">제목과 내용을 입력해 주세요.</p>
      ) : null}
      {sp.error === "save" ? (
        <p className="mt-4 text-sm text-red-600">저장 중 오류가 발생했습니다.</p>
      ) : null}

      <form action={createCommunityPost} className="mt-8 flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-[#3b2f55]">
            제목
          </label>
          <input
            id="title"
            name="title"
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="text-sm font-medium text-[#3b2f55]">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
            required
          />
        </div>
        <FormButton
          className="rounded-xl bg-gradient-to-r from-[#ddd6fe] to-[#fbcfe8] px-4 py-3 text-sm font-semibold text-[#4c1d95] shadow-sm transition hover:brightness-105"
          pendingLabel="등록 중..."
        >
          등록하기
        </FormButton>
      </form>
    </div>
  );
}
