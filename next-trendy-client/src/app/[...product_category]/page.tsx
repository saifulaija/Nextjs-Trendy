// import React from "react";

// import Blogs from "@/components/Home/Blogs/Blogs";
import CategoryProducts from "@/components/categoryProducts/CategoryProducts";
import { Metadata } from "next";
import React from "react";
// import TagBlogs from "../../blogs/components/TagBlogs";
export const metadata: Metadata = {
  title: "Category Product  | Trendy ",
  description: "An Trendy built with Next.js,  Shadcn ui",
};
type TParams = {
  params: { product_category: string[] };
  searchParams?: {
    searchTerm?: string;
  };
};
const CategoryCatchAllPage = ({ params, searchParams }: TParams) => {
  const category = params.product_category[2];
  const searchTerm = searchParams?.searchTerm || "";

  return (
    <div className="mt-5">
     
      <CategoryProducts searchTerm={searchTerm} category={category}/>

     
    </div>
  );
};

export default CategoryCatchAllPage;
