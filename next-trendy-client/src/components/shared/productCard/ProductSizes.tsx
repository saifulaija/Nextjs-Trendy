import { Button } from "@/components/ui/button";
import React from "react";

interface SizeStock {
  size: string;
  colorsStock: { color: string; quantity: number }[];
}

const ProductSizes = ({ sizeStockColor }: { sizeStockColor: SizeStock[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {sizeStockColor.map((sizeData) => {
        // Calculate total quantity for the size
        const totalQuantity = sizeData.colorsStock.reduce(
          (acc, colorStock) => acc + colorStock.quantity,
          0
        );

        return (
          <Button
            disabled={totalQuantity === 0}
            variant="outline"
            key={sizeData.size}
            className={`text-gray-600  font-semibold ${
              totalQuantity === 0
                ? "line-through text-gray-600 font-semibold cursor-not-allowed"
                : ""
            }`}
          >
            {sizeData.size}
            {totalQuantity === 0 && <span className="ml-1">Out of stock</span>}
          </Button>
        );
      })}
    </div>
  );
};

export default ProductSizes;
