"use client";

import ProductCard from "@/components/shared/productCard/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllProductsQuery } from "@/redux/api/features/product/productApi";
import React, { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import CustomLoader from "@/components/shared/customLoader/CustomLoader";
import { cn } from "@/lib/utils";

export function BestSellingCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 7000 }));

  const { data, isLoading } = useGetAllProductsQuery({
    sort: "-price",
  });

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ align: "start", loop: true }}
      className="w-full max-w-sm md:max-w-7xl"
    >
      <CarouselContent>
        {data?.Products?.map((product: any, index: number) => (
          <CarouselItem
            key={index}
            className="pl-2 basis-1/1 md:basis-1/2 lg:basis-1/4"
            // className="pl-2 basis-1/2 md:basis-1/2 lg:basis-1/2"
          >
            <div className="">
              <ProductCard product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={cn(
          "ml-10  bg-primary/50 font-bold transition-transform duration-300 ease-out transform text-white hover:bg-primary hover:text-white hover:scale-105"
        )}
      />
      <CarouselNext
        className={cn(
          "mr-10  bg-primary/50 font-bold transition-transform duration-300 ease-out transform text-white hover:bg-primary hover:text-white hover:scale-105"
        )}
      />
    </Carousel>
  );
}
