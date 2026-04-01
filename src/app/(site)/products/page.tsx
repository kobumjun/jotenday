import { matchingProducts } from "@/content/products";
import { ProductPayCard } from "@/components/marketing/ProductPayCard";

type Props = { searchParams: Promise<{ requested?: string }> };

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#a78bfa]">Programs</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#2d2640] sm:text-4xl">
          매칭 상품
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          일정과 분위기에 맞춰 선택할 수 있는 매칭 프로그램입니다. 신청 후 담당자가 일정과 진행 방식을
          함께 조율해 드립니다.
        </p>
      </header>

      {sp.requested === "1" ? (
        <p className="mt-6 max-w-2xl rounded-2xl border border-[#d8b4fe] bg-[#f5f3ff] px-4 py-3 text-sm text-[#5b21b6]">
          매칭 신청이 접수되었습니다. 확인 후 연락드리겠습니다.
        </p>
      ) : null}

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {matchingProducts.map((p) => (
          <ProductPayCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
