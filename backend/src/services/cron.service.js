export const fetchActiveOrders = async (prisma) => {
  return await prisma.order.findMany({
    where: {
      status: {
        in: [
          "pending",
          "accepted",
          "preparing",
          "ready",
          "picked_up",
          "on_the_way",
        ],
      },
      cancelled_at: null,
    },
    include: {
      payments: {
        orderBy: { created_at: "desc" },
        take: 1,
      },
    },
  });
};

export const canProceedOrder = (payment) => {
  if (!payment) return false;

  if (
    payment.payment_method !== "cash_on_delivery" &&
    payment.payment_status !== "completed"
  ) {
    return false;
  }

  return true;
};

export const autoCancelUnpaidOnlineOrder = async (
  tx,
  order,
  payment,
  now,
  timeout,
) => {
  if (
    payment &&
    payment.payment_method !== "cash_on_delivery" &&
    payment.payment_status === "pending" &&
    payment.created_at <= new Date(now.getTime() - timeout)
  ) {
    await tx.order.update({
      where: { id: order.id },
      data: {
        status: "cancelled",
        cancelled_at: now,
      },
    });

    await tx.payment.update({
      where: { id: payment.id },
      data: {
        payment_status: "failed",
      },
    });

    return true; // cancelled
  }

  return false;
};

export const processOrderLifecycle = async (prisma, order, now) => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;

  const ACCEPTED_DELAY = 20 * SECOND;
  const PREPARED_DELAY = 20 * SECOND;
  const READY_DELAY = 10 * SECOND;
  const PICKED_UP_DELAY = 30 * SECOND;
  const ON_THE_WAY_DELAY = 10 * SECOND;
  const DELIVERED_DELAY = 1 * MINUTE;

  if (
    order.status === "pending" &&
    !order.accepted_at &&
    order.created_at <= new Date(now.getTime() - ACCEPTED_DELAY)
  ) {
    return await prisma.order.update({
      where: { id: order.id },
      data: { status: "accepted", accepted_at: now },
    });
  }

  if (
    order.status === "accepted" &&
    !order.prepared_at &&
    order.accepted_at <= new Date(now.getTime() - PREPARED_DELAY)
  ) {
    return await prisma.order.update({
      where: { id: order.id },
      data: { status: "preparing", prepared_at: now },
    });
  }

  if (
    order.status === "preparing" &&
    !order.ready_at &&
    order.prepared_at <= new Date(now.getTime() - READY_DELAY)
  ) {
    return await prisma.order.update({
      where: { id: order.id },
      data: { status: "ready", ready_at: now },
    });
  }

  if (
    order.status === "ready" &&
    !order.picked_up_at &&
    order.ready_at <= new Date(now.getTime() - PICKED_UP_DELAY)
  ) {
    return await prisma.order.update({
      where: { id: order.id },
      data: { status: "picked_up", picked_up_at: now },
    });
  }

  if (
    order.status === "picked_up" &&
    !order.on_the_way_at &&
    order.picked_up_at <= new Date(now.getTime() - ON_THE_WAY_DELAY)
  ) {
    return await prisma.order.update({
      where: { id: order.id },
      data: { status: "on_the_way", on_the_way_at: now },
    });
  }

  if (
    order.status === "on_the_way" &&
    !order.delivered_at &&
    order.on_the_way_at <= new Date(now.getTime() - DELIVERED_DELAY)
  ) {
    return await prisma.order.update({
      where: { id: order.id },
      data: { status: "delivered", delivered_at: now },
    });
  }
};

export const completeCODPayment = async (tx, payment) => {
  if (payment?.payment_method === "cash_on_delivery") {
    await tx.payment.update({
      where: { id: payment.id },
      data: { payment_status: "completed" },
    });
  }
};
