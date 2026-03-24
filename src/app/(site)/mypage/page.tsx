export const dynamic = "force-dynamic";

export default function MypagePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-semibold text-[#2d2640]">마이페이지</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">주문 및 이용 내역을 확인할 수 있습니다.</p>

      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#3b2f55]">주문조회</h2>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          아직 등록된 주문 내역이 없습니다. 매칭 상품 결제가 오픈되면 이곳에서 확인하실 수 있어요.
        </p>
      </div>
    </div>
  );
}
