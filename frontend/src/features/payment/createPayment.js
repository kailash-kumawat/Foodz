import toast from "react-hot-toast";
import axios from "axios";

const verifyPayment = async (response, navigate, orderId) => {
  try {
    const verifiedPayment = await axios.post(
      `${import.meta.env.VITE_PAYMENT_URL}/verifypayment`,
      response,
      { withCredentials: true },
    );
    toast.success(verifiedPayment.data.message);
    navigate(`/order/${orderId}`);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const createPayment = async (orderId, navigate) => {
  try {
    const payment = await axios.post(
      `${import.meta.env.VITE_PAYMENT_URL}/${orderId}`,
      {},
      { withCredentials: true },
    );

    const options = {
      key: payment.data.data.key,
      amount: payment.data.data.amount,
      currency: payment.data.data.currency,
      order_id: payment.data.data.razorpayOrderId,

      handler: async function (response) {
        await verifyPayment(response, navigate, orderId);
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
