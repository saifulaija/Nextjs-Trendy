// "use client";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   AlignJustify,
//   ChevronRight,
//   LogOut,
//   SearchCheck,
//   ShoppingBagIcon,
//   User,
// } from "lucide-react";

// import { motion } from "framer-motion";
// import React, { useEffect, useState } from "react";

// import { usePathname, useRouter } from "next/navigation";
// import Link from "next/link";
// import assets from "@/app/assets";
// import { items } from "@/utils/items";
// import { HeaderItems } from "./HeaderItem";
// import { HeaderItemSheet } from "./HeaderItemSheet";
// import { Separator } from "@/components/ui/separator";
// import GlobalSearch from "../globalSearch/GlobalSearch";
// import Image from "next/image";
// import { TextAlignCenterIcon } from "@radix-ui/react-icons";
// import { cn } from "@/lib/utils";

// const Header = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const router = useRouter();
//   const user = null; // Replace with actual user fetching logic

//   const pathname = usePathname();

//   const handleLogout = () => {
//     // Handle logout logic here
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div
//       className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 flex justify-center items-center h-16 ${
//         scrolled
//           ? "shadow-md border-b bg-white backdrop-blur-lg"
//           : "bg-white border-b"
//       }`}
//     >
//       <div className="container mx-auto px-4">
//         <header className="flex h-16 items-center justify-between">
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
//                   {/* <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
//                     <SearchCheck className="h-4 w-4" />
//                     Find by Category
//                   </div>
//                   <Separator /> */}
//                  <div className="p-4"> <GlobalSearch placeholder="Search products......." /></div>
//                   {items.map((item, index) =>
//                     item.key ? (
//                       <>
//                         <p>{item.label}</p>
//                         <Separator />
//                         {item.children.map((child) => (
//                           <Link
//                             key={index}
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
//                       </>
//                     ) : null
//                   )}
//                 </nav>
//               </SheetContent>
//             </Sheet>

//             <motion.div
//               className="hidden md:flex"
//               whileHover={{ x: 10 }}
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

//           <div className=" items-center flex md:hidden">
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

//           {/* Search and Buttons */}
//           <div className="flex items-center gap-2">
//             <div className="hidden md:block flex-1 max-w-lg">
//               <GlobalSearch placeholder="Search  products......." />
//             </div>
//             <Button
//               asChild
//               variant="outline"
//               className="hover:bg-primary text-gray-400 hover:text-white px-2 py-1 hover:transition-all hover:duration-200"
//             >
//               <Link href="/signin" className="flex items-center font-semibold">
//                 <ShoppingBagIcon /> ৳ 0
//               </Link>
//             </Button>

//             {user ? (
//               <Button
//                 onClick={handleLogout}
//                 asChild
//                 className="cursor-pointer group"
//               >
//                 <span className="flex items-center gap-2">
//                   Logout
//                   <LogOut className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
//                 </span>
//               </Button>
//             ) : (
//               <Button
//                 asChild
//                 variant="outline"
//                 className="hover:bg-primary text-gray-400 hover:text-white px-2 py-1 hover:transition-all hover:duration-200"
//               >
//                 <Link
//                   href="/signin"
//                   className="flex items-center font-semibold"
//                 >
//                   <User className="font-semibold" />
//                 </Link>
//               </Button>
//             )}
//           </div>
//         </header>
//       </div>
//     </div>
//   );
// };

// export default Header;

"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  AlignJustify,
  ChevronRight,
  LogOut,
  SearchCheck,
  ShoppingBagIcon,
  User,
} from "lucide-react";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import assets from "@/app/assets";
import { items } from "@/utils/items";
import { HeaderItems } from "./HeaderItem";
import { HeaderItemSheet } from "./HeaderItemSheet";
import { Separator } from "@/components/ui/separator";
import GlobalSearch from "../globalSearch/GlobalSearch";
import Image from "next/image";
import { TextAlignCenterIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import AuthButton from "../authButton/AuthButton";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const user = null; // Replace with actual user fetching logic

  const pathname = usePathname();

  const handleLogout = () => {
    // Handle logout logic here
  };

const [xOffset, setXOffset] = useState<number>(0);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setXOffset(10); // Move 10px when scrolled down
    } else {
      setXOffset(0); // Reset to original position when scrolled back to top
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 flex justify-center items-center h-16 ${
        scrolled
          ? "shadow-md border-b bg-white backdrop-blur-lg"
          : "bg-white border-b"
      }`}
    >
      <div className="container mx-auto px-4">
        <header className="flex h-16 items-center justify-between">
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
                  {/* <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <SearchCheck className="h-4 w-4" />
                    Find by Category
                  </div>
                  <Separator /> */}
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
                            key={child.key} // Use a unique key for each child
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

            {/* <motion.div
              className="hidden md:flex"
              whileHover={{ x: 10 }}
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
            </motion.div> */}
            <motion.div
              className="hidden md:flex"
              animate={{ x: xOffset }} // Apply xOffset based on scroll
              transition={{ type: "spring", stiffness: 200, damping: 20 }} // Smooth transition
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

          {/* Search and Buttons */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block flex-1 max-w-lg">
              <GlobalSearch placeholder="Search  products......." />
            </div>
            <Button
              asChild
              variant="outline"
              className="hover:bg-primary text-gray-400 hover:text-white px-2 py-1 hover:transition-all hover:duration-200"
            >
              <Link href="/signin" className="flex items-center font-semibold">
                <ShoppingBagIcon /> ৳ 0
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
