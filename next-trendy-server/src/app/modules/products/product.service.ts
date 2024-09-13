import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import { TVariant } from '../varient/variant.interface';
import { Variant } from '../varient/variant.model';
const createProductIntoDB = async (productPayload: TProduct) => {
  // Create the product in the database
  const result = await Product.create(productPayload);

  return result;
};


// const getAllProductsFromDB = async (query: Record<string, unknown>) => {
//   const productQuery = new QueryBuilder(
//     Product.find({ isDeleted: false }).populate('variant'),
//     query,
//   )
//     .search(productSearchableFields)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await productQuery.modelQuery;
//   const meta = await productQuery.countTotal();

//   return {
//     meta,
//     result,
//   };
// };
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  // Start with the base query
  let productQuery = Product.find({ isDeleted: false }).populate('variant');

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
  try {
    const result = await Product.aggregate([
      // Match the product by ID
      { $match: { _id: new mongoose.Types.ObjectId(id) } },

      // Lookup to join with the 'reviews' collection
      {
        $lookup: {
          from: 'reviews', // Collection name to join
          localField: 'reviews.reviewId', // Local field for joining
          foreignField: '_id', // Foreign field in the 'reviews' collection
          as: 'reviews', // The output array field
        },
      },

      // Lookup to join with the 'variants' collection
      {
        $lookup: {
          from: 'variants', // Assuming 'variants' is the name of the collection for variants
          localField: 'variant', // The field in 'Product' that references the variants
          foreignField: '_id', // The field in 'variants' that corresponds to the local field
          as: 'variant', // The output array field
        },
      },

      // Calculate the average rating from the reviews
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' }, // Calculate average rating from reviews
        },
      },
    ]);

    return result;
  } catch (error) {
    console.error('Error fetching products and reviews:', error);
    throw error;
  }
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
  const result = await Product.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,

  getSingleProductFromDB,
  getAllProductsByCategoryFromDB,
  deleteProductIntoDB,
  getAllProductsFromDBForVariant,
};
