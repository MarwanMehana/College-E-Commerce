"use client";
import React, { useContext, useEffect, useState } from "react";

// icon
import { FaHeart } from "react-icons/fa";

// context
import {
  WishListContext,
  WishListContextType,
} from "../../../../context/WishListContext";

// UI
import { toast } from "sonner";

const ButtonWishList = ({ id }: { id: string }) => {
  const [color, setColor] = useState("text-gray-300");
  const { AddToWishlist, products } = useContext(
    WishListContext
  ) as WishListContextType;

  useEffect(() => {
    const isInWishlist = products.some((item) => item._id === id);
    if (isInWishlist) {
      setColor("text-red-800");
    } else {
      setColor("text-gray-300");
    }
  }, [products, id]);

  // function
  const handelAddToWishList = async () => {
    try {
      await AddToWishlist(id);
      toast.success("Added to wishlist successfully");
      setColor("text-red-800 ");
    } catch (error) {
      toast.error("Can't add to wishlist");
    }
  };

  return (
    <div
      onClick={() => {
        handelAddToWishList();
      }}
    >
      <FaHeart className={`cursor-pointer text-3xl ${color}`} />
    </div>
  );
};

export default ButtonWishList;
