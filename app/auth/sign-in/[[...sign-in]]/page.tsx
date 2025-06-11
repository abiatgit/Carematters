import { LoginForm } from "@/components/login-form";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import {  Rabbit } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

export default async function LoginPage() {
  const session = await auth();
  if (!session) {
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
            CareMatters
          </Link>
          <LoginForm />
        </div>
      </div>
    );
  }
  const currentUseremail = session?.user?.email;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUseremail!,
    },
  });
  if (!user) return null;
  if (!user.onboarded) {
    redirect("/onboarding");
  } else {
    redirect("/user");
  }
}
