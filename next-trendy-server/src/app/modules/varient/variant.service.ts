import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../products/product.model';
import { TVariant } from './variant.interface';
import { Variant } from './variant.model';
import mongoose from 'mongoose';

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



export const VariantServices = {
  createVariant,
  getAllVariants,
 
};
