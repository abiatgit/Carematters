"use client";
import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/globalStore";
import { LogOut } from "lucide-react";
import { signOut, } from "next-auth/react";

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const {user}=useGlobalStore()
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <main className="">
      <div className="flex justify-end bg-gray-100 gap-3 h-13 items-center">
        <p className="px-3 text-sm ">{user?.name}</p>
        <div className="me-3">
          <Button variant={"outline"} onClick={handleSignOut}>
            <LogOut />
          </Button>
        </div>
      </div>

      {children}
    </main>
  );
}
