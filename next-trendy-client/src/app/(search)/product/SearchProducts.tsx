"use client";

import CustomLoader from "@/components/shared/customLoader/CustomLoader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetAllProductsQuery } from "@/redux/api/features/product/productApi";
import { useDebounced } from "@/redux/hooks";
import { Slash } from "lucide-react";
import SearchProductCard from "./SearchProductCard";
import { TProduct } from "@/types/product.type";
import { NoData } from "@/components/shared/noData/NoData";

const SearchProducts = ({ searchTerm }: { searchTerm: string }) => {
  const query: Record<string, any> = {};
  const debounceTerm = useDebounced({ searchQuery: searchTerm, delay: 700 });

  if (debounceTerm) {
    query["searchTerm"] = debounceTerm;
  }

  const { data, isLoading } = useGetAllProductsQuery({ ...query });

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
            <BreadcrumbPage>product</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            {searchTerm && <BreadcrumbPage>{searchTerm}</BreadcrumbPage>}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="wrapper">
        <div>
          <div className="flex justify-center items-center italic font-semibold p-2">
            {searchTerm && (
              <>
                <p>
                  {data?.Products?.length
                    ? `Search result ${data?.Products.length}`
                    : ""}
                </p>
              </>
            )}
          </div>
          <div className="w-full">
            {isLoading ? (
              <CustomLoader />
            ) : (data?.Products?.length ?? 0) > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {data?.Products?.map((product: TProduct) => (
                  <SearchProductCard product={product} key={product._id} />
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

export default SearchProducts;
