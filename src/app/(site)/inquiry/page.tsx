import { submitInquiry } from "@/app/actions/inquiry";

type Props = { searchParams: Promise<{ sent?: string; error?: string }> };

export default async function InquiryPage({ searchParams }: Props) {
  const sp = await searchParams;

  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#a78bfa]">Contact</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#2d2640]">1:1 문의</h1>
      <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
        남겨주신 내용은 관리자 페이지에서만 확인합니다. 빠르게 회신드릴 수 있도록 연락처를 정확히
        적어 주세요.
      </p>

      {sp.sent === "1" ? (
        <p className="mt-6 rounded-xl border border-[#d8b4fe] bg-[#f5f3ff] px-4 py-3 text-sm text-[#5b21b6]">
          문의가 접수되었습니다. 감사합니다.
        </p>
      ) : null}
      {sp.error === "empty" ? (
        <p className="mt-6 text-sm text-red-600">모든 항목을 입력해 주세요.</p>
      ) : null}
      {sp.error === "save" ? (
        <p className="mt-6 text-sm text-red-600">전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
      ) : null}

      <form action={submitInquiry} className="mt-8 flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-[#3b2f55]">
            이름
          </label>
          <input
            id="name"
            name="name"
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-[#3b2f55]">
            연락처
          </label>
          <input
            id="phone"
            name="phone"
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="text-sm font-medium text-[#3b2f55]">
            문의 내용
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
            required
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-[#ddd6fe] to-[#fbcfe8] px-4 py-3 text-sm font-semibold text-[#4c1d95] shadow-sm transition hover:brightness-105"
        >
          문의 보내기
        </button>
      </form>
    </div>
  );
}
