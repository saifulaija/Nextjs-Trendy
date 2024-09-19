"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateVariantMutation } from "@/redux/api/features/variant/variantApi";
import { useRouter } from "next/navigation";

const VariantUpdateForm = ({ data }: { data: any }) => {
  const router = useRouter();
  const [updateVariant, { isLoading }] = useUpdateVariantMutation();
  const [submitError, setSubmitError] = useState("");

  // Initialize form
  const form = useForm({
    defaultValues: {
      size: "", // Set default as empty
      variant: [{ color: "", quantity: 1 }],
    },
  });

  // UseFieldArray for managing dynamic variants
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variant",
  });

  // Populate form with existing data from props once data is loaded
  useEffect(() => {
    if (data && data.length > 0) {
      const variantData = data[0]; // Access the first object in the array
      form.reset({
        size: variantData.size || "",
        variant:
          variantData?.variant?.length > 0
            ? variantData.variant.map((v: any) => ({
                color: v.color || "",
                quantity: v.quantity || 1,
              }))
            : [{ color: "", quantity: 1 }],
      });
    }
  }, [data, form]);

  // Handle form submission
  const onSubmit = async (values: any) => {
    try {
      const res = await updateVariant({
        id: data[0]?._id, // Access the _id from the first object in the array
        body: values,
      }).unwrap();

      if (res?._id) {
        toast.success("Variant updated successfully", {
          position: "bottom-left",
        });
        router.refresh()
      }
    } catch (error: any) {
      setSubmitError("Something went wrong. Please try again.");
      toast.error("Failed to update variant", { position: "bottom-right" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full space-y-4 md:px-4 py-6">
          {/* Submit error message */}
          {submitError && <p className="text-red-500">{submitError}</p>}

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

          {/* Variants Dynamic Fields */}
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
              </div>
            ))}

            {/* Add Another Variant Button */}
            <Button
              variant="outline"
              onClick={() => append({ color: "", quantity: 1 })}
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
            {isLoading ? "Updating..." : "Update Variant"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default VariantUpdateForm;
