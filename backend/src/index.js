import app from "./app.js";
import dotenv from "dotenv";
import prisma from "./db/index.js";
import { startOrderStatus } from "./cron/orderStatus.cron.js";
// change to import
// import http from "http";
// import { Server } from "socket.io";

dotenv.config({
  path: "./.env",
});

// // 🟦 SOCKET.IO LIVE TRACKING
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("send-location", (data) => {
//     io.emit("receive-location", { id: socket.id, ...data });
//   });

//   socket.on("disconnect", () => {
//     io.emit("user-disconnected", { id: socket.id });
//   });
// });

startOrderStatus();

prisma
  .$connect()
  .then(() => {
    app.on("error", (error) => {
      console.log("Express app connection failed: ", error);
    });

    console.log("Database connected successfully!!");

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed: ", error);
  });

process.on("SIGINT", async () => {
  console.log("Server shutting down...");
  await prisma.$disconnect();
  console.log("Database disconnected");

  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Server terminated...");
  await prisma.$disconnect();
  console.log("Database disconnected");

  process.exit(0);
});
