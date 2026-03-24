"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="rounded-2xl border border-[var(--border)] bg-white shadow-sm transition hover:shadow-md"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-semibold text-[#2d2640]">{item.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f6f2ff] text-[#6d28d9] transition ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              >
                ▾
              </span>
            </button>
            {isOpen ? (
              <div className="border-t border-[var(--border)] px-5 pb-5 pt-3">
                <p className="text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
