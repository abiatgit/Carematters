"use client";
// import { signOut } from "next-auth/react";
export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const handleSignOut = async () => {
  //   await signOut();
  // };
  return (
    <main className="">
   
      {children}
    </main>
  );
}
