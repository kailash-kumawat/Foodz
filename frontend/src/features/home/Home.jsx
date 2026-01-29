import React from "react";
import { HomeHeader, CategoryTab, FoodCard } from "../../components";

function Home() {
  const foods = [
    {
      id: 1,
      name: "Veg Burger",
      price: 120,
      image: "https://source.unsplash.com/300x300/?burger",
      category: "Foods",
    },
    {
      id: 2,
      name: "French Fries",
      price: 90,
      image: "https://source.unsplash.com/300x300/?fries",
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
      <div className="grid grid-cols-2 gap-4">
        {foods.map((food) => (
          <FoodCard name={food.name} img={food.img} price={food.price} />
        ))}
      </div>
    </div>
  );
}

export default Home;

// done - home page skelton, topbar homepage,
// styling homepage heading, searchbar, routing homepage, foodcategories(horizontal scroll see gpt)
// next - foodcard,
