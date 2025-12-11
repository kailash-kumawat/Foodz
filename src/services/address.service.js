import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";

export const addAddress = async (
  // get info from user
  data,
  userId,
) => {
  //check existing address for user
  const existingAddress = await prisma.address.findFirst({
    where: { user_id: userId },
  });

  if (existingAddress) {
    throw new ApiError(409, "Address already exists for this user");
  }

  // create address
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

// create update, delete, get functions for address management.
