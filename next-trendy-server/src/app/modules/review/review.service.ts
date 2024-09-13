import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../products/product.model';
import { TReview } from './review.interface';
import { Review } from './review.model';


const createReview = async (
  title: string,
  reviewData: Partial<TReview>,
): Promise<TReview | any> => {
  const session = await Product.startSession(); 
  
  try {
    session.startTransaction(); 
    const product = await Product.findOne({ name: title }).session(session); 
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
    await Product.updateOne(
      { name: title },
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

const getAllReviews = async () => {
  const result = await Review.find();
  return result;
};

// const deleteReview = async (id: string) => {
//   // Find the review
//   const review = await Review.findById(id);

//   if (!review) {
//       console.log('Review not found');
//       return;
//   }

//   // Find the associated product
//   const product = await Product.findById(review.productId);

//   if (!product) {
//       console.log('Product not found');
//       return;
//   }

//   // Find the index of the review in the product's reviews array
//   const reviewIndex = product?.reviews?.findIndex((item) => item.reviewId.toString() === id);

//   if (reviewIndex === -1) {
//       console.log('Review not found in product');
//       return;
//   }

//   // Remove the review from the product's reviews array
//   product?.reviews?.splice(reviewIndex, 1);

//   // Save the product
//   await product.save();

//   // Delete the review document
//   await Review.findByIdAndDelete(id);

//   console.log('Review deleted successfully');
// }

const deleteReview = async (id: string) => {
  // Find the review
  const review = await Review.findById(id);

  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }

  // Find the associated product
  const product = await Product.findById(review.productId);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }

  // Find the index of the review in the product's reviews array
  const reviewIndex = product?.reviews?.findIndex(
    (item) => item.reviewId.toString() === id,
  );

  if (reviewIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found in product');
  }

  // Remove the review from the product's reviews array
  if (product.reviews) {
    product.reviews.splice(reviewIndex as number, 1);
  }

  // Save the product
  await product.save();

  // Delete the review document
  const result = await Review.findByIdAndDelete(id);

  return result;
};

export const reviewServices = {
  createReview,
  getAllReviews,
  deleteReview,
};
