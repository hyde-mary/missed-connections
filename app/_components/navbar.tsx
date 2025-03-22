"use client";
import React from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import NavbarActions from "./navbar-actions";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-4 sm:px-6 border-b border-gray-300 bg-white shadow-md"
    >
      {/* Logo */}

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex space-x-2 text-xl sm:text-2xl"
      >
        <Link href="/">
          <div className="flex">
            <p>✨</p>
            <h1 className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Missed Connections
            </h1>
          </div>
        </Link>
      </motion.div>

      <NavbarActions />
    </motion.nav>
  );
};

export default Navbar;
