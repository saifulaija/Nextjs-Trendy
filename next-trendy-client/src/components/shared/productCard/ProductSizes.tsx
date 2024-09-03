import { Button } from "@/components/ui/button";
import React from "react";

// Adjusted interface to match the provided data structure
interface SizeStock {
  _id: string;
  size: string;
  productId: string;
  variant: { color: string; quantity: number; image: string; _id: string }[];
}

const ProductSizes = ({ sizeStockColor }: { sizeStockColor: SizeStock[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {sizeStockColor.length === 0 ? (
        <p>No sizes available</p>
      ) : (
        sizeStockColor.map((sizeData) => {
          // Calculate total quantity for the size
          const totalQuantity = sizeData.variant.reduce(
            (acc, colorVariant) => acc + (colorVariant.quantity || 0),
            0
          );

          return (
            <Button
              disabled={totalQuantity === 0}
              variant="outline"
              key={sizeData._id} // Use _id as a unique key
              className={`text-gray-600 font-semibold ${
                totalQuantity === 0
                  ? "line-through text-gray-600 font-semibold cursor-not-allowed"
                  : ""
              }`}
            >
              {sizeData.size}
              {totalQuantity === 0 && (
                <span className="ml-1">Out of stock</span>
              )}
            </Button>
          );
        })
      )}
    </div>
  );
};

export default ProductSizes;
