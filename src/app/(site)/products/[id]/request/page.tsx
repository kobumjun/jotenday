import Link from "next/link";
import { notFound } from "next/navigation";
import { createMatchOrder } from "@/app/actions/orders";
import { FormButton } from "@/components/ui/FormButton";
import { matchingProducts } from "@/content/products";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function ProductRequestPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const product = matchingProducts.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <Link href="/products" className="text-sm font-medium text-[#7c3aed] hover:underline">
        ← 매칭 상품으로 돌아가기
      </Link>
      <h1 className="mt-4 text-2xl font-semibold text-[#2d2640]">매칭 신청 정보 입력</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        아래 정보를 바탕으로 담당자가 일정을 제안드립니다. 부담 없이 편하게 작성해 주세요.
      </p>

      {sp.error === "invalid" ? (
        <p className="mt-4 text-sm text-red-600">필수 항목을 확인해 주세요.</p>
      ) : null}
      {sp.error === "save" ? (
        <p className="mt-4 text-sm text-red-600">
          신청 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      ) : null}

      <form action={createMatchOrder} className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="product_code" value={product.id} />
        <input type="hidden" name="product_name" value={product.name} />

        <div className="rounded-2xl border border-[var(--border)] bg-[#faf8ff] px-4 py-3 text-sm text-[#4c1d95]">
          <p className="font-semibold">{product.name}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">{product.blurb}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="applicant_name">
              이름
            </label>
            <input
              id="applicant_name"
              name="applicant_name"
              required
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="age">
              나이
            </label>
            <input
              id="age"
              name="age"
              inputMode="numeric"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              placeholder="예: 32"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="text-sm font-medium text-[#3b2f55]">성별</span>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="male" />
                남성
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="female" />
                여성
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="other" />
                기타
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="phone">
              연락처
            </label>
            <input
              id="phone"
              name="phone"
              required
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              placeholder="연락받기 편한 번호"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="job">
              직업
            </label>
            <input
              id="job"
              name="job"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              placeholder="예: 마케터, 개발자"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="region">
              거주 지역
            </label>
            <input
              id="region"
              name="region"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              placeholder="예: 서울 마포구"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#3b2f55]" htmlFor="bio">
            자기소개
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
            placeholder="간단한 성격, 관심사, 라이프스타일을 알려 주세요."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#3b2f55]" htmlFor="preferred_style">
            원하는 만남 스타일
          </label>
          <textarea
            id="preferred_style"
            name="preferred_style"
            rows={3}
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
            placeholder="예: 차분한 대화 위주, 가벼운 식사, 취미 공유 등"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="available_time">
              가능한 일정
            </label>
            <input
              id="available_time"
              name="available_time"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              placeholder="예: 주중 저녁, 주말 오후"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="preferred_mood">
              선호 분위기
            </label>
            <input
              id="preferred_mood"
              name="preferred_mood"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              placeholder="예: 조용한, 캐주얼한, 밝은 분위기"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="smoking">
              흡연 여부
            </label>
            <input
              id="smoking"
              name="smoking"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              placeholder="예: 비흡연 / 가끔 / 매일 등"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#3b2f55]" htmlFor="drinking">
              음주 스타일
            </label>
            <input
              id="drinking"
              name="drinking"
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
              placeholder="예: 거의 안 함 / 가볍게 / 즐기는 편"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#3b2f55]" htmlFor="note">
            기타 요청사항
          </label>
          <textarea
            id="note"
            name="note"
            rows={3}
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#c4b5fd]"
            placeholder="알려주고 싶은 추가 사항이 있다면 자유롭게 적어 주세요."
          />
        </div>

        <FormButton
          className="mt-2 rounded-xl bg-gradient-to-r from-[#ddd6fe] to-[#fbcfe8] px-4 py-3 text-sm font-semibold text-[#4c1d95] shadow-sm transition hover:brightness-105 active:scale-[0.99]"
          pendingLabel="신청 접수 중..."
        >
          매칭 신청 보내기
        </FormButton>
      </form>
    </div>
  );
}

