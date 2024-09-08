



// import { buttonVariants } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { TProduct } from "@/types/product.type";
// import { formateMoney } from "@/utils/formateMoney";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { Plus, Minus, RefreshCw } from "lucide-react"; // Professional icons

// const QuickViewProduct = ({ product }: { product: TProduct }) => {
//   const discount = product?.discount || 0;
//   const originalPrice = product?.price || 0;
//   const discountedPrice = originalPrice - (originalPrice * discount) / 100;
//   const firstVariantImage =
//     product?.variant?.[0]?.variant?.[0]?.image || "/images/default.jpg"; // Default image fallback

//   return (
//     <Card className="flex flex-col md:flex-row items-start md:items-center relative">
//       {/* Product Image with Magnification */}
//       <div className="relative w-full md:w-auto">
//         <TransformWrapper
//           initialScale={1}
//           wheel={{ disabled: false }} // Enable zoom on scroll
//           minScale={0.5} // Limit zoom out
//           maxScale={5} // Limit zoom in
//         >
//           {({ zoomIn, zoomOut, resetTransform }) => (
//             <>
//               {/* Zoom Controls */}
//               <div className="absolute top-2 right-2 z-10 flex space-x-2">
//                 <button
//                   onClick={() => zoomIn()}
//                   className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
//                 >
//                   <Plus size={18} />
//                 </button>
//                 <button
//                   onClick={() => zoomOut()}
//                   className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
//                 >
//                   <Minus size={18} />
//                 </button>
//                 <button
//                   onClick={() => resetTransform()}
//                   className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
//                 >
//                   <RefreshCw size={18} />
//                 </button>
//               </div>

//               <TransformComponent>
//                 <Image
//                   src={firstVariantImage}
//                   width={500}
//                   height={500}
//                   alt={product?.name || "Product Image"}
//                   className="object-cover rounded-md "
//                 />
//               </TransformComponent>
//             </>
//           )}
//         </TransformWrapper>
//       </div>

//       {/* Product Details */}
//       <div className="mt-4 md:mt-0 flex flex-col justify-between w-full">
//         <div className="py-5 flex justify-evenly items-center">
//           <h4 className="text-lg md:text-xl text-center font-semibold text-primary capitalize mb-0">
//             {product?.name || "Product Name"}
//           </h4>
//         </div>

//         <Separator />

//         <div className="flex justify-between items-center px-10 py-1">
//           <p className="text-gray-600 font-semibold text-md">Price</p>
//           <p className="text-end text-md font-semibold text-gray-500">
//             {formateMoney(originalPrice)}
//           </p>
//         </div>

//         {discount > 0 && (
//           <>
//             <Separator />
//             <div className="flex justify-between items-center px-10 py-1">
//               <p className="text-gray-600 font-semibold text-md">Discount</p>
//               <p className="text-end text-md font-semibold text-red-500">
//                 -{discount}%
//               </p>
//             </div>
//             <Separator />
//             <div className="flex justify-between items-center px-10 py-1">
//               <p className="text-gray-600 font-semibold text-md">Save Amount</p>
//               <p className="text-end text-md font-semibold text-red-500">
//                 {formateMoney(originalPrice - discountedPrice)}
//               </p>
//             </div>
//             <Separator />
//             <div className="flex justify-between items-center px-10 py-1">
//               <p className="text-gray-600 font-semibold text-md">Net Price</p>
//               <p className="text-end text-md font-semibold text-red-500">
//                 {formateMoney(discountedPrice)}
//               </p>
//             </div>
//           </>
//         )}

//         <Separator />

//         <div className="flex justify-between items-center px-10 py-1">
//           <p className="text-gray-600 font-semibold text-md">Category</p>
//           <p className="text-end text-md font-semibold text-gray-500 capitalize">
//             {product?.category || "Category"}
//           </p>
//         </div>

//         <Separator />

//         <div className="flex justify-between items-center px-10 py-1">
//           <p className="text-gray-600 font-semibold text-md">Sub Category</p>
//           <p className="text-end text-md font-semibold text-gray-500 capitalize">
//             {product?.subCategory || "Sub Category"}
//           </p>
//         </div>

//         <Separator />

//         <div className="flex justify-between items-center px-10 py-1">
//           <p className="text-gray-600 font-semibold text-md">Tag:</p>
//           <p className="text-end text-sm text-gray-500">
//             {product?.tag || "Tag"}
//           </p>
//         </div>

//         <Separator />

//         {/* Order Now Button */}
//         <Link
//           href={`product/details/${product?._id}`}
//           className={cn(buttonVariants(), "mt-4 md:mt-20 rounded-none")}
//         >
//           Order Now
//         </Link>
//       </div>
//     </Card>
//   );
// };

// export default QuickViewProduct;


import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import { formateMoney } from "@/utils/formateMoney";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Plus, Minus, RefreshCw } from "lucide-react"; // Icons for better UI

const QuickViewProduct = ({ product }: { product: TProduct }) => {
  const discount = product?.discount || 0;
  const originalPrice = product?.price || 0;
  const discountedPrice = originalPrice - (originalPrice * discount) / 100;
  const firstVariantImage =
    product?.variant?.[0]?.variant?.[0]?.image || "/images/default.jpg"; // Default image fallback

  return (
    <Card className="flex flex-col md:flex-row items-center justify-between relative m-4 p-6 shadow-lg rounded-lg bg-white">
      {/* Product Image with Magnification */}
      <div className="relative w-full md:w-1/2">
        <TransformWrapper
          initialScale={1}
          wheel={{ disabled: false }} // Enable zoom on scroll
          minScale={0.5} // Limit zoom out
          maxScale={5} // Limit zoom in
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Zoom Controls */}
              <div className="absolute top-2 right-2 z-10 flex space-x-2">
                <button
                  onClick={() => zoomIn()}
                  className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
                >
                  <Minus size={18} />
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
                >
                  <RefreshCw size={18} />
                </button>
              </div>

              <TransformComponent>
                <Image
                  src={firstVariantImage}
                  width={500}
                  height={400}
                  alt={product?.name || "Product Image"}
                  className="object-cover rounded-lg shadow-md"
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Product Details */}
      <div className="mt-6 md:mt-0 md:ml-10 w-full md:w-1/2 flex flex-col justify-between">
        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold text-gray-800 capitalize mb-4">
            {product?.name || "Product Name"}
          </h4>

          <Separator />

          <div className="mt-4 text-lg">
            <p className="text-gray-600 font-semibold">Price:</p>
            <p className="text-gray-500">{formateMoney(originalPrice)}</p>
          </div>

          {discount > 0 && (
            <>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold">Discount:</p>
                <p className="text-red-500 font-bold">-{discount}%</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold">Save:</p>
                <p className="text-red-500 font-bold">
                  {formateMoney(originalPrice - discountedPrice)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 font-semibold">Net Price:</p>
                <p className="text-red-500 font-bold">
                  {formateMoney(discountedPrice)}
                </p>
              </div>
            </>
          )}

          <Separator className="my-4" />

          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Category:</p>
            <p className="capitalize text-gray-500">
              {product?.category || "Category"}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Sub Category:</p>
            <p className="capitalize text-gray-500">
              {product?.subCategory || "Sub Category"}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Tag:</p>
            <p className="text-sm text-gray-500">{product?.tag || "Tag"}</p>
          </div>
        </div>

        {/* Order Now Button */}
        <div className="text-center md:text-left mt-8">
          <Link
            href={`product/details/${product?._id}`}
            className={cn(buttonVariants(), "rounded-md py-3 px-6 w-full")}
          >
            Order Now
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default QuickViewProduct;

