"use client";

import React from "react";
import Image from "next/image";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ProductSwiper = ({
  productImage,
  productName,
}: {
  productImage: string[];
  productName: string;
}) => {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      className="max-w-lg pb-10"
    >
      {productImage.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="h-full w-full flex items-center justify-center">
            <Image
              src={image}
              alt={productName}
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSwiper;
