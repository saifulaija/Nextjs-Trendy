
import assets from "@/app/assets";
import { Bird, History, Rabbit, Settings2, Star, Turtle } from "lucide-react";

export const adminSidebarData = {
  navMain: [
    {
      title: "User Management",
      url: "/product/category/men",
      icon: assets.images.user_management,
      isActive: true,
      items: [
        {
          title: "Show Users",
          url: "/dashboard/admin/user_management/show_users",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Track Users",
          url: "/dashboard/admin/user_management/track_users",
          icon: Star,
          description: "Browse your starred prompts",
        },
      ],
    },
    {
      title: "Product Management",
      url: "/product/category/women",
      icon: assets.images.product_management,
      items: [
        {
          title: "Add Product",
          url: "/dashboard/admin/product_management/add_product",
          icon: Rabbit,
          description: "Our fastest model for general use cases.",
        },
        {
          title: "Show Products",
          url: "/dashboard/admin/product_management/show_products",
          icon: Bird,
          description: "Performance and speed for efficiency.",
        },
      ],
    },
    {
      title: "Product Variants",
      url: "/product/category/kids",
      icon: assets.images.variant_management,
      items: [
        {
          title: "Add Variant",
          url: "/dashboard/admin/product_variants/add_variant",
        },
        {
          title: "Show Variants",
          url: "/dashboard/admin/product_variants/show_variant",
        },
      ],
    },
    {
      title: "Order Management",
      url: "/product/category/kids",
      icon: assets.images.order_management,
      items: [
        {
          title: "Show Orders",
          url: "/dashboard/admin/order_management/show_orders",
        },
        {
          title: "Track Orders",
          url: "/dashboard/admin/order_management/track_orders",
        },
      ],
    },
  ],
};
export const userSidebarData = {
  navMain: [
    {
      title: "Order Management",
      url: "/product/category/men",
      icon: assets.images.order_management,
      isActive: true,
      items: [
        {
          title: "My Orders",
          url: "/product/category/men/men-boot",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Tracking Order",
          url: "/product/category/men/men-sandal",
          icon: Star,
          description: "Browse your starred prompts",
        },
      ],
    },
    {
      title: "My Profile",
      url: "/product/category/men",
      icon: assets.images.product_management,
      isActive: true,
      items: [
        {
          title: "Show Profile",
          url: "/product/category/men/men-boot",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Update Profile",
          url: "/product/category/men/men-sandal",
          icon: Star,
          description: "Browse your starred prompts",
        },
      ],
    },
  ],
};
