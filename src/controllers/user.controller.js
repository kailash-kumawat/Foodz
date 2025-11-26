// here we take info from user and send to the services, then services returns the response to the controller and sends it back to the client.
// route import controllers not services, services only do CRUD operations.

// check if user already exists, apply this check on controller.
// user doesn't have referesh and access tokens at this point, need to generate them.
import * as userService from "../services/user.service.js";
import * as tokenService from "../services/token.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/index.js";

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, contact, password } = req.body;
  // check info validity
  if (
    [name, email, contact, password].some(
      (field) => field?.trim === "" || !field,
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const createdUser = await userService.createUser({
    name,
    email,
    contact,
    password,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

export const logInUser = asyncHandler(async (req, res) => {
  const { contact, password } = req.body;
  // check info validity
  if (!contact || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const loggedInUser = await userService.logInUser({ contact, password });

  const { accessToken, refreshToken } =
    tokenService.generateAccessTokenAndRefreshToken(loggedInUser);

  await prisma.user.update({
    where: { id: loggedInUser.id },
    data: { refreshToken },
  });

  const accessTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 15, // 15 minutes
  };

  const refreshTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

export const logOutUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  await userService.logOutUser(userId);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { name, email, contact } = req.body;
  // check fields are provided
  if (!name && !email && !contact) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const updatedUser = await userService.updateUser(
    { name, email, contact },
    userId,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

export const updateUserPassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Both old and new passwords are required");
  }

  await userService.updateUserPassword({ oldPassword, newPassword }, userId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password updated successfully"));
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const userDetails = await userService.getUserProfile(userId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, userDetails, "User profile fetched successfully"),
    );
});
