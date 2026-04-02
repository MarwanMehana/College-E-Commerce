"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Product } from "../../../../Types/product.t";
import Link from "next/link";
import ButtonCart from "../ButtonCart/ButtonCart";
import ButtonWishList from "../ButtonWishList/ButtonWishList";

const CardPost = ({ product }: { product: Product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="relative max-w-sm md:max-w-md lg:max-w-lg border-0 shadow-sm hover:shadow-green-600 transition-shadow duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product._id}`}>
        <CardHeader>
          <Image
            src={product.imageCover}
            alt={product.title}
            width={200}
            height={200}
            className="mx-auto rounded-lg"
          />
        </CardHeader>

        <CardContent className="px-5">
          <CardTitle className="pb-3 !text-green-800 line-clamp-2">
            {product.title}
          </CardTitle>
          <CardDescription>
            <p className="!line-clamp-1 text-sm text-gray-600">
              {product.description}
            </p>
            <div className="flex justify-between items-center mt-2">
              <p className="font-semibold">{product.price} EGP</p>
              <div className="flex items-center gap-1 text-sm">
                <FaStar className="text-yellow-500" /> {product.ratingsAverage}
              </div>
            </div>
          </CardDescription>
        </CardContent>
      </Link>

      <CardFooter className="flex justify-between items-center px-4">
        {hovered && <ButtonCart id={product._id} />}
        <div className="ml-auto">
          <ButtonWishList id={product._id} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardPost;
