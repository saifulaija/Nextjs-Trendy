import ProductDetails from "@/components/shared/productDetails/ProductDetails";
import { Metadata } from "next";
import React from "react";
type TParams={
    params:{
        productId:string
    }
}

export const metadata: Metadata = {
  title: "Product Details | Trendy",
  description: "Generated by create Trendy Leather",
};

const ProductDetailsPage = ({params}:TParams) => {
  return (
    <div>
      <ProductDetails  />
    </div>
  );
};

export default ProductDetailsPage;
