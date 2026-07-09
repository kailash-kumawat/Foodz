import React, { useState, useEffect } from "react";
import { Button } from "./index.js";
import { IndianRupee } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { BackButton, FavouriteButton } from "./index.js";
import { useCartStore } from "../store/cart.store.js";
import toast from "react-hot-toast";
import api from "../utils/axiosInstance.js";

function SingleDish() {
  const { id } = useParams();
  const [dishes, setDishes] = useState({});

  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await api.get("/dishes/");
        // console.log(response);

        const data = response.data.data;

        const item = data.filter((dish) => dish.id === Number(id));
        // console.log(item);

        setDishes(item[0]);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    fetchDishes();
  }, []);

  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  // console.log(dishes.restaurant?.id);

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
          src={dishes.img}
          alt="Food Image"
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
          {dishes.name}
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
          {dishes.price}
        </span>

        {/* Description */}
        <div className="p-6 lg:w-1/2 lg:mx-auto md:w-1/2 md:mx-auto">
          <h4 className="font-bold">Description</h4>
          <p className="text-black opacity-50 text-pretty">
            {dishes.description}
          </p>
        </div>

        {/* Add to cart button component */}
      </div>
      <Button
        onClick={() => {
          addItem(dishes);
          navigate("/cart");
        }}
        className="text-[#F6F6F9] mx-auto"
      >
        Add to cart
      </Button>
    </>
  );
}

export default SingleDish;


