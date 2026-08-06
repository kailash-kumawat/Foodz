import toast from "react-hot-toast";
import { create } from "zustand";
import api from "../utils/axiosInstance.js";

const calculateTotals = (cartItems) => {
  let totalAmount = 0;
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    totalQuantity += item.quantity;
    totalAmount += item.quantity * Number(item?.dish.price);
  });

  return { totalAmount, totalQuantity };
};

export const useCartStore = create((set, get) => ({
  cartItems: [],
  restaurant_id: null,
  totalAmount: 0,
  totalQuantity: 0,

  fetchCart: async () => {
    try {
      const response = await api.get("/carts/", { withCredentials: true });
      const cartItems = response.data.data.cartItems;
      const totals = calculateTotals(cartItems);

      set({
        cartItems,
        restaurant_id:
          cartItems.length > 0 ? cartItems[0].dish.restaurant_id : null,
        ...totals,
      });
    } catch (error) {
      {
        error.response.status === 401
          ? toast.error("Please sign in to continue.")
          : toast.error(error.response.data.message);
      }
    }
  },

  addItem: async (dish) => {
    try {
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
    } catch (error) {
      {
        error.response.status === 401
          ? toast.error("Please sign in to continue.")
          : toast.error(error.response.data.message);
      }
    }
  },

  increaseItem: async (cartItemId, quantity) => {
    const response = await api.patch(
      `/carts/items/${cartItemId}`,
      {
        quantity: quantity + 1,
      },
      {
        withCredentials: true,
      },
    );

    const cartItems = response.data.data.cartItems;

    const totals = calculateTotals(cartItems);

    set({
      cartItems,
      ...totals,
    });
  },

  decreaseItem: async (cartItemId, quantity) => {
    const response = await api.patch(
      `/carts/items/${cartItemId}`,
      {
        quantity: quantity - 1,
      },
      {
        withCredentials: true,
      },
    );

    const cartItems = response.data.data.cartItems;

    const totals = calculateTotals(cartItems);

    set({
      cartItems,
      ...totals,
    });
  },

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

  clearCart: () => {
    set({
      cartItems: [],
      restaurant_id: null,
      totalAmount: 0,
      totalQuantity: 0,
    });
  },

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
