"use client";

import { BestSellingCarousel } from "./BestSellingCarousel";
import { Button } from "@/components/ui/button";
import { ChevronRight, Link2OffIcon } from "lucide-react";
import Link from "next/link"; // Import the Next.js Link component

import { cn } from "@/lib/utils";
import CustomHeader from "@/components/shared/customHeader/CustomHeader";
import CommonButton from "@/components/shared/commonButton/CommonButton";

const BestSellingProducts = () => {
  return (
    <div className="container mx-auto">
      <CustomHeader title="Best Selling Product" />
      <div className="flex justify-center items-center mt-5">
        <BestSellingCarousel />
      </div>

      <div className="flex justify-center items-center mt-5">
        <CommonButton title="Shop All" href="/" />
      </div>
    </div>
  );
};

export default BestSellingProducts;
