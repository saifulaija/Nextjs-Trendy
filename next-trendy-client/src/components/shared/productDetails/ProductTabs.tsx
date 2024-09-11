import assets from "@/app/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TProduct } from "@/types/product.type";
import Image from "next/image";

const ProductTabs = ({ product }:{product:TProduct}) => {
  return (
    <div>
      <Tabs defaultValue="description" className="w-full max-w-7xl">
        {/* Adjusting the grid to ensure all tabs are in one line */}
        <TabsList className="flex w-full space-x-2">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="information">Additional Information</TabsTrigger>
          <TabsTrigger value="review">Reviews (0)</TabsTrigger>
          <TabsTrigger value="size chart">Size Chart</TabsTrigger>
        </TabsList>
        {/* Description Tab Content */}
        <TabsContent value="description">
          <Card className="p-4">
            <p>{product.description}</p>
          </Card>
        </TabsContent>
        {/* Additional Information Tab Content */}
        <TabsContent value="information">
          <Card className="p-4">
            <p>Six more than one</p>
          </Card>
        </TabsContent>
        {/* Reviews Tab Content */}
        <TabsContent value="review">
          <Card className="p-4">
            <p>This is a good product</p>
          </Card>
        </TabsContent>
        {/* Size Chart Tab Content */}
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
      </Tabs>
    </div>
  );
};

export default ProductTabs;