import React from "react";
import { Link } from "react-router-dom";
import {
  UserCircle2,
  MapPinHouse,
  Wallet2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

// TODO: reduce code redundency and start building profile page
// BUG: horizontal scroll not working in sidebar

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* <div
        className={`
    fixed top-0 left-0 h-full w-full lg:w-1/2
    bg-[#FA4A0C] z-40 flex flex-col
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      > */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-[#FA4A0C] z-40 lg:w-1/2 flex flex-col transform transition-transform duration-300 `}
          // onClick={onClose}
        >
          <div className="ml-auto p-6 ">
            <button className="cursor-pointer" onClick={() => onClose()}>
              <ArrowLeft size={25} strokeWidth={2.5} className="text-white" />
            </button>
          </div>

          <div
            className={`flex flex-col gap-8 text-white font-semibold w-1/2 h-auto ml-10 z-50 my-auto`}
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
              name={"Payment Modes"}
              icon={Wallet2}
            />
          </div>

          <div className="text-xl text-white font-semibold ml-10 my-auto">
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
      )}
    </>
  );
}

export default Sidebar;
