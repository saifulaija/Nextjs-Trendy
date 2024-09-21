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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, SubCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation } from "@/redux/api/features/product/productApi";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Update the form schema to include sellsQuantity and productCode
const formSchema = z.object({
  name: z.string().min(3, { message: "Enter product name" }),
  category: z.string(),
  subCategory: z.string(),
  description: z.string().min(10, { message: "Enter product description" }),
  material: z.string().min(10, { message: "Enter product material" }),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Price cannot be less than 0" })
  ),
  discount: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Discount cannot be less than 0" })
  ),
  productCode: z.string(),

  tags: z.array(z.string()),
});

const AddProductForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      subCategory: "",
      description: "",
      price: 0,
      material: "",
      tags: [],
      discount: 0,
      productCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await createProduct({ ...values, tags });

      if (res?.data) {
        toast.success("Product added successfully", {
          position: "bottom-left",
        });
        router.push("/dashboard/admin/product_management/show_products");
      } else {
        throw new Error("Failed to add product, please try again.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  // Add a new tag
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Remove a tag
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Add tag on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Material
                </FormLabel>
                <FormControl>
                  <ReactQuill
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="product material..."
                    theme="snow"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Product Code Field */}
          <FormField
            control={form.control}
            name="productCode"
            render={({ field }) => (
              <FormItem className="w-full leading-3">
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Product Code
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter product code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags Input */}
          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem className="w-full leading-3">
                <FormLabel
                  className={cn("font-semibold text-[16px] text-gray-500")}
                >
                  Tags
                </FormLabel>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Enter a tag and press Enter"
                    value={tagInput}
                    onChange={handleTagInput}
                    onKeyDown={handleKeyDown}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    Add Tag
                  </Button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded"
                    >
                      <span>{tag}</span>
                      <X
                        className="cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </div>
                  ))}
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <LoadingButton type="submit" loading={isLoading}>
            Add Product
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
// "use client";
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
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { AlertCircle, X } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Category, SubCategory } from "@/types";
// import { Button } from "@/components/ui/button";
// import { useCreateProductMutation } from "@/redux/api/features/product/productApi";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// // Update the form schema to include sellsQuantity and productCode
// const formSchema = z.object({
//   name: z.string().min(3, { message: "Enter product name" }),
//   category: z.string(),
//   subCategory: z.string(),
//   description: z.string().min(10, { message: "Enter product description" }),
//   material: z.string().min(10, { message: "Enter product material" }),
//   price: z.preprocess(
//     (val) => Number(val),
//     z.number().min(0, { message: "Price cannot be less than 0" })
//   ),
//   discount: z.preprocess(
//     (val) => Number(val),
//     z.number().min(0, { message: "Discount cannot be less than 0" })
//   ),
//   productCode: z.string(),

//   tags: z.array(z.string()),
// });

// const AddProductForm = () => {
//   const router = useRouter();
//   const [error, setError] = useState("");

//   const [tagInput, setTagInput] = useState("");
//   const [createProduct, { isLoading }] = useCreateProductMutation();
//   const [tags, setTags] = useState<string[]>([]);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       category: "",
//       subCategory: "",
//       description: "",
//       price: 0,
//       material: "",
//       tags: [],
//       discount: 0,
//       productCode: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const res = await createProduct({ ...values, tags });

//       if (res?.data) {
//         toast.success("Product added successfully",{position:"bottom-left"});
//         router.push("/dashboard/admin/product_management/show_products");
//       } else {
//         throw new Error("Failed to add product, please try again.");
//       }
//     } catch (err: any) {
//       setError(err?.message || "An unexpected error occurred.");
//     }
//   };

//   const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTagInput(e.target.value);
//   };

//   // Add a new tag
//   const handleAddTag = () => {
//     if (tagInput.trim() && !tags.includes(tagInput)) {
//       setTags((prevTags) => [...prevTags, tagInput.trim()]);
//       setTagInput("");
//     }
//   };

//   // Remove a tag
//   const handleRemoveTag = (tag: string) => {
//     setTags(tags.filter((t) => t !== tag));
//   };

//   // Add tag on Enter key press
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleAddTag();
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="w-full max-w-5xl mx-auto"
//       >
//         <div className="w-full space-y-4">
//           {/* Error Alert */}
//           {error && (
//             <Alert variant="destructive">
//               <AlertCircle className="h-4 w-4" />
//               <div>
//                 <AlertTitle>Error</AlertTitle>
//                 <AlertDescription>{error}</AlertDescription>
//               </div>
//             </Alert>
//           )}

//           {/* Name Field */}
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem className="w-full leading-3">
//                 <FormLabel
//                   className={cn("font-semibold text-[16px] text-gray-500")}
//                 >
//                   Name
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Enter product name"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Category Field */}
//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem className="w-full leading-3">
//                 <FormLabel
//                   className={cn("font-semibold text-[16px] text-gray-500")}
//                 >
//                   Category
//                 </FormLabel>
//                 <FormControl>
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select a category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         {Category.map((item) => (
//                           <SelectItem key={item} value={item}>
//                             {item}
//                           </SelectItem>
//                         ))}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* SubCategory Field */}
//           <FormField
//             control={form.control}
//             name="subCategory"
//             render={({ field }) => (
//               <FormItem className="w-full leading-3">
//                 <FormLabel
//                   className={cn("font-semibold text-[16px] text-gray-500")}
//                 >
//                   SubCategory
//                 </FormLabel>
//                 <FormControl>
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select a sub category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         {SubCategory.map((item) => (
//                           <SelectItem key={item} value={item}>
//                             {item}
//                           </SelectItem>
//                         ))}
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Description Field */}
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem className="w-full leading-3">
//                 <FormLabel
//                   className={cn("font-semibold text-[16px] text-gray-500")}
//                 >
//                   Description
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Enter product description"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Material Field */}
//           <FormField
//             control={form.control}
//             name="material"
//             render={({ field }) => (
//               <FormItem className="w-full leading-3">
//                 <FormLabel
//                   className={cn("font-semibold text-[16px] text-gray-500")}
//                 >
//                   Material
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Enter product material"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Price Field */}
//           <FormField
//             control={form.control}
//             name="price"
//             render={({ field }) => (
//               <FormItem className="w-full leading-3">
//                 <FormLabel
//                   className={cn("font-semibold text-[16px] text-gray-500")}
//                 >
//                   Price
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     min={0}
//                     placeholder="Enter product price"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Discount Field */}
//           <FormField
//             control={form.control}
//             name="discount"
//             render={({ field }) => (
//               <FormItem className="w-full leading-3">
//                 <FormLabel
//                   className={cn("font-semibold text-[16px] text-gray-500")}
//                 >
//                   Discount
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     min={0}
//                     placeholder="Enter product discount"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Product Code Field */}
//           <FormField
//             control={form.control}
//             name="productCode"
//             render={({ field }) => (
//               <FormItem className="w-full leading-3">
//                 <FormLabel
//                   className={cn("font-semibold text-[16px] text-gray-500")}
//                 >
//                   Product Code
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Enter product code"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Tags Input */}
//           <FormField
//             control={form.control}
//             name="tags"
//             render={() => (
//               <FormItem className="w-full leading-3">
//                 <FormLabel
//                   className={cn("font-semibold text-[16px] text-gray-500")}
//                 >
//                   Tags
//                 </FormLabel>
//                 <div className="flex items-center gap-2">
//                   <Input
//                     type="text"
//                     placeholder="Enter a tag and press Enter"
//                     value={tagInput}
//                     onChange={handleTagInput}
//                     onKeyDown={handleKeyDown}
//                   />
//                   <Button type="button" onClick={handleAddTag}>
//                     Add Tag
//                   </Button>
//                 </div>

//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {tags.map((tag) => (
//                     <div
//                       key={tag}
//                       className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded"
//                     >
//                       <span>{tag}</span>
//                       <X
//                         className="cursor-pointer"
//                         onClick={() => handleRemoveTag(tag)}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </FormItem>
//             )}
//           />

//           {/* Submit Button */}
//           <LoadingButton type="submit" loading={isLoading}>
//             Add Product
//           </LoadingButton>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default AddProductForm;
