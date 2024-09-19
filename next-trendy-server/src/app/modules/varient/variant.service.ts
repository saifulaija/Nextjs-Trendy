import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../products/product.model';
import { TVariant } from './variant.interface';
import { Variant } from './variant.model';
import mongoose from 'mongoose';
import { Review } from '../review/review.model';

const createVariant = async (
  payload: Partial<TVariant>,
): Promise<TVariant | any> => {
  const session = await mongoose.startSession(); // Start the session
  try {
    session.startTransaction();

    // Create variant (returns an array)
    const createdVariant = await Variant.create([{ ...payload }], { session });

    if (!createdVariant || createdVariant.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create variant');
    }

    // Extract the _id of the created Variant (from the first element of the array)
    const variantId = createdVariant[0]._id;

    // Update the product by pushing the variantId directly
    await Product.findOneAndUpdate(
      { _id: payload.product }, // Filter the product by its ID
      { $push: { variant: variantId } }, // Push variantId directly
      { new: true, session }, // Use the session
    );

    await session.commitTransaction();
    session.endSession();

    return createdVariant[0];
  } catch (error) {
    // If error, abort the transaction
    await session.abortTransaction();
    console.error('Error creating Variant:', error);
  }
  session.endSession();
};

const getAllVariants = async () => {
  const result = await Variant.find().populate('product');
  return result;
};

// const updateVariant = async (id: string, payload: Partial<TVariant>) => {
//   const { variant, ...remainingVariantData } = payload;
//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingVariantData,
//   };
//   if (variant && Object.keys(color).length) {
//     for (const [key, value] of Object.entries(color)) {
//       modifiedUpdatedData[`color.${key}`] = value;
//     }
//   }
//   if (variant && Object.keys(quantity).length) {
//     for (const [key, value] of Object.entries(quantity)) {
//       modifiedUpdatedData[`quantity.${key}`] = value;
//     }
//   }
//   const result = await Review.findByIdAndUpdate(id, modifiedUpdatedData, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };



const updateVariant = async (id: string, payload: Partial<TVariant>) => {
  const { variant, ...remainingVariantData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingVariantData,
  };

  // If 'variant' exists and is an array, process its entries
  if (variant && Array.isArray(variant)) {
    variant.forEach((item, index) => {
      if (item.color) {
        modifiedUpdatedData[`variant.${index}.color`] = item.color;
      }
      if (item.quantity) {
        modifiedUpdatedData[`variant.${index}.quantity`] = item.quantity;
      }
      if (item.image) {
        modifiedUpdatedData[`variant.${index}.image`] = item.image;
      }
    });
  }

  // Update the variant in the database
  const result = await Variant.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const VariantServices = {
  createVariant,
  getAllVariants,
  updateVariant,
};
