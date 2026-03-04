import React, { useState } from "react";
import { HomeHeader, CategoryTab, FoodCard } from "../../components";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { foods } from "../../data/foods.data.js";

function Home() {
  const [search, setSearch] = useState("");

  const removeWhiteSpace = (str) => str.toLowerCase().replace(/\s/g, "");

  const filteredFoods = foods.filter((food) =>
    removeWhiteSpace(food.name).includes(removeWhiteSpace(search)),
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4">
        <HomeHeader />
      </div>

      <div className="px-6">
        {/* Heading- x:50 y:132 w:185 h:82 color: black*/}
        <h1 className="w-[185px] text-3xl font-semibold leading-tight text-black mb-4">
          Delicious food for you
        </h1>

        {/* Search placeholder - x: 50 y:242 x: 314 h: 60 radius: 30 color: EFEEEE*/}
        <div className="w-[314px] h-[60px] rounded-[30px] bg-[#EFEEEE] mb-6 flex items-center px-5">
          <Search className="w-5 h-5 text-black/40" />
          <input
            className="ml-2 caret-black/30 bg-transparent outline-none w-full text-lg placeholder:text-black/30"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories  improve styling here*/}
        <div className="flex gap-4 mb-6 overflow-x-auto">
          <CategoryTab />
        </div>
      </div>

      {/* Food list skeleton */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <Link key={food.id} to={`/dish/${food.id}`}>
              <FoodCard name={food.name} img={food.image} price={food.price} />
            </Link>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-400">No food found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
