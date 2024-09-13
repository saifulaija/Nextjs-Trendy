import { Schema, model, Types } from 'mongoose';
import { TProduct } from './product.interface';




const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
   
    variant: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Variant',
      },
    ],
    subCategory: {
      type: String,
    },
    sellsQuantity: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    productCode: {
      type: String,
      default: 'shoe-09',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
    },
    material: {
      type: String,
      required: true,
    },
    totalReviews:{
      type:Number,
      default:0
    },
    averageRating:{
      type:Number,
      required:[true,'average rating is required'],
      default:0
    }
  },
  {
    timestamps: true,
  },
);


export const Product = model<TProduct>('Product', productSchema);
