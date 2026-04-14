import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ path, name, icon: Icon }) {
  return (
    <>
      <div
        className="flex gap-4 items-center bg-white/10 backdrop-blur-lg shadow-lg
      rounded-3xl p-4 w-full h-1/2 lg:justify-center lg:w-1/2 mx-auto"
      >
        <Icon size={25} className="flex-shrink-0" />

        <Link to={path} className="text-xl break-words">
          {name}
        </Link>
      </div>
    </>
  );
}

export default SidebarItem;
