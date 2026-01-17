import express from "express";
import { Router } from "express";
import { verifyJwt } from "../middlewares/user.middleware.js";
import {
  createOnlinePayment,
  razorpayWebhook,
  verifyOnlinePayment,
} from "../controllers/payment.controller.js";

const router = Router();
router.post(
  "/webhook/razorpay",
  express.raw({ type: "application/json" }),
  razorpayWebhook,
);

router.post("/verifypayment", verifyJwt, verifyOnlinePayment);
router.post("/:orderId", verifyJwt, createOnlinePayment);

export default router;
