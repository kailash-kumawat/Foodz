import React from "react";
import { IndianRupee } from "lucide-react";
import { IncDecBtn } from "./index.js";

function CartItem({ name, image, price, dishId }) {
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
        <IncDecBtn dishId={dishId} className="mt-6 text-white my-auto" />
      </div>
    </>
  );
}

export default CartItem;
