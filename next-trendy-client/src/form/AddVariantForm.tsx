"use client";

import { z } from "zod";

import { useForm, useFieldArray } from "react-hook-form";


import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Loader } from "lucide-react";
import { useState } from "react";
import { uploadImage } from "@/utils/imgbb";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Schema validation using Zod
const formSchema = z.object({
  size: z.string().min(1, "Size is required"),
  productId: z.string().min(1, "Product ID is required"),
  variant: z
    .array(
      z.object({
        color: z.string().min(1, "Color is required"),
        quantity: z.preprocess(
          (val) => Number(val),
          z.number().min(1, { message: "Price cannot be less than 0" })
        ),
        image: z.any(),
      })
    )
    .min(1, "At least one variant is required"),
});

const AddVariantForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: "",
      productId: "",
      variant: [{ color: "", quantity: 1, image: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variant",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");

    // Uploading the image
    const updatedVariants = await Promise.all(
      values.variant.map(async (variant) => {
        if (variant.image && variant.image.length > 0) {
          const url = await uploadImage(variant.image[0]);
          return { ...variant, image: url };
        }
        return variant;
      })
    );

    try {
      const updatedValues = { ...values, variant: updatedVariants };
      console.log(updatedValues, "Form Submitted");

      // You can replace this with your actual mutation or API call
      toast.success('variant added successfully');

      // Reset the form after submission
      form.reset();
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 md:px-4 py-6">
          {error && <p className="text-red-500">{error}</p>}

          {/* Size Field */}
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input placeholder="Enter size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product ID Field */}
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Product ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Variants */}
          <div className="space-y-4">
            {fields.map((item, index) => (
              <div key={item.id} className="border p-4 rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold">Variant {index + 1}</h3>
                  {fields.length > 1 && (
                    <Button variant="destructive" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  )}
                </div>

                {/* Color Field */}
                <FormField
                  control={form.control}
                  name={`variant.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter color" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Quantity Field */}
                <FormField
                  control={form.control}
                  name={`variant.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image Field */}
                <FormField
                  control={form.control}
                  name={`variant.${index}.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              onClick={() => append({ color: "", quantity: 1, image: null })}
            >
              Add Another Variant
            </Button>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full">
            Create Now
            {loading && <Loader className="ml-6 h-5 w-5 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddVariantForm;
