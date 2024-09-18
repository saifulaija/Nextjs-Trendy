import { z } from 'zod';

const TStockSchema = z.object({
  color: z
    .string({
      required_error: 'Color is required',
    })
    .min(1, 'Color cannot be empty'),

  quantity: z
    .number({
      required_error: 'Quantity is required',
    })
    .int('Quantity must be an integer')
    .min(0, 'Quantity cannot be negative'),

  image: z
    .string({
      required_error: 'Image URL is required',
    })
    .url('Invalid image URL format'),
});

const createVariantValidationSchema = z.object({
  body: z.object({
    size: z.string({
      required_error: 'size is required',
    }),
    product: z.string({
      required_error: 'product is required',
    }),

    variant: z.array(TStockSchema),
    isDeleted: z
      .boolean({
        required_error: 'isDeleted is required',
      })
      .optional()
      .default(false),
  }),
});

export const variantValidations = {
  createVariantValidationSchema,
};
