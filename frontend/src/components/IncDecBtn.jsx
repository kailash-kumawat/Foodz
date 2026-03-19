import React, { useState } from "react";
import { useCartStore } from "../store/cart.store.js";

function IncDecBtn() {
  const [quantity, setQuantity] = useState(0);

  const increaseQuant = useCartStore((state) => state.increaseItem);
  const decreaseQuant = useCartStore((state) => state.decreaseItem);
  return (
    <div className="flex w-[80px] h-[30px] p-4 rounded-2xl justify-between items-center bg-[#FA4A0C]">
      <button
        className=""
        onClick={() => setQuantity((quantity) => quantity - 1)}
      >
        -
      </button>
      <input
        className="w-full"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      ></input>
      <button
        className=""
        onClick={() => setQuantity((quantity) => quantity + 1)}
      >
        +
      </button>
    </div>
  );
}

export default IncDecBtn;
