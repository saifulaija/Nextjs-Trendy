import Category from "@/components/category/Category";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category Product  | Trendy ",
  description: "An Trendy built with Next.js,  Shadcn ui",
};
type TParams = {
  params: { category: string[] };
  searchParams?: {
    searchTerm?: string;
  };
};
const CategoryCatchAllPage = ({ params, searchParams }: TParams) => {
  const category = params.category[1];
  const subCategory = params.category[2];
  console.log(params);

  const searchTerm = searchParams?.searchTerm || "";

  return (
    <div className="mt-5">
      <Category
        searchTerm={searchTerm}
        category={category}
        subCategory={subCategory}
      />
    </div>
  );
};

export default CategoryCatchAllPage;
