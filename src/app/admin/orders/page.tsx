import Link from "next/link";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminSession } from "@/lib/admin-session";
import type { MatchOrderRow } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  if (!(await isAdminSession())) redirect("/admin");

  const admin = createAdminClient();
  const { data } = await admin
    .from("match_orders")
    .select(
      "id,created_at,product_name,product_code,applicant_name,age,gender,phone,job,region,status",
    )
    .order("created_at", { ascending: false });
  const rows = (data ?? []) as Pick<
    MatchOrderRow,
    "id" | "created_at" | "product_name" | "product_code" | "applicant_name" | "age" | "gender" | "phone" | "job" | "region" | "status"
  >[];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">주문 관리</h1>
      <p className="mt-2 text-sm text-zinc-400">
        상품 신청 내역을 확인하고 상담 진행 상태를 업데이트할 수 있습니다.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase text-zinc-400">
            <tr>
              <th className="px-4 py-3">신청일시</th>
              <th className="px-4 py-3">상품명</th>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">나이</th>
              <th className="px-4 py-3">성별</th>
              <th className="px-4 py-3">연락처</th>
              <th className="px-4 py-3">직업</th>
              <th className="px-4 py-3">지역</th>
              <th className="px-4 py-3">상태</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr
                key={o.id}
                className="border-b border-white/5 align-top hover:bg-white/5"
              >
                <td className="whitespace-nowrap px-4 py-3 text-zinc-400">
                  {new Date(o.created_at).toLocaleString("ko-KR")}
                </td>
                <td className="px-4 py-3 text-zinc-100">
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="font-semibold text-fuchsia-200 hover:underline"
                  >
                    {o.product_name}
                  </Link>
                  <div className="text-[11px] text-zinc-500">{o.product_code}</div>
                </td>
                <td className="px-4 py-3 text-zinc-100">{o.applicant_name}</td>
                <td className="px-4 py-3 text-zinc-300">
                  {o.age ? `${o.age}세` : "-"}
                </td>
                <td className="px-4 py-3 text-zinc-300">
                  {o.gender === "male"
                    ? "남성"
                    : o.gender === "female"
                      ? "여성"
                      : o.gender
                        ? "기타"
                        : "-"}
                </td>
                <td className="px-4 py-3 text-zinc-300">{o.phone}</td>
                <td className="px-4 py-3 text-zinc-300">{o.job ?? "-"}</td>
                <td className="px-4 py-3 text-zinc-300">{o.region ?? "-"}</td>
                <td className="px-4 py-3 text-xs font-semibold text-zinc-100">
                  <StatusBadge status={o.status} />
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-10 text-center text-zinc-500"
                >
                  접수된 신청이 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: MatchOrderRow["status"] }) {
  const label =
    status === "pending"
      ? "대기"
      : status === "contacted"
        ? "연락 완료"
        : status === "completed"
          ? "진행 완료"
          : "취소";

  const color =
    status === "pending"
      ? "bg-amber-500/20 text-amber-200 border-amber-400/40"
      : status === "contacted"
        ? "bg-sky-500/20 text-sky-200 border-sky-400/40"
        : status === "completed"
          ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/40"
          : "bg-zinc-500/20 text-zinc-200 border-zinc-400/40";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}
    >
      {label}
    </span>
  );
}

