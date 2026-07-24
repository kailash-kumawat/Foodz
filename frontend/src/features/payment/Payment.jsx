import React, { useState } from "react";
import { BackButton } from "../../components/index.js";
import PaymentOption from "./PaymentOption.jsx";
import { CreditCard, Landmark } from "lucide-react";
import { useCheckoutStore } from "../../store/checkout.store.js";
import { paymentTypes } from "./paymentType.js";

function Payment() {
  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);

  return (
    <>
      <div className="w-full flex justify-between text-center p-6">
        <BackButton />
        <p className="text-2xl font-semibold mr-auto ml-auto">Payment</p>
      </div>

      <div className="flex flex-col items-center mt-16">
        <div className="w-5/6 mx-auto lg:w-1/2">
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
            {/* <PaymentOption
              icon={CreditCard}
              value={"card"}
              selected={paymentMethod === "card"}
              bgColor={"bg-[#FA4A0C]"}
              onChange={setPaymentMethod}
              title={"Card"}
            /> */}

            {/* <hr className="border-t border-solid border-black/10 w-4/5" /> */}

            {/* <PaymentOption
              icon={Landmark}
              value={"bank account"}
              selected={paymentMethod === "bank account"}
              bgColor={"bg-[#EB4796]"}
              onChange={setPaymentMethod}
              title={"Bank Account"}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
