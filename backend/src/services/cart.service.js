import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";

export const createCartWithItem = async (tx, userId, dishId) => {
  const dishExists = await tx.dish.findUnique({
    where: { id: dishId },
  });

  if (!dishExists) {
    throw new ApiError(404, "Dish not found");
  }

  return await tx.cart.create({
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
        orderBy: {
          created_at: "asc",
        },
        include: {
          dish: true,
        },
      },
    },
  });
};

export const addItemToCart = async (userId, dishId) => {
  return await prisma.$transaction(async (tx) => {
    const dish = await tx.dish.findUnique({
      where: {
        id: dishId,
      },
      select: {
        restaurant_id: true,
      },
    });

    if (!dish) {
      throw new ApiError(404, "Dish not found");
    }

    const existingCart = await tx.cart.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        cartItems: {
          orderBy: {
            created_at: "asc",
          },
          include: {
            dish: {
              select: {
                restaurant_id: true,
              },
            },
          },
        },
      },
    });

    if (!existingCart) {
      return await createCartWithItem(tx, userId, dishId);
    }

    if (existingCart.cartItems.length > 0) {
      const cartRestaurantId = existingCart.cartItems[0].dish.restaurant_id;
      if (cartRestaurantId !== dish.restaurant_id) {
        throw new ApiError(
          400,
          "You cannot add items from different restaurants in the same cart",
        );
      }
    }

    const existingCartItem = existingCart.cartItems.find(
      (item) => item.dish_id === dishId,
    );

    if (!existingCartItem) {
      await tx.cartItem.create({
        data: {
          cart_id: existingCart.id,
          dish_id: dishId,
          quantity: 1,
        },
      });
    } else {
      await tx.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    }

    return await tx.cart.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        cartItems: {
          orderBy: {
            created_at: "asc",
          },
          include: {
            dish: true,
          },
        },
      },
    });
  });
};

export const getCart = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      cartItems: {
        orderBy: {
          created_at: "asc",
        },
        include: {
          dish: true,
        },
      },
    },
  });

  if (!cart) {
    return { cartItems: [] };
  } else {
    return cart;
  }
};

export const updateCartItemQuantity = async (userId, cartItemId, quantity) => {
  return await prisma.$transaction(async (tx) => {
    const cartItem = await tx.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
      include: {
        cart: true,
      },
    });
    if (!cartItem || cartItem.cart.user_id !== userId) {
      throw new ApiError(404, "Cart item not found");
    }
    if (quantity === 0) {
      await tx.cartItem.delete({
        where: {
          id: cartItemId,
        },
      });

      return await tx.cart.findUnique({
        where: {
          user_id: userId,
        },
        include: {
          cartItems: { include: { dish: true } },
        },
      });
    }
    await tx.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: { quantity },
    });

    return await tx.cart.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        cartItems: {
          orderBy: {
            created_at: "asc",
          },
          include: { dish: true },
        },
      },
    });
  });
};

export const deleteCartItem = async (userId, cartItemId) => {
  return await prisma.$transaction(async (tx) => {
    const cartItem = await tx.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
      include: {
        cart: true,
      },
    });
    if (!cartItem || cartItem.cart.user_id !== userId) {
      throw new ApiError(404, "Cart item not found");
    }
    await tx.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return await tx.cart.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        cartItems: {
          orderBy: {
            created_at: "asc",
          },
          include: {
            dish: true,
          },
        },
      },
    });
  });
};

export const clearCart = async (userId) => {
  return await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!cart) {
      return { cartItems: [] };
    }
    await tx.cartItem.deleteMany({
      where: {
        cart_id: cart.id,
      },
    });

    return await tx.cart.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        cartItems: {
          orderBy: {
            created_at: "asc",
          },
          include: {
            dish: true,
          },
        },
      },
    });
  });
};
