import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../products/product.model';
import { TVariant } from './variant.interface';
import { Variant } from './variant.model';

const createVariant = async (payload: TVariant) => {
  try {
    const productId = payload.productId;

    // Create the Variant
    const createdVariant = await Variant.create(payload);

    // Extract the _id of the created Variant
    const VariantId = createdVariant._id;

    // Update the product with the _id of the created Variant
    await Product.updateOne(
      { _id: productId },
      {
        $push: { variant: { VariantId: VariantId.toString() } },
      },
    );

    return createdVariant;
  } catch (error) {
    console.error('Error creating Variant:', error);
    throw error;
  }
};

const getAllVariants = async () => {
  const result = await Variant.find();
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
