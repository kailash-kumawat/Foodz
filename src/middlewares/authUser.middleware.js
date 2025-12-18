// TEMP: auth disabled for MVP. Later will add.
import { asyncHandler } from "../utils/asyncHandler.js";

export const authUser = asyncHandler(async (req, res, next) => {
  next();
});
