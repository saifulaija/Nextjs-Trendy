

"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/redux/api/features/product/productApi";
import CustomLoader from "../customLoader/CustomLoader";
import ImageSlide from "./Imageslide";
import { formateMoney } from "@/utils/formateMoney";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Loader2, Minus, Plus, Slash } from "lucide-react";
import { VariantItem } from "@/types/varient.type";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart, getTotals } from "@/redux/api/features/product/cartSlice";
import ProductTabs from "./ProductTabs";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";

// Helper function to render stars
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating ? (
        <FaStar key={i} className="text-primary w-4 h-4" />
      ) : (
        <FaRegStar key={i} className="text-gray-300 w-4 h-4" />
      )
    );
  }
  return stars;
};

const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.productId;

  const { data: product, isLoading } = useGetSingleProductQuery(id);
  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const availableSizes = (product?.variant as VariantItem[])?.filter(
    (sizeItem) => sizeItem.variant.some((colorItem) => colorItem.quantity > 0)
  );

  const images = (product?.variant as VariantItem[])?.flatMap(
    (sizeItem) => sizeItem?.variant?.map((colorItem) => colorItem?.image) || []
  );

  const selectedStock = product?.variant
    ?.find(({ size }: VariantItem) => size === selectedSize)
    ?.variant.find(({ color }: { color: string }) => color === selectedColor);

  const maxQuantity = selectedStock?.quantity || 0;

  const handleAddToCart = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (quantity > maxQuantity) {
      toast.warning("Selected quantity exceeds available stock.");
    } else {
      const item = {
        _id: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        size: selectedSize,
        color: selectedColor,
        cartQuantity: quantity,
        image: images[0], // Assuming the first image for simplicity
      };
      dispatch(addToCart(item));
      dispatch(getTotals());
      setLoading(false);
    }
  };

  if (isLoading) {
    return <CustomLoader />;
  }

  const averageRating = product?.averageRating ?? 0;

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="mt-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Product</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Details</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{product?.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-col md:flex-row md:gap-10 mt-10">
          {/* Image Slide */}
          <div className="md:w-1/2 bg-white">
            <ImageSlide images={images} />
          </div>

          {/* Product Card */}
          <div className="md:w-1/2">
            <Card className={cn("w-full")}>
              <div className="py-5 flex items-center justify-center gap-3">
                <div className="flex items-center">
                  {averageRating > 0 ? (
                    renderStars(averageRating)
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No ratings yet
                    </span>
                  )}
                  <span className="ml-2 text-sm text-gray-600">
                    {averageRating > 0 && `(${averageRating.toFixed(1)})`}
                  </span>
                </div>
                <h4 className="text-lg md:text-xl font-semibold text-primary capitalize mb-0">
                  {product?.name}
                </h4>
              </div>
              <Separator />
              <div className="flex justify-between items-center px-10 py-1">
                <p className="text-gray-600 font-semibold text-md">Price</p>
                <p className="text-end text-balance text-md font-semibold text-gray-500">
                  {formateMoney(product?.price)}
                </p>
              </div>
              <Separator />
              {product?.discount > 0 && (
                <>
                  <div className="flex justify-between items-center px-10 py-1">
                    <p className="text-gray-600 font-semibold text-md">
                      Discount
                    </p>
                    <p className="text-end text-balance text-md font-semibold text-red-500">
                      -{product?.discount}%
                    </p>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center px-10 py-1">
                    <p className="text-gray-600 font-semibold text-md">
                      Save Amount
                    </p>
                    <p className="text-end text-balance text-md font-semibold text-red-500">
                      {formateMoney(
                        Math.round(
                          product?.price -
                            (product?.price -
                              (product?.price * product?.discount) / 100)
                        )
                      )}
                    </p>
                  </div>
                  <Separator />
                </>
              )}
              <div className="flex justify-between items-center px-10 py-1">
                <p className="text-gray-600 font-semibold text-md">Net Price</p>
                <p className="text-end text-balance text-md font-semibold text-red-500">
                  {formateMoney(
                    Math.round(
                      product?.price -
                        (product?.price * product?.discount) / 100
                    )
                  )}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between items-center px-10 py-1">
                <p className="text-gray-600 font-semibold text-md">Category</p>
                <p className="text-end text-balance text-md font-semibold text-gray-500 capitalize">
                  {product?.category}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between items-center px-10 py-1">
                <p className="text-gray-600 font-semibold text-md">
                  Sub Category
                </p>
                <p className="text-end text-balance text-md font-semibold text-gray-500 capitalize">
                  {product?.subCategory}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between items-center px-10 py-1">
                <p className="text-gray-600 font-semibold text-md">Tag:</p>
                {/* <div className="text-end text-balance text-sm text-gray-500 flex items-center gap-2">
                  {product?.tags?.map((item: any, index: number) => (
                    <Link
                      href={`/product-tag/${item}`}
                      className={cn("hover:text-primary hover:underline")}
                      key={index}
                    >
                      {item}
                    </Link>
                  ))}
                </div> */}
                <div className="text-end text-balance text-sm text-gray-500 flex items-center gap-2">
                  {product?.tags?.map((item: any, index: number) => (
                    <Link
                      href={`/product-tag/${item.replace(/\s+/g, "-")}`} // Replace spaces with hyphens
                      className="hover:text-primary hover:underline"
                      key={index}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
              <Separator />

              <div className="p-4">
                <p className="text-[20px] font-semibold text-primary text-center mb-4">
                  Select Size and Color
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">
                      Available Sizes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes?.map((sizeItem) => (
                        <Button
                          key={sizeItem.size}
                          variant={
                            selectedSize === sizeItem.size
                              ? "outline"
                              : "outline"
                          }
                          onClick={() => {
                            setSelectedSize(sizeItem.size);
                            setSelectedColor(""); // Reset color when size is changed
                            setQuantity(1); // Reset quantity when size is changed
                          }}
                          disabled={
                            !sizeItem.variant.some(
                              (colorItem) => colorItem.quantity > 0
                            )
                          }
                          className={cn(
                            "px-3 py-1 rounded",
                            selectedSize === sizeItem.size
                              ? "bg-primary text-white"
                              : "bg-gray-200 text-gray-600"
                          )}
                        >
                          {sizeItem.size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 font-semibold mb-2">
                      Available Colors:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(product?.variant as VariantItem[])
                        .find((sizeItem) => sizeItem.size === selectedSize)
                        ?.variant.map((colorItem) => (
                          <Button
                            key={colorItem.color}
                            variant={
                              selectedColor === colorItem.color
                                ? "outline"
                                : "outline"
                            }
                            onClick={() => {
                              setSelectedColor(colorItem.color);
                              setQuantity(1); // Reset quantity when color is changed
                            }}
                            disabled={colorItem.quantity === 0}
                            className={cn(
                              "px-3 py-3 rounded-full",
                              selectedColor === colorItem.color
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-600"
                            )}
                          >
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full",
                                colorItem.color
                              )}
                              style={{ backgroundColor: colorItem.color }}
                            />
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setQuantity((prevQuantity) =>
                          prevQuantity > 1 ? prevQuantity - 1 : 1
                        )
                      }
                      disabled={quantity === 1}
                    >
                      <Minus />
                    </Button>
                    <span className="mx-4">{quantity}</span>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setQuantity((prevQuantity) =>
                          prevQuantity < maxQuantity
                            ? prevQuantity + 1
                            : maxQuantity
                        )
                      }
                      disabled={quantity === maxQuantity}
                    >
                      <Plus />
                    </Button>
                  </div>
                  <p className="px-7 mt-4 prose text-balance text-start">
                    সারাদেশে ২-৫ দিনে হোম-ডেলিভারি। একসাথে যত খুশি পণ্য অর্ডার
                    করুন, ডেলিভারি চার্জ একই থাকবে । প্রয়োজনে কল করুনঃ
                    <span className="font-semibold">+8801821117913</span>
                  </p>
                  <Button
                    className="mt-4 w-full"
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !selectedColor || loading}
                  >
                    <span className="flex items-center gap-1">
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" />
                          <span>Please wait...</span>
                        </>
                      ) : (
                        <>
                          <span className="uppercase">Add to Cart</span>
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <ProductTabs product={product} />
      </div>
    </div>
  );
};

export default ProductDetails;
