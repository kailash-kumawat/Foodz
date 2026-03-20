import React from "react";
import { foods } from "../data/foods.data.js";
import { IndianRupee } from "lucide-react";
import { IncDecBtn } from "./index.js";

function CartItem() {
  return (
    <>
      <div className="flex items-center h-[100px] w-5/6 p-6 rounded-2xl justify-around bg-white mx-auto lg:w-1/3">
        {/* Dish Img */}
        <img
          className="rounded-full w-[70px] h-[70px] mr-auto lg:mr-0"
          src={foods[0].image}
          alt={foods[0].name}
        />

        {/* Dish name */}
        <div className="mx-auto lg:ml-4">
          <p className="font-semibold text-xl">{foods[0].name}</p>

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
        <IncDecBtn className="mt-8 text-white" />
      </div>
    </>
  );
}

export default CartItem;
