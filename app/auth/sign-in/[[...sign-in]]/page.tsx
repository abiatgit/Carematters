import { Rabbit } from "lucide-react"

import { SignInForm } from "@/components/sign-in/SignInForm"
import Link from "next/link"
import { auth, } from "@/lib/auth";
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const section =await auth()
  if(section) redirect("/onboarding")
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div >
              <Rabbit className="text-green-700"></Rabbit>
          </div>
          Care Matters
        </Link>
        <SignInForm />
      </div>
    </div>
  )
}
