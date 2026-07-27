import toast from "react-hot-toast";
import axios from "axios";

const verifyPayment = async (response, navigate) => {
  try {
    const verifiedPayment = await axios.post(
      "http://192.168.29.172:5000/payments/verifypayment",
      response,
      { withCredentials: true },
    );
    toast.success(verifiedPayment.data.message);
    navigate("/home");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const createPayment = async (orderId, navigate) => {
  try {
    const payment = await axios.post(
      `http://192.168.29.172:5000/payments/${orderId}`,
      {},
      { withCredentials: true },
    );

    const options = {
      key: payment.data.data.key,
      amount: payment.data.data.amount,
      currency: payment.data.data.currency,
      order_id: payment.data.data.razorpayOrderId,

      handler: async function (response) {
        await verifyPayment(response, navigate);
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
