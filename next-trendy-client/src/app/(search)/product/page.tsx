

import { Metadata } from "next";
import React from "react";
import SearchProducts from "./SearchProducts";

export const metadata: Metadata = {
  title: "SubCategory  | Trendy ",
  description: "An Trendy built with Next.js,  Shadcn ui",
};
type TParams = {
  
  searchParams?: {
    q?: string;
  };
};
const SearchProductsPage = ({ searchParams }: TParams) => {
  
  const searchTerm = searchParams?.q || "";

  return (
    <div className="mt-5">
      <SearchProducts
        searchTerm={searchTerm}
      
      />
    </div>
  );
};

export default SearchProductsPage;

