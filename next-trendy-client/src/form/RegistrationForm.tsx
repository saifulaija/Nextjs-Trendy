// "use client"
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import LoadingButton from "@/components/shared/LoadingButton/LoadingButton";
// import { toast } from "react-toastify";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// import { useState } from "react";
// import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
// import { Checkbox } from "@/components/ui/checkbox";
// import { uploadImage } from "@/utils/imgbb";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";


// const formSchema = z.object({
//   firstName: z.string().min(3, {
//     message: "Enter your first name",
//   }),
//   lastName: z.string().min(3, {
//     message: "Enter your last name",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email",
//   }),
//   profilePhoto: z.any(),
//   password: z.string().min(6, {
//     message: "Enter a valid password with at least 6 characters",
//   }),
// });

// const RegisterForm = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       profilePhoto: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     setIsLoading(true);

//     // Handle file upload if any
//     if (values.profilePhoto && values.profilePhoto.length > 0) {
//       try {
//         const url = await uploadImage(values.profilePhoto[0]);
//         values.profilePhoto = url;
//       } catch (error) {
//         toast.error("Error uploading profile photo", {
//           position: "bottom-left",
//         });
//         setIsLoading(false);
//         return;
//       }
//     } else {
//       values.profilePhoto = "";
//     }

//     try {
//       // Send data to the backend using Axios
//     //   const response = await axiosInstance.post("/user/create-user", values);

//     //   if (response.status === 200) {
//     //     toast.success("User registered successfully", {
//     //       position: "bottom-left",
//     //     });
//     //     navigate("/auth/login");
//     //   } else {
//     //     toast.error("Failed to register user", { position: "bottom-left" });
//     //   }
//     } catch (err: any) {
//       toast.error(err?.message || "An error occurred", {
//         position: "bottom-left",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="w-full max-w-5xl mx-auto"
//       >
//         <div className="w-full space-y-4">
//           {" "}
//           {/* Increased space-y for more vertical spacing */}
//           <div className="space-y-4">
//             <FormField
//               control={form.control}
//               name="firstName"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   {" "}
//                   {/* Full width for each input */}
//                   {/* <FormLabel>First Name (optional)</FormLabel> */}
//                   <FormControl>
//                     <Input
//                       type="text"
//                       className={cn("font-semibold rounded-[3px]")}
//                       placeholder="Full Name"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="lastName"
//               render={({ field }) => (
//                 <FormItem className="w-full">
                 
//                   <FormControl>
//                     <Input
//                       type="text"
//                       className={cn("font-semibold rounded-[3px]")}
//                       placeholder="Email"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       className={cn("font-semibold rounded-[3px]")}
//                       type="tel"
//                       placeholder="Phone Number"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
                
//                   <FormControl>
//                     <PasswordInput
//                       className={cn("font-semibold rounded-[3px]")}
//                       placeholder="Password"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
                
//                   <FormControl>
//                     <PasswordInput
//                       className={cn("font-semibold rounded-[3px]")}
//                       placeholder="Confirm Password"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
          
//           </div>
//           <div className="flex items-center space-x-2">
//             <Checkbox id="terms" />
//             <label htmlFor="terms" className="text-sm font-medium leading-none">
//               I agree to the{" "}
//               <Link href="/terms" className="underline text-blue-600">
//                 terms and policy
//               </Link>
//             </label>
//           </div>
//           <LoadingButton
//             type="submit"
//             className="w-full font-semibold"
//             loading={isLoading}
//           >
//             Sign Up
//           </LoadingButton>
//           <div className="text-center mt-6">
//             <span className="text-sm text-gray-600">
//               Already have an account?{" "}
//             </span>
//             <Link
//               href="/account/login"
//               className="text-sm text-blue-600 font-semibold hover:underline"
//             >
//               Login here
//             </Link>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default RegisterForm;


"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/shared/LoadingButton/LoadingButton";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Zod schema for form validation
const formSchema = z.object({
  firstName: z.string().min(3, { message: "Enter your first name" }),
  lastName: z.string().min(3, { message: "Enter your last name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().regex(/^(\+88)?\d{11}$/, {
    message: "Please enter a valid phone number with 11 digits",
  }), // Phone number validation with +88
  password: z
    .string()
    .min(6, { message: "Enter a valid password with at least 6 characters" }),
});

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "+88", // Initialize with +88 for Bangladeshi numbers
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Handle form submission
      // For example, send data to your backend
      // const response = await axios.post("/api/register", values);

      // Show success message
      toast.success("User registered successfully", {
        position: "bottom-left",
      });

      // Redirect to another page if needed
      router.push("/account/login");
    } catch (err) {
      toast.error(err?.message || "An error occurred", {
        position: "bottom-left",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    // Ensure the phone number always starts with +88
    const inputValue = e.target.value;
    if (inputValue.startsWith("+88")) {
      form.setValue("phone", inputValue); // Update only if it starts with +88
    } else {
      form.setValue("phone", "+88" + inputValue.replace(/^\+88/, "")); // Ensure it always starts with +88
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="w-full space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    className={cn("font-semibold rounded-[3px]")}
                    placeholder="First Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    className={cn("font-semibold rounded-[3px]")}
                    placeholder="Last Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className={cn("font-semibold rounded-[3px]")}
                    type="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className={cn("font-semibold rounded-[3px]")}
                    type="tel"
                    value={field.value}
                    onChange={handlePhoneChange} // Handle phone input changes
                    placeholder="Phone Number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    className={cn("font-semibold rounded-[3px]")}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm font-medium leading-none">
              I agree to the{" "}
              <Link href="/terms" className="underline text-blue-600">
                terms and policy
              </Link>
            </label>
          </div>

          <LoadingButton
            type="submit"
            className="w-full font-semibold"
            loading={isLoading}
          >
            Sign Up
          </LoadingButton>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <Link
              href="/account/login"
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;

