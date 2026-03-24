import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLogin } from "./actions";
import { isAdminSession } from "@/lib/admin-session";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const ok = await isAdminSession();
  if (ok) redirect("/admin/reviews");

  const sp = await searchParams;

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8">
      <h1 className="text-xl font-semibold text-white">관리자 로그인</h1>
      <p className="mt-2 text-sm text-zinc-400">PIN을 입력하세요.</p>
      {sp.error ? <p className="mt-4 text-sm text-red-300">PIN이 올바르지 않습니다.</p> : null}
      <form action={adminLogin} className="mt-6 flex flex-col gap-4">
        <input
          name="pin"
          type="password"
          inputMode="numeric"
          autoComplete="one-time-code"
          className="rounded-xl border border-white/15 bg-[#120c1d] px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400"
          placeholder="PIN"
          required
        />
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110"
        >
          입장
        </button>
      </form>
      <Link href="/" className="mt-6 block text-center text-xs text-zinc-500 hover:text-zinc-300">
        메인으로
      </Link>
    </div>
  );
}
