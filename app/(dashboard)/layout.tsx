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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-gray-10 px-6 flex items-center justify-end shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h2 className="text-gray-800 font-medium">{user?.firstName}</h2>
              <p className="text-sm text-gray-700 font-light">Manager</p>
            </div>
            <UserButton />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
