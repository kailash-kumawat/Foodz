import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { BackButton } from "../../components";
import api from "../../utils/axiosInstance.js";
import { useParams } from "react-router-dom";
import { steps } from "./status.js";
import { useState } from "react";
import toast from "react-hot-toast";

function OrderStatus() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

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

      <div className="w-1/2 mx-auto flex flex-col">
        {currentStep && (
          <DotLottieReact
            className="size-full"
            src={currentStep.src}
            loop
            autoplay
          />
        )}
      </div>
    </>
  );
}

export default OrderStatus;
