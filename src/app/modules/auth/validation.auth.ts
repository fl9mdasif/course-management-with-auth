import { z } from 'zod';

export const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
