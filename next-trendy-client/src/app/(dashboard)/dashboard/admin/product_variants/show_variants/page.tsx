"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
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
import { useGetAllVariantsQuery } from "@/redux/api/features/variant/variantApi";
import CustomHeader from "@/components/shared/customHeader/CustomHeader";
import CustomLoader from "@/components/shared/customLoader/CustomLoader";
import MyDialog from "@/components/shadcn/MyDialog";
import AddVariantForm from "@/form/AddVariantForm";
import React from "react";
import VariantUpdateForm from "@/form/VariantUpdateForm";

const VariantShow = () => {
  const { data, isLoading } = useGetAllVariantsQuery({});
  console.log(data);
  
  const router = useRouter();

  if (isLoading) return <CustomLoader />;

  return (
    <div className="w-full py-10 px-4 md:px-10">
      <Card className="max-w-7xl mx-auto flex flex-col space-y-6">
        <CustomHeader title="Products & Variants Overview" />
        <Separator />

        {data?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table className="w-full min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SubCategory</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-center">Discount</TableHead>
                 
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item:any) => {
                  const shortName = truncateTitle(item.product.name, 20);

                  return (
                    <React.Fragment key={item._id}>
                      
                      <TableRow >
                        <TableCell>{shortName}</TableCell>
                        <TableCell>{item.product.category}</TableCell>
                        <TableCell>{item.product.subCategory}</TableCell>
                        <TableCell>
                          {formateMoney(item.product.price)}
                        </TableCell>
                        <TableCell className="text-red-500">
                          {item.product.discount}%
                        </TableCell>
                       
                      </TableRow>

                      {/* Variants Information */}
                      {item.variant.length > 0 ? (
                        item.variant.map((variantItem:any) => (
                          <TableRow
                            key={variantItem._id}
                            className="bg-gray-50"
                          >
                            <TableCell colSpan={6} className="pl-10">
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <strong>Color:</strong> {variantItem.color}
                                </div>
                                <div className="flex-1">
                                  <strong>Quantity:</strong>{" "}
                                  {variantItem.quantity}
                                </div>
                                <div className="flex-1">
                                  <img
                                    src={variantItem.image}
                                    alt={variantItem.color}
                                    className="w-24 h-24 object-cover rounded"
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <MyDialog
                                triggerButton={
                                  <span className="flex items-center justify-center gap-1 text-gray-700 group hover:text-primary transition-colors">
                                    Edit
                                    <Edit
                                      size={18}
                                      className="group-hover:text-primary"
                                    />
                                  </span>
                                }
                              >
                                <VariantUpdateForm data={data} />
                              </MyDialog>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow className="bg-gray-100">
                          <TableCell colSpan={7} className="text-center py-4">
                            <p className="text-sm text-gray-500">
                              No Variants Available
                            </p>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VariantShow;

