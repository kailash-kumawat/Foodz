import { create } from "zustand";

export const useCheckoutStore = create((set) => ({
  addressId: null,
  paymentMethod: "card",

  setAddress: (addressId) => {
    set({
      addressId,
    });
  },

  setPaymentmethod: (method) => {
    set({
      payment_method: method,
    });
  },

  resetCheckout: () => {
    set({
      addressId: null,
      payment_method: "card",
    });
  },
}));
