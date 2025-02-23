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
import { ArrowUpDown, Settings, LogOut, Bell, Mail } from "lucide-react";
import Image from "next/image";

const NavbarActions = () => {
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();

  if (!user) return <Skeleton />;

  return (
    <div className="flex items-center space-x-2">
      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          <Button variant={"outline"} className="flex items-center border-2">
            <Bell className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 space-y-2" align="end">
          <DropdownMenuLabel className="flex items-center gap-2">
            Notifications
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Messages */}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          <Button variant={"outline"} className="flex items-center border-2">
            <Mail className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 space-y-2" align="end">
          <DropdownMenuLabel className="flex items-center gap-2">
            Messages
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
        >
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 border-2"
          >
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {user.username || user.fullName}
            </span>
            <div className="relative h-6 w-6 rounded-full overflow-hidden">
              <Image
                src={user.imageUrl}
                alt="User avatar"
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 space-y-2" align="end">
          <DropdownMenuLabel className="flex items-center gap-2">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#d1d5db]" />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => openUserProfile()}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-500 focus:text-red-500 cursor-pointer"
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

export default NavbarActions;

const Skeleton = () => (
  <div className="flex items-center space-x-2">
    <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-xl" />
    <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-xl" />
    <div className="flex items-center gap-2 p-2 border-2 bg-gray-300 dark:bg-gray-700 animate-pulse w-[180px] h-10 rounded-xl" />
  </div>
);
