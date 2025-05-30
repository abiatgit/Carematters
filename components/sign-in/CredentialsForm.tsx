"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function CredentialsForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" required />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
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
