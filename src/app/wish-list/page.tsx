"use client";
import React, { useContext } from "react";

// context
import { WishListContext } from "../../context/WishListContext";

// page
import LodingPage from "../loading";
import { Wishlist } from "../../Types/UserWishlist.t";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import ButtonCart from "../_components/ForProducts/ButtonCart/ButtonCart";

const WishList = () => {
  const WishList = useContext(WishListContext);

  if (!WishList) {
    return (
      <p className="text-center text-gray-500 mt-10">WishList not available.</p>
    );
  }

  const { loding, products, RemoveSpecificItem } = WishList;

  if (loding) return <LodingPage />;

  return (
    <section className="py-20 px-10 sm:px-20 max-w-4xl mx-auto">
      <div className="bg-gray-50 p-10 ">
        <div className="pb-5 border-b">
          <h4 className="text-3xl text-center font-bold pb-10">wish List:</h4>
        </div>

        <div className="grid justify-center items-center">
          {products && products.length > 0 ? (
            products.map((product: Wishlist, index: number) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-2 md:gap-10 border-b py-3"
              >
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <div className="md:w-32">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center md:block">
                    <h3 className="font-bold line-clamp-1">{product.title}</h3>
                    <p>{product.price} EGP</p>
                    <div
                      className=" text-red-700 flex gap-1 items-center"
                      onClick={async () => {                        
                        await RemoveSpecificItem(product._id);
                      }}
                    >
                      <MdDeleteForever /> Remove
                    </div>
                  </div>
                </div>

                {/* count */}
                <div className="flex justify-center items-center gap-5">
                  <ButtonCart id={product._id} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No Wishlist exist.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WishList;
