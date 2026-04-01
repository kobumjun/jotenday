import Link from "next/link";
import { signUpWithProfile } from "@/app/actions/auth";
import { FormButton } from "@/components/ui/FormButton";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function SignupPage({ searchParams }: Props) {
  const sp = await searchParams;
  const err = sp.error;

  return (
    <div className="mx-auto max-w-lg px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-semibold text-[#2d2640]">회원가입</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        아이디는 로그인용이며, 영문 소문자·숫자·밑줄(_)만 사용할 수 있습니다.
      </p>

      {err === "invalid" ? (
        <p className="mt-4 text-sm text-red-600">필수 항목과 약관 동의를 확인해 주세요.</p>
      ) : null}
      {err === "taken" ? (
        <p className="mt-4 text-sm text-red-600">이미 사용 중인 아이디입니다.</p>
      ) : null}
      {err && err !== "invalid" && err !== "taken" ? (
        <p className="mt-4 text-sm text-red-600">가입 처리 중 오류: {decodeURIComponent(err)}</p>
      ) : null}

      <form action={signUpWithProfile} className="mt-8 flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="username">
              아이디
            </label>
            <input
              id="username"
              name="username"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              required
              minLength={4}
              pattern="[a-zA-Z0-9_]+"
              title="영문, 숫자, 밑줄만 사용"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={6}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="password_confirm">
              비밀번호 확인
            </label>
            <input
              id="password_confirm"
              name="password_confirm"
              type="password"
              minLength={6}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="name">
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
            <span className="text-sm font-medium text-[#3b2f55]">성별</span>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="male" required />
                남성
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="female" />
                여성
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="other" />
                기타
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="phone">
              연락처
            </label>
            <input
              id="phone"
              name="phone"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="birth_date">
              생년월일
            </label>
            <input
              id="birth_date"
              name="birth_date"
              type="date"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              required
            />
          </div>
        </div>

        <label className="mt-2 flex gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 text-sm leading-relaxed text-[var(--muted)]">
          <input type="checkbox" name="agreement" className="mt-1 size-4 shrink-0" required />
          <span>
            법적으로 싱글이 아니거나 위조된 서류로 인증을 하는 경우 즉시 이용계약이 해지되며, 회사 측
            손해에 대한 구상권 청구에 동의합니다.
          </span>
        </label>

        <FormButton
          className="mt-2 rounded-xl bg-gradient-to-r from-[#ddd6fe] to-[#fbcfe8] px-4 py-3 text-sm font-semibold text-[#4c1d95] shadow-sm transition hover:brightness-105 active:scale-[0.99]"
          pendingLabel="가입 처리 중..."
        >
          가입하기
        </FormButton>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        이미 계정이 있나요?{" "}
        <Link href="/login" className="font-semibold text-[#7c3aed] hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
