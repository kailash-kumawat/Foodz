import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";

export const createUser = async ({ name, email, contact, password }) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { contact }],
    },
    select: { id: true, name: true, email: true },
  });

  if (existingUser) {
    throw new ApiError(409, "User with this contact already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

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
};

export const logInUser = async ({ contact, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: { contact },
    select: { id: true, email: true, contact: true, password: true },
  });

  if (!existingUser) {
    throw new ApiError(404, "User not found with this contact");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  const { password: _, ...safeUser } = existingUser;

  return safeUser;
};

export const logOutUser = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
    select: { id: true },
  });
};

export const updateUser = async ({ name, email, contact }, userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      contact,
    },
    select: {
      id: true,
      name: true,
      email: true,
      contact: true,
      updated_at: true,
    },
  });
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
};

//TODO: later add forget password feature

export const getUserProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      contact: true,
      addresses: true,
      orders: {
        select: {
          address: true,
          total_amount: true,
          status: true,
          created_at: true,
          items: {
            select: {
              name: true,
              price: true,
              created_at: true,
            },
          },
          restaurant: {
            select: {
              name: true,
              address_line: true,
            },
          },
        },
      },
    },
  });
};
