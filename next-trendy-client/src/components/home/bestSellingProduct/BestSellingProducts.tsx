


"use client";

import React, { useState } from "react";
import { BestSellingCarousel } from "./BestSellingCarousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link"; // Import the Next.js Link component

import { cn } from "@/lib/utils";

const BestSellingProducts = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="container mx-auto">
      <div className="flex align-center gap-5 items-center">
        <h2 className="mt-20 border-primary border-l-2 border-t-2 h-10 w-full"></h2>
        <h2 className="pt-10 text-gray-700 flex justify-center items-center text-divider w-[780px] md:lg:w-[580px] font-semibold md:text-[15px] text-[12px]">
          BEST SELLING'S PRODUCTS
        </h2>
        <h2 className="mt-20 border-primary w-full border-t-2 border-r-2 h-10"></h2>
      </div>

      <div className="flex justify-center items-center mt-5">
        <BestSellingCarousel />
      </div>

      <div className="flex justify-center items-center mt-5">
        <Button
          asChild
          className={cn(
            "group bg-white border-2 border-red-600 text-primary duration-300 ease-in-out transition-all hover:text-white"
          )}
        >
          <Link href="/shop">
            <span className="flex items-center">
              <span className="font-semibold tracking-wide uppercase">
                Shop All
              </span>
              <ChevronRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Button>
      </div>

      {/* <ButtonShopAll/> */}

      <div className="flex-1 border-b-2 border-l-2 border-r-2 border-primary h-10 -mt-4"></div>
    </div>
  );
};

export default BestSellingProducts;


