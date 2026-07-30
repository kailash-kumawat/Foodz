import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as restaurantServices from "../services/restaurant.service.js";

export const createRestaurant = asyncHandler(async (req, res) => {
  const { name, city, address_line, pincode, contact } = req.body;
  if (
    [name, city, address_line, pincode, contact].some(
      (field) => !field || field.trim() == "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const createdRestaurant = await restaurantServices.createRestaurant({
    name,
    city,
    address_line,
    pincode,
    contact,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createdRestaurant,
        "Restaurant registered successfully",
      ),
    );
});

export const getRestaurant = asyncHandler(async (req, res) => {
  const restaurantId = Number(req.params.id);

  const restaurantDetails =
    await restaurantServices.getRestaurant(restaurantId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        restaurantDetails,
        "Restaurant detail fetched successfully",
      ),
    );
});

export const updateRestaurant = asyncHandler(async (req, res) => {
  const { name, city, address_line, pincode, contact } = req.body;
  const restaurantId = Number(req.params.id);
  if (
    [name, city, address_line, pincode, contact].every(
      (field) => !field || field.trim() === "",
    )
  ) {
    throw new ApiError(400, "At least one field is required");
  }
  const updatedRestaurant = await restaurantServices.updateRestaurant(
    {
      name,
      city,
      address_line,
      pincode,
      contact,
    },
    restaurantId,
  );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedRestaurant,
        "Restaurant updated successfully",
      ),
    );
});

export const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurantId = Number(req.params.id);

  await restaurantServices.deleteRestaurant(restaurantId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Restaurant deleted successfully"));
});
