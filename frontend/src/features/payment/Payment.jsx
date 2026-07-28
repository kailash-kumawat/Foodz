import React from "react";
import { BackButton, Button } from "../../components/index.js";
import PaymentOption from "./PaymentOption.jsx";
import { useCheckoutStore } from "../../store/checkout.store.js";
import { paymentTypes } from "./paymentType.js";
import { useCartStore } from "../../store/cart.store.js";
import { IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

// TODO: next step after selecting payment method

function Payment() {
  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);
  const totalAmount = useCartStore((state) => state.totalAmount);

  const total = totalAmount;

  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between text-center p-6">
        <BackButton />
        <p className="text-2xl font-semibold mx-auto">Payment</p>
      </div>

      <div className="flex flex-col items-center mt-16 w-5/6 mx-auto">
        <div className="w-full lg:w-1/2">
          <p className="text-xl font-semibold">Payment method</p>
          <div className="bg-white rounded-[20px] flex flex-col justify-between w-5/6 p-6 mt-3">
            {paymentTypes.map((type, index) => (
              <React.Fragment key={type.value}>
                <PaymentOption
                  icon={type.icon}
                  value={type.value}
                  selected={paymentMethod === type.value}
                  bgColor={type.bgColor}
                  onChange={setPaymentMethod}
                  title={type.title}
                />
                {index !== paymentTypes.length - 1 && (
                  <hr className="border-t border-solid border-black/10 w-4/5 mx-auto" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-10 w-1/2 mr-24">
          <p className="text-xl font-semibold">Total</p>
          <span className="flex items-center">
            <IndianRupee size={17} />
            <p className="text-xl font-bold">{total}</p>
          </span>
        </div>
      </div>
      <div className="w-fit mx-auto my-10">
        <Button
          onClick={() => navigate("/checkout")}
          className="cursor-pointer"
        >
          Checkout
        </Button>
      </div>
    </>
  );
}

export default Payment;
