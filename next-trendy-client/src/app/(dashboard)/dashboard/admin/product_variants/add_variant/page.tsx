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
import { PlusCircledIcon } from "@radix-ui/react-icons";

const add_variant = () => {
  const router = useRouter();
  const { data, isLoading } = useGetAllProductsVariantQuery({});

  if (isLoading) return <CustomLoader />;


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
                    <TableHead className="text-center">Discount</TableHead>
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
                        <TableCell className="text-right">
                          {formateMoney(item.price)}
                        </TableCell>
                        <TableCell className="text-right text-red-500">
                          {item.discount}
                        </TableCell>
                        <TableCell className="">
                          <MyDialog
                            triggerButton={
                              <Button
                                // onClick={() => handleDetails(item._id)}
                                variant="ghost"
                              >
                                <Plus size={18} />
                              </Button>
                            }
                          >
                            <AddVariantForm productId={item._id} />
                          </MyDialog>
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

export default add_variant;
