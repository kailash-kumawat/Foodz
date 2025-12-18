import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware.js";
import {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller.js";

const router = Router();

router.route("/restaurants").post(authUser, createRestaurant);
router
  .route("/restaurants/:id")
  .get(authUser, getRestaurant)
  .patch(authUser, updateRestaurant)
  .delete(authUser, deleteRestaurant);
