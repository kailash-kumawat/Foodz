import React from "react";
import { Menu, ShoppingCart, User } from "lucide-react";

function HomeHeader() {
  return (
    // y: 74 centered
    <div className="flex items-center justify-between py-4 bg-white">
      <button>
        {/* x:54.6 y: 74 w:22 h: 14.67 color: black opacity 100%*/}
        <Menu className="w-6 h-6 text-black/30" />
      </button>

      <button>
        {/* x:349 y: 74 w:24 h: 24 color: black opacity 30% */}
        <ShoppingCart className="w-6 h-6 text-black/30" />
      </button>
    </div>
  );
}

export default HomeHeader;
