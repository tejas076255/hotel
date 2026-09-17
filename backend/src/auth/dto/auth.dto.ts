import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Login DTO
export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export class LoginDto extends createZodDto(LoginSchema) { }

// Register DTO
export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters' }),
  phone: z.string().optional(),
});

export class RegisterDto extends createZodDto(RegisterSchema) { }
