/* eslint-disable @typescript-eslint/no-explicit-any */

import { Order } from './order.model';
import { sendEmail } from '../../utils/sendEmail';
import { Product } from '../products/product.model';
import { Variant } from '../varient/variant.model';
import { TOrder } from './order.interface';
import { User } from '../User/user.model';





// const createOrderIntoDB = async (payload: TOrder): Promise<any> => {
//   const session = await Order.startSession();
//   session.startTransaction();

//   try {
//     // Create the order in the database
//     const result = await Order.create([payload], { session });

//     // Update the product stock and sales quantities
//     const orderItems = payload.items || [];
//     for (const item of orderItems) {
//       // Find the corresponding variant for the product, size, and color
//       const variant = await Variant.findOne({
//         product: item.productId,
//         size: item.size,
//         isDeleted: false,
//       }).session(session);

//       if (!variant) {
//         throw new Error(`Variant not found for product ${item.name}`);
//       }

//       // Find the specific stock item by color and update the quantity
//       const stockItem = variant.variant.find((v) => v.color === item.color);

//       if (!stockItem || stockItem.quantity < item.quantity) {
//         throw new Error(`Insufficient stock for ${item.name} in ${item.color}`);
//       }

//       // Decrease the stock quantity
//       stockItem.quantity -= item.quantity;

//       // Save the updated variant
//       await variant.save({ session });

//       // Update the sellsQuantity in the Product model
//       const product = await Product.findById(item.productId).session(session);
//       if (product) {
//         product.sellsQuantity = (product.sellsQuantity || 0) + item.quantity;
//         await product.save({ session });
//       }
//     }

//     const userData= User.create({phone:payload.shippingAddress.phoneNumber})
//     await session.commitTransaction();

//     return result;
//   } catch (error) {
//     console.error('Error creating order:', error);

//     // Abort the transaction on error
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     // End the session
//     session.endSession();
//   }
// };



const createOrderIntoDB = async (payload: TOrder): Promise<any> => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    // Create the order in the database
    const result = await Order.create([payload], { session });

    // Update the product stock and sales quantities
    const orderItems = payload.items || [];
    for (const item of orderItems) {
      // Find the corresponding variant for the product, size, and color
      const variant = await Variant.findOne({
        product: item.productId,
        size: item.size,
        isDeleted: false,
      }).session(session);

      if (!variant) {
        throw new Error(`Variant not found for product ${item.name}`);
      }

      // Find the specific stock item by color and update the quantity
      const stockItem = variant.variant.find((v) => v.color === item.color);

      if (!stockItem || stockItem.quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${item.name} in ${item.color}`);
      }

      // Decrease the stock quantity
      stockItem.quantity -= item.quantity;

      // Save the updated variant
      await variant.save({ session });

      // Update the sellsQuantity in the Product model
      const product = await Product.findById(item.productId).session(session);
      if (product) {
        product.sellsQuantity = (product.sellsQuantity || 0) + item.quantity;
        await product.save({ session });
      }
    }

    // Create a user if they do not already exist
    const existingUser = await User.findOne({
      phone: payload.shippingAddress.phoneNumber,
    }).session(session);
    if (!existingUser) {
      await User.create([{ phone: payload.shippingAddress.phoneNumber }], {
        session,
      });
    }

    // Commit the transaction
    await session.commitTransaction();

    return result;
  } catch (error) {
    console.error('Error creating order:', error);

    // Abort the transaction on error
    await session.abortTransaction();
    throw error;
  } finally {
    // End the session
    session.endSession();
  }
};









const getAllOrdersFromDB = async () => {
  const result = await Order.find().sort({ createdAt: -1 });

  return result;
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};
const getSingleOrderByOrderNumberFromDB = async (id: string) => {
  const result = await Order.findOne({ orderNumber: id });
  return result;
};



const getSuccessfulDelivery = async () => {
  const result = await Order.find({
    deliveryStatus: 'delivered',
  }).sort({ updatedAt: -1 });

  return result;
};

const getMyOrders = async (email: string) => {
  const result = await Order.find({ buyerEmail: email }).sort({
    updatedAt: -1,
  });
  return result;
};

const cancelOrder = async (id: string) => {
  const result = await Order.findOneAndUpdate(
    { _id: id }, // Use _id instead of id for MongoDB's unique identifier
    {
      deliveryStatus: 'cancel', // Assuming deliveryStatus is the field to be updated
    },
    { new: true },
  );

  return result;
};

export const orderServices = {
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  createOrderIntoDB,
  getSingleOrderByOrderNumberFromDB,
  getSuccessfulDelivery,
  getMyOrders,
  cancelOrder,
};
