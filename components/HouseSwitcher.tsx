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
import { userManager } from "@/lib/mockData";

type houseProp = {
  name: string;
};
export function HouseSwitcher({
  houses,
  defaultHouse,
}: {
  houses: houseProp[];
  defaultHouse: string;
}) {
  const currentUser = userManager
  const fileterdHouses= currentUser.role ==="manager"?houses:houses.filter((item)=>item.name===currentUser?.house)
  const [selectedHouse, setSelectedHouse] = React.useState(currentUser.role==="manager"?defaultHouse:fileterdHouses[0].name);
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
            {fileterdHouses.map((house, index) => {
              return (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => setSelectedHouse(house.name)}
                >
                  {house.name}{" "}
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
