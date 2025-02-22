"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/authSchema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    if (!isLoaded) return;

    setLoading(true);

    setError("");

    try {
      await signUp.create({
        username: values.username,
        emailAddress: values.email,
        password: values.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (err: any) {
      setError(
        err.errors?.[0]?.message || "An error occurred during registration"
      );
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  const handleResend = async () => {
    if (!isLoaded) return;
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (err: any) {
      setError(
        err.errors?.[0]?.message || "An error occurred during registration"
      );
    }
  };

  if (verifying) {
    return (
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            We&apos;ve sent a 6-digit code to your email address
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <input
              value={code}
              id="code"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium disabled:opacity-50"
          >
            Verify Email
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <div className="text-center text-sm text-gray-600">
          Didn&apos;t receive the code?{" "}
          <button
            onClick={handleResend}
            className="text-purple-600 hover:text-purple-700 font-medium"
            disabled={loading}
          >
            Resend Code
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => setVerifying(false)}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            ← Back to registration
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) return null;

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
        <p className="mt-2 text-gray-600">
          Create your Account to Share to Missed Connections
        </p>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Username</FormLabel>
                <FormControl>
                  <Input placeholder="missed_connections" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your Display Name. This is Unique to You.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email</FormLabel>
                <FormControl>
                  <Input placeholder="missed@connections.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your Email Address. You can use this to Login & Reset
                  your Password.
                </FormDescription>
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
                <FormDescription>
                  Must Contain an Uppercase, a Lowercase, a Number, and a
                  Special Character.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••••••••••"
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms Agreement */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Privacy Policy
                    </a>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div id="clerk-captcha"></div>

          <Button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a className="text-purple-600 hover:text-purple-700">
          <SignInButton>Sign in</SignInButton>
        </a>
      </div>
    </div>
  );
};

export default SignUpForm;
