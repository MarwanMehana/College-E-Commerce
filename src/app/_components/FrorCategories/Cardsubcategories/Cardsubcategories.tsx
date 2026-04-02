"use client";
import React, { useState } from "react";
import Image from "next/image";

// ui
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

// types
import { Category, Subcategory } from "../../../../Types/product.t";

const Cardsubcategories = ({
  category,
  subCategories,
}: {
  category: Category;
  subCategories: Subcategory[];
}) => {
  const [subCatigory, setSubCatigory] = useState(false);
  return (
    <div>
      <Card className="border-0 shadow-sm hover:shadow-green-600 transition-shadow duration-300 p-0">
        <button
          className="w-full h-full text-left"
          onClick={() => {
            setSubCatigory(!subCatigory);
          }}
        >
          {/* image */}
          <CardHeader className="relative h-60">
            <div className="absolute inset-0">
              <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          </CardHeader>

          {/* title */}
          <CardContent className="p-3">
            <CardTitle className="!text-green-800 text-center text-lg">
              {category.name}
            </CardTitle>
          </CardContent>
        </button>
      </Card>
      {subCatigory && (
        <div className="border-y p-5">
          <h3 className="font-bold text-green-700 text-center pb-3">
            {category.name} subcategories
          </h3>
          {subCategories.length > 0 ? (
            <div className="grid gap-2">
              {subCategories.map((sub, index) => (
                <div key={index} className="p-3 border rounded-lg bg-gray-50 hover:shadow-sm hover:shadow-green-700">
                  <ul className="mt-2 space-y-1">
                    <li className=" text-gray-700">{sub.name}</li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No subCategories available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cardsubcategories;
