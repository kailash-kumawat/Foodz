import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ path, name, icon: Icon }) {
  return (
    <>
      <div className="flex gap-4 items-center">
        <Icon size={25} />
        <Link to={path} className="text-xl">
          {name}
        </Link>
      </div>
      <hr className="w-5/6 ml-auto border-t border-white/30"></hr>
    </>
  );
}

export default SidebarItem;
