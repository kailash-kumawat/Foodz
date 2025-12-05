import * as addressServices from "../services/address.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const addAddress = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { state, city, address_line, pincode } = req.body;
  // get longttude and lattude from google geocoding api
  // const {latitude, longitude} = ApiResponse;

  if (
    [state, city, address_line, pincode].some(
      (field) => field?.trim === "" || !field,
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const userAddress = await addressServices.addAddress(
    { state, city, address_line, pincode },
    { latitude, longitude },
    userId,
  );

  res
    .status(200)
    .json(new ApiResponse(200, userAddress, "Address addded successfully"));
});
