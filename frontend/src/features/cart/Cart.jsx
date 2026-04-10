import React from "react";
import { Button, CartItem, BackButton } from "../../components/index.js";
import { useCartStore } from "../../store/cart.store.js";

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  

  return (
    <>
      <div className="flex justify-between p-6">
        <BackButton />
        <p className="text-2xl font-semibold mx-auto mr-auto">Cart</p>
      </div>
      <div className="flex flex-col justify-between items-center h-[90vh]">
        <div className="container flex flex-col gap-5">
          {cartItems.length > 0
            ? cartItems.map((item) => (
                <CartItem
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  dishId={item.dishId}
                  quantity={item.quantity}
                />
              ))
            : ""}
        </div>
        <div className="pb-6 pt-8">
          <Button className="w-full cursor-pointer">Place Order</Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
