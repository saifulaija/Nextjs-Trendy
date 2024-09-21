import assets from "@/app/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TProduct } from "@/types/product.type";
import Image from "next/image";
import Review from "./Review";
import { ProductAccordion } from "./ProductAccordion";
import ReactHtmlParser from "html-react-parser";

const ProductTabs = ({ product }: { product: TProduct }) => {
  return (
    <div>
      <Tabs defaultValue="description" className="w-full max-w-7xl">
        <TabsList className="flex w-full space-x-2">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="material">Materials</TabsTrigger>
          <TabsTrigger value="review">
            Reviews ({product.totalReviews})
          </TabsTrigger>
          <TabsTrigger value="size chart">Size Chart</TabsTrigger>
          <TabsTrigger value="accordion">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <Card className="p-4">
            {product?.description
              ? ReactHtmlParser(product.description)
              : "No description available"}
          </Card>
        </TabsContent>
        <TabsContent value="material">
          <Card className="p-4">
            {product?.material
              ? ReactHtmlParser(product.material)
              : "No material available"}
          </Card>
        </TabsContent>

        <TabsContent value="review">
          <Review product={product} />
        </TabsContent>

        <TabsContent value="size chart">
          <Card className="p-4">
            <Image
              src={assets.images.trendy_chart}
              height={500}
              width={1000}
              alt="Size Chart"
              className="w-full h-auto"
            />
          </Card>
        </TabsContent>
        <TabsContent value="accordion">
          <Card className="p-4 md:px-10">
            <ProductAccordion />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
