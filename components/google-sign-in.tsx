"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Google } from "./ui/google";

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    await signIn("google");
  };
  
  return (
    <Button 
      className="w-full" 
      variant="outline"
      onClick={handleGoogleSignIn}
    >
      <Google/>
      Continue with google
    </Button>
  );
};

export { GoogleSignIn };
