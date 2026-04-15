import React from "react";
import {
  UserCircle2,
  MapPinHouse,
  Wallet2,
  ArrowRight,
  ShoppingBag,
  ArrowDown,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

// TODO: start building profile page
// BUG: horizontal scroll not working in sidebar

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {
        <div
          className={`fixed inset-0 bg-white/20 backdrop-blur-lg z-40 w-full justify-center 
            flex flex-col items-center transform transition-transform duration-300 ease-in-out 
            ${isOpen ? "translate-y-0" : "translate-y-full"}`}
          // onClick={onClose}
        >
          <div className="ml-auto p-6 ">
            <button className="cursor-pointer" onClick={() => onClose()}>
              <ArrowDown
                size={25}
                strokeWidth={2.5}
                className="text-[#FA4A0C]"
              />
            </button>
          </div>

          <div
            className={`grid grid-cols-2 gap-4 items-center text-[#FA4A0C] 
              font-semibold z-50 my-auto h-1/2 w-5/6 lg:w-3/5`}
          >
            <SidebarItem
              path={"/profile"}
              name={"Profile"}
              icon={UserCircle2}
            />

            <SidebarItem path={"/orders"} name={"Orders"} icon={ShoppingBag} />

            <SidebarItem
              path={"/adress"}
              name={"Saved Address"}
              icon={MapPinHouse}
            />

            <SidebarItem
              path={"/payment"}
              name={"Payment Mode"}
              icon={Wallet2}
            />
          </div>

          <div className="text-xl text-[#FA4A0C] font-semibold ml-10 my-auto">
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                console.log("Logout");
                // onClose();
              }}
            >
              Sign-out
              <ArrowRight size={25} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      }
    </>
  );
}

export default Sidebar;
