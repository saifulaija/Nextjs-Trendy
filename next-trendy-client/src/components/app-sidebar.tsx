"use client";

import {
  Atom,
  Bird,
  BookOpen,
  Bot,
  Code2,
  Eclipse,
  Frame,
  History,
  LifeBuoy,
  Map,
  PieChart,
  Rabbit,
  Send,
  Settings2,
  SquareTerminal,
  Star,
  Turtle,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
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
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Atom,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Eclipse,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Rabbit,
      plan: "Free",
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  searchResults: [
    {
      title: "Routing Fundamentals",
      teaser:
        "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
      url: "#",
    },
    {
      title: "Layouts and Templates",
      teaser:
        "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
      url: "#",
    },
    {
      title: "Data Fetching, Caching, and Revalidating",
      teaser:
        "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
      url: "#",
    },
    {
      title: "Server and Client Composition Patterns",
      teaser:
        "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
      url: "#",
    },
    {
      title: "Server Actions and Mutations",
      teaser:
        "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
      url: "#",
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Platform</SidebarLabel>
          <NavMain items={data.navMain} searchResults={data.searchResults} />
        </SidebarItem>
        <SidebarItem>
          <SidebarLabel>Projects</SidebarLabel>
          <NavProjects projects={data.projects} />
        </SidebarItem>
        <SidebarItem className="mt-auto">
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
        <SidebarItem>
          <StorageCard />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
