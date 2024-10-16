"use client";
import CustomHeader from "@/components/shared/customHeader/CustomHeader";
import CommonButton from "@/components/shared/commonButton/CommonButton";
import { ProductCarousel } from "@/components/shared/productCarousel/ProductCarousel";

interface RelatedProductsProps {
  category: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category }) => {
  return (
    <div className="container mx-auto my-5">
      <CustomHeader title="Related Products" />
      <div className="flex justify-center items-center mt-5">
        <ProductCarousel category={category} />
      </div>
    </div>
  );
};

export default RelatedProducts;
