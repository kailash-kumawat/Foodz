// create/get address detail from the user
// update
// delete
// get from server

// state        String
//   city         String
//   address_line String
//   pincode      String

import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";

export const addAddress = async (
  // get info from user
  { state, city, address_line, pincode },
  { latitude, longitude },
  userId,
) => {
  // check address exist
  const existingAddress = await prisma.address.findFirst({
    where: { id: prisma.address.id },
    select: {
      id: true,
      user_id: true,
    },
  });

  if (existingAddress) {
    throw new ApiError(401, "Address already exist!!");
  }

  // create address
  return await prisma.address.create({
    where: { id: userId },
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
      user_id: true,
    },
  });
};
