"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useGetAllApprovedReviewsQuery,
 
  useUpdateReviewStatusMutation,
} from "@/redux/api/features/review/reviewApi";
import { ChevronDown, X} from "lucide-react";
import { cn } from "@/lib/utils";
import CustomLoader from "@/components/shared/customLoader/CustomLoader";

const STATUS_OPTIONS = [
  { name: "Pending", value: "pending" },
  { name: "Approved", value: "approved" },
];

const ApprovedReviewPage = () => {
  const { data, isLoading } = useGetAllApprovedReviewsQuery({});
  const [updateReviewStatus, { isLoading: updateLoading }] =
    useUpdateReviewStatusMutation();

 const handleDelete=()=>{
  
 }

  return (
    <div className="w-full py-10 px-4 md:p-10">
      <Card className="max-w-7xl mx-auto flex flex-col">
        {isLoading ? (
          <CustomLoader />
        ) : data?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No Approved reviews at the moment.</p>
            <Button variant="outline" className="mt-4">
              Go back to dashboard
            </Button>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <h1 className="font-semibold text-xl my-2 text-center">
              Approved Reviews Overview
            </h1>
            <Separator className="mb-4" />
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Reviewer Name</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((item: any) => (
                    <TableRow
                      key={item._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="truncate max-w-xs">
                        {item.comment}
                      </TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          asChild
                          variant="link"
                          className={cn(
                            "group cursor-pointer text-sm font-medium text-gray-700 hover:text-primary hover:no-underline" 
                          )}
                        >
                          <span className="inline-flex items-center">
                            Delete
                            <X className="-mr-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-primary" />
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ApprovedReviewPage;
