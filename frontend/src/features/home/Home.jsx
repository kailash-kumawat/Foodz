import React, { useEffect, useState } from "react";
import { HomeHeader, CategoryTab, FoodCard } from "../../components";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance.js";

// TODO: next integrate frontend and backend to show dishes
function Home() {
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState([]);

  // const removeWhiteSpace = (str) => str.toLowerCase().replace(/\s/g, "");

  // const filteredFoods = dishes.filter((dish) =>
  //   removeWhiteSpace(dish.name).includes(removeWhiteSpace(search)),
  // );

  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await api.get("/dishes/");
        setDishes(response.data.data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    fetchDishes();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await api.get("/dishes/search", {
          params: { q: search },
        });
        setDishes(response.data.data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6">
        <h1 className="w-[185px] text-3xl font-semibold leading-tight text-black mb-4">
          Delicious food for you
        </h1>

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
        <div className="flex gap-4 mb-6 lg:overflow-x-auto">
          <CategoryTab />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6">
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <Link key={dish.id} to={`/dish/${dish.id}`}>
              <FoodCard name={dish.name} img={dish.img} price={dish.price} />
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
