import React from "react";
import { Button } from "./index.js";
import { IndianRupee } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { foods } from "../data/foods.data.js";
import { BackButton, FavouriteButton } from "./index.js";
import { useCartStore } from "../store/cart.store.js";

function SingleDish() {
  const { id } = useParams();
  const filteredFood = foods.find((food) => food.id === Number(id));
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

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

        <Button
          onClick={() => {
            addItem(filteredFood);
            navigate("/cart");
          }}
          className="text-[#F6F6F9]"
        >
          Add to cart
        </Button>
      </div>
    </>
  );
}

export default SingleDish;

/* Next building order
1. Add to Cart logic - then write add to cart logic(2)
2. Cart Page - start from here(1)
3. Checkout Page
4. Payment Page
5. Orders Page
6. Profile Page
*/

/*
what we have done-
single dish page
add to cart
cart page
cart items
inc dec quant fully functional

next - complete order(done) -> Checkout Page(next) -> redirect to payment page
workflow - complete order -> confirm order(total price, quantity etc) -> complete payment(razorpay)
*/
