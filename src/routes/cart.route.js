import { Router } from "express";
import { verifyJwt } from "../middlewares/user.middleware.js";
import {
  addItemToCart,
  getCart,
  updateCartItemQuantity,
  deleteCartItem,
  clearCart,
} from "../controllers/cart.controller.js";

const router = Router();

router
  .route("/")
  .post(verifyJwt, addItemToCart)
  .get(verifyJwt, getCart)
  .delete(verifyJwt, clearCart);

router
  .route("/items/:cartItemId")
  .patch(verifyJwt, updateCartItemQuantity)
  .delete(verifyJwt, deleteCartItem);

export default router;
