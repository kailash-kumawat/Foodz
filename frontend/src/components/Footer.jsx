import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Heart, User, Clock } from "lucide-react";

function Footer() {
  const linkClass = ({ isActive }) =>
    `
      flex items-center justify-center
      transition-all duration-200
      ${
        isActive
          ? "text-[#FA4A0C] scale-110 -translate-y-1"
          : "text-[#ADADAF] scale-100 translate-y-0"
      }
    `;

  return (
    <div
      className="
    fixed bottom-4 left-1/2 -translate-x-1/2
    h-[60px]
    w-[90%]
    bg-white/20 backdrop-blur-lg
    rounded-2xl
    flex items-center justify-center
    shadow-lg
    z-50
    "
    >
      <div
        className="
          mx-[50px]
          
          flex items-center
          gap-[68px]
        "
      >
        <NavLink to="/" className={linkClass}>
          <Home className="w-[31px] h-[31px]" />
        </NavLink>

        <NavLink to="/favorites" className={linkClass}>
          <Heart className="w-[24px] h-[24px]" />
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <User className="w-[24px] h-[24px]" />
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          <Clock className="w-[29px] h-[29px]" />
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;

/* We use NavLink’s className callback instead of onClick because the active state 
should be derived from the current route. NavLink automatically syncs UI state 
with the URL, which avoids desynchronization issues when navigating programmatically 
or using browser navigation. */
