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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAllPendingReviewsQuery } from "@/redux/api/features/review/reviewApi";
import { ChevronDown, Edit, MoreHorizontal } from "lucide-react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
  {
    name: "Pending",
    value: "pending",
  },
  {
    name: "Approved",
    value: "approved",
  },
] as const;

const PendingReviewPage = () => {
  const { data, isLoading } = useGetAllPendingReviewsQuery({});

  return (
    <div className="w-full py-10 px-4 md:p-10">
      <Card className="max-w-7xl mx-auto flex flex-col">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin" size={40} />
          </div>
        ) : data?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No pending reviews at the moment.</p>
            <Button variant="outline" className="mt-4">
              Go back to dashboard
            </Button>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row">
            {/* Table Section */}
            <div className="w-full  pr-4 mb-6 md:mb-0">
              <h1 className="font-semibold text-xl my-2 text-center">
                Pending Reviews Overview
              </h1>
              <Separator className="mb-4" />
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Reviewer Name</TableHead>
                      <TableHead>Comment</TableHead>
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
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild className={cn("group cursor-pointer inline-flex text-sm font-medium text-gray-700 hover:text-primary")}>
                            <span>
                                 Change Status 
                                 <ChevronDown className="-mr-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-primary"/>
                            </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                              // onClick={() => handleStatusChange("REJECTED")}
                              // disabled={disableChange}
                              >
                                Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                              // onClick={() => handleStatusChange("BOOKED")}
                              // disabled={disableChange}
                              >
                                Approved
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PendingReviewPage;
