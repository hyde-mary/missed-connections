import { z } from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, "Required")
    .superRefine((val, ctx) => {
      const isEmail = z.string().email().safeParse(val).success;
      const isUsername = z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .safeParse(val).success;

      if (!isEmail && !isUsername) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must be a valid email or username (3-20 characters)",
        });
      }
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(1, "Required"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifySchema = z.object({
  code: z
    .string()
    .min(6, "Code must be 6 digits")
    .max(6, "Code must be 6 digits")
    .regex(/^\d+$/, "Code must contain only numbers"),
});
