"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";

// Type
import { AllCartProduct } from "../../../Types/UserCart.t";

// icon
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { FaMinus } from "react-icons/fa";

// UI
import { Button } from "../../../components/ui/button";

// context
import { CartContext } from "../../../context/CartContext";

// page
import LodingPage from "../../loading";

const CartCard = ({ product }: { product: AllCartProduct }) => {
  const [count, setCount] = useState(product.count);
  const cart = useContext(CartContext);

  if (!cart) {
    return (
      <p className="text-center text-gray-500 mt-10">Cart not available.</p>
    );
  }

  const { loding, updateCartCount, RemoveSpecificItem } = cart;

  if (loding) return <LodingPage />;

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-10 border-b py-3">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="md:w-32">
          <Image
            src={product.product.imageCover}
            alt={product.product.title}
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center md:block">
          <h3 className="font-bold line-clamp-1">{product.product.title}</h3>
          <p>{product.price} EGP</p>
          <div
            className=" text-red-700 flex gap-1 items-center"
            onClick={async () => {
              await RemoveSpecificItem(product.product._id);
            }}
          >
            <MdDeleteForever /> Remove
          </div>
        </div>
      </div>

      {/* count */}
      <div className="flex justify-center items-center gap-5">
        <Button
          onClick={async () => {
            const newCount = count + 1;
            setCount(newCount);
            await updateCartCount(product.product._id, newCount.toString());
          }}
        >
          <MdAdd />
        </Button>

        <div>{count}</div>
        <Button
          onClick={async () => {
            if (count > 1) {
              const newCount = count - 1;
              setCount(newCount);
              await updateCartCount(product.product._id, newCount.toString());
            }
          }}
        >
          <FaMinus />
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
