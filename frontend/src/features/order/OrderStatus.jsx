import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useParams, useNavigate } from "react-router-dom";
import { BackButton, Button } from "../../components/index.js";
import { steps } from "./status.js";
import toast from "react-hot-toast";
import { UtensilsCrossed, IndianRupee } from "lucide-react";
import PriceRow from "../checkout/PriceRow";
import Lottie from "lottie-react";

function OrderStatus() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function getOrder() {
      try {
        const response = await api.get(`/orders/${orderId}`, {
          withCredentials: true,
        });
        setOrder(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    getOrder();
    const interval = setInterval(getOrder, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) {
    <p className="text-xl font-semibold">Loading...</p>;
  }

  const currentStep = steps.find((step) => step.status === order?.status);

  return (
    <>
      <div className="w-full flex justify-between text-center p-6">
        <BackButton />
        <p className="text-2xl font-semibold mx-auto">Order Status</p>
      </div>

      <div className="w-full mx-auto">
        {currentStep && (
          <Lottie
            className="lg:size-1/6 size-1/2 mx-auto"
            animationData={currentStep.animation}
            loop
          />
        )}
      </div>
      <div className="w-fit mx-auto">
        <p className="text-black/50 text-lg font-semibold">
          {currentStep?.description}
        </p>
      </div>

      <hr className="border-t border-solid border-black/10 lg:w-1/2 w-4/5 mx-auto mt-2" />

      <div className="flex flex-col items-center">
        <div className="w-5/6 mx-auto mt-12 lg:w-1/2">
          <div className="flex justify-between w-full">
            <p className="text-lg font-semibold">Order details</p>
          </div>

          <div className="bg-white rounded-[20px] p-6 mt-3 flex flex-col gap-2">
            {order?.items.length > 0 ? (
              <>
                {order.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-center gap-2 text-lg">
                      <UtensilsCrossed size={15} />
                      <p>{item.name}</p>
                      <p className="text-gray-500">{`x${item.quantity}`}</p>
                      <span className="ml-auto flex items-center">
                        <IndianRupee size={10} />
                        <p>{`${item.price * item.quantity}`}</p>
                      </span>
                    </div>
                    <hr className="border-t border-black/20" />
                  </div>
                ))}
                <PriceRow
                  name={"Grand total"}
                  amount={order.total_amount}
                  className="flex items-center justify-between text-lg font-extralight italic"
                />

                <PriceRow
                  name={"Payment method"}
                  amount={order.payments[0].payment_method}
                  hide="hidden"
                  className="flex items-center justify-between text-lg font-extralight italic"
                />

                <PriceRow
                  name={"Payment status"}
                  amount={order.payments[0].payment_status}
                  hide="hidden"
                  className="flex items-center justify-between text-lg font-extralight italic"
                />

                <hr className="border-t border-dashed border-black/30 " />

                <PriceRow
                  name={"Order Status"}
                  amount={currentStep?.status}
                  hide="hidden"
                  className="flex items-center justify-between text-lg"
                />
              </>
            ) : (
              <p className="text-center text-gray-400 py-6">No orders yet</p>
            )}
          </div>
        </div>

        {order?.items.length > 0 ? (
          <div className="max-w-lg mx-auto my-6">
            <Button
              onClick={() => navigate("/home")}
              className="cursor-pointer"
            >
              Order again
            </Button>
          </div>
        ) : (
          <div className="max-w-lg mx-auto my-6">
            <Button
              onClick={() => navigate("/home")}
              className="cursor-pointer"
            >
              Start ordering
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderStatus;
