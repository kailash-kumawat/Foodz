import { create } from "zustand";

export const useCheckoutStore = create((set) => ({
  // addressId: null,
  paymentMethod: "card",

  // setAddress: (addressId) => {
  //   set({
  //     addressId,
  //   });
  // },

  setPaymentMethod: (method) => {
    set({
      paymentMethod: method,
    });
  },

  resetCheckout: () => {
    set({
      // addressId: null,
      paymentMethod: "card",
    });
  },
}));
