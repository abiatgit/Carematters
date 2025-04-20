import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-12 py-16">
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Care that <span className="text-blue-600">Matters</span> — for every resident, every day.
          </h1>
          <p className="text-lg text-slate-600">
            CareMatters helps managers, nurses, and assistants stay on top of care plans, medication, and daily reports — all in one secure, easy-to-use platform.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <Link href="auth/sign-up">
              <Button size="lg" className="w-48">
                Get Started
              </Button>
            </Link>
            <Link href="auth/sign-in">
              <Button variant="outline" size="lg" className="w-48">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1">
          <Image
            src={"https://media.product.which.co.uk/prod/images/original/gm-e9d7e41c-8910-443c-8107-5f6b42eaef5e-carehomealternativesmain.jpeg"}
            alt="Care Team"
            className="w-full max-w-md mx-auto rounded-3xl"
            width={400}
            height={400}
          />
        </div>
      </div>
    </main>
  );
}
