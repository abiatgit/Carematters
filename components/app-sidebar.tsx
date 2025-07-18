import { useEffect } from "react";
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
import { useGlobalStore } from "@/store/globalStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setUser, setCareHome, houseList, setHouseList, housesRefreshTrigger } = useGlobalStore()

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
  }, [setCareHome, setUser])

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
  }, [user, housesRefreshTrigger, setHouseList]);
  const role = user?.role || "SUPPORT_WORKER";
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
                  (item.title === "Staff" && role !== "MANAGER") ||
                  (item.title === "Houses" && role !== "MANAGER")
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
