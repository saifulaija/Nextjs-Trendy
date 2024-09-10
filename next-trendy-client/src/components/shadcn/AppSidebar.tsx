"use client";

import {
  Atom,
  Bird,
  BookOpen,
  Bot,
  Code2,
  History,
  Rabbit,
  Settings2,
  SquareTerminal,
  Star,
  Turtle,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { StorageCard } from "@/components/storage-card";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NavMain } from "./NavMain";
const data = {
  navMain: [
    {
      title: "Man's",
      url: "/product/category/men",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Man Boots",
          url: "product-category/men/men-boot",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Man Sandals",
          url: "product-category/men/men-sandal",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "Man Loafers",
          url: "product-category/men/men-loafer",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Man Casuals",
          url: "product-category/men/men-casual",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Man Sports",
          url: "product-category/men/men-sport",
          icon: Settings2,
          description: "Configure your playground",
        },
        {
          title: "Man Formals",
          url: "product-category/men/men-formal",
          icon: Settings2,
          description: "Configure your playground",
        },
      ],
    },
    {
      title: "Women's",
      url: "/product/category/women",
      icon: Bot,
      items: [
        {
          title: "Women Heels",
          url: "product-category/women/women-hell",
          icon: Rabbit,
          description: "Our fastest model for general use cases.",
        },
        {
          title: "Women Flats",
          url: "product-category/women/women-flat",
          icon: Bird,
          description: "Performance and speed for efficiency.",
        },
        {
          title: "Women Sandals",
          url: "product-category/women/women-sandal",
          icon: Turtle,
          description: "The most powerful model for complex computations.",
        },
        {
          title: "Women Casuals",
          url: "product-category/women/women-casual",
          icon: Turtle,
          description: "The most powerful model for complex computations.",
        },
        {
          title: "Women Formals",
          url: "product-category/women/women-formal",
          icon: Turtle,
          description: "The most powerful model for complex computations.",
        },
        {
          title: "Women Sports",
          url: "product-category/women/women-sport",
          icon: Turtle,
          description: "The most powerful model for complex computations.",
        },
      ],
    },
    {
      title: "Kid's",
      url: "/product/category/kids",
      icon: BookOpen,
      items: [
        {
          title: "Kid Sneakers",
          url: "product-category/kids/kids-sneaker",
        },
        {
          title: "Kid Sandals",
          url: "product-category/kids/kids-sandal",
        },
        {
          title: "Kid Sports",
          url: "product-category/kids/kids-sport",
        },
      ],
    },
    {
      title: "Accessories",
      url: "/product/category/accessories",
      icon: Code2,
      items: [
        {
          title: "Man Accessories",
          url: "product-category/accessories/men-accessories",
        },
        {
          title: "Women Accessories",
          url: "product-category/accessories/women-accessories",
        },
      ],
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar
      className={cn("w-[280px] flex-1 overflow-y-auto mt-20 bg-red-600")}
    >
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Filter Products</SidebarLabel>
          <NavMain items={data.navMain} />
        </SidebarItem>
      </SidebarContent>
    </Sidebar>
  );
}
