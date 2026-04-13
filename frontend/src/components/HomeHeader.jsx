import React from "react";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomeHeader({ onProfileClick, className = "" }) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex items-center justify-between py-4 bg-white ${className}`}
    >
      <button className="cursor-pointer">
        <User className="w-6 h-6 text-black/30" onClick={onProfileClick} />
      </button>

      <button className="cursor-pointer" onClick={() => navigate("/cart")}>
        <ShoppingCart className="w-6 h-6 text-black/30" />
      </button>
    </div>
  );
}

export default HomeHeader;
