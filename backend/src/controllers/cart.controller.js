import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as cartServices from "../services/cart.service.js";
import prisma from "../db/index.js";

export const createCartWithItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const dishId = Number(req.body.dishId);

  if (!Number.isInteger(dishId) || dishId <= 0) {
    throw new ApiError(400, "Invalid dish id");
  }

  const cart = await prisma.$transaction(async (tx) => {
    return await cartServices.createCartWithItem(tx, userId, dishId);
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

export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await cartServices.getCart(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cartItemId = Number(req.params.cartItemId);
  const quantity = Number(req.body.quantity);

  if (
    !Number.isInteger(cartItemId) ||
    cartItemId <= 0 ||
    !Number.isInteger(quantity) ||
    quantity < 0
  ) {
    throw new ApiError(400, "Invalid cart item id or quantity");
  }

  const updatedCart = await cartServices.updateCartItemQuantity(
    userId,
    cartItemId,
    quantity,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Cart item updated successfully"));
});

export const deleteCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cartItemId = Number(req.params.cartItemId);

  if (!Number.isInteger(cartItemId) || cartItemId <= 0) {
    throw new ApiError(400, "Invalid cart item id");
  }

  const updatedCart = await cartServices.deleteCartItem(userId, cartItemId);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Cart item deleted successfully"));
});

export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const clearedCart = await cartServices.clearCart(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, clearedCart, "Cart clear successfully"));
});
