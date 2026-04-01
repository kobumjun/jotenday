import Link from "next/link";
import { signInWithUsername } from "@/app/actions/auth";
import { FormButton } from "@/components/ui/FormButton";

type Props = { searchParams: Promise<{ error?: string; registered?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const err = sp.error;
  const registered = sp.registered === "1";

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-semibold text-[#2d2640]">로그인</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">아이디와 비밀번호로 로그인하세요.</p>

      {registered ? (
        <p className="mt-4 rounded-xl border border-[#d8b4fe] bg-[#f5f3ff] px-4 py-3 text-sm text-[#5b21b6]">
          회원가입이 완료되었습니다. 이메일 인증을 켜 둔 경우 메일을 확인한 뒤 로그인해 주세요.
        </p>
      ) : null}

      {err === "empty" ? (
        <p className="mt-4 text-sm text-red-600">아이디와 비밀번호를 입력해 주세요.</p>
      ) : null}
      {err === "auth" ? (
        <p className="mt-4 text-sm text-red-600">로그인 정보를 확인해 주세요.</p>
      ) : null}

      <form action={signInWithUsername} className="mt-8 flex flex-col gap-4">
        <div>
          <label htmlFor="username" className="text-sm font-medium text-[#3b2f55]">
            아이디
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-[#c4b5fd]"
            placeholder="영문·숫자·_ 만 사용"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-[#3b2f55]">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
            required
          />
        </div>
        <FormButton
          className="mt-2 rounded-xl bg-gradient-to-r from-[#ddd6fe] to-[#fbcfe8] px-4 py-3 text-sm font-semibold text-[#4c1d95] shadow-sm transition hover:brightness-105 active:scale-[0.99]"
          pendingLabel="로그인 처리 중..."
        >
          로그인
        </FormButton>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="font-semibold text-[#7c3aed] hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
