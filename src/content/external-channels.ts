import type { ExternalChannelPlaceholder } from "@/types/database";

/**
 * DB(external_links)에 행이 없을 때 쓰는 기본 카드 데이터.
 * href 는 빈 문자열이면 버튼이 비활성·안내 문구로 표시됩니다.
 */
export const defaultExternalChannels: ExternalChannelPlaceholder[] = [
  {
    id: "placeholder-event",
    title: "이벤트",
    description: "시즌 한정 프로모션과 오프라인 모임 소식을 이곳에서 확인하실 수 있어요.",
    href: "",
    sort_order: 0,
  },
  {
    id: "placeholder-insta",
    title: "인스타그램",
    description: "현장 분위기와 매칭 후기 스냅을 가볍게 만나보세요.",
    href: "",
    sort_order: 1,
  },
  {
    id: "placeholder-blog",
    title: "블로그",
    description: "소개팅 에티켓, 스타일 팁 등 만남에 도움이 되는 글을 모았습니다.",
    href: "",
    sort_order: 2,
  },
];
