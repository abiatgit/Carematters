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
  const { setHouseId } = useGlobalStore();
  const { user } = useGlobalStore()
  const [selectedHouse, setSelectedHouse] = React.useState<string>(houses[0]?.name);


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className=" bg-green-700 flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">CamphillGlencraig</span>
                <span className="">{selectedHouse}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="end"
          >
            {houses.map((house, index) => {
              return (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => {
                    setSelectedHouse(house.name);
                    setHouseId(house.id);
                  }}
                >
                  {house.name}{house.id}
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
