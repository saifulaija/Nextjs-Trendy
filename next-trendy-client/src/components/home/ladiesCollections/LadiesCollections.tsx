"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Link2OffIcon } from "lucide-react";
import Link from "next/link"; // Import the Next.js Link component

import { cn } from "@/lib/utils";
import CustomHeader from "@/components/shared/customHeader/CustomHeader";
import CommonButton from "@/components/shared/commonButton/CommonButton";
import { ProductCarousel } from "@/components/shared/productCarousel/ProductCarousel";

const LadiesCollections = () => {
  return (
    <div className="container mx-auto my-5">
      <CustomHeader title="Ladies Collection" />
      <div className="flex justify-center items-center mt-5">
        <ProductCarousel category="women" />
      </div>

      <div className="flex justify-center items-center mt-5">
        <CommonButton title="Shop All" href="/shop" />
      </div>
    </div>
  );
};

export default LadiesCollections;
