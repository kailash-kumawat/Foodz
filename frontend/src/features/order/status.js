import {
  receivedAnimation,
  confirmAnimation,
  cookingAnimation,
  readyAnimation,
  pickedupAnimation,
  deliveryAnimation,
  deliveredAnimation,
  failedAnimation,
} from "../../assets/lottie/index.js";

export const steps = [
  {
    status: "pending",
    title: "Order Placed",
    description: "We have received your order.",
    animation: receivedAnimation,
  },
  {
    status: "accepted",
    title: "Order Confirmed",
    description: "Restaurant accepted your order.",
    animation: confirmAnimation,
  },
  {
    status: "preparing",
    title: "Preparing",
    description: "The restaurant is preparing your order.",
    animation: cookingAnimation,
  },
  {
    status: "ready",
    title: "Ready for Pickup",
    description: "Your order is ready.",
    animation: readyAnimation,
  },
  {
    status: "picked_up",
    title: "Picked Up",
    description: "Delivery partner picked up your order.",
    animation: pickedupAnimation,
  },
  {
    status: "on_the_way",
    title: "On The Way",
    description: "Your order is on the way.",
    animation: deliveryAnimation,
  },
  {
    status: "delivered",
    title: "Delivered",
    description: "Enjoy your meal!",
    animation: deliveredAnimation,
  },

  {
    status: "cancelled",
    title: "Cancelled",
    description: "Your order has been cancelled.",
    animation: failedAnimation,
  },
];
