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
  .route("/addAddress")
  .post(verifyJwt, addAddress)
  .patch(verifyJwt, updateAddress)
  .get(verifyJwt, getAddress)
  .delete(verifyJwt, deleteAddress);
