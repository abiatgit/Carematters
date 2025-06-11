"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut, } from "next-auth/react";

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { data: session } = useSession();
  // const router = useRouter();
  // if (!session) router.push("/auth/sign-in");
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <main className="">
      <div className="flex justify-end bg-gray-100 gap-3 h-13 items-center">
        <p className="px-3 text-sm ">{"Abi"}</p>
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
