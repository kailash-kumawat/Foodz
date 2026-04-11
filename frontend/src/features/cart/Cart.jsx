import React from "react";
import { Button, CartItem, BackButton } from "../../components/index.js";
import { useCartStore } from "../../store/cart.store.js";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="flex justify-between p-6">
        <BackButton />
        <p className="text-2xl font-semibold mr-auto ml-auto">Cart</p>
      </div>

      {/* Cart Item */}
      <div className="flex flex-col justify-between items-center h-[90vh]">
        <div className="container flex flex-col gap-5">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                name={item.name}
                image={item.image}
                price={item.price}
                dishId={item.dishId}
                quantity={item.quantity}
              />
            ))
          ) : (
            <div className="flex flex-col items-center p-4">
              <ShoppingCart className="w-1/4 h-1/4 text-black/30 mb-6" />
              <p className="text-2xl font-semibold">Your Cart is Empty</p>
              <p className="text-black/30 text-xl">
                Start adding items to continue shopping
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        {cartItems.length > 0 ? (
          <div className="pb-6 pt-8">
            <Button className="w-full cursor-pointer">Complete Order</Button>
          </div>
        ) : (
          <div className="pb-6 pt-8">
            <Button
              onClick={() => navigate("/")}
              className="w-full cursor-pointer"
            >
              Back to home
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
