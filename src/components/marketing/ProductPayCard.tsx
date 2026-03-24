"use client";

import { useState } from "react";
import { initiateCheckout } from "@/lib/payment";
import type { MatchingProduct } from "@/content/products";
import { Button } from "@/components/ui/Button";

export function ProductPayCard({ product }: { product: MatchingProduct }) {
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="flex flex-col rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-card)]">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#a78bfa]">Matching</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#2d2640]">{product.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{product.blurb}</p>
      <div className="mt-5 flex items-baseline gap-2 border-t border-dashed border-[var(--border)] pt-5">
        <span className="text-lg font-bold text-[#6d28d9]">{product.priceLabel}</span>
        <span className="text-xs text-[var(--muted)]">VAT 포함 여부는 결제 오픈 시 안내</span>
      </div>
      <Button
        className="mt-6 w-full !py-3"
        onClick={async () => {
          setMsg(null);
          try {
            await initiateCheckout(product.id);
          } catch {
            setMsg("결제는 준비 중입니다. 곧 연결될 예정이에요.");
          }
        }}
      >
        결제 준비중 · 추후 PG 연결
      </Button>
      {msg ? <p className="mt-3 text-center text-xs text-[#7c3aed]">{msg}</p> : null}
    </div>
  );
}
