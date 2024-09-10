"use client"

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


import { Checkbox } from "@/components/ui/checkbox";


import { useAppDispatch } from "@/redux/hooks";

import { TUser } from "@/types/global.type";
import Link from "next/link";
import { PasswordInput } from "@/components/shared/PasswordInput/PasswordInput";
import { useState } from "react";
import { cn } from "@/lib/utils";


const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Enter a valid password with at least 6 characters",
  }),
});

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    
//   const [login, { isLoading }] = useLoginMutation();
//   const navigate = useNavigate();



  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const user=null
    try {
    //   const res = await login(values).unwrap();
    //   const user = verifyToken(res.data.accessToken) as TUser;
    //   dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged In successfully", { position: "bottom-left" });

      if (user.role === "user") {
        // navigate(from, { replace: true });
      } else {
        // navigate("/");
      }
    } catch (error) {
      toast.error((error as any)?.data?.message || "An error occurred", {
        position: "bottom-left",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-2 py-2">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className={cn("rounded-[3px]")}
                      placeholder="Enter Your email ....."
                      {...field}
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      type="password"
                      className={cn("rounded-[3px]")}
                      placeholder="Enter your password ......"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the <span className="underline">terms and policy</span>
            </label>
          </div>
          <LoadingButton
            type="submit"
            className="w-full font-bold uppercase tracking-wider mt-2"
            loading={isLoading}
          >
            Login
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
