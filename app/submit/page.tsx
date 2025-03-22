"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar, Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { storySchema } from "@/lib/schemas/storySchema";
import { useState } from "react";
import { createPost } from "@/app/(server)/actions/post";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof storySchema>>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: "",
      content: "",
      location: "",
      date: new Date(),
      category: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof storySchema>) {
    setLoading(true);

    try {
      if (!user) {
        console.error("Error: User is not authenticated.");
        return;
      }

      const response = await createPost(user.id, values);

      if (!response.success) {
        console.error(
          "Post Creation Failed:",
          response.error || "Unknown error."
        );
        return;
      }

      console.log("Post Created Successfully!");
      router.replace("/explore");
    } catch (error) {
      console.error("Unexpected Error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!user) return;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center relative overflow-hidden"
    >
      <div className="w-full max-w-2xl mx-4 bg-white rounded-xl shadow-lg p-8 sm:p-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center"
        >
          Share Your Missed Connection
        </motion.h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Encounter Title</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-lg h-12"
                      placeholder="e.g., 'Coffee Shop Smile'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Story Input */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Story</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your encounter in detail..."
                      className="rounded-lg min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Central Park"
                        className="rounded-lg h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Approximate Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="date"
                          className="rounded-lg h-12 pl-10"
                          value={field.value.toISOString().split("T")[0]}
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category Select */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Connection Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-lg h-12">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Romantic">Romantic</SelectItem>
                      <SelectItem value="Friendship">Friendship</SelectItem>
                      <SelectItem value="Miscellaneous">
                        Miscellaneous
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg font-semibold rounded-lg"
                disabled={loading}
              >
                {loading ? "Sharing your story..." : "Share Your Story"}
              </Button>
            </motion.div>
          </form>
        </Form>

        <div className="flex items-center justify-center space-x-2 mt-6">
          <Lock className="h-4 w-4 text-gray-500" />
          <p className="text-sm text-gray-500 text-center">
            All submissions are anonymous. Please be respectful and truthful in
            your account.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
