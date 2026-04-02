// next
import Image from "next/image";
import React from "react";

// components
import HeaderSwiper from "../HeaderSwiper/HeaderSwiper";
import CategorySwiper from "../CategorySwiper/CategorySwiper";

// api
import { GetAllCategories } from "../../../../api/Categories/GetAllCategories";

const Header = async () => {
  const categories = await GetAllCategories();

  return (
    <header>
      <div className="flex flex-col md:flex-row justify-center items-center md:px-20 gap-4 md:gap-0">
        {/* HeaderSwiper */}
        <div className="">
          <HeaderSwiper />
        </div>
        {/* static image */}
        <div className="mb-5">
          <Image
            src="/Images/banner1.jpg"
            width={400}
            height={400}
            alt="banner1"
            className="md:w-72"
          />
          <Image
            src="/Images/banner2.jpg"
            width={400}
            height={400}
            alt="banner2"
            className="md:w-72"
          />
        </div>
      </div>
      {/* CategorySwiper */}
      <div className="flex justify-center ">
        <CategorySwiper categories={categories} />
      </div>
    </header>
  );
};

export default Header;
