import CustomHeader from "@/components/shared/customHeader/CustomHeader";
import { Card } from "@/components/ui/card";

import AddProductForm from "@/form/AddProductForm";
import { cn } from "@/lib/utils";

const AddProductPage = () => {
  return (
   
     <div className="container mx-auto px-4 md:px-20">
        <Card className={cn("p-5")}>
          <CustomHeader title="Add Product"/>
          <AddProductForm />
        </Card>
     </div>
   
  );
};

export default AddProductPage;
