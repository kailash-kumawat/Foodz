import React, { useEffect } from "react";
import { Button, CartItem, BackButton } from "../../components/index.js";
import { useCartStore } from "../../store/cart.store.js";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  // useEffect(() => {
  //   clearCart();
  // }, []);

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
            cartItems.map(
              (item) => (
                console.log(cartItems),
                (
                  <CartItem
                    key={item.dish.id}
                    name={item.dish.name}
                    image={item.dish.img}
                    price={item.dish.price}
                    dishId={item.dish.id}
                    quantity={item.quantity}
                  />
                )
              ),
            )
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
          <div className="w-78.5 h-17.5 mb-5">
            <Button
              onClick={() => navigate("/checkout")}
              className="w-full cursor-pointer"
            >
              Complete Order
            </Button>
          </div>
        ) : (
          <div className="w-78.5 h-17.5 mb-5">
            <Button
              onClick={() => navigate("/home")}
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
