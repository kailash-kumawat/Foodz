import React from "react";
import { BackButton } from "../../components/index.js";

function Checkout() {
  return (
    <>
      <div className="flex justify-between p-6">
        <BackButton />
        <p className="text-2xl font-semibold mr-auto ml-auto">Checkout</p>
      </div>

      <div>
        <p className="text-3xl font-semibold p-6">Delivery</p>
      </div>

      {/* Address Details */}
      <div className="w-5/6 mr-auto ml-auto">
        <div className="flex justify-between w-full">
          <p className="text-lg font-semibold">Address details</p>
          <p className="text-lg text-[#F47B0A]">change</p>
        </div>

        <div className="bg-white rounded-[20px] p-6 mt-3 flex flex-col gap-2">
          <p className="text-xl font-semibold">Marvis Kparobo</p>
          <hr className="text-black/30"></hr>
          <p>Km 5 refinery road oppsite re public road, effurun, delta state</p>
          <hr className="text-black/30"></hr>
          <p>+234 9011039271</p>
        </div>
      </div>
    </>
  );
}

export default Checkout;
