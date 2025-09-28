import { z } from 'zod';

// Login form
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Register form
export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Forgot password form
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

// Helper type inference
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

/*
import { loginSchema } from '@/utils/validators';

try {
  const parsed = loginSchema.parse({ email, password });
  // parsed is now typed and safe
} catch (err) {
  if (err instanceof z.ZodError) {
    console.log(err.errors); // show validation errors
  }
}
*/