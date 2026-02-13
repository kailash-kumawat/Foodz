import React from "react";
import { HomeHeader, CategoryTab, FoodCard } from "../../components";

function Home() {
  const foods = [
    {
      id: 1,
      name: "Veg Burger",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Foods",
    },
    {
      id: 2,
      name: "French Fries",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Snacks",
    },

    {
      id: 3,
      name: "Pizza",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Snacks",
    },
  ];

  return (
    <div className="px-6 pt-6">
      <HomeHeader />

      {/* Heading- x:50 y:132 w:185 h:82 color: black*/}
      <h1 className="w-[185px] text-3xl font-semibold leading-tight text-black mb-4">
        Delicious food for you
      </h1>

      {/* Search placeholder - x: 50 y:242 x: 314 h: 60 radius: 30 color: EFEEEE*/}
      <div className="w-[314px] h-[60px] rounded-[30px] bg-[#EFEEEE] mb-6 flex items-center px-5">
        <span className="text-sm text-black/30">Search</span>
      </div>

      {/* Categories  improve styling here*/}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        <CategoryTab />
      </div>

      {/* Food list skeleton */}
      <div className="grid grid-cols-2 gap-45">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            name={food.name}
            img={food.image}
            price={food.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
