import Link from "next/link";
import { homeContent } from "@/content/home";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const c = homeContent;
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16">
        <p className="inline-flex items-center rounded-full border border-white/70 bg-white/70 px-4 py-1 text-xs font-semibold text-[#6d28d9] shadow-sm backdrop-blur">
          {c.hero.eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl whitespace-pre-line text-4xl font-semibold leading-tight tracking-tight text-[#241835] sm:text-5xl">
          {c.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{c.hero.subtitle}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/products">
            <Button className="w-full !px-8 !py-4 !text-base sm:w-auto">{c.cta.primary}</Button>
          </Link>
          <Link href="/community">
            <Button variant="secondary" className="w-full !px-8 !py-4 !text-base sm:w-auto">
              {c.cta.secondary}
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-white/70 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[#2d2640]">{c.trust.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {c.trust.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[var(--border)] bg-gradient-to-b from-white to-[#faf8ff] p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[#3b2f55]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[#f5eefft0] via-white to-[#fff0f7] px-6 py-14 text-center shadow-[var(--shadow-card)] sm:px-10">
          <h2 className="text-2xl font-semibold text-[#2d2640]">{c.cta.title}</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/spotlight">
              <Button variant="secondary" className="!px-8">
                좋을텐데 스토리
              </Button>
            </Link>
            <Link href="/inquiry">
              <Button className="!px-8">1:1 문의 남기기</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
