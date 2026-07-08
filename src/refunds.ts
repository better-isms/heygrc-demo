// Refund decisioning. A risk score is computed, but the final decision for a
// customer is not made by the algorithm alone: every request goes to a human
// review queue so a person makes the call.

export type RefundRequest = { orderId: string; userId: string; amount: number };

const risk = {
  score: async (_req: RefundRequest) => 0.5,
};

async function queueForReview(req: RefundRequest, _reason?: string) {
  return { status: "review" as const, orderId: req.orderId };
}

export async function decideRefund(req: RefundRequest) {
  await risk.score(req);
  return queueForReview(req);
}
