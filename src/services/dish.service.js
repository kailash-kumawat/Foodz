import prisma from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";

export const createDish = async (
  { name, description, price, restaurant_id },
  dishImgUrl,
) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: restaurant_id,
    },
  });

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  const existingDish = await prisma.dish.findFirst({
    where: {
      restaurant_id,
      name: name.trim(),
    },
  });

  if (existingDish) {
    throw new ApiError(409, "Dish already exists for this restaurant");
  }

  return await prisma.dish.create({
    data: {
      restaurant_id,
      name: name.trim(),
      description,
      price,
      img: dishImgUrl,
      isAvailable: true,
    },
    select: {
      id: true,
      restaurant_id: true,
      name: true,
      description: true,
      price: true,
      img: true,
      isAvailable: true,
    },
  });
};

export const getDish = async () => {};

export const updateDish = async (
  { name, description, price, dishId, restaurantId },
  dishImgUrl,
) => {
  const dish = await prisma.dish.findUnique({
    where: {
      id: dishId,
      restaurant_id: restaurantId,
    },
  });

  if (!dish) {
    throw new ApiError(404, "Dish not found");
  }

  const updateData = {
    ...(name !== undefined && { name: name.trim() }),
    ...(description !== undefined && { description }),
    ...(price !== undefined && { price }),
    ...(dishImgUrl && { img: dishImgUrl }),
  };

  try {
    return await prisma.dish.update({
      where: {
        id: dishId,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        img: true,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new ApiError(409, "Dish name already exists for this restaurant");
    }
    throw error;
  }
};

export const updateAvailablity = async () => {};

export const deleteDish = async () => {};
