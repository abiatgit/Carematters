import { SignupForm } from "@/components/signup-form";
import { auth } from "@/lib/auth";
import { Rabbit } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
export const runtime = "nodejs";

export default async function LoginPage() {
      const session = await auth();
      if (session) redirect("/user");
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
            href="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="bg-green-700 text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Rabbit className="size-4" />
            </div>
            CareO
          </Link>
        <SignupForm />
      </div>
    </div>
  );
}
