"use client";
import Link from "next/link";
import {
  
  BookMarkedIcon,
  Tag,
  ShoppingBagIcon,
  LucideIcon,
  ChevronUp,
 
  
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

import assets from "@/app/assets";

import { useAppSelector } from "@/redux/hooks";
import { Badge } from "@/components/ui/badge";

import { HeaderItems } from "../shared/header/HeaderItem";
import { CommandMenu } from "../shared/NewHeader/command-menu";
import AuthButton from "../shared/authButton/AuthButton";
import Footer from "../shared/footer/Footer";
import { adminSidebarData, userSidebarData } from "@/types/sidebar.type";
import CustomHeader from "../shared/customHeader/CustomHeader";
interface HeaderMenuItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

export function Dashboard({ children }: { children: React.ReactNode }) {
  const user = getUserInfo();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [xOffset, setXOffset] = useState<number>(0);
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
                  {/* <p className="my-4">Filter Products</p> */}
                  
                  <Separator className={cn("bg-red-200")} />
                  {user?.role === "admin" ? (
                    <ul className={cn("grid gap-0.5")}>
                      {adminSidebarData?.navMain?.map((item) => {
                        const isActive = pathname.startsWith(item.url);
                        const [isOpen, setIsOpen] = useState(isActive);

                        return (
                          <li key={item.title}>
                            <div className="relative flex items-center">
                              <div
                                // href={item.url}
                                onClick={() => setIsOpen(!isOpen)}
                                className={cn(
                                  "min-w-8 flex h-8 flex-1 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all",
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
                              </div>
                              <button
                                className={cn(
                                  "absolute right-1 h-6 w-6 rounded-md p-0 transition-all focus-visible:ring-2 data-[state=open]:rotate-90",
                                  isActive
                                    ? "text-white bg-primary border-primary hover:bg-primary/80"
                                    : ""
                                )}
                            
                              >
                                <motion.div
                                  animate={{ rotate: isOpen ? 90 : 0 }} // Smooth rotate animation
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronUp
                                    className={cn(
                                      "h-4 w-4",
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
                  ) : (
                    <ul className={cn("grid gap-0.5")}>
                      {userSidebarData?.navMain?.map((item) => {
                        const isActive = pathname.startsWith(item.url);
                        const [isOpen, setIsOpen] = useState(isActive);

                        return (
                          <li key={item.title}>
                            <div className="relative flex items-center">
                              <div
                                onClick={() => setIsOpen(!isOpen)}
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
                              </div>
                              <button
                                className={cn(
                                  "absolute right-1 h-6 w-6 rounded-md p-0 transition-all focus-visible:ring-2 data-[state=open]:rotate-90",
                                  isActive
                                    ? "text-white bg-primary border-primary hover:bg-primary/80"
                                    : ""
                                )}
                              >
                                <motion.div
                                  animate={{ rotate: isOpen ? 90 : 0 }} // Smooth rotate animation
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronUp
                                    className={cn(
                                      "h-4 w-4",
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
                  )}
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
                  {user?.role === "admin" ? (
                    <ul className={cn("grid gap-0.5")}>
                      {adminSidebarData?.navMain?.map((item) => {
                        const isActive = pathname.startsWith(item.url);
                        const [isOpen, setIsOpen] = useState(isActive);

                        return (
                          <li key={item.title}>
                            <div className="relative flex items-center">
                              <div
                                // href={item.url}
                                onClick={() => setIsOpen(!isOpen)}
                                className={cn(
                                  "min-w-8 flex h-8 flex-1 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all",
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
                              </div>
                              <button
                                className={cn(
                                  "absolute right-1 h-6 w-6 rounded-md p-0 transition-all focus-visible:ring-2 data-[state=open]:rotate-90",
                                  isActive
                                    ? "text-white bg-primary border-primary hover:bg-primary/80"
                                    : ""
                                )}
                                // onClick={() => setIsOpen(!isOpen)}
                              >
                                <motion.div
                                  animate={{ rotate: isOpen ? 90 : 0 }} // Smooth rotate animation
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronUp
                                    className={cn(
                                      "h-4 w-4",
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
                  ) : (
                    <ul className={cn("grid gap-0.5")}>
                      {userSidebarData?.navMain?.map((item) => {
                        const isActive = pathname.startsWith(item.url);
                        const [isOpen, setIsOpen] = useState(isActive);

                        return (
                          <li key={item.title}>
                            <div className="relative flex items-center">
                              <div
                                onClick={() => setIsOpen(!isOpen)}
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
                              </div>
                              <button
                                className={cn(
                                  "absolute right-1 h-6 w-6 rounded-md p-0 transition-all focus-visible:ring-2 data-[state=open]:rotate-90",
                                  isActive
                                    ? "text-white bg-primary border-primary hover:bg-primary/80"
                                    : ""
                                )}
                              >
                                <motion.div
                                  animate={{ rotate: isOpen ? 90 : 0 }} // Smooth rotate animation
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronUp
                                    className={cn(
                                      "h-4 w-4",
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
                  )}
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
                {/* <HeaderItems /> */}

                <p className="font-semibold text-primary italic">
                  Welcome To Trendy Dashboard
                </p>
              </nav>

              <AuthButton />
            </header>
            <main className="flex-grow mt-16 p-6">{children}</main>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
