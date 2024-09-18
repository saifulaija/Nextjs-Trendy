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
  const result = await Variant.find().populate('productId');
  return result;
};

const deleteVariant = async (id: string) => {
  // Find the Variant
  const variant = await Variant.findById(id);

  if (!variant) {
    throw new AppError(httpStatus.NOT_FOUND, 'Variant not found');
  }

  // Find the associated product
  const product = await Product.findById(variant.productId);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Variant not found');
  }

  // Find the index of the Variant in the product's Variants array
  const variantIndex = product?.variant?.findIndex(
    (item) => item.variantId.toString() === id,
  );

  if (variantIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Variant not found in product');
  }

  // Remove the Variant from the product's Variants array
  if (product.variant) {
    product.variant.splice(variantIndex as number, 1);
  }

  // Save the product
  await product.save();

  // Delete the Variant document
  const result = await Variant.findByIdAndDelete(id);

  return result;
};

export const VariantServices = {
  createVariant,
  getAllVariants,
  deleteVariant,
};
