"use client";
import React, { createContext, useEffect, useState } from "react";

// Actions
import { AddToWishlistActions } from "../Actions/Wishlist/AddProduct";
import { GetUserWishlistActions } from "../Actions/Wishlist/GetUserWishlist";
import { RemoveProductWishlistActions } from "../Actions/Wishlist/RemoveProduct";

// Types
import { UserWishlist, Wishlist } from "../Types/UserWishlist.t";

// UI
import { toast } from "sonner";

// interface
export interface WishListContextType {
  loding: boolean;
  products: Wishlist[];
  AddToWishlist: (id: string) => Promise<void>;
  RemoveSpecificItem: (id: string) => Promise<void>;
}

export const WishListContext = createContext<WishListContextType | null>(null);

const WishListContextProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // data
  const [products, setProducts] = useState<Wishlist[]>([]);

  // loding
  const [loding, setLoding] = useState(false);

  // functions
  // user Wishlist
  const getUserWishlist = async () => {
    setLoding(true);
    try {
      const { data }: UserWishlist = await GetUserWishlistActions();
      setProducts(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoding(false);
    }
  };

  // add product
  const AddToWishlist = async (id: string) => {
    setLoding(true);
    try {
      await AddToWishlistActions(id);
      await getUserWishlist();
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  //   clear pecificI tem
  const RemoveSpecificItem = async (id: string) => {
    setLoding(true);
    try {
      await RemoveProductWishlistActions(id);
      toast.success("Item cleared!");
      getUserWishlist();
    } catch (error) {
      console.error(error);
    } finally {
      setLoding(false);
    }
  };

  // run once
  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        loding,
        products,
        AddToWishlist,
        RemoveSpecificItem,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export default WishListContextProviders;
