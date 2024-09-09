import assets from "@/app/assets";

export const items = [
  {
    label: "MEN'S",
    key: "men",
    children: [
      { label: "BOOT", key: "men-boot", image: assets.images.man_boot },
      { label: "LOAFER", key: "men-loafer", image: assets.images.man_loafer },
      { label: "SANDALS", key: "men-sandal", image: assets.images.man_sandal },
      { label: "CASUAL", key: "men-casual", image: assets.images.man_causal },
      { label: "FORMAL", key: "men-formal", image: assets.images.man_formal },
      { label: "SPORTS", key: "men-sport", image: assets.images.man_sport },
    ],
  },
  {
    label: "WOMEN'S",
    key: "women",
    children: [
      { label: "HEEL", key: "women-heel", image: assets.images.woman_hell },
      { label: "FLAT", key: "women-flat", image: assets.images.woman_flat },
      {
        label: "CASUAL",
        key: "women-casual",
        image: assets.images.woman_casual,
      },
      {
        label: "SANDALS",
        key: "women-sandal",
        image: assets.images.woman_sandal,
      },
      {
        label: "FORMAL",
        key: "women-formal",
        image: assets.images.woman_casual,
      },
      { label: "SPORTS", key: "women-sport", image: assets.images.woman_sport },
    ],
  },
  {
    label: "kids'S",
    key: "kids",
    children: [
      { label: "SNEAKERS", key: "kids-sneaker", image: assets.images.kid_sneakers },
      { label: "SANDALS", key: "kids-sandal", image: assets.images.kid_sandal },
      { label: "SPORT", key: "kids-sport", image: assets.images.kid_sport },
    ],
  },
];

export const men = [
  {
    label: "BOOT",
    href: "/product-category/men/men-boot",
    image: assets.images.casual,
    description: "Sturdy and stylish boots perfect for any adventure.",
  },
  {
    label: "LOAFER",
    href: "/product-category/men/men-loafer",
    image: assets.images.casual,
    description: "Elegant loafers for a smart and sophisticated look.",
  },
  {
    label: "SANDALS",
    href: "/product-category/men/men-sandal",
    image: assets.images.casual,
    description: "Comfortable sandals for easy, breezy days.",
  },
  {
    label: "CASUAL",
    href: "/product-category/men/men-casual",
    image: assets.images.casual,
    description: "Everyday casual shoes that blend comfort and style.",
  },
  {
    label: "FORMAL",
    href: "/product-category/men/men-formal",
    image: assets.images.casual,
    description: "Polished formal shoes to complete your sharp look.",
  },
  {
    label: "SPORTS",
    href: "/product-category/men/men-sport",
    image: assets.images.casual,
    description: "High-performance sports shoes for the active men.",
  },
];

export const women = [
  {
    label: "HEEL",
    href: "/product-category/women/women-heel",
    image: assets.images.woman_hell,
    description: "Chic heels that elevate your style with every step.",
  },
  {
    label: "FLAT",
    href: "/product-category/women/women-flat",
    image: assets.images.woman_flat,
    description: "Graceful flats that combine comfort with elegance.",
  },
  {
    label: "SANDALS",
    href: "/product-category/women/women-sandal",
    image: assets.images.woman_sandal,
    description: "Light and trendy sandals for a carefree look.",
  },
  {
    label: "CASUAL",
    href: "/product-category/women/women-casual",
    image: assets.images.woman_casual,
    description: "Versatile casual shoes for your daily wardrobe.",
  },
  {
    label: "FORMAL",
    href: "/product-category/women/women-formal",
    image: assets.images.woman_sandal,
    description: "Sophisticated formal shoes for any special occasion.",
  },
  {
    label: "SPORTS",
    href: "/product-category/women/women-sport",
    image: assets.images.woman_sport,
    description: "Dynamic sports shoes for the active woman.",
  },
];

export const kids = [
  {
    label: "SNEAKERS",
    href: "/product-category/kids/kids-sneaker",
    image: assets.images.casual,
    description: "Comfortable and stylish sneakers for active kids.",
  },
  {
    label: "SANDALS",
    href: "/product-category/kids/kids-sandal",
    image: assets.images.casual,
    description: "Light and breezy sandals perfect for playtime.",
  },
 
  
  {
    label: "SPORTS",
    href: "/product-category/kids/kids-sport",
    image: assets.images.casual,
    description: "Sporty shoes designed to keep up with kids' energy.",
  },
  
];

export const accessories = [
  {
    label: "men'S ACCESSORIES",
    href: "/product-category/accessories/men-accessories",
    image: assets.images.casual,
    description:
      "Discover timeless accessories for men that elevate any look, from classic watches to stylish belts.",
  },
  {
    label: "WOMEN'S ACCESSORIES",
    href: "/product-category/accessories/women-accessories",
    image: assets.images.casual,
    description:
      "Explore elegant accessories for women, including chic jewelry and stylish handbags to complete your outfit.",
  },
];
