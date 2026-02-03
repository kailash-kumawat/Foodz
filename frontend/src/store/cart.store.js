// cartItems      → items user added
// restaurantId   → cart belongs to one restaurant
// totalQuantity  → number for badge
// totalAmount    → price for checkout

import toast from "react-hot-toast";
import { create } from "zustand";

// calculate total amount
const calculateTotals = (cartItems) => {
  let totalAmount = 0;
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    totalQuantity += item.quantity;
    totalAmount += item.quantity * item.price;
  });

  return { totalAmount, totalQuantity };
};

export const useCartStore = create((set, get) => ({
  cartItems: [],
  restaurantId: null,
  totalAmount: 0,
  totalQuantity: 0,

  addItem: (dish) => {
    const { cartItems, restaurantId } = get();
    // check same restra
    if (restaurantId && dish.restaurantId !== restaurantId) {
      toast.dismiss();
      toast.error("You can order items from only one restaurant at a time", {
        duration: 3000,
      });
      return;
    }
    // check item already exist or not
    const existingItem = cartItems.find((item) => item.dishId === dish.id);

    let updatedCartItems;
    if (existingItem) {
      updatedCartItems = cartItems.map((item) =>
        item.dishId === dish.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updatedCartItems = [
        ...cartItems,
        {
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          img: dish.img,
          quantity: 1,
        },
      ];
    }

    const totals = calculateTotals(updatedCartItems);
    // set store
    set({
      cartItems: updatedCartItems,
      restaurantId: dish.restaurantId,
      ...totals,
    });
  },

  // incr or decr quant
  increaseItem: (dishId) => {
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
      restaurantId: updatedCartItems.length ? get().restaurantId : null,
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
      restaurantId: updatedCartItems.length ? get().restaurantId : null,
      ...calculateTotals(updatedCartItems),
    });
  },

  // clear
  clearCart: () => {
    set({
      cartItems: [],
      restaurantId: null,
      totalAmount: 0,
      totalQuantity: 0,
    });
  },

  //setCart after login
  setCart: (serverCart) => {
    const items = serverCart.cartItems.map((item) => ({
      dishId: item.dish.id,
      name: item.dish.name,
      price: item.dish.price,
      img: item.dish.img,
      quantity: item.quantity,
    }));

    set({
      cartItems: items,
      restaurantId: items.length ? serverCart.restaurantId : null,
      ...calculateTotals(items),
    });
  },
}));
