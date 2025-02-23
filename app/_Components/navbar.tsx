import React from "react";
import { auth } from "@clerk/nextjs/server";
import NavbarActions from "./navbar-actions";

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  return (
    <nav className="h-16 flex items-center justify-between px-6 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <span className="text-purple-600">✨</span> Missed Connections
      </div>
      <NavbarActions />
    </nav>
  );
};

export default Navbar;
