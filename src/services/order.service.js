import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";

export const createOrder = async (
  userId,
  { addressId, restaurantId, payment_method },
) => {
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      user_id: userId,
    },
  });

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  const cart = await prisma.cart.findFirst({
    where: { user_id: userId },
    include: {
      cartItems: {
        include: {
          dish: true,
        },
      },
    },
  });

  if (!cart || cart.cartItems.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  const invalidItem = cart.cartItems.find(
    (item) => item.dish.restaurant_id !== restaurantId,
  );

  if (invalidItem) {
    throw new ApiError(400, "Cart contains items from another restaurant");
  }

  let total = 0;
  const orderItemsData = cart.cartItems.map((item) => {
    total += item.dish.price * item.quantity;

    return {
      dish_id: item.dish.id,
      quantity: item.quantity,
      price: item.dish.price, // snapshot
      name: item.dish.name, // snapshot
    };
  });

  const order = await prisma.$transaction(async (tx) => {
    // If two requests try to place an same order after successfully one
    const cartItemCount = await tx.cartItem.count({
      where: { cart_id: cart.id },
    });

    if (cartItemCount === 0) {
      throw new ApiError(400, "Cart is empty");
    }

    const createdOrder = await tx.order.create({
      data: {
        user_id: userId,
        restaurant_id: restaurantId,
        address_id: addressId,
        total_amount: total,
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: true,
      },
    });

    await tx.payment.create({
      data: {
        user_id: userId,
        order_id: createdOrder.id,
        amount: total,
        payment_method,
      },
    });

    await tx.cartItem.deleteMany({
      where: { cart_id: cart.id },
    });

    return createdOrder;
  });
  return order;
};

export const getAllOrders = async (userId, page = 1, limit = 10) => {
  const [orders, total] = await prisma.$transaction([
    prisma.order.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
      include: {
        orderItems: {
          select: {
            name: true,
            price: true,
            quantity: true,
          },
        },
        restaurant: {
          select: {
            name: true,
            address_line: true,
          },
        },
        address: {
          select: {
            address_line: true,
          },
        },
      },
    }),
    prisma.order.count({
      where: { user_id: userId },
    }),
  ]);

  return {
    orders,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
  };
};

export const getOrder = async (userId, orderId) => {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      user_id: userId,
    },
    select: {
      id: true,
      user_id: true,
      status: true,
      total_amount: true,
      created_at: true,

      orderItems: {
        select: {
          name: true,
          price: true,
          quantity: true,
        },
      },

      restaurant: {
        select: {
          name: true,
          address_line: true,
        },
      },

      address: {
        select: { address_line: true },
      },
    },
  });
};

export const cancelOrder = async (userId, orderId) => {
  // update status to cancel not delete
  // If the user taps the Cancel button two times, it handles it safely.
  const updated = await prisma.order.updateMany({
    where: {
      id: orderId,
      user_id: userId,
      status: { in: ["pending", "accepted"] },
    },
    data: {
      status: "cancelled",
      cancelled_at: new Date(),
    },
  });

  if (updated.count === 0) {
    throw new ApiError(400, "Order can no longer be cancelled");
  }

  return {
    id: orderId,
    status: "cancelled",
  };
};
