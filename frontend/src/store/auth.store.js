import { create } from "zustand";
import { useCartStore } from "./cart.store";

/*
  Auth Store Responsibility:
  - store user identity
  - store access token
  - manage session state
*/

// TODO: Connect through login/signup page
export const useAuthStore = create((set) => ({
  // ---------- state ----------
  user: null, // { id, name, email }
  accessToken: null, // string
  isAuthenticated: false,

  // ---------- actions ----------

  // called AFTER successful login/signup API
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

  // used for auto-login / refresh flow
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

  // logout must clean everything
  logout: () => {
    // very important: clear cart on logout
    useCartStore.getState().clearCart();

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
}));
