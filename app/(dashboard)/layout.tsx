import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div >
          <AppSidebar />
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarTrigger />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}


