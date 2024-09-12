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
      phone: "+88", 
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full leading-3">
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    // className={cn("font-semibold")}
                    placeholder="Enter your name....."
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
              <FormItem className="w-full leading-3">
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    // className={cn("font-semibold")}
                    placeholder="Enter your email....."
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
