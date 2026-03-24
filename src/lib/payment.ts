/**
 * PG 연동 전 스텁.
 * 키 연결 후 이 파일의 initiateCheckout 를 실제 결제 SDK 호출로 교체하면 됩니다.
 */
export type CheckoutProductId = string;

export type CheckoutIntent = {
  productId: CheckoutProductId;
  createdAt: string;
};

/** PG 오픈 시: 여기서 금액·주문번호 생성 후 리다이렉트/위젯 호출 */
export async function initiateCheckout(_productId: CheckoutProductId): Promise<CheckoutIntent> {
  void _productId;
  throw new Error("결제 연동 준비 중입니다. 곧 안내드릴게요.");
}

export function isPaymentReady() {
  return false;
}
