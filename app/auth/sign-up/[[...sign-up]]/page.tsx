"use client"
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignUp
        path="/auth/sign-up" 
        routing="path" 
        fallbackRedirectUrl={"/onboarding"}
      />
    </div>
  );
}
