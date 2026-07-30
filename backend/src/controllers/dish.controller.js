import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as dishServices from "../services/dish.service.js";
import { uploadOnCoudinary } from "../utils/cloudinary.js";

export const createDish = asyncHandler(async (req, res) => {
  const restaurant_id = Number(req.params.id);
  const { name, description, price } = req.body;

  if (!name || !name.trim() || price === undefined) {
    throw new ApiError(400, "Both name and price are required");
  }

  if (price <= 0) {
    throw new ApiError(400, "Price must be greater than 0");
  }

  if (!restaurant_id || restaurant_id <= 0) {
    throw new ApiError(400, "RestaurantId is required");
  }

  let dishImgUrl = null;
  if (req.files?.img?.length) {
    const dishImgLocalPath = req.files.img[0].path;

    const uploadedImg = await uploadOnCoudinary(dishImgLocalPath);

    if (!uploadedImg) {
      throw new ApiError(500, "Dish image upload failed");
    }

    dishImgUrl = uploadedImg;
  }

  const createdDish = await dishServices.createDish(
    {
      name,
      description,
      price,
      restaurant_id,
    },
    dishImgUrl,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, createdDish, "Dish created successfully"));
});

export const getDish = asyncHandler(async (req, res) => {
  const dishId = Number(req.params.dishId);
  const restaurantId = Number(req.params.restaurantId);

  if (
    !Number.isInteger(restaurantId) ||
    restaurantId <= 0 ||
    !Number.isInteger(dishId) ||
    dishId <= 0
  ) {
    throw new ApiError(400, "Invalid dish or restaurant id");
  }

  const dish = await dishServices.getDish(dishId, restaurantId);

  return res
    .status(200)
    .json(new ApiResponse(200, dish, "Dish fetched successfully"));
});

export const getAllDishes = asyncHandler(async (_, res) => {
  const allDishes = await dishServices.getAllDishes();

  return res
    .status(200)
    .json(new ApiResponse(200, allDishes, "Dish fetched successfully"));
});

export const searchDish = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (typeof q !== "string") {
    throw new ApiError(400, "Invalid search query");
  }

  const searchedDish = await dishServices.searchDish(q);

  return res
    .status(200)
    .json(new ApiResponse(200, searchedDish, "Dish search completed"));
});

export const updateDish = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  const dishId = Number(req.params.dishId);
  const restaurantId = Number(req.params.restaurantId);

  if (
    !Number.isInteger(restaurantId) ||
    restaurantId <= 0 ||
    !Number.isInteger(dishId) ||
    dishId <= 0
  ) {
    throw new ApiError(400, "Invalid dish or restaurant id");
  }

  if (
    name === undefined &&
    description === undefined &&
    price === undefined &&
    !req.files?.img?.length
  ) {
    throw new ApiError(400, "At least one field is required");
  }

  if (price !== undefined) {
    if (typeof price !== "number" || price <= 0) {
      throw new ApiError(400, "Price must be a number greater than 0");
    }
  }

  let dishImgUrl;
  if (req.files?.img?.length) {
    const dishImgLocalPath = req.files.img[0].path;
    const uploadedImg = await uploadOnCoudinary(dishImgLocalPath);
    if (!uploadedImg) {
      throw new ApiError(500, "Dish image upload failed");
    }

    dishImgUrl = uploadedImg;
  }

  const updatedDish = await dishServices.updateDish(
    { name, description, price, dishId, restaurantId },
    dishImgUrl,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedDish, "Dish updated successfully"));
});

export const updateAvailability = asyncHandler(async (req, res) => {
  const { isAvailable } = req.body;
  const dishId = Number(req.params.dishId);
  const restaurantId = Number(req.params.restaurantId);

  if (
    !Number.isInteger(restaurantId) ||
    restaurantId <= 0 ||
    !Number.isInteger(dishId) ||
    dishId <= 0
  ) {
    throw new ApiError(400, "Invalid dish or restaurant id");
  }

  if (isAvailable === undefined || typeof isAvailable !== "boolean") {
    throw new ApiError(400, "isAvailable must be boolean");
  }

  const updatedAvailable = await dishServices.updateAvailability({
    isAvailable,
    dishId,
    restaurantId,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedAvailable,
        "Dish Availablity updated successfully",
      ),
    );
});

export const deleteDish = asyncHandler(async (req, res) => {
  const dishId = Number(req.params.dishId);
  const restaurantId = Number(req.params.restaurantId);

  if (
    !Number.isInteger(restaurantId) ||
    restaurantId <= 0 ||
    !Number.isInteger(dishId) ||
    dishId <= 0
  ) {
    throw new ApiError(400, "Invalid dish or restaurant id");
  }

  const deletedDish = await dishServices.deleteDish(dishId, restaurantId);

  return res
    .status(200)
    .json(new ApiResponse(200, deletedDish, "Dish deleted successfully"));
});
