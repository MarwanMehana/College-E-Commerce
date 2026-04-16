"use client";
import React, { createContext, useEffect, useState } from "react";

// Actions
import { AddToCartActions } from "../Actions/Cart/AddToCart";

// Types
import { AllCartProduct, Cart } from "../Types/UserCart.t";
import { GetUserCartActions } from "../Actions/Cart/GetUserCart";
import { UpdateCartCountActions } from "../Actions/Cart/UpdateCartCount";
import { ClearCartActions } from "../Actions/Cart/ClearCart";
import { RemoveSpecificItemActions } from "../Actions/Cart/RemoveSpecificItem";

// UI
import { toast } from "sonner";

// interface
export interface CartContextType {
  numberOfCart: number;
  totalCartPrice: number;
  cartId: string;
  products: AllCartProduct[];
  loding: boolean;
  getUserCart: () => Promise<void>;
  updateCartCount: (id: string, count: string) => Promise<void>;
  AddProductToCart: (id: string) => Promise<void>;
  ClearAllCart: () => Promise<void>;
  RemoveSpecificItem: (id: string) => Promise<Cart | undefined>;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartContextProviders = ({ children }: { children: React.ReactNode }) => {
  // data
  const [numberOfCart, setNumberOfCart] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState("");
  const [products, setProducts] = useState<AllCartProduct[]>([]);
  // loding
  const [loding, setLoding] = useState(false);

  // functions
  const UpdateData = (data: Cart) => {
    setNumberOfCart(data?.numOfCartItems || 0);
    setCartId(data?.cartId || "");
    setTotalCartPrice(data?.data?.totalCartPrice || 0);
    setProducts(data?.data?.products || []);
  };
  // user cart
  const getUserCart = async () => {
    setLoding(true);
    try {
      const data: Cart = await GetUserCartActions();
      UpdateData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoding(false);
    }
  };

  // add product
  const AddProductToCart = async (id: string) => {
    setLoding(true);
    try {
      await AddToCartActions(id);
      await getUserCart();
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  // change count of product
  const updateCartCount = async (id: string, count: string) => {
    setLoding(true);
    try {
      const cartCount = await UpdateCartCountActions(id, count);
      UpdateData(cartCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoding(false);
    }
  };

  // clear pecificI tem
  const RemoveSpecificItem = async (id: string) => {
    setLoding(true);
    try {
      const data: Cart = await RemoveSpecificItemActions(id);
      toast.success("Item cleared!");
      UpdateData(data);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoding(false);
    }
  };

  // clear all cart
  const ClearAllCart = async () => {
    setLoding(true);
    try {
      await ClearCartActions();
      toast.success("Cart cleared!");
      setNumberOfCart(0);
      setProducts([]);
      setTotalCartPrice(0);
      await getUserCart();
    } catch (error) {
      console.error(error);
    } finally {
      setLoding(false);
    }
  };

  // run once
  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        numberOfCart,
        totalCartPrice,
        cartId,
        products,
        loding,
        getUserCart,
        updateCartCount,
        AddProductToCart,
        ClearAllCart,
        RemoveSpecificItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProviders;
