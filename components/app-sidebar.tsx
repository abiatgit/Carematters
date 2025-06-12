import * as React from "react";
import {items,houses,userManager} from "@/lib/mockData"
import { HouseSwitcher } from "./HouseSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";
import Link from "next/link";


export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const role:"TeamLeader"|"Manager" = "Manager"
  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader>
        <HouseSwitcher houses={houses} defaultHouse={houses[0].name} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if(item.title==="Staff" && role !== "Manager" ||item.title==="Houses" && role !== "Manager" ){
                  return
                }
               
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10 px-6 text-md">
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userManager} />
      </SidebarFooter>
    </Sidebar>
  );
}
