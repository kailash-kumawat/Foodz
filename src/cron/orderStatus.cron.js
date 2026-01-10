import cron from "node-cron";
import prisma from "../db/index.js";
import {
  fetchActiveOrders,
  canProceedOrder,
  autoCancelUnpaidOnlineOrder,
  processOrderLifecycle,
  completeCODPayment,
} from "../services/cron.service.js";

export const startOrderStatus = () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const now = new Date();
      const ONLINE_PAYMENT_TIMEOUT = 2 * 60 * 1000;

      const orders = await fetchActiveOrders(prisma);

      for (const order of orders) {
        const payment = order.payments[0];

        const cancelled = await prisma.$transaction((tx) =>
          autoCancelUnpaidOnlineOrder(
            tx,
            order,
            payment,
            now,
            ONLINE_PAYMENT_TIMEOUT,
          ),
        );

        if (cancelled) continue;

        if (!canProceedOrder(payment)) continue;

        const updatedOrder = await processOrderLifecycle(prisma, order, now);

        if (updatedOrder?.status === "delivered") {
          await prisma.$transaction((tx) => completeCODPayment(tx, payment));
        }
      }
    } catch (err) {
      console.error("Order cron failed:", err);
    }
  });
};
