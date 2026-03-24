"use client";

import { useTransition } from "react";
import { adminLogout } from "./actions";

export function AdminLogoutButton() {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      className="rounded-lg border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-50"
      onClick={() => startTransition(() => adminLogout())}
    >
      로그아웃
    </button>
  );
}
