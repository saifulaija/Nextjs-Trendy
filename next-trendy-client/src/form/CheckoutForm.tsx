import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/api/features/order/orderApi";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/shared/LoadingButton/LoadingButton";
import { useState } from "react";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/authServices";

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Enter your full name",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  address: z.string().min(6, {
    message: "Enter a valid address",
  }),
  description: z.string().min(6, {
    message: "Enter a valid query",
  }),
});

const CheckoutForm = ({paymentMethod}:{paymentMethod:string}) => {
  const shipping = useAppSelector((state) => state.shipping);
  const [shippingCharge, setShippingCharge] = useState(shipping.shippingCost);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
//   const user = useAppSelector(selectCurrentUser);
  const cart = useAppSelector((state) => state.cart);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "+88",
      address: "",
      description: "",
    },
  });

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     // Prepare the payload by combining form values and cart data
  //     const orderPayload = {
  //       name: values.name,
  //       phone: values.phone,
  //       email: "sobuj@gmail.com",
  //       address: values.address,
  //       description: values.description,
  //       paymentSystem: "Cash on delivery",
  //       totalPrice: cart.cartTotalAmount,
  //       orderProduct: cart.cartItems.map((item: any) => ({
  //         productId: item._id,
  //         selectedQuantity: item.cartQuantity,
  //         name: item.name,
  //         price: item.price,
  //         discount: item.discount,
  //         image: item.image,
  //       })),
  //       orderNumber: `ORD${Date.now()}`,
  //     };

  //     // Make the API request to create the order
  //     const res = await createOrder(orderPayload).unwrap();
  //     console.log(res);
  //     toast.success("Order placed successfully", { position: "bottom-left" });
  //     router.push("/cart/order-success");
  //   } catch (error) {
  //     toast.error((error as any)?.data?.message || "An error occurred", {
  //       position: "bottom-left",
  //     });
  //   }
  // };
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  console.log(values);
  
  try {
    // Prepare the payload by combining form values and cart data
    const orderPayload: any = {
      orderNumber: `ORD-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`,

      items: cart.cartItems.map((item: any) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.cartQuantity,
        discount: item.discount,
        size: item.size,
        color: item.color,
        image: item.image,
      })),
      shippingAddress: {
        fullName: values.fullName,
        address: values.address,
        phoneNumber: values.phoneNumber,
        description: values.description,
        country: "Bangladesh", // Add default country if not provided
      },
      paymentDetails: {
        method: "cash on delivery",
        paymentStatus: "Pending",
      },
      totalAmount: cart.cartTotalAmount,
      shippingCharge: shippingCharge,
      orderStatus: "Pending",
      orderDate: new Date(),
    };

    // Make the API request to create the order
    console.log(orderPayload);
    
    const res = await createOrder(orderPayload);
   if(res?.data){
      const loginUser=await userLogin({ phone: orderPayload.shippingAddress.phoneNumber });
       if (loginUser?.data?.accessToken){
         storeUserInfo({ accessToken: loginUser?.data?.accessToken });
          router.refresh();
console.log(loginUser, "login");
       } 
    
  
     
     toast.success("Order placed successfully", { position: "bottom-left" });
      localStorage.setItem("orderData", JSON.stringify(orderPayload));
     router.push("/cart/order-success");
   }
  
  } catch (error) {
    toast.error((error as any)?.data?.message || "An error occurred", {
      position: "bottom-left",
    });
  }
};

// Helper function to calculate shipping charge based on location
const calculateShippingCharge = (
  location: "Outside Dhaka" | "Inside Dhaka"
): number => {
  return location === "Inside Dhaka" ? 50 : 100; // Example shipping charges
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 py-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className={cn("font-semibold rounded-[5px]")}
                      placeholder="Full Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className={cn("font-semibold rounded-[5px]")}
                      placeholder="Type 11 digit phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      className={cn("font-semibold rounded-[5px]")}
                      placeholder="Full Address(House,Thana,District/Jhela)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      rows={6}
                      className={cn("font-semibold rounded-[5px]")}
                      placeholder="অর্ডার প্রক্রিয়া সঠিকভাবে সম্পন্ন করার জন্য দয়া করে যে কোনো বিশেষ প্রয়োজনীয়তা উল্লেখ করুন, যেমন: রঙ, আকার, পরিমাণ, ডেলিভারির তারিখ বা কাস্টম নির্দেশনা।"
                      id="message-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <LoadingButton
            disabled={paymentMethod !== "cashOnDelivery"}
            type="submit"
            className="w-full font-bold uppercase"
            loading={isLoading}
          >
            Place Order
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
