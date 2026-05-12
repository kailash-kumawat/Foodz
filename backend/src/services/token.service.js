import jwt from "jsonwebtoken";

export const generateAccessTokenAndRefreshToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      contact: user.contact,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );

  return { accessToken, refreshToken };
};
