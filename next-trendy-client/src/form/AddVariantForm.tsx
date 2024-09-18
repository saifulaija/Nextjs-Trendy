"use client";

import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadImage } from "@/utils/imgbb";
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
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/shared/LoadingButton/LoadingButton";
import { useCreateVariantMutation } from "@/redux/api/features/variant/variantApi";

// Schema validation using Zod
const formSchema = z.object({
  size: z.string().min(1, "Size is required"),

  variant: z.array(
    z.object({
      color: z.string().min(1, "Color is required"),
      quantity: z.preprocess(
        (val) => Number(val),
        z.number().min(1, { message: "Quantity cannot be less than 1" })
      ),
      image: z.any(),
    })
  ),
});

const AddVariantForm = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const [createVariant, { isLoading }] = useCreateVariantMutation();
  const [error, setError] = useState("");

  // Form initialization with zod schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: "",
      variant: [{ color: "", quantity: 1, image: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variant",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Debugging: Form submission trigger
    console.log("Form submitted with values:", values);

    // Uploading images
    const updatedVariants = await Promise.all(
      values.variant.map(async (variant) => {
        try {
          if (variant.image && variant.image.length > 0) {
            const url = await uploadImage(variant.image[0]);
            return { ...variant, image: url };
          }
        } catch (err) {
          console.error("Image upload failed", err); // Debugging upload error
          setError("Image upload failed");
        }
        return variant;
      })
    );

    try {
      const updatedValues = { ...values, variant: updatedVariants, product:productId };
      console.log("Submitting updated values:", updatedValues); // Debugging the payload

      // Create variant API call
      const res = await createVariant(updatedValues);

      if (res.data) {
        toast.success("Variant added successfully");
        router.push("/dashboard/admin/product_variants/show_variants");
      }
    } catch (err: any) {
      console.error("Error creating variant", err); // Debugging mutation error
      setError(err?.message || "An unexpected error occurred.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 md:px-4 py-6">
          {/* Display error if exists */}
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

            {/* Add Another Variant Button */}
            <Button
              variant="outline"
              onClick={() => append({ color: "", quantity: 1, image: null })}
            >
              Add Another Variant
            </Button>
          </div>

          {/* Submit Button with loading state */}
          <LoadingButton
            type="submit"
            className="w-full font-semibold tracking-wider uppercase"
            loading={isLoading}
          >
            {isLoading ? "Submitting..." : "Create Variant"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default AddVariantForm;
