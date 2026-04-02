import React from "react";

// api
import { GetAllProducts } from "../../../../api/products/GetAllProducts";

// component
import SearchProducts from "../SearchProducts/SearchProducts";

// type
import { Product } from "../../../../Types/product.t";


const AllProducts = async () => {
  const allProducts:Product[] = await GetAllProducts();

  return (
   <SearchProducts products={allProducts} />
  );
};

export default AllProducts;
