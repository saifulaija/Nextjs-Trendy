import { z } from 'zod';

const reviews = z.array(z.string()).optional();
const variant = z.array(z.string()).optional();

// const TReviewSchemaSchema = z.object({
//   reviewId:z.string().optional()
// });

const CreateProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    material: z.string(),
    category: z.string({
      required_error: 'Category is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    productCode: z.string().optional(),

    description: z.string({
      required_error: 'Description is required',
    }),
    reviews: reviews,
    sellsQuantity: z.number().optional(),
    discount: z.number().optional(),
    isDeleted: z.boolean().optional(),
    tag: z.string().optional(),
    variant: variant,
    selectedSize: z.string().optional(),
    subCategory: z.string(),
  }),
});

export const ProductValidations = {
  CreateProductValidationSchema,
};
