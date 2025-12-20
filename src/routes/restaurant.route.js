import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware.js";
import {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller.js";

const router = Router();

router.route("/").post(authUser, createRestaurant);
router
  .route("/:id")
  .get(authUser, getRestaurant)
  .patch(authUser, updateRestaurant)
  .delete(authUser, deleteRestaurant);

export default router;
