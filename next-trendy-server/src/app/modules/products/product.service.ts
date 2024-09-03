import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import { TVariant } from '../varient/variant.interface';
import { Variant } from '../varient/variant.model';

// const createProductIntoDB = async (productPayload: TProduct,variantPayload:TVariant) => {
 
  
//   const result = await Product.create(productPayload);
//   if(result){
//     const variantData={...variantPayload,productId:result._id}
//    const variant= await Variant.create(variantData)
//    if(variant){
//       await Product.updateOne(
//         { _id:variant  },
//         {
//           $push: { variant: { productId: variant.toString() } },
//         },
//       );
//    }
//   }
//   return result;
// };
const createProductIntoDB = async (
  productPayload: TProduct,
  variantPayload: TVariant,
) => {
  // Create the product in the database
  const result = await Product.create(productPayload);

  if (result) {
    // Prepare the variant data with the associated productId
    const variantData = { ...variantPayload, productId: result._id };

    // Create the variant in the database
    const variant = await Variant.create(variantData);

    if (variant) {
      // Update the product to associate it with the newly created variant
      await Product.updateOne(
        { _id: result._id }, // Correctly use the product ID
        {
          $push: { variant: variant._id }, // Use the variant's ObjectId properly
        },
      );
    }
  }

  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
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

const getSingleProductFromDB = async (id:string) => {
  try {
    const result = await Product.aggregate([
      {$match: {_id:new mongoose.Types.ObjectId(id)}},

      // 1st stage: Lookup reviews collection
      {
        $lookup: {
          from: 'reviews',
          localField: 'reviews.reviewId',
          foreignField: '_id',
          as: 'reviews',
        },
      },
      // 2nd stage: Calculate average rating
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
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
};
