import cron from "node-cron";
import prisma from "../db/index.js";

export const startOrderStatus = () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const now = new Date();

      const orders = await prisma.order.findMany({
        where: {
          status: {
            in: ["pending", "accepted", "preparing", "on_the_way"],
          },
          cancelled_at: null,
        },
        include: {
          payments: {
            orderBy: { created_at: "desc" },
            take: 1, // latest payment
          },
        },
      });

      for (const order of orders) {
        const payment = order.payments[0];

        // PAYMENT GATE FOR ONLINE ORDERS
        if (
          !payment ||
          (payment.payment_method !== "cash_on_delivery" &&
            payment.payment_status !== "completed")
        ) {
          continue;
        }

        // -------------------------
        // ORDER STATUS TRANSITIONS
        // -------------------------

        if (
          order.status === "pending" &&
          order.accepted_at === null &&
          order.created_at <= new Date(now.getTime() - 20 * 1000)
        ) {
          await prisma.order.update({
            where: { id: order.id },
            data: {
              status: "accepted",
              accepted_at: now,
            },
          });
        } else if (
          order.status === "accepted" &&
          order.prepared_at === null &&
          order.accepted_at <= new Date(now.getTime() - 1 * 60 * 1000)
        ) {
          await prisma.order.update({
            where: { id: order.id },
            data: {
              status: "preparing",
              prepared_at: now,
            },
          });
        } else if (
          order.status === "preparing" &&
          order.on_the_way_at === null &&
          order.prepared_at <= new Date(now.getTime() - 2 * 60 * 1000)
        ) {
          await prisma.order.update({
            where: { id: order.id },
            data: {
              status: "on_the_way",
              on_the_way_at: now,
            },
          });
        } else if (
          order.status === "on_the_way" &&
          order.delivered_at === null &&
          order.on_the_way_at <= new Date(now.getTime() - 4 * 60 * 1000)
        ) {
          await prisma.$transaction(async (tx) => {
            await tx.order.update({
              where: { id: order.id },
              data: {
                status: "delivered",
                delivered_at: now,
              },
            });

            // COD payment completes at delivery
            if (payment?.payment_method === "cash_on_delivery") {
              await tx.payment.update({
                where: { id: payment.id },
                data: { payment_status: "completed" },
              });
            }
          });
        }
      }

      console.log("Order status cron executed safely");
    } catch (error) {
      console.error("Order status cron failed:", error);
    }
  });
};
