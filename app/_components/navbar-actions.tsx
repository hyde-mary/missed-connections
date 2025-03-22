"use client";
import React from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Settings, LogOut, Bell, Mail, Globe } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";

const NavbarActions = () => {
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();

  if (!user) return <Skeleton />;

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link href="/submit">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full h-9 sm:h-10 px-3 sm:px-4 gap-1">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Create</span>
          </Button>
        </Link>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link href="/explore">
          <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white rounded-full h-9 sm:h-10 px-3 sm:px-4 gap-1">
            <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Explore</span>
          </Button>
        </Link>
      </motion.div>

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 sm:h-10 sm:w-10 hover:bg-gray-100 relative"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <div className="absolute top-1 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2" align="end">
          <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">
            Notifications
          </DropdownMenuLabel>
          <div className="px-2 py-1.5 text-sm text-gray-500">
            No new notifications
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Messages */}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 sm:h-10 sm:w-10 hover:bg-gray-100"
          >
            <Mail className="h-5 w-5 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2" align="end">
          <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">
            Messages
          </DropdownMenuLabel>
          <div className="px-2 py-1.5 text-sm text-gray-500">
            No new messages
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          <Button
            variant="ghost"
            className="pl-2 pr-3 h-9 sm:h-10 rounded-full gap-2 hover:bg-gray-100"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-full overflow-hidden border-2 border-gray-200"
            >
              <Image
                src={user.imageUrl}
                alt="User avatar"
                width={32}
                height={32}
                className="object-cover"
              />
            </motion.div>
            <span className="hidden sm:block font-medium text-gray-700">
              {user.username || user.fullName}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-2" align="end">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{user.fullName}</p>
            <p className="text-xs text-gray-500 truncate">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            className="px-2 py-1.5 rounded-md text-sm cursor-pointer"
            onClick={() => openUserProfile()}
          >
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            className="px-2 py-1.5 rounded-md text-sm cursor-pointer text-red-600 hover:bg-red-50"
            onClick={() => signOut({ redirectUrl: "/landing" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Skeleton = () => (
  <div className="flex items-center gap-2 sm:gap-4">
    <div className="h-9 w-9 sm:h-10 sm:w-10 bg-gray-200 animate-pulse rounded-full" />
    <div className="h-9 w-9 sm:h-10 sm:w-10 bg-gray-200 animate-pulse rounded-full" />
    <div className="flex items-center gap-2 pl-2 pr-3 h-9 sm:h-10 bg-gray-200 animate-pulse rounded-full w-28 sm:w-40">
      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gray-300" />
      <div className="h-4 w-16 sm:w-20 bg-gray-300 rounded hidden sm:block" />
    </div>
  </div>
);

export default NavbarActions;
