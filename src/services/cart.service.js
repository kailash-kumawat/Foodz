import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { createCart } from "../controllers/cart.controller.js";

export const createCartWithItem  = async (tx, userId, dishId) => {
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
    // find restra id from dish model using dishid
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

    // check cart is not empty and belong to that user
    const existingCart = await tx.cart.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        cartItems: {
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

    // empty --> create
    if (!existingCart) {
      return await createCartWithItem (tx, userId, dishId);
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

    // !empty --> check cart dish  === dishId
    const existingCartItem = existingCart.cartItems.find(
      (item) => item.dish_id === dishId,
    );

    // update existing cart --> add new dish in cartitems
    // quantity +1
    if (!existingCartItem) {
      await tx.cartItem.create({
        data: {
          cart_id: existingCart.id,
          dish_id: dishId,
          quantity: 1,
        },
      });
    } else {
      // update existing cart --> increment in dish quantity
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
        include: {
          dish: true,
        },
      },
    },
  });

  // If no cart, return empty cart structure
  if (!cart) {
    return { cartItems: [] };
  } else {
    return cart;
  }
};

export const updateCartItemQuantity = async (userId, cartItemId, quantity) => {
  return await prisma.$transaction(async (tx) => {
    // find cartitem
    const cartItem = await tx.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
      include: {
        cart: true,
      },
    });
    // verify cartitem belong to the userId
    if (!cartItem || cartItem.cart.user_id !== userId) {
      throw new ApiError(404, "Cart item not found");
    }
    // check quant==0 delete item return cart
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
    // update quant return cart
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
        cartItems: { include: { dish: true } },
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
    // verify cartitem belong to the userId
    if (!cartItem || cartItem.cart.user_id !== userId) {
      throw new ApiError(404, "Cart item not found");
    }
    // delete
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
    //find cart
    const cart = await tx.cart.findUnique({
      where: {
        user_id: userId,
      },
    });
    //check empty
    if (!cart) {
      return { cartItems: [] };
    }
    //delete cartitems
    await tx.cartItem.deleteMany({
      where: {
        cart_id: cart.id,
      },
    });

    //empty cart
    return await tx.cart.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        cartItems: {
          include: {
            dish: true,
          },
        },
      },
    });
  });
};
