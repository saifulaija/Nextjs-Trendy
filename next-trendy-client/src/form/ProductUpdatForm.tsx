"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, SubCategory } from "@/types"; // Ensure these are valid arrays

import { AlertCircle } from "lucide-react";
import { useUpdateProductMutation } from "@/redux/api/features/product/productApi";
import { useRouter } from "next/navigation";

const ProductUpdateForm = ({ data }: { data: any }) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [submitError, setSubmitError] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      subCategory: "",
      description: "",
      material: "",
      discount: "",
      price: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        category: data.category || "",
        subCategory: data.subCategory || "",
        discount: data.discount || 0,
        material: data.material || "",
        description: data.description || "",
        price: data.price || 0,
      });
    }
  }, [data, form]);

  const onSubmit = async (values: any) => {
    try {
      const res = await updateProduct({
        body: values,
        id: data?._id,
      }).unwrap();
      if (res?._id) {
        toast.success("Product updated successfully", {
          position: "bottom-left",
        });
        router.refresh();
      }
    } catch (err: any) {
      setSubmitError("Something went wrong. Please try again.");
      toast.error("Failed to update product", { position: "bottom-right" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-5xl mx-auto"
      >
        <div className="w-full space-y-4">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <div>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </div>
            </Alert>
          )}

          {/* Name Field */}
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
                    placeholder="Enter product name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Field */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full leading-3">
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Category
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || data?.category} // Display the current category
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Category.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SubCategory Field */}
          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem className="w-full leading-3">
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  SubCategory
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || data?.subCategory} // Display the current subCategory
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a sub category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SubCategory.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Description
                </FormLabel>
                <FormControl>
                  <ReactQuill
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="product description..."
                    theme="snow"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Material Field */}
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem className="w-full leading-3">
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Material
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter product material"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Field */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full leading-3">
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Enter product price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount Field */}
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="w-full leading-3">
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Discount
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Enter product discount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <LoadingButton type="submit" loading={isLoading}>
            Update Product
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default ProductUpdateForm;
