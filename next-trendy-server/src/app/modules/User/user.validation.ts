import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'user name must be string',
    }),
    phone: z.string({
      invalid_type_error: 'user name must be string',
    }),
    email: z.string().optional(),
    role: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
