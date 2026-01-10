import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as paymentSerivces from "../services/payment.service.js";

export const createOnlinePayment = asyncHandler(async (req, res) => {
  // userid and orderid
  const userId = req.user.id;
  const orderId = Number(req.params.id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw new ApiError(400, "Invalid order id");
  }

  const payment = await paymentSerivces.createOnlinePayment(userId, orderId);

  return res
    .status(200)
    .json(new ApiResponse(200, payment, "Payment created successfully"));
});

export const verifyOnlinePayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const verifiedOnlinePayment = await paymentSerivces.verifyOnlinePayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, verifiedOnlinePayment, "Verification successful"),
    );
});

export const razorpayWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];

  await paymentSerivces.razorpayWebhook({
    signature,
    rawBody: req.rawBody,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, true, "Webhook processed successfully"));
});

// next --> webhook
