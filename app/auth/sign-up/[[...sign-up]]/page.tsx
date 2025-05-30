import { Rabbit } from "lucide-react"
import Link from "next/link"
import { SignUpForm } from "@/components/sign-up/SignUpForm"

export default function SignUpPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div >
              <Rabbit className="text-green-700"></Rabbit>
          </div>
          Care Matters
        </Link>
        <SignUpForm />
      </div>
    </div>
  )
}
