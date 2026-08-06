import { create } from "zustand";
import { useCartStore } from "./cart.store";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => {
    set({
      user: {
        id: user.id,
        contact: user.contact,
        email: user.email,
      },
      isAuthenticated: true,
    });
  },

  setUser: ({ user }) => {
    set({
      user: {
        id: user.id,
        contact: user.contact,
        email: user.email,
      },
      isAuthenticated: true,
    });
  },

  logout: () => {
    useCartStore.getState().clearCart();

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
