"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/authSchema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LogInIcon } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: values.identifier,
        password: values.password,
      });

      if (result.status === "complete") {
        await setActive({ session: signIn.createdSessionId });
        router.replace("/");
      }
    } catch (error: any) {
      console.error("Sign-in failed:", error.errors);
      alert(error.errors[0]?.longMessage || "Sign-in failed");
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
        <p className="mt-2 text-gray-600">
          Access your account to continue to{" "}
          <span className="underline">Missed Connections</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Identifier Field */}
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email / Username</FormLabel>
                <FormControl>
                  <Input placeholder="missed@connections.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••••••"
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <a
              href="#"
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Sign In
            <LogInIcon />
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <a className="text-purple-600 hover:text-purple-700">
          <SignUpButton>Sign up</SignUpButton>
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
