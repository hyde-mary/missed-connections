import React from "react";
import SignUpForm from "../_components/sign-up-form";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-8">
        <div className="relative text-white max-w-md">
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
          <h2 className="text-4xl font-bold mb-4 relative z-10">
            Thank you for Joining Us!
          </h2>
          <p className="text-lg opacity-90">
            Share your Connections and Create your Journey. Your stories matter.
          </p>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Page;
