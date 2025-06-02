import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import {signUp} from "../../lib/db/serverAction"
import { redirect } from "next/navigation";

const CredentialsForm = () => {
  return (
    <form action={async(formdata)=>{
      "use server"
      const res=await signUp(formdata)
      if(res.success){
        redirect("/auth/sign-in")
      }
    }}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
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
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full bg-green-700 ">
        Sign Up
      </Button>
    </form>
  );
};

export default CredentialsForm;
