"use client";
import CustomHeader from "@/components/shared/customHeader/CustomHeader";
import CommonButton from "@/components/shared/commonButton/CommonButton";
import { ProductCarousel } from "@/components/shared/productCarousel/ProductCarousel";

const MensCollections = () => {
  return (
    <div className="container mx-auto my-5">
      <CustomHeader title="Mens Collection" />
      <div className="flex justify-center items-center mt-5">
        <ProductCarousel category="men" />
      </div>

      <div className="flex justify-center items-center mt-5">
        <CommonButton title="Shop All" href="/shop" />
      </div>
    </div>
  );
};

export default MensCollections;
