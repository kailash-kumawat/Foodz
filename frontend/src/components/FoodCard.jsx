import React from "react";
import { IndianRupee } from "lucide-react";

function FoodCard({ name, img, price }) {
  return (
    <div
      className="
       w-full 
        bg-white
        rounded-[30px]
        shadow-md
        flex flex-col items-center
        pt-4
      "
    >
      <img
        src={img}
        alt={name}
        className="
          w-24 h-24
          rounded-full
          object-cover
          mb-4
        "
      />

      <h6
        className="
          text-xl
          font-semibold
          text-center
          w-32
          leading-tight
          mb-2
        "
      >
        {name}
      </h6>

      <span
        className="
          text-lg
          font-bold
          text-[#FA4A0C]
          flex
          items-center
        "
      >
        <IndianRupee className="w-4" />
        {price}
      </span>
    </div>
  );
}

export default FoodCard;
