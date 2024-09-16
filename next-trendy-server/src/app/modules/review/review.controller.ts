import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.service";


const createReview = catchAsync(async (req, res) => {
  const{productId}=req.params
  console.log(productId,'productId');
  console.log(req.body,'data==========================');
  
  
    const result = await reviewServices.createReview(productId,req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'review is created successfully',
      data: result,
    });
  });
const getAllReviews = catchAsync(async (req, res) => {
    const result = await reviewServices.getAllReviews();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'reviews are fetched successfully',
      data: result,
    });
  });


  export const reviewControllers={
    createReview,
    getAllReviews,
   
  }