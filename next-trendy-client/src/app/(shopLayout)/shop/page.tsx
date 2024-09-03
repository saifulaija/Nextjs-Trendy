// import React from "react";

// import Blogs from "@/components/Home/Blogs/Blogs";
import CategoryProducts from "@/components/categoryProducts/CategoryProducts";
import ShopProducts from "@/components/shopProducts/ShopProducts";
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
const ShopPage = ({ params, searchParams }: TParams) => {
 
  const searchTerm = searchParams?.searchTerm || "";

  return (
    <div className="mt-5">
      {/* <TagBlogs tag={tag} q={q} /> */}
      <ShopProducts searchTerm={searchTerm} />
    </div>
  );
};

export default ShopPage;
