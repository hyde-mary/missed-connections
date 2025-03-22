// always use convention: Create, Read, Update, Delete (CRUD)

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types";
import { storySchema } from "@/lib/schemas/storySchema";
import { z } from "zod";
import { Category } from "@prisma/client";

export async function createPost(
  userId: string,
  values: z.infer<typeof storySchema>
): Promise<ActionResult<{ id: string }>> {
  console.log("createPost called with:", { userId, values });
  try {
    const { title, content, location, date } = values;
    const category = values.category.toUpperCase();

    // let us define the slug
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const post = await prisma.post.create({
      data: {
        userId,
        title,
        slug,
        category: category as Category,
        content,
        date,
        location,
      },
    });

    revalidatePath("/");
    revalidatePath("/explore");

    return {
      success: true,
      data: {
        id: post.id,
      },
      message: "Post created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
      message: "Failed to create post.",
    };
  }
}
