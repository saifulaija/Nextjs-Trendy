"use client";
import Link from "next/link";
import {
  ChevronRight,
  SearchCheck,
  BookMarkedIcon,
  Tag,
  ShoppingBagIcon,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getUserInfo } from "@/services/authServices";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import GlobalSearch from "../globalSearch/GlobalSearch";
import { TextAlignCenterIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import AuthButton from "../authButton/AuthButton";
import { items } from "@/utils/items";
import { HeaderItems } from "../header/HeaderItem";
import assets from "@/app/assets";
import Footer from "../footer/Footer";

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

export function CategoryDashboard({ children }: { children: React.ReactNode }) {
  const user = getUserInfo();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [xOffset, setXOffset] = useState<number>(0);

  const headerMenu: HeaderMenuItem[] = [
    { title: "Bookmark", path: `/blogs/bookmarks`, icon: BookMarkedIcon },
    { title: "Tags", path: `/blogs/tags`, icon: Tag },
  ];

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
            <div className="flex flex-col h-full w-[280px] bg-white">
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
                        width={100}
                        height={100}
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
                <nav className="px-2 text-md font-medium lg:px-4">
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <SearchCheck className="h-4 w-4" />
                    Find by Category
                  </div>
                  <Separator />
                  {items.map((item) =>
                    item.key ? (
                      <React.Fragment key={item.key}>
                        <p>{item.label}</p>
                        <Separator />
                        {item.children.map((child) => (
                          <Link
                            key={child.key}
                            href={`/product-category/${item.key}/${child.key}`}
                            className={cn(
                              "flex items-center justify-between gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                              pathname === child.key &&
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
                <Separator />
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
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                      <SearchCheck className="h-4 w-4" />
                      Find by Category
                    </div>
                    <Separator />
                    <GlobalSearch placeholder="Search products......." />
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
                                pathname === child.key &&
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
                  <div className="mt-auto">
                    {headerMenu.map((item, index) => (
                      <Link
                        key={index}
                        href={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                          pathname === item.path &&
                            "text-primary bg-muted border-r-4 border-r-primary"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.title}
                      </Link>
                    ))}
                  </div>
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
                      width={100}
                      height={100}
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
               <div className="hidden sm:block"> <GlobalSearch placeholder="Search products......." /></div>
                <Button
                  asChild
                  variant="outline"
                  className="hover:bg-primary text-gray-400 hover:text-white px-2 py-1"
                >
                  <Link
                    href="/signin"
                    className="flex items-center font-semibold"
                  >
                    <ShoppingBagIcon className="h-5 w-5" />
                    <span className="sr-only">View shopping cart</span>
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
