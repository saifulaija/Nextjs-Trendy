import { Schema, model } from 'mongoose';
import { TProduct, TReviews, TVariant } from './product.interface';

const reviewSchema = new Schema<TReviews>({
  reviewId: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
  },
});
const variantSchema = new Schema<TVariant>({
  variantId: {
    type: Schema.Types.ObjectId,
    ref: 'Variant',
  },
});

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
    reviews: [reviewSchema],
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
    tags: {
      type: [String],
    },

    material: {
      type: String,
      required: true,
    },

    selectedSize: {
      type: String,
      default: '0',
    },
    selectedColor: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);
