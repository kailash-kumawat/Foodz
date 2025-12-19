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
  .route("/address")
  .post(verifyJwt, addAddress)
  .patch(verifyJwt, updateAddress)
  .get(verifyJwt, getAddress);
router.route("/address/:id").delete(verifyJwt, deleteAddress);

export default router;
