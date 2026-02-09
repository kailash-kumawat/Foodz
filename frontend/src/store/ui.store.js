import { create } from "zustand";

export const useUIStore = create((set) => ({
  isCartOpen: false,
  isAuthModalOpen: false,
  isGlobalLoading: false,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  openAuthModel: () => set({ isAuthModelOpen: true }),
  closeAuthModel: () => set({ isAuthModelOpen: false }),

  setGlobalLoading: (value) => {
    set({
      isGlobalLoading: value,
    });
  },

  resetUIStore: () => {
    set({
      isCartOpen: false,
      isAuthModelOpen: false,
      isGlobalLoading: false,
    });
  },
}));
