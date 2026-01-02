import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as orderServices from "../services/order.service.js";

export const createOrder = asyncHandler(async (req, res) => {
  // userId from req.user.id
  const userId = req.user.id;
  // addressId and restraId from body
  // items from body
  const { addressId, restaurantId, items } = req.body;
  // validate addressId, restraId and items length
  if (!userId || !addressId || !restaurantId || !items?.length) {
    throw new ApiError(400, "Missing fields required");
  }
  // sent to service
  const createdOrder = orderServices.createOrder(userId, {
    addressId,
    restaurantId,
    items,
  });
  // return res
  return res
    .status(200)
    .json(new ApiResponse(200, createdOrder, "Order created successfully"));
});

export const getAllOrders = asyncHandler(async (req, res) => {
  // userid
  const userId = req.user.id;

  // sent to service
  const allUserOrders = await orderServices.getOrder(userId);
  // return res
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allUserOrders,
        "User all orders fetched successfully",
      ),
    );
});

export const getOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const orderId = Number(req.params.id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw new ApiError(400, "Invalid order id");
  }

  const order = await orderServices.getOrder(userId, orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched successfully"));
});

export const cancelOrder = asyncHandler(async (req, res) => {
  // userid and order id
  const orderId = Number(req.params.id);
  const userId = req.user.id;

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw new ApiError(400, "Invalid order id");
  }
  // sent to services

  const cancelledOrder = await orderServices.cancelOrder(userId, orderId);

  return res
    .status(200)
    .json(new ApiResponse(200, cancelledOrder, "Order cancel successfully"));
});

// next --> build cart CRUD --> create routes
// --> delivery tracking (animation of delivery guy instead of map with messages)
// --> payment gateway


