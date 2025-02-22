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

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "username">("email");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
        <p className="mt-2 text-gray-600">
          Access your account to continue to{" "}
          <span className="underline">Missed Connections</span>
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setLoginMethod("email")}
          type="button"
          className={`w-full ${
            loginMethod === "email"
              ? "bg-[#4f70f3] text-white hover:bg-[#5769f2]"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          Email
        </Button>
        <Button
          onClick={() => setLoginMethod("username")}
          type="button"
          className={`w-full ${
            loginMethod === "username"
              ? "bg-[#4f70f3] text-white hover:bg-[#5769f2]"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          Username
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Identifier Field */}
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  {loginMethod === "email" ? "Email" : "Username"}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      loginMethod === "email"
                        ? "missed@connections.com"
                        : "missed_connections"
                    }
                    {...field}
                  />
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
        <a href="#" className="text-purple-600 hover:text-purple-700">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
