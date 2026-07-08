// Checkout handler. Logs only what debugging needs: the order id and amount,
// never the full request (which carries the customer's name, email, and address).

type CheckoutRequest = {
  email: string;
  name: string;
  address: string;
  items: { sku: string; qty: number }[];
  amount: number;
};

const logger = {
  info: (msg: string, meta: Record<string, unknown>) => {
    // eslint-disable-next-line no-console
    console.log(msg, meta);
  },
};

async function createOrder(req: CheckoutRequest) {
  return { id: "ord_" + req.items.length, total: req.amount };
}

export async function onCheckout(req: CheckoutRequest) {
  const order = await createOrder(req);
  logger.info("checkout received", { orderId: order.id, amount: order.total });
  return order;
}
