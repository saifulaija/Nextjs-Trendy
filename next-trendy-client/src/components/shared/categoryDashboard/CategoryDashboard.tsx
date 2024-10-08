"use client";
import Link from "next/link";
import {
  ChevronRight,
  BookMarkedIcon,
  Tag,
  ShoppingBagIcon,
  LucideIcon,
  Indent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getUserInfo } from "@/services/authServices";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TextAlignCenterIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import AuthButton from "../authButton/AuthButton";

import { HeaderItems } from "../header/HeaderItem";
import assets from "@/app/assets";
import Footer from "../footer/Footer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "../NewHeader/command-menu";
import { Bird, History, Rabbit, Settings2, Star, Turtle } from "lucide-react";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { shoeSize, sortOptions } from "@/types/sidebar.type";
import { Item } from "@radix-ui/react-select";
import { toggleSize } from "@/redux/api/features/product/shoeSizeSlice";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface HeaderMenuItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

interface SideMenuItem {
  title: string;
  path: string;
  show?: boolean; // Optional property to control visibility
}

const data = {
  navMain: [
    {
      title: "Man's",
      url: "/product/category/men",
      icon: assets.images.man,
      isActive: true,
      items: [
        {
          title: "Man Boots",
          url: "/product/category/men/men-boot",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Man Sandals",
          url: "/product/category/men/men-sandal",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "Man Loafers",
          url: "/product/category/men/men-loafer",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Man Casuals",
          url: "/product/category/men/men-casual",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Man Sports",
          url: "/product/category/men/men-sport",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Man Formals",
          url: "/product/category/men/men-formal",
          icon: Settings2,
          description: "Configure your playground",
        },
      ],
    },
    {
      title: "Women's",
      url: "/product/category/women",
      icon: assets.images.women,
      items: [
        {
          title: "Women Heels",
          url: "/product/category/women/women-hell",
          icon: Rabbit,
          description: "Our fastest model for general use cases.",
        },
        {
          title: "Women Flats",
          url: "/product/category/women/women-flat",
          icon: Bird,
          description: "Performance and speed for efficiency.",
        },
        {
          title: "Women Sandals",
          url: "/product/category/women/women-sandal",
          icon: Turtle,
          description: "The most powerful model for complex computations.",
        },
        {
          title: "Women Casuals",
          url: "/product/category/women/women-casual",
          icon: Turtle,
          description: "The most powerful model for complex computations.",
        },
        {
          title: "Women Formals",
          url: "/product/category/women/women-formal",
          icon: Turtle,
          description: "The most powerful model for complex computations.",
        },
        {
          title: "Women Sports",
          url: "/product/category/women/women-sport",
          icon: Turtle,
          description: "The most powerful model for complex computations.",
        },
      ],
    },
    {
      title: "Kid's",
      url: "/product/category/kids",
      icon: assets.images.kids,
      items: [
        {
          title: "Kid Sneakers",
          url: "/product/category/kids/kids-sneaker",
        },
        {
          title: "Kid Sandals",
          url: "/product/category/kids/kids-sandal",
        },
        {
          title: "Kid Sports",
          url: "/product/category/kids/kids-sport",
        },
      ],
    },
    {
      title: "Accessories",
      url: "/product/category/accessories",
      icon: assets.images.accessories,
      items: [
        {
          title: "Man Accessories",
          url: "/product/category/accessories/men-accessories",
        },
        {
          title: "Women Accessories",
          url: "/product/category/accessories/women-accessories",
        },
      ],
    },
  ],
};

export function CategoryDashboard({ children }: { children: React.ReactNode }) {
  const [selectedSort, setSelectedSort] = useState("");
  const dispatch = useAppDispatch();

  const user = getUserInfo();
  const selectedSize = useAppSelector((state) => state.shoeSize.selectedSize);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [xOffset, setXOffset] = useState<number>(0);
  const handleSizeClick = (size: string) => {
    dispatch(toggleSize(size));
  };
  const product = useAppSelector((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setXOffset(window.scrollY > 50 ? 10 : 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-grow">
          {/* Sidebar for larger devices */}
          <div className="hidden md:block border-r">
            <div className="flex flex-col h-full w-[280px] ">
              <div className="flex h-20 items-center border-b py-4 px-4 lg:h-[80px] lg:px-6">
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

                <Button variant="link" size="icon" className="ml-auto h-8 w-8">
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <nav className="px-2 text-md font-medium lg:px-4 overflow-y-auto">
                  <DashboardHeader title="Explore By Category" />

                  <ul className={cn("grid gap-0.5")}>
                    {data?.navMain?.map((item) => {
                      const isActive = pathname.startsWith(item.url);
                      const [isOpen, setIsOpen] = useState(isActive);

                      return (
                        <li key={item.title}>
                          <div className="relative flex items-center">
                            <Link
                              href={item.url}
                              className={cn(
                                "min-w-8 flex h-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all",
                                isActive
                                  ? "bg-primary text-white"
                                  : "hover:bg-accent hover:text-accent-foreground"
                              )}
                            >
                              <Image
                                src={item.icon}
                                className="h-6 w-6 shrink-0"
                                alt={item.title}
                              />
                              <div className="flex flex-1 overflow-hidden">
                                <div className="line-clamp-1 pr-6">
                                  {item.title}
                                </div>
                              </div>
                            </Link>
                            <button
                              className={cn(
                                "absolute right-1 h-6 w-6 rounded-md p-0 transition-all focus-visible:ring-2 data-[state=open]:rotate-90",
                                isActive
                                  ? "text-white bg-primary border-primary hover:bg-primary/80"
                                  : ""
                              )}
                              onClick={() => setIsOpen(!isOpen)}
                            >
                              <motion.div
                                animate={{ rotate: isOpen ? 90 : 0 }} // Smooth rotate animation
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight
                                  className={cn(
                                    "h-4 w-4 hover:text-white transition-all duration-300 hover:bg-primary hover:rounded-full",
                                    isActive
                                      ? "text-white"
                                      : "text-muted-foreground"
                                  )}
                                />
                              </motion.div>
                              <span className="sr-only">Toggle</span>
                            </button>
                          </div>

                          {/* Collapsible content */}
                          <motion.div
                            layout // Automatically animates height
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: isOpen ? 1 : 0,
                              height: isOpen ? "auto" : 0,
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.25, 0.8, 0.25, 1],
                            }} // Smooth easing for animations
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-0.5">
                              <ul className="grid border-l px-2">
                                {item.items?.map((subItem) => (
                                  <li key={subItem.title}>
                                    <Link
                                      href={subItem.url}
                                      className={cn(
                                        "min-w-8 flex h-8 items-center gap-2 overflow-hidden rounded-md px-2 text-sm font-medium text-muted-foreground ring-ring transition-all",
                                        pathname.startsWith(subItem.url)
                                          ? "bg-primary text-white"
                                          : "hover:bg-accent hover:text-accent-foreground"
                                      )}
                                    >
                                      <div className="line-clamp-1">
                                        {subItem.title}
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        </li>
                      );
                    })}
                  </ul>
                
                  
                </nav>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-grow">
            <header
              className={cn(
                "flex justify-between h-20 items-center bg-white fixed top-0 left-0 right-0 z-50 gap-4 border-b px-4 lg:h-[80px] lg:px-6",
                scrolled ? "bg-opacity-100 border-b" : ""
              )}
            >
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
                    <DashboardHeader title="Explore By Category" />
                    <ul className={cn("grid gap-0.5")}>
                      {data?.navMain?.map((item) => {
                        const isActive = pathname.startsWith(item.url);
                        const [isOpen, setIsOpen] = useState(isActive);

                        return (
                          <li key={item.title}>
                            <div className="relative flex items-center">
                              <Link
                                href={item.url}
                                className={cn(
                                  "min-w-8 flex h-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all",
                                  isActive
                                    ? "bg-primary text-white"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                )}
                              >
                                <Image
                                  src={item.icon}
                                  className="h-6 w-6 shrink-0"
                                  alt={item.title}
                                />
                                <div className="flex flex-1 overflow-hidden">
                                  <div className="line-clamp-1 pr-6">
                                    {item.title}
                                  </div>
                                </div>
                              </Link>
                              <button
                                className={cn(
                                  "absolute right-1 h-6 w-6 rounded-md p-0 transition-all focus-visible:ring-2 data-[state=open]:rotate-90",
                                  isActive
                                    ? "text-white bg-primary border-primary hover:bg-primary/80"
                                    : ""
                                )}
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                <motion.div
                                  animate={{ rotate: isOpen ? 90 : 0 }} // Smooth rotate animation
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronRight
                                    className={cn(
                                      "h-4 w-4 hover:text-white transition-all duration-300 hover:bg-primary hover:rounded-full",
                                      isActive
                                        ? "text-white"
                                        : "text-muted-foreground"
                                    )}
                                  />
                                </motion.div>
                                <span className="sr-only">Toggle</span>
                              </button>
                            </div>

                            {/* Collapsible content */}
                            <motion.div
                              layout // Automatically animates height
                              initial={{ opacity: 0, height: 0 }}
                              animate={{
                                opacity: isOpen ? 1 : 0,
                                height: isOpen ? "auto" : 0,
                              }}
                              transition={{
                                duration: 0.4,
                                ease: [0.25, 0.8, 0.25, 1],
                              }} // Smooth easing for animations
                              className="overflow-hidden"
                            >
                              <div className="px-4 py-0.5">
                                <ul className="grid border-l px-2">
                                  {item.items?.map((subItem) => (
                                    <li key={subItem.title}>
                                      <Link
                                        href={subItem.url}
                                        className={cn(
                                          "min-w-8 flex h-8 items-center gap-2 overflow-hidden rounded-md px-2 text-sm font-medium text-muted-foreground ring-ring transition-all",
                                          pathname.startsWith(subItem.url)
                                            ? "bg-primary text-white"
                                            : "hover:bg-accent hover:text-accent-foreground"
                                        )}
                                      >
                                        <div className="line-clamp-1">
                                          {subItem.title}
                                        </div>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          </li>
                        );
                      })}
                    </ul>
                    <DashboardHeader title="Filter By Size" />
                  </nav>
                </SheetContent>
              </Sheet>

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
              <nav className="hidden lg:flex gap-6">
                <HeaderItems />
              </nav>
              <div className="flex items-center gap-2">
                <div className="">
                  {" "}
                  {/* <GlobalSearch placeholder="Search products......." /> */}
                  <CommandMenu />
                </div>
                <Button
                  variant="outline"
                  className={cn(
                    "hover:bg-primary hover:text-white text-gray-400 px-1 py-2 transition-colors duration-300 ease-in-out rounded-md"
                  )}
                >
                  <Link
                    href="/cart"
                    className="flex items-center gap-1 relative"
                  >
                    {product?.cartTotalAmount > 0 ? (
                      <span className="font-semibold  text-[16px]">
                        {product.cartTotalAmount}
                        <span className="font-serif font-semibold "> ৳</span>
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
            <main className="flex-grow mt-10 p-4 lg:p-6">{children}</main>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
