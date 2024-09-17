import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../products/product.model';
import { TReview } from './review.interface';
import { Review } from './review.model';

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

const getAllReviews = async (productId:string) => {
  const result = await Review.find({ productId: productId, isDeleted: false });
  return result;
};

export const reviewServices = {
  createReview,
  getAllReviews,
};
