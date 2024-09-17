import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../products/product.model';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { startSession } from 'mongoose';

const createReview = async (
  productId: string,
  reviewData: Partial<TReview>,
): Promise<TReview | any> => {
  const session = await Product.startSession();

  try {
    session.startTransaction();
    const product = await Product.findById({ _id: productId }).session(session);
    if (!product) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Product not found');
    }

    // Create the review within the transaction
    const review = await Review.create(
      [
        {
          productId: product._id,
          ...reviewData,
        },
      ],
      { session },
    );

    const reviewsData = await Review.find({ productId: product._id }).session(
      session,
    );

    // Calculate the total reviews and average rating
    const reviewsCount = reviewsData.length;
    const totalRating = reviewsData.reduce(
      (acc, review) => acc + (review.rating || 0),
      0,
    );
    const averageRating = totalRating / reviewsCount;

    // Update the product's total rating
    await Product.findByIdAndUpdate(
      { _id: productId },
      {
        totalReviews: reviewsCount,
        averageRating: averageRating,
      },
      { session },
    );

    // Commit the transaction on success
    await session.commitTransaction();
    session.endSession();

    return review[0];
  } catch (error) {
    // Abort the transaction in case of an error
    console.error('Error creating review:', error);
    await session.abortTransaction();
    // throw error;
  }
  session.endSession();
};

const getAllReviews = async (productId: string) => {
  const result = await Review.find({ productId: productId, isDeleted: false });
  return result;
};
const getAllApprovedReviews = async () => {
  const result = await Review.find({ status:"approved", isDeleted: false });
  return result;
};
const getAllPendingReviews = async () => {
  const result = await Review.find({ isDeleted: false });
  return result;
};

const reviewUpdate = async (id: string, reviewData: Partial<TReview>) => {
  // Log incoming review data
  console.log(reviewData, 'Review Data to update');

  // Check if the review exists
  const isExistingReview = await Review.findById(id);
  if (!isExistingReview) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Review not found');
  }

  // Update the review status
  const result = await Review.findByIdAndUpdate(
    id,
    { status: reviewData.status }, // Only update the provided fields
    { new: true }, // Return the updated review
  );

  return result;
};

const deleteReview = async (id: string) => {
  const isExistingReview = await Review.findById(id);
  if (!isExistingReview) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This review not found');
  }

  const session = await startSession();

  try {
    session.startTransaction();

    // Delete the review
    const result = await Review.findByIdAndDelete(id).session(session);

    // Fetch the associated product
    const product = await Product.findById(isExistingReview.productId).session(
      session,
    );
    if (!product) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Product not found');
    }

    // Decrement totalReviews if more than 0
    if (product.totalReviews > 0) {
      // Calculate new totalReviews
      const totalReviews = product.totalReviews - 1;

      // Calculate new averageRating if there are remaining reviews
      let averageRating = 0;
      if (totalReviews > 0) {
        const remainingReviews = await Review.find({ productId: product._id });
        const totalRating = remainingReviews.reduce(
          (sum, review) => sum + review.rating,
          0,
        );
        averageRating = totalRating / totalReviews;
      }

      // Update the product's totalReviews and averageRating
      await Product.findByIdAndUpdate(
        product._id,
        {
          $set: {
            totalReviews,
            averageRating, // Update averageRating
          },
        },
        { session },
      );
    } else {
      // If no reviews are left, set averageRating to 0
      await Product.findByIdAndUpdate(
        product._id,
        {
          $set: {
            totalReviews: 0,
            averageRating: 0, 
          },
        },
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete review',
    );
  }
};


export const reviewServices = {
  createReview,
  getAllReviews,
  getAllPendingReviews,
  reviewUpdate,
  getAllApprovedReviews,
  deleteReview

};
