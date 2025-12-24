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
//is we need to check restaurantid is not empty??

export const getDish = async () => {};

export const updateDish = async () => {};

export const updateAvailablity = async () => {};

export const deleteDish = async () => {};
