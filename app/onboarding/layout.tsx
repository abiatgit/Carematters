"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";


// import { signOut } from "next-auth/react";
export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 const handleSignOut = async () => {
     await signOut({ callbackUrl: "/" })
  };
  return (
    <main className="">
      <div className="flex justify-end bg-gray-100 h-13 items-center">
        <p className="px-3">Abi Geroge</p>
        <div className="me-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="me-3 bg-red-700 p-1">
              <DropdownMenuLabel className="text-white text-center" onClick={handleSignOut}>
                Sign Out
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {children}
      <div></div>
    </main>
  );
}
