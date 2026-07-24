import React, { useEffect, useState } from "react";
import api from "../../utils/axiosInstance.js";
import { BackButton, Button } from "../../components/index.js";
import { useCartStore } from "../../store/cart.store.js";
import { useCheckoutStore } from "../../store/checkout.store.js";
import { UtensilsCrossed, IndianRupee } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PriceRow from "./PriceRow";
import toast from "react-hot-toast";

function Checkout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const cartItems = useCartStore((state) => state.cartItems);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const restaurantId = useCartStore((store) => store.restaurant_id);

  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);

  // TODO: Build Payment page and send order id from different way. after refreshing the page state will become null.
  async function handleCheckout() {
    try {
      const response = await api.post(
        "/orders/",
        {
          addressId: user.addresses[0].id,
          restaurantId: restaurantId,
          payment_method: paymentMethod,
        },
        { withCredentials: true },
      );
      const orderId = response.data.data.items[0].order_id;
      console.log("order id", orderId);
      navigate(`/payment/${orderId}`);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/users/profile", {
          withCredentials: true,
        });
        setUser(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchData();
  }, []);

  const deliveryFee = 40;
  const Gst = totalAmount * 0.18;
  const total = totalAmount + deliveryFee + Gst;

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
            {/* TODO: Create address update page and add path here */}
            <Link
              to={"/address"}
              className="text-lg text-[#F47B0A] cursor-pointer"
            >
              Change Address
            </Link>
          </div>

          <div className="bg-white rounded-[20px] p-6 mt-3 flex flex-col gap-2">
            <p className="text-xl font-semibold">{user?.name}</p>
            <hr className="border-t border-black/30" />
            <p>{user?.addresses[0].address_line}</p>
            <hr className="border-t border-black/30" />
            <p>{user?.contact}</p>
          </div>
        </div>

        {/* Billing Detail */}
        <div className="w-5/6 mx-auto mt-12 lg:w-1/2">
          <div className="flex justify-between w-full">
            <p className="text-lg font-semibold">Order details</p>
            <Link
              to={"/home"}
              className="text-lg text-[#F47B0A] cursor-pointer"
            >
              Add items +
            </Link>
          </div>

          <div className="bg-white rounded-[20px] p-6 mt-3 flex flex-col gap-2">
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div key={item.dish.id}>
                    <div className="flex items-center gap-2 text-lg">
                      <UtensilsCrossed size={15} />
                      <p>{item.dish.name}</p>
                      <p className="text-gray-500">{`x${item.quantity}`}</p>
                      <span className="ml-auto flex items-center">
                        <IndianRupee size={10} />
                        <p>{`${item.dish.price * item.quantity}`}</p>
                      </span>
                    </div>
                    <hr className="border-t border-black/20" />
                  </div>
                ))}
                <PriceRow
                  name={"Subtotal"}
                  amount={totalAmount}
                  className="flex items-center justify-between text-lg font-extralight italic"
                />

                <PriceRow
                  name={"Delivery Fee"}
                  amount={deliveryFee}
                  className="flex items-center justify-between text-lg font-extralight italic"
                />

                <PriceRow
                  name={"GST 18%"}
                  amount={Number(Gst.toFixed(2))}
                  className="flex items-center justify-between text-lg font-extralight italic"
                />

                <hr className="border-t border-dashed border-black/30 " />

                <PriceRow
                  name={"Total"}
                  amount={Number(total.toFixed(2))}
                  className="flex items-center justify-between text-lg"
                />
              </>
            ) : (
              <p className="text-center text-gray-400 py-6">
                Add items to cart
              </p>
            )}
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="max-w-lg mx-auto my-6">
            <Button onClick={() => handleCheckout()} className="cursor-pointer">
              Proceed to payment
            </Button>
          </div>
        ) : (
          <div className="max-w-lg mx-auto my-6">
            <Button onClick={() => navigate("/")} className="cursor-pointer">
              Add Items
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Checkout;
