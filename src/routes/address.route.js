import { Router } from "express";
import { verifyJwt } from "../middlewares/user.middleware.js";

import {
  addAddress,
  updateAddress,
  getAddress,
  deleteAddress,
} from "../controllers/address.controller.js";

const router = Router();

router
  .route("/")
  .post(verifyJwt, addAddress)
  .patch(verifyJwt, updateAddress)
  .get(verifyJwt, getAddress);
router.route("/:id").delete(verifyJwt, deleteAddress);

export default router;
