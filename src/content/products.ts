export type MatchingProduct = {
  id: string;
  name: string;
  blurb: string;
  /** 표시용 가격 문구 (숫자 PG 연동 전) */
  priceLabel: string;
  /** 노출 순서 */
  order: number;
};

export const matchingProducts: MatchingProduct[] = [
  {
    id: "signature-evening",
    name: "시그니처 이브닝",
    blurb: "1:1 식사 매칭 · 코디네이터 사전 브리핑 · 당일 에스코트까지, 첫 만남에 집중할 수 있게 구성했습니다.",
    priceLabel: "₩198,000 ~",
    order: 0,
  },
  {
    id: "lounge-sunday",
    name: "라운지 선데이",
    blurb: "작은 인원의 라운지에서 자연스럽게 대화를 나누는 만남. 부담 없이 분위기를 가볍게 시작하고 싶을 때 추천합니다.",
    priceLabel: "₩128,000 ~",
    order: 1,
  },
  {
    id: "studio-latte",
    name: "스튜디오 라떼",
    blurb: "낮 시간 카페 매칭 · 간단 프로필 카드 제공. 바쁜 일정 속에서도 가볍게 만남을 열어가고 싶은 분께 맞춤입니다.",
    priceLabel: "₩88,000 ~",
    order: 2,
  },
].sort((a, b) => a.order - b.order);
