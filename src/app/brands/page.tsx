import React from "react";
import Image from "next/image";

// API
import { GetAllBrands } from "../../api/Brands/GetAllBrands";

// UI
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Dialog, DialogTrigger } from "../../components/ui/dialog";

// Type
import { Brand } from "../../Types/product.t";
import SpecificBrand from "../_components/SpecificBrand/SpecificBrand";

const Brands = async () => {
  const brands = await GetAllBrands();
  return (
    <section className="p-20">
      <h3 className="text-center font-bold text-4xl text-green-800 mb-5">
        All Brands
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {brands && brands.length > 0 ? (
          <>
            {brands.map((brand: Brand, index: number) => (
              <Dialog key={index} >
                <DialogTrigger>
                  <Card className="hover:shadow-sm gap-0 hover:shadow-green-600 transition-shadow duration-300 p-3">
                    {/* image */}
                    <CardHeader className="flex justify-center">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </CardHeader>
                    {/* title */}
                    <CardContent className="">
                      <CardTitle className="!text-green-800 text-center">
                        {brand.name}
                      </CardTitle>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <SpecificBrand id={brand._id} />
              </Dialog>
            ))}
          </>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No brands available.
          </p>
        )}
      </div>
    </section>
  );
};

export default Brands;
