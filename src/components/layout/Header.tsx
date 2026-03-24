"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "/", label: "홈" },
  { href: "/spotlight", label: "좋을텐데" },
  { href: "/products", label: "매칭 상품" },
  { href: "/community", label: "커뮤니티" },
  { href: "/reviews", label: "후기" },
  { href: "/inquiry", label: "1:1 문의" },
  { href: "/faq", label: "FAQ" },
];

type Props = { initialLoggedIn: boolean };

export function Header({ initialLoggedIn }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  const linkClass = (href: string) =>
    `rounded-lg px-2 py-1 text-sm font-medium transition hover:text-[#7c3aed] ${
      pathname === href ? "text-[#7c3aed]" : "text-[#4a3d63]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/90 shadow-[0_8px_30px_-18px_rgba(124,58,237,0.35)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ddd6fe] to-[#fbcfe8] text-sm font-bold text-[#4c1d95] shadow-sm ring-1 ring-white/60">
            좋
          </span>
          <span className="text-base font-semibold tracking-tight text-[#2f2550] group-hover:text-[#6d28d9]">
            좋을텐데
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {loggedIn ? (
            <>
              <Link
                href="/mypage"
                className="rounded-xl px-3 py-2 text-sm font-medium text-[#4a3d63] hover:bg-[#f6f2ff]"
              >
                마이페이지
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-3 py-2 text-sm font-medium text-[#4a3d63] hover:bg-[#f6f2ff]"
              >
                로그인
              </Link>
              <Link href="/signup">
                <Button className="!py-2 !text-sm">회원가입</Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[#3b2f55] shadow-sm lg:hidden"
          aria-expanded={open}
          aria-label="메뉴 열기"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">메뉴</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 7h14M5 12h14M5 17h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--border)] bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-[15px] font-medium ${
                  pathname === item.href ? "bg-[#f6f2ff] text-[#6d28d9]" : "text-[#3b2f55]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-[var(--border)] pt-3">
              {loggedIn ? (
                <>
                  <Link
                    href="/mypage"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-[#f6f2ff] px-3 py-3 text-center text-[15px] font-semibold text-[#4c1d95]"
                  >
                    마이페이지
                  </Link>
                  <LogoutButton className="w-full !justify-center" onNavigate={() => setOpen(false)} />
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-[var(--border)] bg-white px-3 py-3 text-center text-[15px] font-semibold text-[#3b2f55]"
                  >
                    로그인
                  </Link>
                  <Link href="/signup" className="block" onClick={() => setOpen(false)}>
                    <Button className="w-full !justify-center !py-3">회원가입</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function LogoutButton({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[#5b4d78] shadow-sm transition hover:bg-[#faf8ff] active:scale-[0.99] ${className}`}
      onClick={async () => {
        onNavigate?.();
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.href = "/";
      }}
    >
      로그아웃
    </button>
  );
}
