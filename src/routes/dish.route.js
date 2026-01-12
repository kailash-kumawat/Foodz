import { Router } from "express";
import { getDish } from "../controllers/dish.controller.js";
// import { getRestaurantDishes } from "../controllers/dish.controller.js";

const router = Router();

// All dishes of a restaurant (dish cards)
// router.get("/restaurant/:restaurantId", getRestaurantDishes);

// Single dish
router.get("/:restaurantId/:dishId", getDish);

export default router;
