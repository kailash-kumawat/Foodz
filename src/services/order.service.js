import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";

export const createOrder = async (
  userId,
  { addressId, restaurantId, items },
) => {
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      user_id: userId,
    },
  });

  if (!address) {
    throw new ApiError(403, "Invalid address selected");
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  const dishes = prisma.dish.findMany({
    where: {
      id: { in: items.map((item) => item.dish_id) },
    },
  });

  if (dishes.length !== items.length) {
    throw new ApiError(400, "Invalid dish selected");
  }

  let total = 0;
  const orderItemsData = items.map((item) => {
    const dish = dishes.find((dish) => dish.id === item.dish_id);
    const price = dish.price * item.quantity;
    total += price;

    // logic not clear why return this
    return {
      dish_id: dish.id,
      quantity: item.quantity,
      price: dish.price,
      name: dish.name,
    };
  });

  return prisma.$transaction(async (tx) => {
    return tx.order.create({
      data: {
        user_id: userId,
        restaurant_id: restaurantId,
        address_id: addressId,
        total_amount: total,
        orderItems: {
          create: orderItemsData,
        },
      },
      // logic not clear
      include: {
        orderItems: true,
      },
    });
  });
};

export const getAllOrders = async (userId) => {
  return await prisma.order.findMany({
    where: {
      user_id: userId,
    },
    include: {
      items: {
        include: {
          dish: {
            select: {
              name: true,
              img: true,
            },
          },
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
    orderBy: {
      created_at: "desc",
    },
  });
};

export const getOrder = async (userId, orderId) => {
  return await prisma.order.findFirst({
    where: {
      id: orderId,
      user_id: userId,
    },
    include: {
      items: {
        include: {
          dish: {
            select: {
              name: true,
              img: true,
            },
          },
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
  // get order by id and userid and extract status
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      user_id: userId,
    },
    select: {
      status: true,
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  // check order is in cancel state
  // throw err if not
  if (!["pending", "accepted"].includes(order.status)) {
    throw new ApiError(400, "Order can no longer be cancelled");
  }
  // update status to cancel not delete
  return await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "cancelled",
      cancelled_at: new Date(),
    },
    select: {
      id: true,
      user_id: true,
      status: true,
    },
  });
};
