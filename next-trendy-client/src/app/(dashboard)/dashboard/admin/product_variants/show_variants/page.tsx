"use client"

import { useGetAllVariantsQuery } from "@/redux/api/features/variant/variantApi";

const page = () => {
  const {data,isLoading}=useGetAllVariantsQuery({})
  console.log(data);
  
  return <div>page</div>;
};

export default page;
