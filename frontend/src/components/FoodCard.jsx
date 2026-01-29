import React from "react";

function FoodCard({ name, img, price }) {
  return (
    <div
      className="
        w-[220px] h-[270px]
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
          w-[164.16px] h-[164.16px]
          rounded-full
          object-cover
          mb-4
        "
      />

      <h6
        className="
          text-[22px]
          font-semibold
          text-center
          w-[125px]
          leading-tight
          mb-2
        "
      >
        {name}
      </h6>

      <span
        className="
          text-[17px]
          font-bold
          text-[#FA4A0C]
        "
      >
        {price}
      </span>
    </div>
  );
}

export default FoodCard;
