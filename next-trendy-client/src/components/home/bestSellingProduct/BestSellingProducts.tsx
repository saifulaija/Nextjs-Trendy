"use client";


import { BestSellingCarousel } from "./BestSellingCarousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link"; // Import the Next.js Link component

import { cn } from "@/lib/utils";
import CustomHeader from "@/components/shared/customHeader/CustomHeader";

const BestSellingProducts = () => {
  return (
    <div className="container mx-auto">
      <CustomHeader title="Best Selling Product" />
      <div className="flex justify-center items-center mt-5">
        <BestSellingCarousel />
      </div>

      <div className="flex justify-center items-center mt-5">
        <Button
          asChild
          className={cn(
            "group bg-white border-2 border-red-600 hover:bg-red-600 hover:border-red-600 text-primary hover:text-white transition-colors duration-300 ease-in-out focus:ring-4 focus:ring-red-300 focus:outline-none"
          )}
        >
          <Link href="/shop">
            <span className="flex items-center space-x-2">
              <span className="font-semibold tracking-wide uppercase">
                Shop All
              </span>
              <ChevronRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Button>

        <div className="w-1/6 h-full flex items-center">
          <button className="relative px-6 py-2 border border-gray-500 text-white uppercase font-bold flex items-center justify-between group transition-all duration-500 overflow-hidden">
            <span className="relative z-10">Read More</span>
            <ChevronRight className="relative z-10 ml-2 transition-transform duration-500 group-hover:translate-x-3" />
            <div className="absolute inset-0 bg-primary w-[10%] group-hover:w-full transition-all duration-500 z-0"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
