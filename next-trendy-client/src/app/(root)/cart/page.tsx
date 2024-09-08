"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2, Edit, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addToCart,
  decreaseCart,
  removeFromCart,
  clearCart,
} from "@/redux/api/features/product/cartSlice";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { it } from "node:test";
import { formateMoney } from "@/utils/formateMoney";

const ShoppingCart = () => {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleDecreaseQuantity = (item: any) => {
    dispatch(decreaseCart(item));
  };

  const handleIncreaseQuantity = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (item: any) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total amount and total saved amount
  const totalAmount = cart.cartItems.reduce((sum, item) => {
    const discountAmount = (item.price * (item.discount || 0)) / 100;
    const finalPrice = (item.price - discountAmount) * item.cartQuantity;
    return sum + finalPrice;
  }, 0);

  const totalSaved = cart.cartItems.reduce((sum, item) => {
    const discountAmount = (item.price * (item.discount || 0)) / 100;
    const savedAmount = discountAmount * item.cartQuantity;
    return sum + savedAmount;
  }, 0);

  const handleDetails = (id: string) => {
    router.push(`/product/details/${id}`);
  };

  return (
    // <div className="w-full py-10 px-4 md:p-10">
    //   <Card className="max-w-5xl flex flex-col justify-center items-center mx-auto">
    //     {cart.cartItems.length === 0 ? (
    //       <div className="text-center py-20">
    //         <p className="text-gray-500">Your cart is empty.</p>
    //       </div>
    //     ) : (
    //       <div className="w-full overflow-x-auto">
    //         <Table>
    //           <TableHeader>
    //             <TableRow>
    //               <TableHead>Image</TableHead>
    //               <TableHead>Product</TableHead>
    //               <TableHead>Size</TableHead>
    //               <TableHead>Color</TableHead>
    //               <TableHead>Quantity</TableHead>
    //               <TableHead className="text-center">Price</TableHead>
    //               <TableHead className="text-center">Saved</TableHead>
    //               <TableHead className="text-center">Actions</TableHead>
    //             </TableRow>
    //           </TableHeader>
    //           <TableBody>
    //             {cart.cartItems.map((item) => {
    //               const discountAmount =
    //                 (item.price * (item.discount || 0)) / 100;
    //               const savedAmount = discountAmount * item.cartQuantity;
    //               const finalPrice =
    //                 (item.price - discountAmount) * item.cartQuantity;

    //               return (
    //                 <TableRow key={item._id + item.color}>
    //                   <TableCell>
    //                     <Image
    //                       src={item.image || "/image"}
    //                       alt={item.name}
    //                       width={50}
    //                       height={50}
    //                       className="object-cover rounded-md"
    //                     />
    //                   </TableCell>
    //                   <TableCell>{item.name}</TableCell>
    //                   <TableCell>{item.size}</TableCell>
    //                   <TableCell>{item.color}</TableCell>
    //                   <TableCell>
    //                     <div className="flex items-center space-x-2 border">
    //                       <Button
    //                         onClick={() => handleDecreaseQuantity(item)}
    //                         variant="ghost"
    //                       >
    //                         <MinusCircle size={18} />
    //                       </Button>
    //                       <span>{item.cartQuantity}</span>
    //                       <Button
    //                         onClick={() => handleIncreaseQuantity(item)}
    //                         variant="ghost"
    //                       >
    //                         <PlusCircle size={18} />
    //                       </Button>
    //                     </div>
    //                   </TableCell>
    //                   <TableCell className="text-right">
    //                     <span className="font-serif font-semibold ">৳</span>
    //                     {finalPrice.toFixed(2)}
    //                   </TableCell>
    //                   <TableCell className="text-right text-red-500">
    //                     <span className="font-serif font-semibold ">-৳</span>
    //                     {savedAmount.toFixed(2)}
    //                   </TableCell>
    //                   <TableCell className="text-right">
    //                     <div className="flex space-x-2">
    //                       <Button
    //                         onClick={() => handleRemoveItem(item)}
    //                         variant="ghost"
    //                       >
    //                         <Trash2 size={18} />
    //                       </Button>
    //                       <Button
    //                         onClick={() => {
    //                           handleDetails(item._id);
    //                         }}
    //                         variant="ghost"
    //                       >
    //                         <Edit size={18} />
    //                       </Button>
    //                     </div>
    //                   </TableCell>
    //                 </TableRow>
    //               );
    //             })}
    //           </TableBody>
    //         </Table>

    //         <div className="flex justify-center items-center mx-auto max-w-4xl w-full">
    //           <div className="p-6  w-full">
    //             <p className="font-semibold text-xl mb-4">Cart Summary</p>
    //             <Separator className="mb-4" />
    //             <div className="flex justify-between items-center mb-4">
    //               <p className="text-gray-600">Total Saved</p>
    //               <Badge className="text-white">
    //                 <span className="font-serif font-semibold">৳</span>{" "}
    //                 {totalSaved.toFixed(2)}
    //               </Badge>
    //             </div>
    //             <Separator className="mb-4" />
    //             <div className="flex justify-between items-center mb-6">
    //               <p className="text-gray-600">Total Amount</p>
    //               <p className="text-lg font-semibold">
    //                 <span className="font-serif font-semibold">৳</span>{" "}
    //                 {totalAmount.toFixed(2)}
    //               </p>
    //             </div>
    //             <div className="flex space-x-4">
    //               <Button
    //                 onClick={handleClearCart}
    //                 className={cn(
    //                   "bg-red-500 text-white hover:bg-red-600 w-full uppercase"
    //                 )}
    //               >
    //                 Clear Cart
    //               </Button>
    //               <Button
    //                 className={cn(
    //                   "bg-blue-500 text-white hover:bg-blue-600 w-full uppercase"
    //                 )}
    //               >
    //                 Proceed to Checkout
    //               </Button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </Card>
    // </div>
    <div className="w-full py-10 px-4 md:p-10">
   
      <Card className="max-w-7xl mx-auto flex flex-col">
        {cart.cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row">
            {/* Table Section */}
            <div className="w-full md:w-3/5 pr-4 mb-6 md:mb-0">
              <h1 className="font-semibold text-xl my-2 text-center">
                An overview of your order
              </h1>
              <Separator />
              <Table className="overflow-x-auto overflow-y-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Saved</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.cartItems.map((item) => {
                    const discountAmount =
                      (item.price * (item.discount || 0)) / 100;
                    const savedAmount = discountAmount * item.cartQuantity;
                    const finalPrice =
                      (item.price - discountAmount) * item.cartQuantity;

                    return (
                      <TableRow key={item._id}>
                        <TableCell>
                          <img
                            src={item.image || "/image"}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              onClick={() => handleDecreaseQuantity(item)}
                              variant="ghost"
                            >
                              <MinusCircle size={18} />
                            </Button>
                            <span>{item.cartQuantity}</span>
                            <Button
                              onClick={() => handleIncreaseQuantity(item)}
                              variant="ghost"
                            >
                              <PlusCircle size={18} />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {formateMoney(Number(finalPrice.toFixed(0)))}
                        </TableCell>
                        <TableCell className="text-right text-red-500">
                          {formateMoney(Number(savedAmount.toFixed(0)))}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => handleRemoveItem(item)}
                            variant="ghost"
                          >
                            <X size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="flex justify-end -mt-6">
                <Button
                  onClick={handleClearCart}
                  variant="link"
                  className={cn("text-red-500")}
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Details Section */}
            <div className="w-full md:w-2/5 p-4 bg-gray-50 rounded-md">
              <h2 className="font-semibold text-xl">Order Details</h2>
              <Separator className="mb-4" />
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400">Subtotal</p>
                <p className="text-gray-400">
                  {formateMoney(Number(totalAmount.toFixed(0)))}
                </p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400">Shipping</p>
                <p className="text-gray-400">Free</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400">Estimated Tax</p>
                <p className="text-gray-400">$-</p>
              </div>
              <Separator />
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600 font-semibold">Total</p>
                <p className="text-lg font-semibold">
                  {formateMoney(Number(totalAmount.toFixed(0)))}
                </p>
              </div>
              <div className="flex space-x-4 mt-4">
            
                  <Button
                    className={cn("w-full uppercase")}
                    // onClick={handleGotoCheckout}
                  >
                    G0 to Checkout
                  </Button>
          
            
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShoppingCart;







