"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, ShoppingBagIcon } from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import assets from "@/app/assets";
import { data, items } from "@/utils/items";
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
import { CommandMenu } from "../NewHeader/command-menu";
import { AppSidebar } from "@/components/shadcn/AppSidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
                  <ul className={cn("grid gap-0.5")}>
                    {data?.navMain?.map((item) => (
                      <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                      >
                        <li>
                          <div className="relative flex items-center">
                            <Link
                              href={item.url}
                              className="min-w-8 flex h-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
                            >
                              {/* <item.icon className="h-4 w-4 shrink-0" /> */}
                              <Image
                                src={item.icon}
                                className="h-6 w-6 shrink-0"
                                alt="image"
                              />
                              <div className="flex flex-1 overflow-hidden">
                                <div className="line-clamp-1 pr-6">
                                  {item.title}
                                </div>
                              </div>
                            </Link>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                className="absolute right-1 h-6 w-6 rounded-md p-0 ring-ring transition-all focus-visible:ring-2 data-[state=open]:rotate-90"
                              >
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Toggle</span>
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                          <CollapsibleContent className="px-4 py-0.5">
                            <ul className="grid border-l px-2">
                              {item.items?.map((subItem) => (
                                <li key={subItem.title}>
                                  <Link
                                    href={subItem.url}
                                    className="min-w-8 flex h-8 items-center gap-2 overflow-hidden rounded-md px-2 text-sm font-medium text-muted-foreground ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
                                  >
                                    <div className="line-clamp-1">
                                      {subItem.title}
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </li>
                      </Collapsible>
                    ))}
                  </ul>
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

          <nav className="hidden lg:flex flex-1 justify-center">
            <HeaderItems />
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:block flex-1 max-w-lg">
              <CommandMenu />
            </div>
            <Button
              variant="outline"
              className={cn(
                "hover:bg-primary  rounded-[5px]  bg-white  hover:border-primary text-primary duration-300 ease-in-out  hover:text-white text-gray-400 px-1 py-2 transition-colors"
              )}
            >
              <Link href="/cart" className="flex items-center gap-1 relative">
                {product?.cartTotalAmount > 0 ? (
                  <span className="font-semibold text-[16px]">
                    {product.cartTotalAmount}
                    <span className="font-serif font-semibold"> ৳</span>
                  </span>
                ) : (
                  <span className="font-semibold text-[16px] font-serif">
                    0 ৳
                  </span>
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
