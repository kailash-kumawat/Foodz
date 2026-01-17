import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PaymentType } from "../constants/payment.constant.js";
import * as orderServices from "../services/order.service.js";

export const createOrder = asyncHandler(async (req, res) => {
  // userId from req.user.id
  const userId = req.user.id;
  // addressId and restraId from body
  // items from body
  const { addressId, restaurantId, payment_method } = req.body;
  // validate addressId, restraId and items length
  if (!addressId || !restaurantId) {
    throw new ApiError(400, "Missing fields required");
  }
  // validate payment method
  if (!Object.values(PaymentType).includes(payment_method)) {
    throw new ApiError(400, "Invalid payment method");
  }
  // sent to service
  const createdOrder = await orderServices.createOrder(userId, {
    addressId,
    restaurantId,
    payment_method,
  });
  // return res
  return res
    .status(201)
    .json(new ApiResponse(201, createdOrder, "Order created successfully"));
});

export const getAllOrders = asyncHandler(async (req, res) => {
  // userid
  const userId = req.user.id;

  const page = Math.max(1, Number(req.query.page) || 1); // page >= 1
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10)); //1 <= limit <=50

  // sent to service
  const allUserOrders = await orderServices.getAllOrders(userId, page, limit);
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
  const orderId = Number(req.params.orderId);

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
  const userId = req.user.id;
  const orderId = Number(req.params.orderId);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw new ApiError(400, "Invalid order id");
  }
  // sent to services

  const cancelledOrder = await orderServices.cancelOrder(userId, orderId);

  return res
    .status(200)
    .json(new ApiResponse(200, cancelledOrder, "Order cancel successfully"));
});
