"use client"
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div>
          <AppSidebar />
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarInset>
            <SiteHeader />
            {/* <SidebarTrigger /> if you want open the side bar apply here */}
            <main className="p-6">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
