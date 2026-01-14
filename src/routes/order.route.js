import { Router } from "express";
import { verifyJwt } from "../middlewares/user.middleware.js";
import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getOrder,
} from "../controllers/order.controller.js";

const router = Router();

router.route("/").post(verifyJwt, createOrder).get(verifyJwt, getAllOrders);

router
  .route("/:orderId")
  .get(verifyJwt, getOrder)
  .delete(verifyJwt, cancelOrder);

export default router;
