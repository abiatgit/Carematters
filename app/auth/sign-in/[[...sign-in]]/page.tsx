"use client";

import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return; 
    if (isSignedIn && user) {
      const hasOnboardingDone = Boolean(user?.publicMetadata?.careHome);
      if (!hasOnboardingDone) {
        router.push("/onboarding");
      } else {
        router.push("/manager");
      }
    }
  }, [isSignedIn, user, isLoaded, router]);
  if (!isLoaded || isSignedIn) {
    return null;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
}
