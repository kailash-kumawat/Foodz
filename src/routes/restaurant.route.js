import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware.js";
import {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller.js";

import {
  createDish,
  updateDish,
  updateAvailablity,
  deleteDish,
} from "../controllers/dish.controller.js";

const router = Router();

/**
 * RESTAURANT ROUTES
 */
router.post("/", authUser, createRestaurant);

router
  .route("/:restaurantId")
  .get(authUser, getRestaurant)
  .patch(authUser, updateRestaurant)
  .delete(authUser, deleteRestaurant);

/**
 * DISH MANAGEMENT (OWNER ONLY)
 */
router.post("/:restaurantId/dishes", authUser, createDish);

router.patch("/:restaurantId/dishes/:dishId", authUser, updateDish);

router.patch(
  "/:restaurantId/dishes/:dishId/availability",
  authUser,
  updateAvailablity,
);

router.delete("/:restaurantId/dishes/:dishId", authUser, deleteDish);

export default router;
