import { z } from "zod";

export const registerSchema = z.object({
 username: z
  .string()
  .trim()
  .transform((value) => value.replace(/\s+/g, " "))
  .pipe(
    z.string()
      .min(1, "Name is required.")
      .max(20, "Name must not exceed 20 characters.")
      .regex(
        /^[A-Z][a-zA-Z]*(?: [A-Z]?[a-zA-Z]+)*$/,
        "Name must start with a capital letter, contain only letters, and spaces are allowed."
      )
  ),
  email: z.email("Invalid email address"),
    mobile: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Mobile number must be a valid 10-digit number."
    ),

  password: z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(20, "Password must not exceed 20 characters.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
  )
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});