import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import prisma  from "../db/index.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    prisma.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});
