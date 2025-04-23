"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  return (
    <div>
      <header className="shadow-2xs bg-blue-300 h-[70] flex items-center justify-end ">
        <div className="mr-5 flex gap-5 items-center">
          <div>
            <h2 className="text-gray-700"> {user?.firstName}</h2>
            <p className= "font-light text-sm text-gray-700">Manger</p>
          </div>
          <UserButton />
        </div>
      </header>
      <div className=" flex-grow flex h-screen">
        <Sidebar/>
  
       {children}

        </div>
    </div>
  );
}
