import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { adminUpdateOrder } from "@/app/admin/orders/actions";
import { FormButton } from "@/components/ui/FormButton";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminSession } from "@/lib/admin-session";
import type { MatchOrderRow } from "@/types/database";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminOrderDetailPage({ params, searchParams }: Props) {
  if (!(await isAdminSession())) redirect("/admin");
  const { id } = await params;
  const sp = await searchParams;

  const admin = createAdminClient();
  const { data } = await admin.from("match_orders").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const order = data as MatchOrderRow;

  const contactedDefault =
    order.contacted_at != null
      ? new Date(order.contacted_at).toISOString().slice(0, 16)
      : "";

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/orders" className="text-sm text-fuchsia-200 hover:underline">
        ← 주문 목록
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-white">주문 상세</h1>

      {sp.saved === "1" ? (
        <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          변경 사항이 저장되었습니다.
        </p>
      ) : null}

      <section className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            상품 정보
          </h2>
          <p className="mt-2 text-base font-semibold text-zinc-50">
            {order.product_name}
          </p>
          <p className="mt-1 text-xs text-zinc-500">{order.product_code}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="신청일시">
            {new Date(order.created_at).toLocaleString("ko-KR")}
          </Field>
          <Field label="상태">
            <span>{statusLabel(order.status)}</span>
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="이름">{order.applicant_name}</Field>
          <Field label="나이">{order.age ? `${order.age}세` : "-"}</Field>
          <Field label="성별">
            {order.gender === "male"
              ? "남성"
              : order.gender === "female"
                ? "여성"
                : order.gender
                  ? "기타"
                  : "-"}
          </Field>
          <Field label="연락처">{order.phone}</Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="직업">{order.job ?? "-"}</Field>
          <Field label="거주 지역">{order.region ?? "-"}</Field>
        </div>
        <Field label="자기소개" multiline>
          {order.bio ?? "-"}
        </Field>
        <Field label="원하는 만남 스타일" multiline>
          {order.preferred_style ?? "-"}
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="가능한 일정">{order.available_time ?? "-"}</Field>
          <Field label="선호 분위기">{order.preferred_mood ?? "-"}</Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="흡연 여부">{order.smoking ?? "-"}</Field>
          <Field label="음주 스타일">{order.drinking ?? "-"}</Field>
        </div>
        <Field label="기타 요청사항" multiline>
          {order.note ?? "-"}
        </Field>
      </section>

      <form
        action={adminUpdateOrder}
        className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-[#120c1d] p-6 text-sm"
      >
        <input type="hidden" name="id" value={order.id} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="status"
              className="text-xs font-semibold uppercase tracking-wide text-zinc-400"
            >
              상태 변경
            </label>
            <select
              id="status"
              name="status"
              defaultValue={order.status}
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b0713] px-3 py-2 text-sm text-zinc-50 outline-none focus:border-fuchsia-400"
            >
              <option value="pending">대기</option>
              <option value="contacted">연락 완료</option>
              <option value="completed">진행 완료</option>
              <option value="canceled">취소</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="contacted_at"
              className="text-xs font-semibold uppercase tracking-wide text-zinc-400"
            >
              첫 연락 시각
            </label>
            <input
              id="contacted_at"
              name="contacted_at"
              type="datetime-local"
              defaultValue={contactedDefault}
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b0713] px-3 py-2 text-sm text-zinc-50 outline-none focus:border-fuchsia-400"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="admin_memo"
            className="text-xs font-semibold uppercase tracking-wide text-zinc-400"
          >
            관리자 메모
          </label>
          <textarea
            id="admin_memo"
            name="admin_memo"
            rows={4}
            defaultValue={order.admin_memo ?? ""}
            className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b0713] px-3 py-2 text-sm text-zinc-50 outline-none focus:border-fuchsia-400"
          />
        </div>
        <FormButton
          className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white"
          pendingLabel="저장 중..."
        >
          변경사항 저장
        </FormButton>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  multiline,
}: {
  label: string;
  children: React.ReactNode;
  multiline?: boolean;
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {label}
      </div>
      <div
        className={`mt-1 text-sm text-zinc-100 ${multiline ? "whitespace-pre-wrap" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

function statusLabel(status: MatchOrderRow["status"]) {
  if (status === "pending") return "대기";
  if (status === "contacted") return "연락 완료";
  if (status === "completed") return "진행 완료";
  return "취소";
}

