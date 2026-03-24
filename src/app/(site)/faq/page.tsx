import { faqItems } from "@/content/faq";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#a78bfa]">Support</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#2d2640] sm:text-4xl">
          자주 묻는 질문
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          운영 정책과 서비스 이용에 관한 답변입니다. 문구는{" "}
          <code className="rounded bg-[#f6f2ff] px-1.5 py-0.5 text-xs text-[#6d28d9]">
            src/content/faq.ts
          </code>{" "}
          에서 수정할 수 있습니다.
        </p>
      </header>
      <div className="mt-10">
        <FaqAccordion items={faqItems} />
      </div>
    </div>
  );
}
