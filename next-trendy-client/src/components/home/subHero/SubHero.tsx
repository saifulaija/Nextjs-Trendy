import CustomHeader from "@/components/shared/customHeader/CustomHeader";
import { cn } from "@/lib/utils";
import Link from "next/link";

const collectionData = [
  {
    collectionName: "Men Collection",
    imageUrl:
      "https://i.ibb.co/Fgpd1hr/men-83f8de7d-13d0-4b25-9c15-44f2b8a8f6c2-1200x-crop-center.jpg",
    link: "/product/category/men",
  },
  {
    collectionName: "Women Collection",
    imageUrl:
      "https://i.ibb.co/pxFt4zF/women-fc729eea-7c5e-411e-b8d3-e7bffad504bc-1200x-crop-center.jpg",
    link: "/product/category/women",
  },
  {
    collectionName: "Kids Collection",
    imageUrl:
      "https://i.ibb.co/ZgvvYfc/kids-90162511-b047-40e8-8f07-f4f22b3fe4b1-1200x-crop-center.jpg",
    link: "product/category/kids",
  },
  {
    collectionName: "Accessories Collection",
    imageUrl:
      "https://i.ibb.co/Y7KC44c/accessories-149d3d85-612c-4b01-8503-dc6870232413.jpg",
    description: "A collection of fashion accessories.",
    category: "Accessories",
    link: "/product/category/accessories",
  },
];

const SubHero = () => {
  return (
    <div className="w-full mt-5 md:px-20">
      <CustomHeader title="Product Categories"/>
      <div className="mt-8  mb-4 px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {collectionData?.map((collection, index) => (
          <Link
            key={index}
            href={collection.link}
            className={cn(" rounded shadow-md  group overflow-hidden")}
          >
            <div className="relative group-hover:scale-105 cursor-pointer transform transition-transform duration-300 ease-in-out">
              <div className="relative">
                <img
                  src={collection.imageUrl}
                  alt={collection.collectionName}
                  className="w-full h-48 object-cover rounded hover:bg-slate-700 group-hover:bg-opacity-50 transition-background"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-slate-700 opacity-0 group-hover:opacity-50 transition-opacity rounded"></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubHero;
