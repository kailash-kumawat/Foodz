import React from "react";
import { Button } from "./index.js";
import { IndianRupee } from "lucide-react";
import { useParams } from "react-router-dom";
import { foods } from "../data/foods.data.js";
import { BackButton, FavouriteButton } from "./index.js";

function SingleDish() {
  const { id } = useParams();
  const filteredFood = foods.find((food) => food.id === Number(id));

  return (
    <>
      <div className="w-full flex justify-between text-center p-6">
        <BackButton />
        <FavouriteButton />
      </div>
      <div className="flex flex-col items-center justify-items-center h-auto p-8">
        {/* Back and Fvrt button */}

        {/* Dish Image */}
        <img
          src={filteredFood.image}
          alt={filteredFood.name}
          className="
        w-[240px] h-[240px]
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
          {filteredFood.name}
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
          {filteredFood.price}
        </span>

        {/* Description */}
        <div className="p-6 lg:w-1/2 lg:mx-auto md:w-1/2 md:mx-auto">
          <h4 className="font-bold">Description</h4>
          <p className="text-black opacity-50 text-pretty">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur et
            maiores laboriosam ut dicta quos non repudiandae iure, nemo adipisci
            eaque est commodi, veniam obcaecati vitae incidunt dolorem
            voluptatibus quod. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Tenetur et maiores laboriosam ut dicta quos non
            repudiandae iure, nemo adipisci eaque est commodi, veniam obcaecati
            vitae incidunt dolorem voluptatibus quod. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Tenetur et maiores laboriosam ut dicta
            quos non repudiandae iure, nemo adipisci eaque est commodi, veniam
            obcaecati vitae incidunt dolorem voluptatibus quod. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Tenetur et maiores
            laboriosam ut dicta quos non repudiandae iure, nemo adipisci eaque
            est commodi, veniam obcaecati vitae incidunt dolorem voluptatibus
            quod.
          </p>
        </div>

        {/* Add to cart button component */}
        <Button className="text-[#F6F6F9]">Add to cart</Button>
      </div>
    </>
  );
}

export default SingleDish;
