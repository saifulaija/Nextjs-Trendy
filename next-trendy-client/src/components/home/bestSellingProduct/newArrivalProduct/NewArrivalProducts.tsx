"use client";

import CustomHeader from "@/components/shared/customHeader/CustomHeader";
import CustomLoader from "@/components/shared/customLoader/CustomLoader";
import ProductCard from "@/components/shared/productCard/ProductCard";
import { useGetNewArrivalProductsQuery } from "@/redux/api/features/product/productApi";

const NewArrivalProducts = () => {
  const { data, isLoading } = useGetNewArrivalProductsQuery({
    sort: "-price",
  });

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="container mx-auto">
      <CustomHeader title="New Arrivals" />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-10">
        {data?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivalProducts;
