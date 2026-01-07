import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as cartServices from "../services/cart.service.js";
import prisma from "../db/index.js";

export const createCart = asyncHandler(async (req, res) => {
  // userId, dishId from the frontend
  const userId = req.user.id;
  const dishId = Number(req.body.dishId);

  if (!Number.isInteger(dishId) || dishId <= 0) {
    throw new ApiError(400, "Invalid dish id");
  }

  // check cartEmpty or not(assume cart empty)
  // send userId, dishid and quantity to cart service from controller
  const cart = await prisma.$transaction(async (tx) => {
    return await cartServices.createCart(tx, userId, dishId);
  });

  return res
    .status(201)
    .json(new ApiResponse(201, cart, "Cart created successfully"));
});

export const addItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const dishId = Number(req.body.dishId);

  if (!Number.isInteger(dishId) || dishId <= 0) {
    throw new ApiError(400, "Invalid dish id");
  }

  const addedItem = await cartServices.addItemToCart(userId, dishId);

  return res
    .status(201)
    .json(new ApiResponse(201, addedItem, "Item added to the cart"));
});

//READ cart
export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await cartServices.getCart(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

//UPDATE cart item qunatity
export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  // cartitemid(update), userid(check cart empty)
  const userId = req.user.id;
  const cartItemId = Number(req.params.cartItemId);
  const quantity = Number(req.body.quantity);
  // check cartitemid
  if (
    !Number.isInteger(cartItemId) ||
    cartItemId <= 0 ||
    !Number.isInteger(quantity) ||
    quantity < 0
  ) {
    throw new ApiError(400, "Invalid cart item id or quantity");
  }
  // send to service
  const updatedCart = await cartServices.updateCartItemQuantity(
    userId,
    cartItemId,
    quantity,
  );
  // res
  return res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Cart item updated successfully"));
});

//DELETE cart item manual
export const deleteCartItem = asyncHandler(async (req, res) => {
  // cartitem id, userid verify cart
  const userId = req.user.id;
  const cartItemId = Number(req.params.cartItemId);
  // check cartitem id
  if (!Number.isInteger(cartItemId) || cartItemId <= 0) {
    throw new ApiError(400, "Invalid cart item id");
  }
  // send to service
  const updatedCart = await cartServices.deleteCartItem(userId, cartItemId);
  // res
  return res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Cart item deleted successfully"));
});

//CLEAR cart auto after order
export const clearCart = asyncHandler(async (req, res) => {
  // userid to find cart
  const userId = req.user.id;
  // send to services
  const clearedCart = await cartServices.clearCart(userId);
  // res
  return res
    .status(200)
    .json(new ApiResponse(200, clearedCart, "Cart clear successfully"));
});
