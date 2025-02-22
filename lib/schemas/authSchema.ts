import { z } from "zod";

export const loginSchema = z.object({
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
