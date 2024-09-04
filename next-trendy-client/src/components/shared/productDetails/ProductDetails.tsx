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
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Minus, Plus, Slash } from "lucide-react";
import { VariantItem } from "@/types/varient.type";

import { useAppDispatch } from "@/redux/hooks";
import { addToCart, getTotals } from "@/redux/api/features/product/cartSlice";

const ProductDetails = () => {
  const params = useParams();
  const id = params.productId;

  const { data, isLoading } = useGetSingleProductQuery(id);
  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  if (isLoading) {
    return <CustomLoader />;
  }

  const product = data?.[0];

  const availableSizes = (product?.variant as VariantItem[]).filter(
    (sizeItem) => sizeItem.variant.some((colorItem) => colorItem.quantity > 0)
  );

  const images = (product?.variant as VariantItem[]).flatMap(
    (sizeItem) => sizeItem.variant.map((colorItem) => colorItem.image) || []
  );

  const selectedStock = (product?.variant as VariantItem[])
    .find((sizeItem) => sizeItem.size === selectedSize)
    ?.variant.find((colorItem) => colorItem.color === selectedColor);

  const maxQuantity = selectedStock?.quantity || 0;

  const handleAddToCart = () => {
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
      // toast.success("Item added to cart successfully!");
    }
  };

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
                <BreadcrumbPage>Product</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Details</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{product?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="md:flex md:justify-center md:items-center md:gap-2 space-x-5 rounded mt-10">
          <div className="md:max-w-[40%] bg-white pl-20 md:lg:pl:0 md:lg:p:0">
            <ImageSlide images={images} />
          </div>
          <Card className={cn("max-w-[90%] md:max-w-[60%] w-full")}>
            <div className="py-5 flex justify-evenly items-center">
              <h4 className="text-lg text-balance md:text-xl text-center font-semibold text-primary capitalize mb-0">
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
                    product?.price - (product?.price * product?.discount) / 100
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
              <p className="text-end text-balance text-sm text-gray-500">
                {product?.tag}
              </p>
            </div>
            <Separator />

            <div className="p-4">
              <p className="text-[20px] font-semibold text-primary text-center mb-4">
                Select Size and Color
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 font-semibold mb-2">
                    Select Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(availableSizes as VariantItem[]).map((sizeItem) => (
                      <Button
                        key={sizeItem.size}
                        variant={
                          selectedSize === sizeItem.size ? "outline" : "outline"
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
                <Button
                  variant="default"
                  className="mt-4 w-full"
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
