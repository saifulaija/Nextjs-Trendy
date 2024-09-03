import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import { formateMoney } from "@/utils/formateMoney";
import Link from "next/link";
import React from "react";
import ReactImageMagnify from "react-image-magnify";

const QuickViewProduct = ({ product }: { product: TProduct }) => {
  const discount = product?.discount || 0;
  const originalPrice = product?.price || 0;
  const discountedPrice = originalPrice - (originalPrice * discount) / 100;

  return (
    <Card className="flex flex-col md:flex-row items-start md:items-center relative m-2">
      {/* Product Image with Magnification */}
      <div className="relative w-full md:w-auto">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,

              src: product?.images?.[0] || "/placeholder-image.png",
            },
            largeImage: {
              src: product?.images?.[0] || "/placeholder-image.png",
              width: 500,
              height: 500,
            },
            enlargedImagePosition: "over",
            lensStyle:{backgroundColor:'white'}
          }}
        />
      </div>

      {/* Product Details */}
      <div className="mt-4 md:mt-0 flex flex-col justify-between w-full">
        <div className="py-5 flex justify-evenly items-center">
          <h4 className="text-lg md:text-xl text-center font-semibold text-primary capitalize mb-0">
            {product?.name || "Product Name"}
          </h4>
        </div>

        <Separator />

        <div className="flex justify-between items-center px-10 py-1">
          <p className="text-gray-600 font-semibold text-md">Price</p>
          <p className="text-end text-md font-semibold text-gray-500">
            {formateMoney(originalPrice)}
          </p>
        </div>

        {discount > 0 && (
          <>
            <Separator />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-md">Discount</p>
              <p className="text-end text-md font-semibold text-red-500">
                -{discount}%
              </p>
            </div>
            <Separator />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-md">Save Amount</p>
              <p className="text-end text-md font-semibold text-red-500">
                {formateMoney(originalPrice - discountedPrice)}
              </p>
            </div>
            <Separator />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-md">Net Price</p>
              <p className="text-end text-md font-semibold text-red-500">
                {formateMoney(discountedPrice)}
              </p>
            </div>
          </>
        )}

        <Separator />

        <div className="flex justify-between items-center px-10 py-1">
          <p className="text-gray-600 font-semibold text-md">Category</p>
          <p className="text-end text-md font-semibold text-gray-500 capitalize">
            {product?.category || "Category"}
          </p>
        </div>

        <Separator />

        <div className="flex justify-between items-center px-10 py-1">
          <p className="text-gray-600 font-semibold text-md">Sub Category</p>
          <p className="text-end text-md font-semibold text-gray-500 capitalize">
            {product?.subCategory || "Sub Category"}
          </p>
        </div>

        <Separator />

        <div className="flex justify-between items-center px-10 py-1">
          <p className="text-gray-600 font-semibold text-md">Tag:</p>
          <p className="text-end text-sm text-gray-500">
            {product?.tag || "Tag"}
          </p>
        </div>

        <Separator />

        {/* Order Now Button */}
        <Link
          href={`product/details/${product?._id}`}
          className={cn(buttonVariants(), "mt-4 md:mt-20 rounded-none")}
        >
          Order Now
        </Link>
      </div>
    </Card>
  );
};

export default QuickViewProduct;
