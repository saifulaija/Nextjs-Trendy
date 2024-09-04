// // "use client";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetTrigger,
// // } from "@/components/ui/sheet";
// // import {
// //   AlignJustify,
// //   ChevronRight,
// //   LogOut,
// //   SearchCheck,
// //   ShoppingBagIcon,
// //   User,
// // } from "lucide-react";

// // import { motion } from "framer-motion";
// // import React, { useEffect, useState } from "react";

// // import { usePathname, useRouter } from "next/navigation";
// // import Link from "next/link";
// // import assets from "@/app/assets";
// // import { items } from "@/utils/items";
// // import { HeaderItems } from "./HeaderItem";
// // import { HeaderItemSheet } from "./HeaderItemSheet";
// // import { Separator } from "@/components/ui/separator";
// // import GlobalSearch from "../globalSearch/GlobalSearch";
// // import Image from "next/image";
// // import { TextAlignCenterIcon } from "@radix-ui/react-icons";
// // import { cn } from "@/lib/utils";
// // import AuthButton from "../authButton/AuthButton";
// // import { Badge } from "@/components/ui/badge";
// // import { useAppSelector } from "@/redux/hooks";

// // const Header = () => {
// //   const [scrolled, setScrolled] = useState(false);
// //   const router = useRouter();
// //   const user = null; // Replace with actual user fetching logic

// //   const product = useAppSelector((state) => state.cart);
// //   console.log(product);

// //   const pathname = usePathname();

// //   const handleLogout = () => {
// //     // Handle logout logic here
// //   };

// //   const [xOffset, setXOffset] = useState<number>(0);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       if (window.scrollY > 50) {
// //         setXOffset(10); // Move 10px when scrolled down
// //       } else {
// //         setXOffset(0); // Reset to original position when scrolled back to top
// //       }
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => {
// //       window.removeEventListener("scroll", handleScroll);
// //     };
// //   }, []);

// //   return (
// //     <div
// //       className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 flex justify-center items-center h-20 ${
// //         scrolled
// //           ? "shadow-md border-b bg-white backdrop-blur-lg"
// //           : "bg-white border-b"
// //       }`}
// //     >
// //       <div className="container mx-auto px-4">
// //         <header className="flex  items-center justify-between">
// //           <div className="flex items-center">
// //             <Sheet>
// //               <SheetTrigger asChild>
// //                 <Button
// //                   variant="outline"
// //                   size="icon"
// //                   className="shrink-0 md:hidden"
// //                 >
// //                   <TextAlignCenterIcon className="h-5 w-5" />
// //                   <span className="sr-only">Toggle navigation menu</span>
// //                 </Button>
// //               </SheetTrigger>
// //               <SheetContent
// //                 side="left"
// //                 className="flex flex-col overflow-y-auto max-h-full"
// //               >
// //                 <nav className="grid gap-2 text-lg font-medium">
// //                   <div className="p-4">
// //                     <GlobalSearch placeholder="Search products......." />
// //                   </div>
// //                   {items.map((item) =>
// //                     item.key ? (
// //                       <React.Fragment key={item.key}>
// //                         <p>{item.label}</p>
// //                         <Separator />
// //                         {item.children.map((child) => (
// //                           <Link
// //                             key={child.key} // Use a unique key for each child
// //                             href={`/product/category/${child.key}`}
// //                             className={cn(
// //                               "flex items-center justify-between gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary",
// //                               pathname === item.key &&
// //                                 "text-primary bg-muted border-r-4 border-r-primary"
// //                             )}
// //                           >
// //                             <div className="flex items-center gap-3 capitalize">
// //                               <Image
// //                                 src={child.image}
// //                                 alt={child.label}
// //                                 width={24}
// //                                 height={24}
// //                                 className="rounded"
// //                               />
// //                               {child.key}
// //                             </div>
// //                             <ChevronRight />
// //                           </Link>
// //                         ))}
// //                       </React.Fragment>
// //                     ) : null
// //                   )}
// //                 </nav>
// //               </SheetContent>
// //             </Sheet>

// //             <motion.div
// //               className="hidden md:flex"
// //               animate={{ x: xOffset }} // Apply xOffset based on scroll
// //               transition={{ type: "spring", stiffness: 200, damping: 20 }} // Smooth transition
// //             >
// //               <div className="flex items-center">
// //                 <Link href="/">
// //                   <Image
// //                     src={assets.images.logo}
// //                     alt="logo"
// //                     width={60}
// //                     height={60}
// //                     className="rounded"
// //                   />
// //                 </Link>
// //               </div>
// //             </motion.div>
// //           </div>

// //           <div className="items-center flex md:hidden">
// //             <Link href="/">
// //               <Image
// //                 src={assets.images.logo}
// //                 alt="logo"
// //                 width={60}
// //                 height={60}
// //                 className="rounded"
// //               />
// //             </Link>
// //           </div>

// //           {/* Centered Navigation */}
// //           <nav className="hidden lg:flex flex-1 justify-center">
// //             <HeaderItems />
// //           </nav>

// //           {/* Search and Buttons */}
// //           <div className="flex items-center gap-4">
// //             <div className="hidden md:block flex-1 max-w-lg">
// //               <GlobalSearch placeholder="Search  products......." />
// //             </div>
// //             <Sheet>
// //               <SheetTrigger asChild>
// //                 {/* <Button variant="outline">Open</Button> */}
// //                 <Button
// //                   asChild
// //                   variant="outline"
// //                   className={cn(
// //                     "hover:bg-primary hover:text-white text-gray-400 px-1 py-2 transition-colors duration-300 ease-in-out rounded-md"
// //                   )}
// //                 >
// //                   <div className="flex items-center justify-center gap-1">
// //                     {product?.cartTotalAmount > 0 ? (
// //                       <span className="font-semibold text-[16px] ">
// //                         {product?.cartTotalAmount}
// //                         <span className="font-semibold text-[16px] font-serif">
// //                           ৳
// //                         </span>
// //                       </span>
// //                     ) : (
// //                       <span className="font-semibold text-[16px] font-serif">
// //                         0 ৳
// //                       </span>
// //                     )}

// //                     <ShoppingBagIcon className="w-5 h-5" />
// //                   </div>
// //                   <div className="relative">
// //                     {product?.cartItems.length > 0 && (
// //                       <Badge
// //                         className={cn(
// //                           "absolute -top-8 -right-4  text-white text-xs"
// //                         )}
// //                       >
// //                         {product?.cartItems.length}
// //                       </Badge>
// //                     )}
// //                   </div>
// //                 </Button>
// //               </SheetTrigger>
// //               <SheetContent>
// //                 <SheetHeader>
// //                   <SheetTitle>Your Cart</SheetTitle>
// //                 </SheetHeader>
// //               </SheetContent>
// //             </Sheet>

// //             <AuthButton />
// //           </div>
// //         </header>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Header;

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { ChevronRight, ShoppingBagIcon } from "lucide-react";
// import { motion } from "framer-motion";
// import React, { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import assets from "@/app/assets";
// import { items } from "@/utils/items";
// import { HeaderItems } from "./HeaderItem";
// import { Separator } from "@/components/ui/separator";
// import GlobalSearch from "../globalSearch/GlobalSearch";
// import Image from "next/image";
// import { cn } from "@/lib/utils";
// import AuthButton from "../authButton/AuthButton";
// import { Badge } from "@/components/ui/badge";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { TextAlignCenterIcon } from "@radix-ui/react-icons";
// import { getTotals } from "@/redux/api/features/product/cartSlice";

// const Header = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const product = useAppSelector((state) => state.cart);
//   const pathname = usePathname();
//   const dispatch=useAppDispatch()
  

//   const [xOffset, setXOffset] = useState<number>(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setXOffset(10); // Move 10px when scrolled down
//       } else {
//         setXOffset(0); // Reset to original position when scrolled back to top
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div
//       className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 flex justify-center items-center h-20 ${
//         scrolled
//           ? "shadow-md border-b bg-white backdrop-blur-lg"
//           : "bg-white border-b"
//       }`}
//     >
//       <div className="container mx-auto px-4">
//         <header className="flex items-center justify-between">
//           <div className="flex items-center">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="shrink-0 md:hidden"
//                 >
//                   <TextAlignCenterIcon className="h-5 w-5" />
//                   <span className="sr-only">Toggle navigation menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent
//                 side="left"
//                 className="flex flex-col overflow-y-auto max-h-full"
//               >
//                 <nav className="grid gap-2 text-lg font-medium">
//                   <div className="p-4">
//                     <GlobalSearch placeholder="Search products......." />
//                   </div>
//                   {items.map((item) =>
//                     item.key ? (
//                       <React.Fragment key={item.key}>
//                         <p>{item.label}</p>
//                         <Separator />
//                         {item.children.map((child) => (
//                           <Link
//                             key={child.key}
//                             href={`/product/category/${child.key}`}
//                             className={cn(
//                               "flex items-center justify-between gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary",
//                               pathname === item.key &&
//                                 "text-primary bg-muted border-r-4 border-r-primary"
//                             )}
//                           >
//                             <div className="flex items-center gap-3 capitalize">
//                               <Image
//                                 src={child.image}
//                                 alt={child.label}
//                                 width={24}
//                                 height={24}
//                                 className="rounded"
//                               />
//                               {child.key}
//                             </div>
//                             <ChevronRight />
//                           </Link>
//                         ))}
//                       </React.Fragment>
//                     ) : null
//                   )}
//                 </nav>
//               </SheetContent>
//             </Sheet>

//             <motion.div
//               className="hidden md:flex"
//               animate={{ x: xOffset }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//             >
//               <div className="flex items-center">
//                 <Link href="/">
//                   <Image
//                     src={assets.images.logo}
//                     alt="logo"
//                     width={60}
//                     height={60}
//                     className="rounded"
//                   />
//                 </Link>
//               </div>
//             </motion.div>
//           </div>

//           <div className="items-center flex md:hidden">
//             <Link href="/">
//               <Image
//                 src={assets.images.logo}
//                 alt="logo"
//                 width={60}
//                 height={60}
//                 className="rounded"
//               />
//             </Link>
//           </div>

//           {/* Centered Navigation */}
//           <nav className="hidden lg:flex flex-1 justify-center">
//             <HeaderItems />
//           </nav>
//           <div className="flex items-center gap-4">
//             <div className="hidden md:block flex-1 max-w-lg">
//               <GlobalSearch placeholder="Search products......." />
//             </div>
//             <Button
//               variant="outline"
//               className={cn(
//                 "hover:bg-primary hover:text-white text-gray-400 px-1 py-2 transition-colors duration-300 ease-in-out rounded-md"
//               )}
//             >
//               <Link href='/cart' className="flex items-center gap-1 relative">
//                 {product?.cartTotalAmount > 0 ? (
//                   <span className="font-semibold text-[16px]">
//                     {dispatch(getTotals())} ৳
//                   </span>
//                 ) : (
//                   <span className="font-semibold text-[16px]">0 ৳</span>
//                 )}
//                 <ShoppingBagIcon className="w-5 h-5" />
//                 {product?.cartItems.length > 0 && (
//                   <Badge
//                     className={cn(
//                       "absolute -top-6 -right-4 text-white text-xs"
//                     )}
//                   >
//                     {product?.cartItems.length}
//                   </Badge>
//                 )}
//               </Link>
//             </Button>

//             <AuthButton />
//           </div>
//         </header>
//       </div>
//     </div>
//   );
// };

// export default Header;


"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, ShoppingBagIcon } from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import assets from "@/app/assets";
import { items } from "@/utils/items";
import { HeaderItems } from "./HeaderItem";
import { Separator } from "@/components/ui/separator";
import GlobalSearch from "../globalSearch/GlobalSearch";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AuthButton from "../authButton/AuthButton";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TextAlignCenterIcon } from "@radix-ui/react-icons";
import { getTotals } from "@/redux/api/features/product/cartSlice";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const product = useAppSelector((state) => state.cart);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [xOffset, setXOffset] = useState<number>(0);

  // Compute totals whenever cart changes
  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, product.cartItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setXOffset(10); // Move 10px when scrolled down
        setScrolled(true);
      } else {
        setXOffset(0); // Reset to original position when scrolled back to top
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 flex justify-center items-center h-20 ${
        scrolled
          ? "shadow-md border-b bg-white backdrop-blur-lg"
          : "bg-white border-b"
      }`}
    >
      <div className="container mx-auto px-4">
        <header className="flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <TextAlignCenterIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col overflow-y-auto max-h-full"
              >
                <nav className="grid gap-2 text-lg font-medium">
                  <div className="p-4">
                    <GlobalSearch placeholder="Search products......." />
                  </div>
                  {items.map((item) =>
                    item.key ? (
                      <React.Fragment key={item.key}>
                        <p>{item.label}</p>
                        <Separator />
                        {item.children.map((child) => (
                          <Link
                            key={child.key}
                            href={`/product/category/${child.key}`}
                            className={cn(
                              "flex items-center justify-between gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                              pathname === item.key &&
                                "text-primary bg-muted border-r-4 border-r-primary"
                            )}
                          >
                            <div className="flex items-center gap-3 capitalize">
                              <Image
                                src={child.image}
                                alt={child.label}
                                width={24}
                                height={24}
                                className="rounded"
                              />
                              {child.key}
                            </div>
                            <ChevronRight />
                          </Link>
                        ))}
                      </React.Fragment>
                    ) : null
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            <motion.div
              className="hidden md:flex"
              animate={{ x: xOffset }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="flex items-center">
                <Link href="/">
                  <Image
                    src={assets.images.logo}
                    alt="logo"
                    width={60}
                    height={60}
                    className="rounded"
                  />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="items-center flex md:hidden">
            <Link href="/">
              <Image
                src={assets.images.logo}
                alt="logo"
                width={60}
                height={60}
                className="rounded"
              />
            </Link>
          </div>

          {/* Centered Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <HeaderItems />
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:block flex-1 max-w-lg">
              <GlobalSearch placeholder="Search products......." />
            </div>
            <Button
              variant="outline"
              className={cn(
                "hover:bg-primary hover:text-white text-gray-400 px-1 py-2 transition-colors duration-300 ease-in-out rounded-md"
              )}
            >
              <Link href="/cart" className="flex items-center gap-1 relative">
                {product?.cartTotalAmount > 0 ? (
                  <span className="font-semibold  text-[16px]">
                    {product.cartTotalAmount}<span className="font-serif font-semibold "> ৳</span>
                  </span>
                ) : (
                  <span className="font-semibold text-[16px] font-serif">0 ৳</span>
                )}
                <ShoppingBagIcon className="w-5 h-5" />
                {product?.cartItems.length > 0 && (
                  <Badge
                    className={cn(
                      "absolute -top-6 -right-4 text-white text-xs"
                    )}
                  >
                    {product?.cartItems.length}
                  </Badge>
                )}
              </Link>
            </Button>

            <AuthButton />
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;

