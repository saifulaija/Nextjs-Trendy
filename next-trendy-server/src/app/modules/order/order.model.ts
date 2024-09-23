import { model, Schema } from 'mongoose';
import {
  TOrder,
  TOrderItem,
  TPaymentDetails,
  TShippingAddress,
} from './order.interface';

const OrderItemSchema = new Schema<TOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount: { type: Number },
  size: { type: String },
  color: { type: String },
  image: { type: String },
});

const ShippingAddressSchema = new Schema<TShippingAddress>({
  fullName: { type: String, required: true },
  address: { type: String },
  country: { type: String },
  description: { type: String },
  phoneNumber: { type: String, required: true },
});

const PaymentDetailsSchema = new Schema<TPaymentDetails>({
  method: {
    type: String,
    enum: ['cash on delivery', 'cash on payment'],
    required: true,
  },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], required: true },
  transactionId: { type: String },
});

const OrderSchema = new Schema<TOrder>({
  orderNumber: { type: String, required: true },
  items: [OrderItemSchema],
  shippingAddress: ShippingAddressSchema,
  paymentDetails: PaymentDetailsSchema,
  totalAmount: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancel'],
    required: true,
  },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  trackingNumber: { type: String },
});

export const Order = model<TOrder>('Order', OrderSchema);
