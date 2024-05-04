import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(4, "Username must be at least 4 characters.")
  .max(16, "Username must be no more than 16 characters.")
  .regex(/^[a-zA-Z0-9_.]+$/, "Username can only contain letters, numbers, underscores, and periods.");

export const emailValidation = z.string().email({ message: "Invalid email address" }); // Ensure email format is valid

export const passwordValidation = z.string().min(8, "Password should contain minimum 8 characters.").max(16 ,"Password should not be more than 16 characters.");
export const nameValidation = z.string().min(4, "name should contain minimum 8 characters.").max(12 ,"name should not be more than 12 characters.");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
    name:nameValidation
});
