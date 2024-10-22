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
          url: "/dashboard/admin/product_variants/show_variants",
        },
      ],
    },
    {
      title: "Order Management",
      url: "/product/category/order",
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
    {
      title: "Review Management",
      url: "/product/category/kids",
      icon: assets.images.rating,
      items: [
        {
          title: "Pending Reviews",
          url: "/dashboard/admin/review_management/pending_reviews",
        },
        {
          title: "Approved Reviews",
          url: "/dashboard/admin/review_management/approved_reviews",
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
          url: "/dashboard/user/my_orders",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Tracking Order",
          url: "/dashboard/user/tracking_orders",
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
export const shoeSize = {
  navMain: [
    {
      title: "Size/32",
     value:"32",
      isActive: true,
    },
    {
      title: "Size/34",
     value:"34",
      isActive: true,
    },
    {
      title: "Size/36",
     value:"36",
      isActive: true,
    },
    {
      title: "Size/18",
      Value: "18",
      isActive: true,
    },
    {
      title: "Size/14",
      Value: "14",
      isActive: true,
    },
  ],
};
export const sortOptions = [
  { label: "High To Low", value: "-price" },
  { label: "Low To High", value: "price" },
];