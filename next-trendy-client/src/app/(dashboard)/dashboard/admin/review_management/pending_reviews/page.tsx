"use client"

import { useGetAllPendingReviewsQuery} from "@/redux/api/features/review/reviewApi";

const PendingReviewPage = () => {
const{data,isLoading}=useGetAllPendingReviewsQuery({})
console.log(data);

  return <div>
    <h1>All Pending Reviews</h1>
  </div>;
};

export default PendingReviewPage;
