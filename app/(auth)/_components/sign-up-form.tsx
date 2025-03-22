"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, verifySchema } from "@/lib/schemas/authSchema";
import { SignInButton } from "@clerk/nextjs";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
import { ArrowLeftCircle, Eye, EyeOff } from "lucide-react";

import { toast } from "sonner";

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const verifyForm = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;

    setLoading(true);

    setError("");

    try {
      const user = await signUp.create({
        username: values.username,
        emailAddress: values.email,
        password: values.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("Verification Code Sent to your Email.");

      setVerifying(true);

      console.log(user);
    } catch {
      toast.error("An Error Occurred during Registration");
    }
  };

  const handleVerifySubmit = async (values: z.infer<typeof verifySchema>) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.code,
      });

      if (completeSignUp.status === "complete") {
        toast.success("Code Successfully Verified!");
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      } else {
        toast.error("Incorrect Verification Code");
      }
    } catch {
      toast.error(
        "An Error Occured during Verification. Please Try Again Later"
      );
    }
  };

  const handleResend = async () => {
    if (!isLoaded) return;
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch {
      toast.error(
        "An Error Occurred in Sending the Verificaiton Code. Please Try Again Later"
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

        <Form {...verifyForm}>
          <form
            onSubmit={verifyForm.handleSubmit(handleVerifySubmit)}
            className="space-y-6"
          >
            <FormField
              control={verifyForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 6-digit code" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the 6 digit Code we sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Verify Email
            </Button>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>
        </Form>

        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setLoading(false);
              setVerifying(false);
            }}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition duration-200"
          >
            <ArrowLeftCircle className="h-4 w-4" />
            <p className="text-sm">Go back to Registration Form</p>
          </button>
          <button
            onClick={handleResend}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition duration-200"
          >
            <p className="text-sm">Resend Code</p>
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

      <Form {...signUpForm}>
        <form
          onSubmit={signUpForm.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Username */}
          <FormField
            control={signUpForm.control}
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
            control={signUpForm.control}
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
            control={signUpForm.control}
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
            control={signUpForm.control}
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
            control={signUpForm.control}
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
