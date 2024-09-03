import { Schema, model } from 'mongoose';
import { TVariant } from './variant.interface';

const variantSchema = new Schema<TVariant>({
  size: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: [
    {
      color: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  isDeleted: { type: Boolean, default: false },
});

export const Variant = model<TVariant>('Variant', variantSchema);
