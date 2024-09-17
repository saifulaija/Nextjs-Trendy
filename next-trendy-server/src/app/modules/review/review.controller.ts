import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await reviewServices.createReview(productId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'review is created successfully',
    data: result,
  });
});
const getAllReviews = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await reviewServices.getAllReviews(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'reviews are fetched successfully',
    data: result,
  });
});
const getAllPendingReviews = catchAsync(async (req, res) => {

  const result = await reviewServices.getAllPendingReviews();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'pending reviews are fetched successfully',
    data: result,
  });
});
const updateReview = catchAsync(async (req, res) => {
const {id}=req.params
  const result = await reviewServices.reviewUpdate(id,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'review updated successfully',
    data: result,
  });
});

export const reviewControllers = {
  createReview,
  getAllReviews,
  getAllPendingReviews,
  updateReview
};
