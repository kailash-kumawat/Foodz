import React from "react";
import { Button } from "./index.js";
import { IndianRupee } from "lucide-react";

function SingleDish() {
  return (
    <div className="p-6 flex  flex-col items-center justify-items-center">
      {/* Dish Image */}
      <img
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="img"
        className="
        w-[241px] h-[241px]
          rounded-full
          object-cover
          mb-4
          shadow-black/50
          shadow-2xl
        "
      />

      {/* Dish Name */}
      <h6
        className="
          text-2xl
          font-semibold
          text-center
          w-full
          leading-tight
          mt-3
        "
      >
        Veg Burger
      </h6>

      {/* Dish Price */}
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
        240
      </span>

      {/* Description */}
      <div className="p-6">
        <h4 className="font-bold">Description</h4>
        <p className="text-black opacity-50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur et
          maiores laboriosam ut dicta quos non repudiandae iure, nemo adipisci
          eaque est commodi, veniam obcaecati vitae incidunt dolorem
          voluptatibus quod.
        </p>
      </div>

      {/* Add to cart button component */}
      <Button type="submit" className="text-[#F6F6F9]">
        Add to cart
      </Button>
    </div>
  );
}

export default SingleDish;
