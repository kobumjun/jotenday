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
          서비스 이용 전에 자주 주시는 질문을 모았습니다. 이용 방법과 주요 안내 사항을 한눈에 확인해 보세요.
        </p>
      </header>
      <div className="mt-10">
        <FaqAccordion items={faqItems} />
      </div>
    </div>
  );
}
