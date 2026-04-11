import React from "react";
import { BackButton, Button } from "../../components/index.js";
import { useCartStore } from "../../store/cart.store.js";
import { UtensilsCrossed, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  const totalAmount = useCartStore((state) => state.totalAmount);

  const deliveryFee = 40;
  const Gst = totalAmount * 0.18;
  const total = totalAmount + deliveryFee + Gst;

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between p-6">
        <BackButton />
        <p className="text-2xl font-semibold mx-auto">Checkout</p>
      </div>

      <div className="lg:mx-auto">
        <p className="text-3xl font-semibold p-6 lg:invisible">Delivery</p>
      </div>

      <div className="flex flex-col items-center">
        {/* Address Details */}
        <div className="w-5/6 mx-auto lg:w-1/2">
          <div className="flex justify-between w-full">
            <p className="text-lg font-semibold">Address details</p>
            <p className="text-lg text-[#F47B0A]">change</p>
          </div>

          <div className="bg-white rounded-[20px] p-6 mt-3 flex flex-col gap-2">
            <p className="text-xl font-semibold">Marvis Kparobo</p>
            <hr className="border-t border-black/30" />
            <p>
              Km 5 refinery road oppsite re public road, effurun, delta state
            </p>
            <hr className="border-t border-black/30" />
            <p>+234 9011039271</p>
          </div>
        </div>

        {/* Billing Detail */}
        <div className="w-5/6 mx-auto mt-12 lg:w-1/2">
          <div className="flex justify-between w-full">
            <p className="text-lg font-semibold">Order details</p>
            <p className="text-lg text-[#F47B0A]">Add items +</p>
          </div>

          <div className="bg-white rounded-[20px] p-6 mt-3 flex flex-col gap-2">
            {cartItems.map((item) => (
              <>
                <div key={item.id} className="flex items-center gap-2 text-lg">
                  <UtensilsCrossed size={15} />
                  <p>{`${item.name}`}</p>
                  <span>{`x${item.quantity}`}</span>
                  <span className="ml-auto flex items-center">
                    <IndianRupee size={10} />
                    <p>{`${item.price * item.quantity}`}</p>
                  </span>
                </div>
                <hr className="border-t border-black/20" />
              </>
            ))}

            <div className="flex items-center justify-between text-lg font-extralight italic">
              <p>Subtotal</p>
              <span className="ml-auto flex items-center">
                <IndianRupee size={10} />
                <p>{totalAmount}</p>
              </span>
            </div>

            <div className="flex items-center justify-between text-lg font-extralight italic">
              <p>Delivery Fee</p>
              <span className="ml-auto flex items-center italic">
                <IndianRupee size={10} />
                <p>{deliveryFee}</p>
              </span>
            </div>

            <div className="flex items-center justify-between text-lg font-extralight italic">
              <p>GST 18%</p>
              <span className="ml-auto flex items-center">
                <IndianRupee size={10} />
                <p>{Gst}</p>
              </span>
            </div>

            <hr className="border-t border-dashed border-black/30 " />

            <div className="flex items-center justify-between text-lg  ">
              <p>Total</p>
              <span className="ml-auto flex items-center">
                <IndianRupee size={10} />
                <p>{total}</p>
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto my-6">
          <Button className="cursor-pointer">Proceed to payment</Button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
