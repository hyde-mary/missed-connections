import { z } from "zod";

export const STORY_CATEGORIES = [
  "Romantic",
  "Friendship",
  "Miscellaneous",
] as const;

export const storySchema = z.object({
  title: z
    .string()
    .min(8, "Title must be at least 8 characters")
    .max(80, "Title must be at most 80 characters")
    .trim()
    .refine((val) => val.trim().length > 0, "Title cannot be empty"),

  content: z
    .string()
    .min(20, "Content must be at least 20 characters")
    .max(2000, "Content must be at most 2000 characters")
    .trim()
    .refine((val) => val.trim().length > 0, "Content cannot be empty"),

  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(60, "Location must be at most 60 characters")
    .trim()
    .refine((val) => val.trim().length > 0, "Location cannot be empty"),

  date: z
    .date()
    .max(new Date(), "Date cannot be in the future")
    .refine((date) => date <= new Date(), {
      message: "Date must be in the past",
    }),

  category: z.enum(STORY_CATEGORIES, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
});
