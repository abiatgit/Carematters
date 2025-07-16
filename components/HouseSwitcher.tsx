"use client";
import * as React from "react";
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGlobalStore } from "@/store/globalStore";
import { Unit } from "@prisma/client";
export function HouseSwitcher({
  houses,
}: {
  houses: Unit[]
}) {
  const { setHouseId, user } = useGlobalStore();
  const { careHome } = useGlobalStore()
  const [selectedHouse, setSelectedHouse] = React.useState<string>("");
  const isManager = user?.role === "MANAGER";
  
  React.useEffect(() => {
    if (houses.length > 0) {
      setSelectedHouse(houses[0].name);
      setHouseId(houses[0].id);
    }
  }, [houses, setHouseId]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="  flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
                <img src={careHome?.logo}></img>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{careHome?.name}</span>
                <span className="">{selectedHouse}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="end"
          >
            {isManager && (
              <DropdownMenuItem
                onSelect={() => {
                  setSelectedHouse("All Houses");
                  setHouseId("all");
                }}
              >
                All Houses
                {"All Houses" === selectedHouse && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            )}
            {houses.map((house, index) => {
              return (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => {
                    setSelectedHouse(house.name);
                    setHouseId(house.id);
                  }}
                >
                  {house.name}
                  {house.name === selectedHouse && (
                    <Check className="ml-auto" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
