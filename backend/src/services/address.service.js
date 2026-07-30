import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";

export const addAddress = async (data, userId) => {
  const existingAddress = await prisma.address.findFirst({
    where: { user_id: userId },
  });

  if (existingAddress) {
    throw new ApiError(409, "Address already exists for this user");
  }

  return await prisma.address.create({
    data: {
      ...data,
      user_id: userId,
    },
    select: {
      id: true,
      user_id: true,
      state: true,
      city: true,
      address_line: true,
      pincode: true,
    },
  });
};

export const updateAddress = async (data, userId) => {
  const { state, city, address_line, pincode, latitude, longitude } = data;
  return await prisma.address.update({
    where: {
      user_id: userId,
    },
    data: {
      state,
      city,
      address_line,
      pincode,
      latitude,
      longitude,
    },
    select: {
      id: true,
      state: true,
      city: true,
      address_line: true,
      pincode: true,
      latitude: true,
      longitude: true,
    },
  });
};

export const getAddress = async (userId) => {
  return await prisma.address.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      user_id: true,
      state: true,
      city: true,
      address_line: true,
      pincode: true,
      latitude: true,
      longitude: true,
    },
  });
};

export const deleteAddress = async (userId, addressId) => {
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      user_id: userId,
    },
  });

  if (!address) {
    throw new ApiError(400, "User don't have this address");
  }

  await prisma.address.delete({
    where: {
      id: addressId,
    },
  });
};
