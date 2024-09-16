import { Card } from "@/components/ui/card";
import ReviewForm from "@/form/ReviewForm";
import { cn } from "@/lib/utils";


const Review = ({productId}:{productId:string}) => {
  return <div>
    <div>
        <h1 className="font-bold text-gray-600">Reviews</h1>
    </div>
    <Card className={cn("border-[2px] border-primary rounded-[10px] p-4")}>
        <ReviewForm productId={productId}/>
    </Card>
  </div>;
};

export default Review;
