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
