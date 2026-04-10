import React from "react";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomeHeader() {
  const navigate = useNavigate();
  return (
    // y: 74 centered
    <div className="flex items-center justify-between py-4 bg-white">
      <button className="cursor-pointer">
        {/* x:54.6 y: 74 w:22 h: 14.67 color: black opacity 100%*/}
        <User className="w-6 h-6 text-black/30" />
      </button>

      <button className="cursor-pointer" onClick={() => navigate("/cart")}>
        {/* x:349 y: 74 w:24 h: 24 color: black opacity 30% */}
        <ShoppingCart className="w-6 h-6 text-black/30" />
      </button>
    </div>
  );
}

export default HomeHeader;
