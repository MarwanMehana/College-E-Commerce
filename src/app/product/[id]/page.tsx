import React from "react";
import { GetspecificProduct } from "../../../api/products/GetspecificProduct";
import { FaStar } from "react-icons/fa";
import ButtonWishList from "../../_components/ForProducts/ButtonWishList/ButtonWishList";
import ButtonCart from "../../_components/ForProducts/ButtonCart/ButtonCart";
import ProductSwiper from "../../_components/ForProducts/ProductSwiper/ProductSwiper";

const Product = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await GetspecificProduct(id);
  return (
    <section className="flex flex-col md:flex-row items-center justify-center p-5 py-20">
      <div className="md:w-2/5">
        <ProductSwiper
          productImage={product.images}
          productName={product.title}
        />
      </div>
      <div className="md:w-3/5 grid gap-3 p-10">
        <h1 className="text-3xl font-bold">{product?.title}</h1>
        <p>{product?.description}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-semibold">{product.price} EGP</p>
          <div className="flex items-center gap-1 text-sm">
            <FaStar className="text-yellow-500" /> {product.ratingsAverage}
          </div>
        </div>
        <div className="flex items-center justify-between gap-1 text-sm">
          <ButtonCart id={product._id} />
          <ButtonWishList id={product._id} />
        </div>
      </div>
    </section>
  );
};

export default Product;
