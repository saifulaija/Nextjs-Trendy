// "use client";

// import assets from "@/app/assets";
// import MyDialog from "@/components/shadcn/MyDialog";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { truncateTitle } from "@/utils/truncateTitle";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React from "react";
// import QuickViewProduct from "../quickViewProduct/QuickViewProduct";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { TProduct } from "@/types/product.type";
// import { formateMoney } from "@/utils/formateMoney";
// import ProductSizes from "./ProductSizes";

// const ProductCard = ({ product }: { product: TProduct }) => {
//   console.log(product);
  
//   const router = useRouter();
//   const shortTitle = truncateTitle(product?.name, 20);

//   const handleDetails = (e: any) => {
//     // Prevent click event propagation to avoid conflicts with the modal
//     e.stopPropagation();
//     router.push(`product/details/${product?._id}`);

   
//   };

//   const handleQuickView = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     // Prevent click event propagation to avoid triggering the onClick for the card
//     e.stopPropagation();
//   };

//   const discount = product?.discount ?? 0; // Use 0 if discount is undefined
//   const originalPrice = Math.round(product?.price); // Round the original price
//   const discountedPrice = Math.round(
//     originalPrice - (originalPrice * discount) / 100
//   ); // Round the discounted price

//    const sizeElements = product.sizeStockColor.map((sizeStock) => {
//      const hasStock = sizeStock.colorsStock.some(
//        (colorStock) => colorStock.quantity > 0
//      );
//      return (
//        <span
//          key={sizeStock.size}
//          className={cn(
//            "ml-2",
//            hasStock ? "text-gray-700" : "text-gray-400 line-through"
//          )}
//        >
//          {sizeStock.size}
//        </span>
//      );
//    });

//   return (
//     <Card
//       onClick={handleDetails}
//       className={cn(
//         "group mx-auto w-72 transform overflow-hidden hover:cursor-pointer rounded-lg shadow-md"
//       )}
//     >
//       <div className="relative w-full overflow-hidden group">
//         <Image
//           className="object-cover object-center transition-transform duration-500 ease-in-out transform group-hover:scale-110"
//           src={product?.images[0]}
//           alt="Product Image"
//           width={400}
//           height={300}
//           layout="responsive"
//         />
//         {discount > 0 && (
//           <div className="absolute top-2 -mr-2 flex justify-center items-center left-2 bg-primary h-12 w-12 text-white text-xs font-bold text-[17px] px-2 py-1 rounded-full">
//             -{Math.round(discount)}%
//           </div>
//         )}

//         <div className="absolute hidden top-20 inset-0 group-hover:flex items-center justify-center transition-all duration-500 ease-in-out">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Image
//                   src={product?.variant[0].image || '/image'}
//                   alt="add-shopping"
//                   width={40}
//                   height={40}
//                   className="hover:scale-110 transition-all duration-300"
//                   onClick={handleDetails}
//                 />
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Select the item</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>

//           <div onClick={handleQuickView}>
//             <MyDialog
//               triggerButton={<Button className="ml-4">Quick View</Button>}
//             >
//               <QuickViewProduct product={product} />
//             </MyDialog>
//           </div>
//         </div>
//       </div>

//       <div className="p-1">
//         <h2 className="text-md font-medium text-gray-700 capitalize mb-1">
//           {shortTitle}
//         </h2>
//         <div>
//           <ProductSizes sizeStockColor={product.sizeStockColor} />
//         </div>
//         <div className="my-1">
//           {discount === 0 ? (
//             <p className="text-primary text-[18px] font-semibold">
//               Price: {formateMoney(originalPrice)}
//             </p>
//           ) : (
//             <div className="flex gap-3 items-center">
//               <h5 className="text-primary text-[18px] font-semibold">
//                 {formateMoney(discountedPrice)}
//               </h5>
//               <h5 className="text-gray-600 text-[20px] font-semibold line-through">
//                 {formateMoney(originalPrice)}
//               </h5>
//             </div>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default ProductCard;

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

  const handleDetails = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents event propagation to avoid conflicts
    router.push(`product/details/${product?._id}`);
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

  // Ensure product.variant is an array and map over it safely
  // const sizeElements = Array.isArray(product.variant)
  //   ? product.variant.map((sizeVariant) => {
  //       const hasStock =
  //         Array.isArray(sizeVariant.variant) &&
  //         sizeVariant.variant.some((colorVariant) => colorVariant.quantity > 0);
  //       return (
  //         <span
  //           key={sizeVariant.size}
  //           className={cn(
  //             "ml-2",
  //             hasStock ? "text-gray-700" : "text-gray-400 line-through"
  //           )}
  //         >
  //           {sizeVariant.size}
  //         </span>
  //       );
  //     })
  //   : null;

  return (
    <Card
      onClick={handleDetails}
      className={cn(
        "group mx-auto w-72 transform overflow-hidden hover:cursor-pointer rounded-lg shadow-md"
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
          <div className="absolute top-2 left-2 bg-primary h-12 w-12 flex justify-center items-center rounded-full text-white text-xs font-bold text-[17px]">
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
          <ProductSizes sizeStockColor={product.variant} />
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
