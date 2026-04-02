"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";

// context
import { CartContext } from "../../context/CartContext";

// type
import { AllCartProduct } from "../../Types/UserCart.t";

// page and component
import LodingPage from "../loading";
import CartCard from "../_components/Cart/CartCard";
import { Button } from "../../components/ui/button";

const Cart = () => {
  const cart = useContext(CartContext);

  // router
  const router = useRouter();

  if (!cart) {
    return (
      <p className="text-center text-gray-500 mt-10">Cart not available.</p>
    );
  }

  const { numberOfCart, totalCartPrice, products, loding, ClearAllCart } = cart;

  if (loding) return <LodingPage />;

  const isCartEmpty = !products || products.length === 0;

  return (
    <section className="py-20 px-10 sm:px-20 max-w-4xl mx-auto">
      <div className="bg-gray-50 p-10 ">
        <div className="pb-5 border-b">
          <h4 className="text-3xl text-center font-bold pb-10">Cart Shop:</h4>
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between">
            <h6 className="flex gap-2">
              <strong>Total price:</strong>
              <span className="text-green-700">{totalCartPrice} EGP</span>
            </h6>
            <h6 className="flex gap-2">
              <strong>Total number of items:</strong>
              <span className="text-green-700">{numberOfCart} items</span>
            </h6>
          </div>
          <div className="flex justify-around items-center py-5">
            <Button
              className="bg-red-700 text-white"
              disabled={isCartEmpty}
              onClick={() => {
                if (!isCartEmpty) ClearAllCart();
              }}
            >
              Clear Cart
            </Button>
            <Button
              className="bg-green-700 text-white"
              disabled={isCartEmpty}
              onClick={() => {
                if (!isCartEmpty) router.push("/payment");
              }}
            >
              Check out
            </Button>
          </div>
        </div>

        <div className="grid justify-center items-center">
          {products && products.length > 0 ? (
            products.map((product: AllCartProduct) => (
              <CartCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">No product exist.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
