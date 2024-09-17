"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { formateMoney } from "@/utils/formateMoney";
import { truncateTitle } from "@/utils/truncateTitle";
import { useGetAllProductsVariantQuery } from "@/redux/api/features/product/productApi";
import CustomHeader from "@/components/shared/customHeader/CustomHeader";
import CustomLoader from "@/components/shared/customLoader/CustomLoader";
import MyDialog from "@/components/shadcn/MyDialog";
import AddVariantForm from "@/form/AddVariantForm";
import ProductUpdateForm from "@/form/ProductUpdatForm";

const ShowProducts = () => {
  const router = useRouter();
  const { data, isLoading } = useGetAllProductsVariantQuery({});

  if (isLoading) return <CustomLoader />;

  const handleDetails = (id: string) => {
    router.push(`/product/details/${id}`);
  };

  return (
    <div className="w-full py-10 px-4 md:p-10">
      <Card className="max-w-7xl mx-auto flex flex-col">
        {data?.Products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No Data Found</p>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row">
            {/* Table Section */}
            <div className="w-full  pr-4 mb-6 md:mb-0">
              <CustomHeader title="All Products" />
              <Separator />
              {/* Wrapping table in a div with overflow-x-auto */}

              <Table className="overflow-x-auto overflow-y-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>SubCategory</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.Products.map((item) => {
                    const shortName = truncateTitle(item.name, 20);
                    return (
                      <TableRow key={item._id}>
                        <TableCell>{shortName}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.subCategory}</TableCell>
                        <TableCell>{formateMoney(item.price)}</TableCell>
                        <TableCell className=" text-red-500">
                          {item.discount}
                        </TableCell>

                        <TableCell className="text-right flex-1">
                          <div className="flex justify-end items-center gap-4 py-2">
                            <MyDialog
                              triggerButton={
                                <span className="inline-flex items-center gap-2 transition-colors text-gray-700 group hover:text-primary whitespace-nowrap">
                                  Add Variant
                                  <Plus
                                    size={18}
                                    className="text-gray-600 group-hover:text-primary transition-colors"
                                  />
                                </span>
                              }
                            >
                              <AddVariantForm productId={item._id} />
                            </MyDialog>

                            {/* Edit Button */}
                            <MyDialog
                              triggerButton={
                                <span className="inline-flex items-center gap-2 transition-colors text-gray-700 group hover:text-primary whitespace-nowrap">
                                  Edit
                                  <Edit
                                    size={18}
                                    className="text-gray-600 group-hover:text-primary transition-colors"
                                  />
                                </span>
                              }
                            >
                              <ProductUpdateForm data={item} />
                            </MyDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShowProducts;
