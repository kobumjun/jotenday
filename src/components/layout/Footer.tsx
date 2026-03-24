import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-white/80 py-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#3b2f55]">좋을텐데</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            신뢰를 바탕으로 한 소개팅·매칭 서비스. 부담 없는 만남의 시작을 함께합니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
          <Link href="/faq" className="hover:text-[#7c3aed]">
            FAQ
          </Link>
          <Link href="/inquiry" className="hover:text-[#7c3aed]">
            문의
          </Link>
          <Link href="/community" className="hover:text-[#7c3aed]">
            커뮤니티
          </Link>
          <span className="text-xs text-[#9b8fb8]">© {new Date().getFullYear()} 좋을텐데</span>
        </div>
      </div>
    </footer>
  );
}
