

"use client";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "@/redux/api/features/product/productApi";
import { useDebounced } from "@/redux/hooks";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { TProduct } from "@/types/product.type";
import ProductCategoryCard from "../shared/productCard/CategoryProductCard";
import { NoData } from "../shared/noData/NoData";
import CustomLoader from "../shared/customLoader/CustomLoader";

const ShopProducts = ({ searchTerm }: { searchTerm: string }) => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<TProduct[]>([]);

  const debounceTerm = useDebounced({ searchQuery: searchTerm, delay: 700 });
  const query: Record<string, any> = {
    searchTerm: debounceTerm,
    page,
  };

  const { data, isLoading, isFetching } = useGetAllProductsQuery({ ...query });

  useEffect(() => {
    if (data?.Products) {
      setProducts((prev) => [...prev, ...data.Products]); // Append new products
    }
  }, [data]);

  useEffect(() => {
    setProducts([]); // Reset products when search term changes
    setPage(1); // Reset page to 1
  }, [debounceTerm]);

  useEffect(() => {
    const loadMoreProducts = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isFetching && // Prevent loading if already fetching
        data?.Products?.length
      ) {
        setPage((prevPage) => prevPage + 1); // Load next page
      }
    };

    window.addEventListener("scroll", loadMoreProducts);
    return () => {
      window.removeEventListener("scroll", loadMoreProducts);
    };
  }, [data, isFetching]);

  return (
    <div className="w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="wrapper">
        <div>
          <div className="flex justify-center items-center italic font-semibold p-2">
            {debounceTerm && products.length > 0 && (
              <p>{`Search result: ${products.length}`}</p>
            )}
          </div>
          <div className="w-full">
            {isLoading ? (
              <CustomLoader />
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {products.map((product: TProduct) => (
                  <ProductCategoryCard product={product} key={product._id} />
                ))}
              </div>
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
