"use client";
import React from "react";
import Image from "next/image";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const HeaderSwiper = () => {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      className="max-w-xs p-0"
    >
      <SwiperSlide>
        <Image
          src="/Images/slider1.jpg"
          alt="Fresh Cart"
          width={400}
          height={400}
          className="md:w-72 object-right"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/Images/slider2.jpg"
          alt="Fresh Cart"
          width={400}
          height={400}
          className="md:w-72 object-right"
        />
      </SwiperSlide>
      <SwiperSlide>
          <Image
            src="/Images/slider3.jpg"
            alt="Fresh Cart"
            width={400}
            height={400}
            className="md:w-72 object-right"
          />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeaderSwiper;
