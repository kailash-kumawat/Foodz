import React, { useState } from "react";

// TODO: Make it functional
function CategoryTab() {
  const categories = ["Foods", "Drinks", "Snacks", "Sauce"];
  const [activeCategory, setActiveCategory] = useState("Foods");

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`
           px-1 py-2 text-sm whitespace-nowrap
            ${
              activeCategory === category
                ? "text-[#FA4A0C] underline underline-offset-8 font-medium"
                : "text-black/60"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryTab;
