"use client";

import Link from "next/link";
import type { MatchingProduct } from "@/content/products";
import { Button } from "@/components/ui/Button";

export function ProductPayCard({ product }: { product: MatchingProduct }) {
  return (
    <div className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-card)]">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#a78bfa]">Matching</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#2d2640]">{product.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{product.blurb}</p>
      <div className="mt-5 flex items-baseline gap-2 border-t border-dashed border-[var(--border)] pt-5">
        <span className="text-lg font-bold text-[#6d28d9]">{product.priceLabel}</span>
        <span className="text-xs text-[var(--muted)]">상담 후 일정과 비용을 안내드립니다.</span>
      </div>
      <Link href={`/products/${product.id}/request`} className="mt-6 block">
        <Button className="w-full !py-3">매칭 신청하기</Button>
      </Link>
      <p className="mt-3 text-center text-[11px] text-[var(--muted)]">
        온라인 결제는 신청 확인 후 별도 안내로 진행됩니다.
      </p>
    </div>
  );
}

