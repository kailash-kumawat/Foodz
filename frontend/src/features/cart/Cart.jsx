import React from "react";
import { Button } from "../../components/index.js";

function Cart() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen ">
      <div className="container w-full">
        <div className="h-[100px] bg-amber-400 w-full"></div>
        <div className="h-[100px] bg-amber-500 w-full"></div>
        <div className="h-[100px] bg-amber-400 w-full"></div>
      </div>

      <div className="pt-4 pb-4">
        <Button className="w-full">Place Order</Button>
      </div>
    </div>
  );
}

export default Cart;
