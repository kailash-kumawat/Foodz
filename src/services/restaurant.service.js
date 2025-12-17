import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/index.js";

// create restaurant
export const createRestaurant = async ({
  name,
  city,
  address_line,
  pincode,
  contact,
}) => {
  // check restra existed or not
  // check using all of info see gpt
  const existedRestaurant = await prisma.restaurant.findFirst({
    where: {
      name,
      city,
      address_line,
      pincode,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (existedRestaurant) {
    throw new ApiError(409, "Restaurant already exists");
  }
  // return create why try catch -> handling 2 same restaurant creation at same time.
  try {
    return await prisma.restaurant.create({
      data: {
        name,
        city,
        address_line,
        pincode,
        contact,
      },
      select: {
        name: true,
        city: true,
        address_line: true,
        pincode: true,
        contact: true,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new ApiError(409, "Restaurant already exists");
    }
    throw error;
  }
};

// get
export const getRestaurant = async (restaurantId) => {
  const restaurantDetails = await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });

  if (!restaurantDetails) {
    throw new ApiError(404, "Restaurant not found or Invalid restaurant id");
  }

  return restaurantDetails;
};

// update
export const updateRestaurant = async (
  { name, city, address_line, pincode, contact },
  restaurantId,
) => {
  const isRestaurantExist = await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });

  if (isRestaurantExist) {
    throw new ApiError(400, "Restaurant not found");
  }

  const updateData = {
    ...(name && { name }),
    ...(city && { city }),
    ...(address_line && { address_line }),
    ...(pincode && { pincode }),
    ...(contact && { contact }),
  };

  return await prisma.restaurant.update({
    where: {
      id: restaurantId,
    },
    data: updateData,
    select: {
      id: true,
      name: true,
      city: true,
      address_line: true,
      pincode: true,
      contact: true,
    },
  });
};

// delete
export const deleteRestaurant = async (restaurantId) => {
  const isRestaurantExist = await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });

  if (!isRestaurantExist) {
    throw new ApiError(404, "Restaurant not found");
  }

  return await prisma.restaurant.delete({
    where: {
      id: restaurantId,
    },
  });
};
