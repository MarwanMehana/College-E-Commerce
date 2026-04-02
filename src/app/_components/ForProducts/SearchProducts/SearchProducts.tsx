"use client";
import React, { useState, useEffect } from "react";

// component
import CardPost from "../CardPost/CardPost";

// ui
import { Input } from "../../../../components/ui/input";

// type
import { Product } from "../../../../Types/product.t";

const SearchProducts = ({ products }: { products: Product[] }) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    const results = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, products]);

  return (
    <div className="py-5 flex flex-col justify-center items-center m-10 md:px-20">
      {/* Search input */}
      <Input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-5 px-4 py-1 !bg-transparent !text-gray-700 !text-sm"
      />
      {/* display all Products */}
      {filtered && filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product, indx: number) => (
            <CardPost key={indx} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No products available.
        </p>
      )}
    </div>
  );
};

export default SearchProducts;
