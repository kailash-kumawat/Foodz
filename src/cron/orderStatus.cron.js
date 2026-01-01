import cron from "node-cron";
import prisma from "../db/index.js";

export const startOrderStatus = () => {
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const now = new Date();

      await prisma.order.updateMany({
        where: {
          status: "pending",
          created_at: {
            lte: new Date(now.getTime() - 20 * 1000),
          },
          accepted_at: null,
        },
        data: {
          status: "accepted",
          accepted_at: now,
        },
      });

      await prisma.order.updateMany({
        where: {
          status: "accepted",
          accepted_at: {
            lte: new Date(now.getTime() - 1 * 60 * 1000),
          },
          prepared_at: null,
        },
        data: {
          status: "preparing",
          prepared_at: now,
        },
      });

      await prisma.order.updateMany({
        where: {
          status: "preparing",
          prepared_at: {
            lte: new Date(now.getTime() - 2 * 60 * 1000),
          },
          on_the_way_at: null,
        },
        data: {
          status: "on_the_way",
          on_the_way_at: now,
        },
      });

      await prisma.order.updateMany({
        where: {
          status: "on_the_way",
          on_the_way_at: {
            lte: new Date(now.getTime() - 4 * 60 * 1000),
          },
          delivered_at: null,
        },
        data: {
          status: "delivered",
          delivered_at: now,
        },
      });

      console.log("Order status cron executed");
    } catch (error) {
      console.error("Order status cron failed:", error);
    }
  });
};
