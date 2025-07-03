import {  useEffect, useState } from "react";
import { items } from "@/lib/mockData";
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
import { fetchHouse } from "@/app/(dashboard)/list/houses/action";
import { Unit } from "@prisma/client";
import { useGlobalStore } from "@/store/globalStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setUser } = useGlobalStore()
  const { setCareHome } = useGlobalStore()
  const [houseList, setHouseList] = useState<Unit[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, careHomeRes] = await Promise.all([
          fetch('/api/get-current-user'),
          fetch('/api/get-current-carehome'),
        ])
        if (userRes.ok) {
          const userData = await userRes.json()
          setUser(userData?.currentUser)
        }
        if (careHomeRes.ok) {
          const data = await careHomeRes.json()
          setCareHome(data?.careHome)
        }
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, [])

  const getHouse = async () => {
    try {

      const res = await fetchHouse(user);
      setHouseList(res)
    } catch (er) {
      console.log("errossssr", er);
    }
  };
  useEffect(() => {
    getHouse();
  }, [user]);
  const role: "TeamLeader" | "Manager" = "Manager";
  return (
    <Sidebar {...props} collapsible="icon">
      <SidebarHeader>
        <HouseSwitcher houses={houseList} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (
                  (item.title === "Staff" && role !== "Manager") ||
                  (item.title === "Houses" && role !== "Manager")
                ) {
                  return;
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
        <NavUser  />
      </SidebarFooter>
    </Sidebar>
  );
}
