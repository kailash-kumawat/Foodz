import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function ProfileItem({ title, path, className = "" }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className={`flex justify-between bg-white 
        rounded-[20px] w-5/6 mx-auto lg:w-1/3 mt-5 p-4 ${className} cursor-pointer`}
    >
      <Link to={path} className="text-lg font-semibold">
        {title}
      </Link>
      <ChevronRight />
    </div>
  );
}

export default ProfileItem;
