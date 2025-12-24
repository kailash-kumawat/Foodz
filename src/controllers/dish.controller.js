import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as dishServices from "../services/dish.service.js";
import { uploadOnCoudinary } from "../utils/cloudinary.js";

//CREATE DISH
export const createDish = asyncHandler(async (req, res) => {
  // dish info from owner
  // (name, description, price, isAvailable=true(default))
  const restaurant_id = Number(req.params.id);
  const { name, description, price } = req.body;
  // check name and price
  if (!name || !name.trim() || price === undefined) {
    throw new ApiError(400, "Both name and price are required");
  }

  if (price <= 0) {
    throw new ApiError(400, "Price must be greater than 0");
  }

  if (!restaurant_id || restaurant_id <= 0) {
    throw new ApiError(400, "RestaurantId is required");
  }

  //img handling
  let dishImgUrl = null;
  if (req.files?.img?.length) {
    // get image local path from req.files
    const dishImgLocalPath = req.files.img[0].path;
    // get image url from cloudinary util method
    const uploadedImg = await uploadOnCoudinary(dishImgLocalPath);
    // check !url
    if (!uploadedImg) {
      throw new ApiError(500, "Dish image upload failed");
    }

    dishImgUrl = uploadedImg;
  }
  // send data to service
  const createdDish = await dishServices.createDish(
    {
      name,
      description,
      price,
      restaurant_id,
    },
    dishImgUrl,
  );
  // return res
  return res
    .status(200)
    .json(new ApiResponse(200, createdDish, "Dish created successfully"));
});
//GET DISH
//UPDATE DISH (NAME, DESCRIPTION, IMAGE, PRICE)
//UPDATE DISH AVAILABLITY
//DELETE DISH
