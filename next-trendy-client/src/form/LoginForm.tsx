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


// import { Checkbox } from "@/components/ui/checkbox";


// import { useAppDispatch } from "@/redux/hooks";

// import { TUser } from "@/types/global.type";
// import Link from "next/link";
// import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
// import { useState } from "react";
// import { cn } from "@/lib/utils";


// const formSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email",
//   }),
//   password: z.string().min(6, {
//     message: "Enter a valid password with at least 6 characters",
//   }),
// });

// const LoginForm = () => {
//     const [isLoading, setIsLoading] = useState(false);
    
// //   const [login, { isLoading }] = useLoginMutation();
// //   const navigate = useNavigate();



//   const dispatch = useAppDispatch();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     const user=null
//     try {
//     //   const res = await login(values).unwrap();
//     //   const user = verifyToken(res.data.accessToken) as TUser;
//     //   dispatch(setUser({ user: user, token: res.data.accessToken }));
//       toast.success("Logged In successfully", { position: "bottom-left" });

//       if (user.role === "user") {
//         // navigate(from, { replace: true });
//       } else {
//         // navigate("/");
//       }
//     } catch (error) {
//       toast.error((error as any)?.data?.message || "An error occurred", {
//         position: "bottom-left",
//       });
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//         <div className="w-full space-y-2 py-2">
//           <div className="space-y-2">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email Address</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       className={cn("rounded-[3px]")}
//                       placeholder="Enter Your email ....."
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
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <PasswordInput
//                       type="password"
//                       className={cn("rounded-[3px]")}
//                       placeholder="Enter your password ......"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex justify-end">
//               <Link
//                 href="/auth/forgot-password"
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Checkbox id="terms" />
//             <label
//               htmlFor="terms"
//               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//             >
//               I agree to the <span className="underline">terms and policy</span>
//             </label>
//           </div>
//           <LoadingButton
//             type="submit"
//             className="w-full font-bold uppercase tracking-wider mt-2"
//             loading={isLoading}
//           >
//             Login
//           </LoadingButton>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default LoginForm;



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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { userRegistration } from "@/services/actions/userRegistration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(3, { message: "Enter your first name" }),
  email: z.string().min(3, { message: "Enter your last name" }),

  phone: z.string().regex(/^(\+88)?\d{11}$/, {
    message: "Please enter a valid phone number with 11 digits",
  }), // Phone number validation with +88
});

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+88", // Initialize with +88 for Bangladeshi numbers
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const res = await userRegistration(values);

      if (res?.data) {
        toast.success("user created successfully");
        router.push("/account/login");
      } else {
        setError(res?.message || "An unexpected error occurred.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: any) => {
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
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
      
       

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full leading-3">
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
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
            Login
          </LoadingButton>

          
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;

