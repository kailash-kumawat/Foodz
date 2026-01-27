import React from "react";
import { Menu, ShoppingCart } from "lucide-react";

function HomeHeader() {
  return (
    // y: 74 centered
    <div className="flex items-center justify-between px-6 py-4 bg-white">
      <button className="p-2">
        {/* x:54.6 y: 74 w:22 h: 14.67 color: black opacity 100%*/}
        <Menu className="w-[22px] h-[14.67px] text-black" />
      </button>

      <button className="p-2">
        {/* x:349 y: 74 w:24 h: 24 color: black opacity 30% */}
        <ShoppingCart className="w-[24px] h-[24px] text-black/30" />
      </button>
    </div>
  );
}

export default HomeHeader;
