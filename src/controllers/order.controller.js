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

export const getOrder = asyncHandler(async (req, res) => {
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
