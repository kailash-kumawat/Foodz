import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";

export const createUser = async ({ name, email, contact, password }) => {
  // check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { contact }],
    },
    select: { id: true, name: true, email: true },
  });

  if (existingUser) {
    throw new ApiError(409, "User with this contact already exists");
  }
  // hash password before storing in database
  const hashedPassword = await bcrypt.hash(password, 10);
  // create user in database
  return await prisma.user.create({
    data: {
      name,
      email,
      contact,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      contact: true,
      created_at: true,
    },
  });
  // return created user info along with tokens via controller
  // return res
  //   .status(201)
  //   .json(new ApiResponse(201, createdUser, "User created successfully"));
};

export const logInUser = async ({ contact, password }) => {
  // check user exists with email or contact
  const existingUser = await prisma.user.findUnique({
    where: { contact },
    select: { id: true, email: true, contact: true, password: true },
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found with this contact");
  }
  // check password is correct
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  // here generate tokens and store refresh token in db if needed.
  // 1. generateTokens() method
  // 2. in generateTokens() --> generate access and refresh tokens, and attach refreshtoken to user
  // and return both tokens.
  // generateRefreshToken() and generateAccessToken() methods both are separate.
  // 3. extract tokens from generateTokens() method and return along with user info to controller.

  const { password: _, ...safeUser } = existingUser;

  return safeUser;
  // return user is loggedIn via controller.
  // return res
  //   .status(200)
  //   .json(new ApiResponse(200, safeUser, "User logged in successfully"));
};

export const logOutUser = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      refreshToken: null,
    },
    select: { id: true },
  });

  // In controller clear cookies
  // const options = {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   path: "/",
  // };

  // return res
  //   .status(200)
  //   .clearCookie("refreshToken", options)
  //   .clearCookie("accessToken", options)
  //   .json(new ApiResponse(200, {}, "User logged out successfully"));
};

export const updateUser = async ({ name, email, contact, address }, userId) => {
  // find user by id and update
  return await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      contact,
      address,
    },
    select: {
      id: true,
      name: true,
      email: true,
      contact: true,
      address: true,
      updated_at: true,
    },
  });
  // return updated user info through controller
  // return res
  //   .status(200)
  //   .json(new ApiResponse(200, updatedUser, "User updated successfully"));
};

export const updateUserPassword = async (
  { oldPassword, newPassword },
  userId,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (!isOldPasswordCorrect) {
    throw new ApiError(401, "Old password is incorrect");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  return await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedNewPassword,
    },
    select: { id: true },
  });

  // controller part
  // return res
  //   .status(200)
  //   .json(new ApiResponse(200, {}, "password updated successfully"));
};

//TODO: later add forget password feature

export const getUserProfile = async (userId) => {
  // const userId = req.user.id;

  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      orders: {
        select: {
          address: true,
          totalAmount: true,
          status: true,
          created_at: true,
          dishes: {
            select: {
              name: true,
              price: true,
              created_at: true,
              restaurant: {
                select: {
                  name: true,
                  address_line: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // controller part
  // return res
  //   .status(200)
  //   .json(
  //     new ApiResponse(200, userDetails, "User profile fetched successfully"),
  //   );
};
