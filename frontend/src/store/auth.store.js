import { create } from "zustand";
import { useCartStore } from "./cart.store";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  login: ({ user, accessToken }) => {
    set({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      isAuthenticated: true,
    });
  },

  setUser: ({ user, accessToken }) => {
    set({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
    useCartStore.getState().clearCart();

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
}));
