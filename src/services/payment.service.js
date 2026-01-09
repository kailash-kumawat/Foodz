import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { razorpay } from "../config/razorpay.config.js";

export const createOnlinePayment = async (userId, orderId) => {
  // find payment from userid, orderid, pending status and online pay
  const payment = await prisma.payment.findFirst({
    where: {
      user_id: userId,
      order_id: orderId,
      payment_status: "pending",
      payment_method: { not: "cash_on_delivery" },
    },
    include: { order: { select: { user_id: true } } },
  });
  // check
  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  if (payment.order.user_id !== userId) {
    throw new ApiError(403, "Unauthorized payment access");
  }

  if (payment.order.status === "cancelled") {
    throw new ApiError(400, "Cannot pay for cancelled order");
  }
  // check duplicancy...by gatewayid
  if (payment.gateway_order_id) {
    return payment;
  }
  // create razorpay order by amount currency and recipt
  const razorpayOrder = await razorpay.orders.create({
    amount: payment.amount.mul(100).toNumber(),
    currency: "INR",
    receipt: `foodz_${payment.order_id}`,
  });
  // update payment model --> gatwayid and gateway
  return await prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      gateway: "razorpay",
      gateway_order_id: razorpayOrder.id,
    },
  });
};

export const verifyOnlinePayment = async (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
) => {
  const payment = await prisma.payment.findFirst({
    where: { gateway_order_id: razorpay_order_id },
  });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  if (payment.payment_status === "completed") {
    return true; // idempotent success
  }

  if (payment.payment_method === "cash_on_delivery") {
    throw new ApiError(400, "COD payments cannot be verified online");
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { payment_status: "failed" },
    });

    throw new ApiError(400, "Invalid signature");
  }

  const order = await prisma.order.findUnique({
    where: { id: payment.order_id },
    select: { status: true },
  });

  if (order.status === "cancelled") {
    throw new ApiError(400, "Order is cancelled");
  }

  await prisma.$transaction([
    prisma.payment.update({
      where: { id: payment.id },
      data: {
        gateway_payment_id: razorpay_payment_id,
        gateway_signature: razorpay_signature,
        payment_status: "completed",
      },
    }),
    prisma.order.update({
      where: { id: payment.order_id },
      data: { status: "accepted" },
    }),
  ]);

  return true;
};
