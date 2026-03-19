import React from "react";
import { foods } from "../data/foods.data.js";
import { IndianRupee } from "lucide-react";
import { IncDecBtn } from "./index.js";

function CartItem() {
  return (
    <div className="flex items-center h-[100px] p-6 justify-around bg-amber-200 sm:w-2xs md:w-[200px] lg:w-full">
      {/* Dish Img */}
      <img
        className="rounded-2xl w-[50px] h-[50px]"
        src={foods[0].image}
        alt={foods[0].name}
      />

      {/* Dish name */}
      <div className="">
        <h6 className="text-2xl">{foods[0].name}</h6>

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
          {foods[0].price}
        </span>
      </div>
      {/* Increment/Decrement button */}
      <IncDecBtn />
    </div>
  );
}

export default CartItem;
