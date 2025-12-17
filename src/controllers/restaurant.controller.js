import { ApiError, asyncHandler, ApiResponse } from "../utils/ApiError.js";
import * as restaurantServices from "../services/restaurant.service.js";

// i'll available the option to user register your restra, team contacted ui,
// give restra info form and call this controller.

export const createRestaurant = asyncHandler(async (req, res) => {
  //get restra info from owner
  const { name, city, address_line, pincode, contact } = req.body;
  //check field not empty
  if (
    [name, city, address_line, pincode, contact].some(
      (field) => !field || field.trim() == "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  //send info to service
  const createdRestaurant = await restaurantServices.createRestaurant({
    name,
    city,
    address_line,
    pincode,
    contact,
  });
  //res
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
  const restaurantId = req.restaurant.id;

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
  // get info from user to update
  const { name, city, address_line, pincode, contact } = req.body;
  const restaurantId = req.restaurant.id;
  // check atleast have one field
  if (
    [name, city, address_line, pincode, contact].every(
      (field) => !field || field.trim() === "",
    )
  ) {
    throw new ApiError(400, "At least one field is required");
  }
  // send to controller
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
  // return res
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
  const restaurantId = req.restaurant.id;

  await restaurantServices.deleteRestaurant(restaurantId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Restaurant deleted successfully"));
});
