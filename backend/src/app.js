import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: "http://192.168.29.172:5173",
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "16kb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  }),
);

app.use(cookieParser());
app.use(express.static("public"));

import userRoutes from "./routes/user.route.js";
import addressRoutes from "./routes/address.route.js";
import restaurantRoutes from "./routes/restaurant.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";
import paymentRoutes from "./routes/payment.route.js";
import dishRoutes from "./routes/dish.route.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/dishes", dishRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/payments", paymentRoutes);

app.use(errorHandler);

export default app;
