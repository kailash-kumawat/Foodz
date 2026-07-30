import { create } from "zustand";

export const useCheckoutStore = create((set) => ({
  paymentMethod: "card",

  setPaymentMethod: (method) => {
    set({
      paymentMethod: method,
    });
  },

  resetCheckout: () => {
    set({
      paymentMethod: "card",
    });
  },
}));
