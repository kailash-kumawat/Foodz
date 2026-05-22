// cartItems      → items user added
// restaurantId   → cart belongs to one restaurant
// totalQuantity  → number for badge
// totalAmount    → price for checkout

//TODO: Wire all stores to their pages
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
  restaurant_id: null,
  totalAmount: 0,
  totalQuantity: 0,

  addItem: (dish) => {
    const { cartItems, restaurant_id } = get();
    // check same restra

    if (restaurant_id && dish.restaurant?.id !== restaurant_id) {
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
          image: dish.img,
          quantity: 1,
        },
      ];
    }

    const totals = calculateTotals(updatedCartItems);
    // set store
    set({
      cartItems: updatedCartItems,
      restaurant_id: dish.restaurant_id,
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
      dishId: item.dish.id,
      name: item.dish.name,
      price: item.dish.price,
      image: item.dish.img,
      quantity: item.quantity,
    }));

    set({
      cartItems: items,
      restaurant_id: items.length ? serverCart.restaurant_id : null,
      ...calculateTotals(items),
    });
  },
}));
