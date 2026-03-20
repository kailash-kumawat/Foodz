import React from "react";
import { Button, CartItem, BackButton } from "../../components/index.js";

function Cart() {
  return (
    <>
      <div className="flex justify-between p-6">
        <BackButton />
        <p className="text-2xl font-semibold mx-auto mr-auto">Cart</p>
      </div>
      <div className="flex flex-col justify-between items-center h-[90vh]">
        {/* <div className="container"> */}
        <CartItem />
        {/* </div> */}
        <div className="pb-6 pt-8">
          <Button className="w-full">Place Order</Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
