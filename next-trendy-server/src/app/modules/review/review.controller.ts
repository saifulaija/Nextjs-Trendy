import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.service";


const createReview = catchAsync(async (req, res) => {
  const{title}=req.params
    const result = await reviewServices.createReview(title,req.body);
  
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
const deleteReview = catchAsync(async (req, res) => {
    const{id}=req.params
    const result = await reviewServices.deleteReview(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'review deleted successfully',
      data: result,
    });
  });

  export const reviewControllers={
    createReview,
    getAllReviews,
    deleteReview
  }