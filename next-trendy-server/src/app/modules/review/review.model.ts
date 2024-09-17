import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:[true,'email is required']
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required:[true,"product id is required"]
    },
    productName:{
      type:String,
      required:[true,"product name is required"]
      
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: [true,'rating is required'],
    },
    status:{
      type:String,
      default:"pending",
      required:[true,"status is required"]
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<TReview>('Review', reviewSchema);
