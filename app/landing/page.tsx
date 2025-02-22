"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const { isSignedIn } = useUser();

  console.log(isSignedIn);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-blue-50/30 to-transparent overflow-hidden">
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 23px, black 24px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl w-full space-y-6 md:space-y-4">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-7xl font-extrabold text-center leading-tight md:leading-[1.15]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Moments Matter.
          </span>
          <br />
          <span className="text-gray-900">
            Rewrite Your{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">Missed Connections</span>
              <div className="absolute bottom-2 left-0 w-full h-4 bg-purple-100/80 z-0" />
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-3xl mx-auto text-center text-gray-600 font-medium leading-relaxed"
        >
          Reconnect with people who left an impression. Every chance encounter
          could be the start of something meaningful - let&apos;s help you find
          that connection again.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4 mt-8"
        >
          <SignInButton>
            <Button className="bg-[#6b45ea] text-lg p-5 group hover:bg-[#5938d3] transition-colors">
              Start Searching
              <ArrowRightCircle className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </SignInButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Page;
