import React from "react";
import HomeHeader from "../../components/HomeHeader";

function Home() {
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

      {/* Categories */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        <div className="h-[32px] w-[80px] rounded-full bg-gray-200" />
        <div className="h-[32px] w-[80px] rounded-full bg-gray-200" />
        <div className="h-[32px] w-[80px] rounded-full bg-gray-200" />
        <div className="h-[32px] w-[80px] rounded-full bg-gray-200" />
      </div>

      {/* Food list skeleton */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[160px] rounded-xl bg-gray-200" />
        <div className="h-[160px] rounded-xl bg-gray-200" />
        <div className="h-[160px] rounded-xl bg-gray-200" />
        <div className="h-[160px] rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}

export default Home;
