

// // 'use client'
// // import React, { useState } from "react";
// // import { toast } from "react-toastify"; // Assuming you're using react-toastify for toasts
// // import { Button } from "@/components/ui/button"; // Button component
// // import { useParams } from "next/navigation";
// // import { useGetSingleProductQuery } from "@/redux/api/features/product/productApi";
// // import CustomLoader from "../customLoader/CustomLoader";
// // import ImageSlide from "./Imageslide";
// // import { formateMoney } from "@/utils/formateMoney";
// // import { Card } from "@/components/ui/card";
// // import { cn } from "@/lib/utils";
// // import { Separator } from "@/components/ui/separator";
// // import {
// //   Breadcrumb,
// //   BreadcrumbItem,
// //   BreadcrumbLink,
// //   BreadcrumbList,
// //   BreadcrumbPage,
// //   BreadcrumbSeparator,
// // } from "@/components/ui/breadcrumb";
// // import { Plus, Slash } from "lucide-react";

// // const ProductDetails = () => {
// //   const params = useParams();
// //   const id = params.productId;

// //   const { data, isLoading } = useGetSingleProductQuery(id);
// //   const [selectedSize, setSelectedSize] = useState("");
// //   const [selectedColor, setSelectedColor] = useState("");
// //   const [quantity, setQuantity] = useState(1); // Default quantity is 1

// //   if (isLoading) {
// //     return <CustomLoader />;
// //   }

// //   const availableSizes = data[0]?.sizeStockColor?.filter((sizeItem) =>
// //     sizeItem.colorsStock.some((colorItem) => colorItem.quantity > 0)
// //   );

// //   const selectedStock = data[0]?.sizeStockColor
// //     .find((sizeItem) => sizeItem.size === selectedSize)
// //     ?.colorsStock.find((colorItem) => colorItem.color === selectedColor);

// //   const maxQuantity = selectedStock?.quantity || 0;

// //   const handleAddToCart = () => {
// //     if (quantity > maxQuantity) {
// //       toast.warning("Selected quantity exceeds available stock.");
// //     } else {
// //       // Handle adding to cart logic here
// //       toast.success("Item added to cart successfully!");
// //     }
// //   };

// //   return (
// //     <div className="w-full">
// //       <div className="container mx-auto">
// //         <div className="mt-3">
// //           <Breadcrumb>
// //             <BreadcrumbList>
// //               <BreadcrumbItem>
// //                 <BreadcrumbLink href="/">Home</BreadcrumbLink>
// //               </BreadcrumbItem>
// //               <BreadcrumbSeparator>
// //                 <Slash />
// //               </BreadcrumbSeparator>
// //               <BreadcrumbItem>
// //                 <BreadcrumbPage>product</BreadcrumbPage>
// //               </BreadcrumbItem>
// //               <BreadcrumbSeparator>
// //                 <Slash />
// //               </BreadcrumbSeparator>
// //               <BreadcrumbItem>
// //                 <BreadcrumbPage>Details</BreadcrumbPage>
// //               </BreadcrumbItem>
// //               <BreadcrumbSeparator>
// //                 <Slash />
// //               </BreadcrumbSeparator>
// //               <BreadcrumbItem>
// //                 <BreadcrumbPage>{data[0]?.name}</BreadcrumbPage>
// //               </BreadcrumbItem>
// //             </BreadcrumbList>
// //           </Breadcrumb>
// //         </div>

// //         <div className="md:flex md:justify-center md:items-center md:gap-2 space-x-5 rounded mt-10">
// //           <div className="md:max-w-[40%] bg-white pl-20 md:lg:pl:0 md:lg:p:0">
// //             <ImageSlide images={data[0]?.images} />
// //           </div>
// //           <Card className={cn("max-w-[90%] md:max-w-[60%]")}>
// //             <div className="py-5 flex justify-evenly items-center">
// //               <h4 className="text-lg text-balance md:text-xl text-center font-semibold text-primary capitalize mb-0">
// //                 {data[0]?.name}
// //               </h4>
// //             </div>
// //             <Separator />
// //             <div className="flex justify-between items-center px-10 py-1">
// //               <p className="text-gray-600 font-semibold text-md">Price</p>
// //               <p className="text-end text-balance text-md font-semibold text-gray-500">
// //                 {formateMoney(data[0]?.price)}
// //               </p>
// //             </div>
// //             <Separator />
// //             <div className="flex justify-between items-center px-10 py-1">
// //               <p className="text-gray-600 font-semibold text-md">Discount</p>
// //               <p className="text-end text-balance text-md font-semibold text-red-500">
// //                 -{data[0]?.discount}%
// //               </p>
// //             </div>
// //             <Separator />
// //             {data[0]?.discount > 0 && (
// //               <div className="flex justify-between items-center px-10 py-1">
// //                 <p className="text-gray-600 font-semibold text-md">
// //                   Save Amount
// //                 </p>
// //                 <p className="text-end text-balance text-md font-semibold text-red-500">
// //                   {formateMoney(
// //                     Math.round(
// //                       data[0]?.price -
// //                         (data[0]?.price -
// //                           (data[0]?.price * data[0]?.discount) / 100)
// //                     )
// //                   )}
// //                 </p>
// //               </div>
// //             )}
// //             <Separator />
// //             <div className="flex justify-between items-center px-10 py-1">
// //               <p className="text-gray-600 font-semibold text-md">Net Price</p>
// //               <p className="text-end text-balance text-md font-semibold text-red-500">
// //                 {formateMoney(
// //                   Math.round(
// //                     data[0]?.price - (data[0]?.price * data[0]?.discount) / 100
// //                   )
// //                 )}
// //               </p>
// //             </div>

// //             <Separator />
// //             <div className="flex justify-between items-center px-10 py-1">
// //               <p className="text-gray-600 font-semibold text-md">Category</p>
// //               <p className="text-end text-balance text-md font-semibold text-gray-500 capitalize">
// //                 {data[0]?.category}
// //               </p>
// //             </div>
// //             <Separator />
// //             <div className="flex justify-between items-center px-10 py-1">
// //               <p className="text-gray-600 font-semibold text-md">
// //                 Sub Category
// //               </p>
// //               <p className="text-end text-balance text-md font-semibold text-gray-500 capitalize">
// //                 {data[0]?.subCategory}
// //               </p>
// //             </div>
// //             <Separator />
// //             <div className="flex justify-between items-center px-10 py-1">
// //               <p className="text-gray-600 font-semibold text-md">Tag:</p>
// //               <p className="text-end text-balance text-sm text-gray-500">
// //                 {data[0]?.tag}
// //               </p>
// //             </div>
// //             <Separator />

// //             <div className="p-4">
// //               <p className="text-[20px] font-semibold text-primary text-center mb-4">
// //                 Select Size and Color
// //               </p>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <p className="text-gray-600 font-semibold mb-2">
// //                     Available Sizes:
// //                   </p>
// //                   <div className="flex flex-wrap gap-2">
// //                     {availableSizes?.map((sizeItem) => (
// //                       <Button
// //                         key={sizeItem.size}
// //                         variant={
// //                           selectedSize === sizeItem.size ? "primary" : "outline"
// //                         }
// //                         onClick={() => {
// //                           setSelectedSize(sizeItem.size);
// //                           setSelectedColor(""); // Reset color when size is changed
// //                           setQuantity(1); // Reset quantity when size is changed
// //                         }}
// //                         disabled={
// //                           !sizeItem.colorsStock.some(
// //                             (colorItem) => colorItem.quantity > 0
// //                           )
// //                         }
// //                         className={cn(
// //                           "px-3 py-1 rounded",
// //                           selectedSize === sizeItem.size
// //                             ? "bg-primary text-white"
// //                             : "bg-gray-200 text-gray-600"
// //                         )}
// //                       >
// //                         {sizeItem.size}
// //                       </Button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <p className="text-gray-600 font-semibold mb-2">
// //                     Available Colors:
// //                   </p>
// //                   <div className="flex flex-wrap gap-2">
// //                     {data[0]?.sizeStockColor
// //                       .find((sizeItem) => sizeItem.size === selectedSize)
// //                       ?.colorsStock.map((colorItem) => (
// //                         <Button
// //                           key={colorItem.color}
// //                           variant={
// //                             selectedColor === colorItem.color
// //                               ? "primary"
// //                               : "outline"
// //                           }
// //                           onClick={() => {
// //                             setSelectedColor(colorItem.color);
// //                             setQuantity(1); // Reset quantity when color is changed
// //                           }}
// //                           disabled={colorItem.quantity === 0}
// //                           className={cn(
// //                             "px-3 py-3 rounded-full",
// //                             selectedColor === colorItem.color
// //                               ? "bg-primary text-white"
// //                               : "bg-gray-200 text-gray-600",
// //                             colorItem.quantity === 0 &&
// //                               "line-through opacity-50 cursor-not-allowed"
// //                           )}
// //                         >
// //                           {colorItem.color}
// //                         </Button>
// //                       ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Quantity and Add to Cart */}
// //             {selectedSize && selectedColor && (
// //               <div className="flex justify-between items-center px-10 py-2">
// //                 <div className="flex items-center">
// //                   <Button
// //                     variant="outline"
// //                     onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
// //                     disabled={quantity <= 1}
// //                   >
// //                     -
// //                   </Button>
// //                   <span className="px-4">{quantity}</span>
// //                   <Button
// //                     variant="outline"
// //                     onClick={() =>
// //                       setQuantity((prev) => Math.min(prev + 1, maxQuantity))
// //                     }
// //                     disabled={quantity >= maxQuantity}
// //                   >
// //                     +
// //                   </Button>
// //                 </div>

// //                 <Button
// //                   variant="primary"
// //                   onClick={handleAddToCart}
// //                   disabled={quantity > maxQuantity || maxQuantity === 0}
// //                 >
// //                   Add to Cart
// //                 </Button>
// //               </div>
// //             )}
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetails;

'use client'
import React, { useState } from "react";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for toasts
import { Button } from "@/components/ui/button"; // Button component
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

const ProductDetails = () => {
  const params = useParams();
  const id = params.productId;

  const { data, isLoading } = useGetSingleProductQuery(id);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  if (isLoading) {
    return <CustomLoader />;
  }

  const availableSizes = data[0]?.sizeStockColor?.filter((sizeItem) =>
    sizeItem.colorsStock.some((colorItem) => colorItem.quantity > 0)
  );

  const selectedStock = data[0]?.sizeStockColor
    .find((sizeItem) => sizeItem.size === selectedSize)
    ?.colorsStock.find((colorItem) => colorItem.color === selectedColor);

  const maxQuantity = selectedStock?.quantity || 0;

  const handleAddToCart = () => {
    if (quantity > maxQuantity) {
      toast.warning("Selected quantity exceeds available stock.");
    } else {
      // Handle adding to cart logic here
      toast.success("Item added to cart successfully!");
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
                <BreadcrumbPage>{data[0]?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="md:flex md:justify-center md:items-center md:gap-2 space-x-5 rounded mt-10">
          <div className="md:max-w-[40%] bg-white pl-20 md:lg:pl:0 md:lg:p:0">
            <ImageSlide images={data[0]?.images} />
          </div>
          <Card className={cn("max-w-[90%] md:max-w-[60%]")}>
            <div className="py-5 flex justify-evenly items-center">
              <h4 className="text-lg text-balance md:text-xl text-center font-semibold text-primary capitalize mb-0">
                {data[0]?.name}
              </h4>
            </div>
            <Separator />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-md">Price</p>
              <p className="text-end text-balance text-md font-semibold text-gray-500">
                {formateMoney(data[0]?.price)}
              </p>
            </div>
            <Separator />
            {data[0]?.discount > 0 && (
              <div className="flex justify-between items-center px-10 py-1">
                <p className="text-gray-600 font-semibold text-md">Discount</p>
                <p className="text-end text-balance text-md font-semibold text-red-500">
                  -{data[0]?.discount}%
                </p>
              </div>
            )}
            {data[0]?.discount > 0 && (
              <div className="flex justify-between items-center px-10 py-1">
                <p className="text-gray-600 font-semibold text-md">
                  Save Amount
                </p>
                <p className="text-end text-balance text-md font-semibold text-red-500">
                  {formateMoney(
                    Math.round(
                      data[0]?.price -
                        (data[0]?.price -
                          (data[0]?.price * data[0]?.discount) / 100)
                    )
                  )}
                </p>
              </div>
            )}
            <Separator />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-md">Net Price</p>
              <p className="text-end text-balance text-md font-semibold text-red-500">
                {formateMoney(
                  Math.round(
                    data[0]?.price - (data[0]?.price * data[0]?.discount) / 100
                  )
                )}
              </p>
            </div>
            <Separator />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-md">Category</p>
              <p className="text-end text-balance text-md font-semibold text-gray-500 capitalize">
                {data[0]?.category}
              </p>
            </div>
            <Separator />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-md">
                Sub Category
              </p>
              <p className="text-end text-balance text-md font-semibold text-gray-500 capitalize">
                {data[0]?.subCategory}
              </p>
            </div>
            <Separator />
            <div className="flex justify-between items-center px-10 py-1">
              <p className="text-gray-600 font-semibold text-md">Tag:</p>
              <p className="text-end text-balance text-sm text-gray-500">
                {data[0]?.tag}
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
                    {availableSizes?.map((sizeItem) => (
                      <Button
                        key={sizeItem.size}
                        variant={
                          selectedSize === sizeItem.size ? "primary" : "outline"
                        }
                        onClick={() => {
                          setSelectedSize(sizeItem.size);
                          setSelectedColor(""); // Reset color when size is changed
                          setQuantity(1); // Reset quantity when size is changed
                        }}
                        disabled={
                          !sizeItem.colorsStock.some(
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
                    {data[0]?.sizeStockColor
                      .find((sizeItem) => sizeItem.size === selectedSize)
                      ?.colorsStock.map((colorItem) => (
                        <Button
                          key={colorItem.color}
                          variant={
                            selectedColor === colorItem.color
                              ? "primary"
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
                              : "bg-gray-200 text-gray-600",
                            colorItem.quantity === 0 &&
                              "line-through opacity-50 cursor-not-allowed"
                          )}
                        >
                          {colorItem.color}
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between w-48">
                <Button
                  variant="outline"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2"
                >
                  <Minus />
                </Button>
                <span className="text-lg font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  onClick={() =>
                    setQuantity((prev) => Math.min(prev + 1, maxQuantity))
                  }
                  className="px-4 py-2"
                >
                  <Plus />
                </Button>
              </div>

              <Button
               
                onClick={handleAddToCart}
                className="w-full py-3"
                disabled={
                  !selectedSize ||
                  !selectedColor ||
                  quantity <= 0 ||
                  quantity > maxQuantity
                }
              >
                Add to Cart
              </Button>
            </div>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
