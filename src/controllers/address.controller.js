import * as addressServices from "../services/address.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const addAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { state, city, address_line, pincode, latitude, longitude } = req.body;

  if (
    [state, city, address_line, pincode].some(
      (field) => !field || field.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (latitude === undefined || longitude === undefined) {
    throw new ApiError(400, "Invalid coordinates");
  }

  const userAddress = await addressServices.addAddress(
    { state, city, address_line, pincode, latitude, longitude },
    userId,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, userAddress, "Address addded successfully"));
});

export const updateAddress = asyncHandler(async (req, res) => {
  // get info from user
  const userId = req.user.id;
  const { state, city, address_line, pincode, latitude, longitude } = req.body;
  // check fields are missing or not, have atleast one field to update.
  if (!state && !city && !address_line && !pincode) {
    throw new ApiError(400, "At least one field is required to update");
  }

  // If user sends coordinates, both must be present
  if (
    (latitude !== undefined && longitude === undefined) ||
    (longitude !== undefined && latitude === undefined)
  ) {
    throw new ApiError(400, "Both latitude and longitude are required");
  }
  // pass info to service
  const updatedAddress = await addressServices.updateAddress(
    {
      state,
      city,
      address_line,
      pincode,
      latitude,
      longitude,
    },
    userId,
  );
  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedAddress, "User address updated successfully"),
    );
});

export const getAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const userAddressDetails = await addressServices.getAddress(userId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userAddressDetails,
        "User address fetched successfully",
      ),
    );
});
