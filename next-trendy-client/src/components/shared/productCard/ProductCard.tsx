import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MyDialog from "@/components/shadcn/MyDialog";
import ProductSizes from "./ProductSizes";
import QuickViewProduct from "../quickViewProduct/QuickViewProduct";
import { TProduct } from "@/types/product.type";
import assets from "@/app/assets";
import { cn } from "@/lib/utils";
import { truncateTitle } from "@/utils/truncateTitle";
import { formateMoney } from "@/utils/formateMoney";

const ProductCard = ({ product }: { product: TProduct }) => {
  const router = useRouter();
  const shortTitle = truncateTitle(product?.name ?? "", 20);

  // const handleDetails = (e: React.MouseEvent) => {
  //   e.stopPropagation(); // Prevents event propagation to avoid conflicts
  //   router.push(`product/details/${product?.name}`);
  // };

    const handleDetails = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevents event propagation to avoid conflicts

      if (product?.name) {
        // Replace spaces with hyphens for the URL
        const formattedProductName = product.name.replace(/\s+/g, "-");

        // Navigate to the product details page
        router.push(`/product/details/${formattedProductName}`);
      }
    };

  const handleQuickView = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevents triggering onClick for the card
  };

  const discount = product?.discount ?? 0; // Default to 0 if discount is undefined
  const originalPrice = Math.round(product?.price ?? 0); // Rounded original price, default to 0
  const discountedPrice = Math.round(
    originalPrice - (originalPrice * discount) / 100
  ); // Rounded discounted price

  // Safely access the first available image from the variant if exists
  const firstVariantImage =
    product?.variant?.[0]?.variant?.[0]?.image || "/image";

  // Ensure the variant is an array and not undefined
  const sizeStockColor = Array.isArray(product?.variant)
    ? product?.variant
    : []; // Default to empty array if variant is undefined

  return (
    <Card
      onClick={handleDetails}
      className={cn(
        "group mx-auto w-72 transform overflow-hidden hover:cursor-pointer rounded-t-sm shadow-md"
      )}
    >
      <div className="relative w-full overflow-hidden group">
        <Image
          src={firstVariantImage}
          alt="Product Image"
          width={400}
          height={300}
          layout="responsive"
          className="object-cover object-center transition-transform duration-500 ease-in-out transform group-hover:scale-110"
        />
        {discount > 0 && (
          <div className="absolute top-2 -left-0 bg-[#2b2b2c] h-12 w-12 flex justify-center items-center rounded-full text-white text-xs font-bold text-[17px]">
            -{Math.round(discount)}%
          </div>
        )}

        <div className="absolute hidden top-20 inset-0 group-hover:flex items-center justify-center transition-all duration-500 ease-in-out">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  src={assets.images.addShoppingBag}
                  alt="Add to Shopping Bag"
                  width={40}
                  height={40}
                  className="hover:scale-110 transition-all duration-300"
                  onClick={handleDetails}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the item</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div onClick={handleQuickView}>
            <MyDialog
              triggerButton={<Button className="ml-4">Quick View</Button>}
            >
              <QuickViewProduct product={product} />
            </MyDialog>
          </div>
        </div>
      </div>

      <div className="p-1">
        <h2 className="text-md font-medium text-gray-700 capitalize mb-1">
          {shortTitle}
        </h2>
        <div>
          {/* Pass size variant information to the ProductSizes component */}
          <ProductSizes sizeStockColor={sizeStockColor} />
        </div>
        <div className="my-1">
          {discount === 0 ? (
            <p className="text-primary text-[18px] font-semibold">
              Price: {formateMoney(originalPrice)}
            </p>
          ) : (
            <div className="flex gap-3 items-center">
              <h5 className="text-primary text-[18px] font-semibold">
                {formateMoney(discountedPrice)}
              </h5>
              <h5 className="text-gray-600 text-[20px] font-semibold line-through">
                {formateMoney(originalPrice)}
              </h5>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
