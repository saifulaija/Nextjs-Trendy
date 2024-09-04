"use client";

import React, { useState } from "react";
import { BestSellingCarousel } from "./BestSellingCarousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link"; // Import the Next.js Link component

import { cn } from "@/lib/utils";
import CustomHeader from "@/components/shared/customHeader/CustomHeader";

const BestSellingProducts = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="container mx-auto">
        <CustomHeader title="Best Selling Product"/>
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
    </div>
  );
};

export default BestSellingProducts;
