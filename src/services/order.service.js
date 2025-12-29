// next start from here
import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";

export const createOrder = async (
  userId,
  { addressId, restaurantId, items },
) => {
  const address = prisma.address.findFirst({
    where: {
      id: addressId,
      user_id: userId,
    },
  });

  if (!address) {
    throw new ApiError(403, "Invalid address selected");
  }

  const restaurant = prisma.restaurant.findUnique({
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
    const dish = dishes.map((dish) => dish.price);
    const price = dish.price * item.quantity;
    total += price;

    return {
      dish_id: dish.id,
      quantity: item.quantity,
      price: dish.price,
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
      include: {
        orderItems: true,
      },
    });
  });
};
