import React from "react";
import { IndianRupee } from "lucide-react";
import { useCartStore } from "../store/cart.store.js";

function CartItem({ name, image, price, dishId, quantity, cartItemId }) {
  const increaseQuant = useCartStore((state) => state.increaseItem);
  const decreaseQuant = useCartStore((state) => state.decreaseItem);

  return (
    <>
      <div className="flex items-center h-[80px] p-6 rounded-[20px] justify-around bg-white mx-auto w-[90%] md:w-1/2 lg:w-1/3">
        <img
          className="rounded-full w-[50px] h-[50px] mr-3 shadow-black/15 shadow-xl object-cover"
          src={image}
          alt={name}
        />

        <div className="mr-auto w-fit">
          <p className="font-semibold shrink w-full">{name}</p>

          <span
            className="
            text-xl
            font-bold
            text-[#FA4A0C]
            flex
            items-center
            pr-2
            "
          >
            <IndianRupee className="w-4" />
            {price}
          </span>
        </div>
        <div
          className={`flex w-[80px] h-[30px] p-4 rounded-2xl justify-center 
            items-center bg-[#FA4A0C]`}
        >
          <button
            className="text-white mr-auto cursor-pointer"
            onClick={() => decreaseQuant(cartItemId, quantity)}
          >
            -
          </button>
          <p className="text-white">{quantity}</p>
          <button
            className="text-white ml-auto cursor-pointer"
            onClick={() => increaseQuant(cartItemId, quantity)}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
