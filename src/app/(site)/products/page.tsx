import { matchingProducts } from "@/content/products";
import { ProductPayCard } from "@/components/marketing/ProductPayCard";

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#a78bfa]">Programs</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#2d2640] sm:text-4xl">
          매칭 상품
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          당신의 일정과 분위기에 맞춘 세 가지 코스를 준비했습니다. 결제는 PG 연동 오픈 후 같은 버튼
          플로우로 이어질 예정입니다.
        </p>
      </header>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {matchingProducts.map((p) => (
          <ProductPayCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
