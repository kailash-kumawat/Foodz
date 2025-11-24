import { Router } from "express";
import {
  createUser,
  logInUser,
  logOutUser,
  updateUser,
  updateUserPassword,
  getUserProfile,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/user.middleware.js";

const router = Router();

router.route("/register").post(createUser);
router.route("/login").post(logInUser);
router.route("/logout").post(verifyJwt, logOutUser);
router.route("/profile").get(verifyJwt, getUserProfile);
router.route("/update").patch(verifyJwt, updateUser);
router.route("/update-password").patch(verifyJwt, updateUserPassword);

export default router;
