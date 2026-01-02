import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { createCart } from "../controllers/cart.controller.js";

export const createCart = async (tx, userId, dishId) => {
  // create cart for userId
  // return await prisma.$transaction(async (tx) => {
  const dishExists = await tx.dish.findUnique({
    where: { id: dishId },
  });

  if (!dishExists) {
    throw new ApiError(404, "Dish not found");
  }

  return await tx.cart.create({
    // quantity +1
    // create cart for user where userId, set data --> cartitems --> quantity and dishId
    data: {
      user_id: userId,
      cartItems: {
        create: {
          dish_id: dishId,
          quantity: 1,
        },
      },
    },
    include: {
      cartItems: {
        include: {
          dish: true,
        },
      },
    },
  });
  // });
};

export const addItemToCart = async (userId, dishId) => {
  return await prisma.$transaction(async (tx) => {
    // check cart is not empty and belong to that user
    const existingCart = await tx.cart.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        cartItems: true,
      },
    });
    // empty --> create
    if (!existingCart) {
      return createCart(tx, userId, dishId);
    }
    // !empty --> check cart dish  === dishId
    const existingCartItem = existingCart.cartItems.find(
      (item) => item.dish_id === dishId,
    );

    // update existing cart --> add new dish in cartitems
    // quantity +1
    if (!existingCartItem) {
      return await tx.cartItem.create({
        data: {
          cart_id: existingCart.id,
          dish_id: dishId,
          quantity: 1,
        },
      });
    }
    // update existing cart --> increment in dish quantity
    return await tx.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  });
};
