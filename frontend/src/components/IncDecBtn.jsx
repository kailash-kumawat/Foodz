import React, { useState } from "react";
import { useCartStore } from "../store/cart.store.js";

function IncDecBtn({ className = "" }) {
  const quantity = useCartStore((state) => state.cartItems[0].quantity);
  const dishId = useCartStore((state) => state.cartItems[0].dishId);

  const increaseQuant = useCartStore((state) => state.increaseItem);
  const decreaseQuant = useCartStore((state) => state.decreaseItem);
  return (
    <div
      className={`flex w-[80px] h-[30px] p-4 rounded-2xl justify-center items-center border-1 border-[#ffd4c7] ${className}`}
    >
      <button
        className="text-[#FA4A0C] mr-auto"
        onClick={() => decreaseQuant(dishId)}
      >
        -
      </button>
      <p className="text-[#FA4A0C]">{quantity}</p>
      <button
        className="text-[#FA4A0C] ml-auto"
        onClick={() => increaseQuant(dishId)}
      >
        +
      </button>
    </div>
  );
}

export default IncDecBtn;
