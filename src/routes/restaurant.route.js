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
  updateAvailability,
  deleteDish,
  getDish,
} from "../controllers/dish.controller.js";

const router = Router();

/**
 * RESTAURANT ROUTES
 */
router.post("/", authUser, createRestaurant);

router
  .route("/:restaurantId")
  .get(getRestaurant)
  .patch(authUser, updateRestaurant)
  .delete(authUser, deleteRestaurant);

/**
 * DISH MANAGEMENT (OWNER ONLY)
 */
router.post("/:restaurantId/dishes", authUser, createDish);

router.patch(
  "/:restaurantId/dishes/:dishId/availability",
  authUser,
  updateAvailability,
);

router
  .route("/:restaurantId/dishes/:dishId")
  .get(getDish) // public
  .patch(authUser, updateDish)
  .delete(authUser, deleteDish);

export default router;
