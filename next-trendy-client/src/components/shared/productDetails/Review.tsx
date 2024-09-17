"use client";

import assets from "@/app/assets";
import { Card } from "@/components/ui/card";
import ReviewForm from "@/form/ReviewForm";
import { cn } from "@/lib/utils";
import { useGetAllReviewsQuery } from "@/redux/api/features/review/reviewApi";
import Image from "next/image";
import { FaStar } from "react-icons/fa"; // Display stars for ratings
import { format } from "date-fns"; // For formatting dates
import { TProduct } from "@/types/product.type";

const Review = ( {product}:{product:TProduct}) => {
  const { data, isLoading, error } = useGetAllReviewsQuery(product._id);

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading reviews...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600">
        Failed to load reviews. Please try again later.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-6">
          <p className="text-center text-gray-500 text-lg">
            No reviews yet. Be the first to share your thoughts!
          </p>
          {/* Full-width review form */}
          <Card className="border-2 border-primary rounded-lg p-8 shadow-lg w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Leave a Review
            </h2>
            <ReviewForm product={product} />
          </Card>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Reviews section */}
          <div className="flex-1">
            <h1 className="font-bold text-2xl text-gray-800 mb-6">
              Customer Reviews
            </h1>
            <div className="space-y-6">
              {data.map((review: any) =>
                review.status === "approved" ? (
                  <Card
                    key={review._id}
                    className="p-6 shadow-md border rounded-lg"
                  >
                    <div className="flex items-start space-x-4">
                      <Image
                        src={assets.images.review_user}
                        width={50}
                        height={50}
                        alt="Review User"
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {/* Display stars for rating */}
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              className={cn(
                                "w-4 h-4",
                                index < review.rating
                                  ? "text-primary"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between">
                          <p className="font-semibold text-gray-900">
                            {review.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(review.createdAt), "MMMM d, yyyy")}
                          </p>
                        </div>
                        <p className="mt-2 text-gray-700 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card
                    key={review._id}
                    className="p-6 shadow-md border rounded-lg"
                  >
                    <p className="text-gray-500 text-center">
                      Your review is awaiting approval.
                    </p>
                  </Card>
                )
              )}
            </div>
          </div>

          {/* Review Form */}
          <Card className="border-2 border-primary rounded-lg p-8 shadow-lg flex-1">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Add a Review
            </h2>
            <ReviewForm product={product} />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Review;

// "use client";

// import assets from "@/app/assets";
// import { Card } from "@/components/ui/card";
// import ReviewForm from "@/form/ReviewForm";
// import { cn } from "@/lib/utils";
// import { useGetAllReviewsQuery } from "@/redux/api/features/review/reviewApi";
// import Image from "next/image";
// import { FaStar } from "react-icons/fa"; // Display stars for ratings
// import { format } from "date-fns"; // For formatting dates

// const Review = ({ ProductId }: { ProductId: string }) => {
//   const { data, isLoading, error } = useGetAllReviewsQuery(ProductId);

//   if (isLoading) {
//     return <p className="text-center text-gray-600">Loading reviews...</p>;
//   }

//   if (error) {
//     return (
//       <p className="text-center text-red-600">
//         Failed to load reviews. Please try again later.
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {data?.length === 0 ? (
//         <div className="flex flex-col items-center justify-center space-y-6">
//           <p className="text-center text-gray-500 text-lg">
//             No reviews yet. Be the first to share your thoughts!
//           </p>
//           {/* Full-width review form */}
//           <Card className="border-2 border-primary rounded-lg p-8 shadow-lg w-full">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Leave a Review
//             </h2>
//             <ReviewForm ProductId={ProductId} />
//           </Card>
//         </div>
//       ) : (
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Reviews section */}
//           <div className="flex-1">
//             <h1 className="font-bold text-2xl text-gray-800 mb-6">
//               Customer Reviews
//             </h1>
//             <div className="space-y-6">
//               {data.map((review: any) => (
//                 <Card
//                   key={review._id}
//                   className="p-6 shadow-md border rounded-lg"
//                 >
//                   <div className="flex items-start space-x-4">
//                     <Image
//                       src={assets.images.review_user}
//                       width={50}
//                       height={50}
//                       alt="Review User"
//                       className="rounded-full"
//                     />
//                     <div className="flex-1">
//                       <div className="flex items-center mb-2">
//                         {/* Display stars for rating */}
//                         {[...Array(5)].map((_, index) => (
//                           <FaStar
//                             key={index}
//                             className={cn(
//                               "w-4 h-4",
//                               index < review.rating
//                                 ? "text-primary"
//                                 : "text-gray-300"
//                             )}
//                           />
//                         ))}
//                       </div>
//                       <div className="flex justify-between">
//                         <p className="font-semibold text-gray-900">
//                           {review.name}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {format(new Date(review.createdAt), "MMMM d, yyyy")}
//                         </p>
//                       </div>
//                       <p className="mt-2 text-gray-700 leading-relaxed">
//                         {review.comment}
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           {/* Review Form */}
//           <Card className="border-2 border-primary rounded-lg p-8 shadow-lg flex-1">
//             <h2 className="text-lg font-bold text-gray-800 mb-2">
//               Add a Review
//             </h2>
//             <ReviewForm ProductId={ProductId} />
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Review;
