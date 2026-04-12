import React from "react";
import { Link } from "react-router-dom";
import { UserCircle2, Pizza, MapPinHouse, Wallet2 } from "lucide-react";

function Navbar() {
  return (
    <div className="flex flex-col gap-6 w-1/2">
      <div className="flex gap-4 items-center">
        <UserCircle2 size={10} />
        <Link to={"/profile"}>Profile</Link>
      </div>

      <div className="flex gap-4 items-center">
        <Pizza size={10} />
        <Link to={"/order"}>Orders</Link>
      </div>

      <div className="flex gap-4 items-center">
        <MapPinHouse size={10} />
        <Link to={"/address"}>Saved Address</Link>
      </div>

      <div className="flex gap-4 items-center">
        <Wallet2 size={10} />
        <Link to={"/payment"}>Payment Modes</Link>
      </div>
    </div>
  );
}

export default Navbar;
