import React from "react";
import { Link } from "react-router-dom";
import {
  UserCircle2,
  MapPinHouse,
  Wallet2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 bg-[#FA4A0C] z-40 lg:w-1/2 flex items-center transform transition-transform duration-300 `}
          onClick={onClose}
        >
          <div
            className={`flex flex-col gap-8 text-white font-semibold w-1/2 h-auto ml-10 z-50
        `}
          >
            <div className="flex gap-4 items-center">
              <UserCircle2 size={25} />
              <Link to={"/profile"} className="text-xl">
                Profile
              </Link>
            </div>
            <hr className="w-5/6 ml-auto border-t border-white/30"></hr>

            <div className="flex gap-4 items-center">
              <ShoppingBag size={25} />
              <Link to={"/order"} className="text-xl">
                Orders
              </Link>
            </div>
            <hr className="w-5/6 ml-auto border-t border-white/30"></hr>

            <div className="flex gap-4 items-center">
              <MapPinHouse size={25} />
              <Link to={"/address"} className="text-xl">
                Saved Address
              </Link>
            </div>
            <hr className="w-5/6 ml-auto border-t border-white/30"></hr>

            <div className="flex gap-4 items-center">
              <Wallet2 size={25} />
              <Link to={"/payment"} className="text-xl">
                Payment Modes
              </Link>
            </div>
            <hr className="w-5/6 ml-auto border-t border-white/30"></hr>

            <button
              className="mr-auto text-xl flex items-center gap-2"
              onClick={() => {
                console.log("Logout");
                onClose();
              }}
            >
              Sign-out
              <ArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
