"use client";
import React, { useContext, useState } from "react";

// UI
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";

// context
import { CartContext, CartContextType } from "../../../../context/CartContext";

const ButtonCart = ({ id }: { id: string }) => {
  const { AddProductToCart } = useContext(CartContext) as CartContextType;
  const [loding, setLoding] = useState(false)

  const handelAddToCart = async () => {
    setLoding(true)
    try {
      await AddProductToCart(id);
      toast.success("Added to cart successfully");
      setLoding(false)
    } catch (error) {
      toast.error("Can't add to cart ");
      setLoding(false)
    }
  };
  return (
    <Button
      className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition"
      onClick={() => {
        handelAddToCart();
      }}
    >
      {loding? 'waiting 😮‍💨' : 'Add to cart'}
    </Button>
  );
};

export default ButtonCart;
