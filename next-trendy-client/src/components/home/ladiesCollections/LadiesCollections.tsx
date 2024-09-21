"use client";
import CustomHeader from "@/components/shared/customHeader/CustomHeader";
import CommonButton from "@/components/shared/commonButton/CommonButton";
import { ProductCarousel } from "@/components/shared/productCarousel/ProductCarousel";

const LadiesCollections = () => {
  return (
    <div className="container mx-auto my-5">
      <CustomHeader title="Ladies Collection" />
      <div className="flex justify-center items-center mt-5">
        <ProductCarousel category="women" />
      </div>

      <div className="flex justify-center items-center mt-5">
        <CommonButton title="Shop All" href="/product/category/women" />
      </div>
    </div>
  );
};

export default LadiesCollections;
