import { z } from 'zod';

const registerSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6),
   name: z.string().min(3).max(100),
});

const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6),
});

export { registerSchema, loginSchema };
