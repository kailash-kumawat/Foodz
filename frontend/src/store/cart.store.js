// cartItems      → items user added
// restaurantId   → cart belongs to one restaurant
// totalQuantity  → number for badge
// totalAmount    → price for checkout

import toast from "react-hot-toast";
import { create } from "zustand";
import api from "../utils/axiosInstance.js";
import { useEffect } from "react";

// calculate total amount
const calculateTotals = (cartItems) => {
  let totalAmount = 0;
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    // console.log(item.price);

    totalQuantity += item.quantity;
    totalAmount += item.quantity * Number(item?.price);
  });

  return { totalAmount, totalQuantity };
};

export const useCartStore = create((set, get) => ({
  cartItems: [],
  restaurant_id: null,
  totalAmount: 0,
  totalQuantity: 0,

  //TODO: complete fetchcart(data persistance) functionality.
  /* BUG: 1. After fetching the existing cart, if we add same item from menu/home 
             it create as same new cartitem rather then increase in quantity. 
          2. Due to the difference in data we get from get and post request.
             e.g. get - item.dish.id and post - item.dishID
  */

  // fetchCart: async () => {
  //   try {
  //     const response = await api.get("/carts/", { withCredentials: true });
  //     set({ cartItems: response.data.data.cartItems });
  //   } catch (error) {
  //     toast.error(error?.message);
  //   }
  // },

  addItem: async (dish) => {
    const response = await api.post(
      "/carts/",
      {
        dishId: dish?.id,
      },
      {
        withCredentials: true,
      },
    );

    const cartItems = response.data.data.cartItems;

    const totals = calculateTotals(cartItems);

    set({
      cartItems,
      restaurant_id: dish.restaurant_id,
      ...totals,
    });
  },

  
  // incr or decr quant
  increaseItem: async (dishId) => {
    // try {
    //   const response = await api.patch(
    //     `/items/:${cartItemId}`,
    //     {
    //       quantity,
    //     },
    //     {
    //       withCredentials: true,
    //     },
    //   );

    // } catch (error) {
    //   console.log(error);
    //   toast.error("Something wrong");
    // }
    const updatedCartItems = get().cartItems.map((item) =>
      item.dishId === dishId ? { ...item, quantity: item.quantity + 1 } : item,
    );

    set({
      cartItems: updatedCartItems,
      ...calculateTotals(updatedCartItems),
    });
  },

  decreaseItem: (dishId) => {
    const updatedCartItems = get()
      .cartItems.map((item) =>
        item.dishId === dishId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item) => item.quantity > 0);

    set({
      cartItems: updatedCartItems,
      restaurant_id: updatedCartItems.length ? get().restaurant_id : null,
      ...calculateTotals(updatedCartItems),
    });
  },

  // remove item
  removeItem: (dishId) => {
    const updatedCartItems = get().cartItems.filter(
      (item) => item.dishId !== dishId,
    );

    set({
      cartItems: updatedCartItems,
      restaurant_id: updatedCartItems.length ? get().restaurant_id : null,
      ...calculateTotals(updatedCartItems),
    });
  },

  // clear
  clearCart: () => {
    set({
      cartItems: [],
      restaurant_id: null,
      totalAmount: 0,
      totalQuantity: 0,
    });
  },

  //setCart after login
  setCart: (serverCart) => {
    const items = serverCart.cartItems.map((item) => ({
      dishId: item.dishId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    set({
      cartItems: items,
      restaurant_id: items.length ? serverCart.restaurant_id : null,
      ...calculateTotals(items),
    });
  },
}));
