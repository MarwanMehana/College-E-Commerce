"use client";
import React from "react";
import Image from "next/image";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// type
import { Category } from "../../../../Types/product.t";

const CategorySwiper = ({ categories }: { categories: Category[] }) => {
  const length = categories.length;
  return (
    <div className="w-screen">
      <Swiper
        spaceBetween={0}
        slidesPerView={10}
        loop={true}
        breakpoints={{
          320: { slidesPerView: length > 4 ? 4 : length },
          640: { slidesPerView: length > 5 ? 5 : length },
          1024: { slidesPerView: length > 6 ? 6 : length },
          1440: { slidesPerView: length > 8 ? 8 : length },
        }}
      >
        {categories && length > 0 ? (
          categories.map((category, index: number) => (
            <SwiperSlide key={index}>
              <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="md:w-72 object-center h-36"
              />
              <h4 className="font-bold text-green-900 text-center p-1 text-xs md:text-sm lg:text-lg">
                {category.name}
              </h4>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No categories available.
          </p>
        )}
      </Swiper>
    </div>
  );
};

export default CategorySwiper;
