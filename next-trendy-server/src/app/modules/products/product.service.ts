import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import { TVariant } from '../varient/variant.interface';
import { Variant } from '../varient/variant.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
const createProductIntoDB = async (productPayload: TProduct) => {
  // Create the product in the database
  const result = await Product.create(productPayload);

  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  // Start with the base query
  let productQuery = Product.find({
    isDeleted: false,
    variant: { $exists: true, $not: { $size: 0 } },
  }).populate('variant');

  // Check if there's a filter for variant fields
  if (query.variant) {
    const variantFilter = query.variant as Record<string, any>;

    // Apply filter based on variant fields using elemMatch
    productQuery = productQuery.where('variant').elemMatch(variantFilter);
  }

  // Use the QueryBuilder for search, filter, sort, paginate, and fields
  const queryBuilder = new QueryBuilder(productQuery, query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

const getAllProductsFromDBForVariant = async (
  query: Record<string, unknown>,
) => {
  const productQuery = new QueryBuilder(
    Product.find({ isDeleted: false }).populate('variant'),
    query,
  )
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).populate('variant');
  return result;
};

const getNewArrivalProduct = async () => {
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000; 
  const now = new Date();
  const result = await Product.find({
    arrivalDate: {
      $gte: new Date(now.getTime() - THIRTY_DAYS),
    },
  })
    .populate('variant')
    .sort({ createdAt: -1 })
    .limit(8);
  return result;
};

const getAllProductsByCategoryFromDB = async (category: string) => {
  let result;

  // Determine the field based on the presence of category, subCategory, or productType in any product
  const field = (await Product.exists({ category }))
    ? 'category'
    : (await Product.exists({ subCategory: category }))
      ? 'subCategory'
      : 'productType';

  // Build the query based on the determined field
  let query = {};
  switch (field) {
    case 'category':
      query = { category };
      break;
    case 'subCategory':
      query = { subCategory: category };
      break;
    case 'productType':
      query = { productType: category };
      break;
    default:
      throw new Error('Invalid field');
  }

  // Execute the query using the QueryBuilder pattern
  const productQuery = new QueryBuilder(
    Product.find().where(query), // Pass both the initial query and the query object
    {},
  )
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  // Execute the model query
  const { modelQuery } = productQuery;
  result = await modelQuery;

  // Count total records for pagination
  const meta = await productQuery.countTotal();

  // Return the result along with meta information
  return { meta, result };
};

const deleteProductIntoDB = async (id: string) => {
  // Start a session for the transaction
  const session = await Product.startSession();

  try {
    session.startTransaction();

    // Fetch the product by its ID
    const productData = await Product.findById(id).session(session);
    if (!productData) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }

    // Extract variant IDs from the product
    const variantIds = productData.variant;

    // Delete associated variants if they exist
    if (variantIds && variantIds.length > 0) {
      await Variant.deleteMany({ _id: { $in: variantIds } }).session(session);
      console.log('Variants deleted successfully');
    }

    // Delete the product itself
    const deletedProduct = await Product.findByIdAndDelete(id).session(session);

    // Commit the transaction
    await session.commitTransaction();
    return deletedProduct;
  } catch (error) {
    // Abort the transaction in case of any error
    await session.abortTransaction();
    console.error('Transaction aborted due to an error:', error);
    throw error; // Re-throw the error for further handling
  } finally {
    // End the session in the 'finally' block to ensure it always executes
    session.endSession();
  }
};

const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  const isExistProduct = await Product.findById(id);
  if (!isExistProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This product was not found');
  }

  console.log(payload);

  // Update the product with the provided payload
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  updateProduct,
  getSingleProductFromDB,
  getAllProductsByCategoryFromDB,
  deleteProductIntoDB,
  getAllProductsFromDBForVariant,
  getNewArrivalProduct,
};
