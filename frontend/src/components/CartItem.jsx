import React from "react";
import { IndianRupee } from "lucide-react";
import { useCartStore } from "../store/cart.store.js";

function CartItem({ name, image, price, dishId, quantity }) {
  const increaseQuant = useCartStore((state) => state.increaseItem);
  const decreaseQuant = useCartStore((state) => state.decreaseItem);

  return (
    <>
      <div className="flex items-center h-[100px] w-5/6 p-6 rounded-3xl justify-around bg-white mx-auto lg:w-1/3">
        {/* Dish Img */}
        <img
          className="rounded-full w-[70px] h-[70px] mr-auto lg:mr-0 shadow-black/15 shadow-xl object-cover"
          src={image}
          alt={name}
        />

        {/* Dish name */}
        <div className="mr-auto lg:mr-35">
          <p className="font-semibold text-xl">{name}</p>

          {/* Dish price */}
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
        {/* Increment/Decrement button */}
        <div
          className={`flex w-[80px] h-[30px] p-4 rounded-2xl justify-center 
            items-center border-1 border-[#ffd4c7]`}
        >
          <button
            className="text-[#FA4A0C] mr-auto cursor-pointer"
            onClick={() => decreaseQuant(dishId)}
          >
            -
          </button>
          <p className="text-[#FA4A0C]">{quantity}</p>
          <button
            className="text-[#FA4A0C] ml-auto cursor-pointer"
            onClick={() => increaseQuant(dishId)}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
