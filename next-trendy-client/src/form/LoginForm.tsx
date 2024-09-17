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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { storeUserInfo } from "@/services/authServices";
import { userLogin } from "@/services/actions/userLogin";
import { CheckedState } from "@radix-ui/react-checkbox";

// Zod schema for form validation
const formSchema = z.object({
  phone: z.string().regex(/^(\+88)?\d{11}$/, {
    message: "Please enter a valid phone number with 11 digits",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "+88",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await userLogin(values);

      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        toast.success("User logged in successfully!", {
          position: "bottom-left",
        });
        router.refresh();
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
    const inputValue = e.target.value;
    if (inputValue.startsWith("+88")) {
      form.setValue("phone", inputValue);
    } else {
      form.setValue("phone", "+88" + inputValue.replace(/^\+88/, ""));
    }
  };

  const handleCheckboxChange = (checked: CheckedState) => {
    // Convert CheckedState ("indeterminate", true, false) to boolean
    setIsChecked(checked === true);
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
                    onChange={handlePhoneChange}
                    placeholder="Phone Number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              onCheckedChange={handleCheckboxChange} // Handle checkbox change
            />
            <label htmlFor="terms" className="text-sm font-medium leading-none">
              I agree to the{" "}
              <Link
                href="/terms_conditions"
                className="underline text-blue-600"
              >
                terms and policy
              </Link>
            </label>
          </div>

          <LoadingButton
            type="submit"
            className="w-full font-semibold tracking-wider uppercase"
            loading={isLoading}
            disabled={!isChecked || isLoading}
          >
            Login
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
