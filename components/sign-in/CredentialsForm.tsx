"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
 import { signIn } from "next-auth/react";

import { executeAction } from "@/lib/executeAction";

export function CredentialsForm() {
  return (
    <form
      action={async (formData: FormData) => {
        await executeAction({
          actionFn: async () => {
            const credentials = Object.fromEntries(formData.entries());
            await signIn("credentials", {
              email: credentials.email,
              password: credentials.password,
              redirect: true,
              callbackUrl: "/manager",
            });
          },
        });
      }}
      className="grid gap-6"
    >
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" required />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" name="password" required />
      </div>
      <Button type="submit" className="w-full bg-green-700">
        Login
      </Button>
    </form>
  );
}
