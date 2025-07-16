"use client"
import {
  Card,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { CreateHouse } from "@/components/forms/houses/createHouse";
import { Badge } from "@/components/ui/badge";
import { useGlobalStore } from "@/store/globalStore";
import { fetchHousewithresident, deleteHouse } from "./action";
import { Resident, User } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
type MinimalCareHome = {
  id: string;
  name?: string;

} | null;
type ExtendedCareHome = {
  id: string;
  name?: string;
  residents: Resident[]
  staff: User[]
} | null;

const Page = () => {
  const { careHome, user } = useGlobalStore()
  const [allhouses, setAllhouses] = useState<ExtendedCareHome[]>([]);
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null);

  async function fetchAllHouse(careHome: MinimalCareHome) {

    if (!careHome || !careHome.id) return;
    try {
      const res = await fetchHousewithresident(careHome.id)
      console.log("all house", res)
      setAllhouses(res!)
    } catch (error) {
      console.error("Failed to fetch houses:", error);
    }
  }
  const refreshHouses = () => {
    fetchAllHouse(careHome)
  };

  const handleDeleteHouse = async (houseId: string) => {
    try {
      const result = await deleteHouse(houseId);
      
      if (result.success) {
        toast.success(result.message);
        refreshHouses(); // Refresh the houses list
        setDeleteDialogId(null); // Close the dialog
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to delete house");
    }
  };
  useEffect(() => {
    fetchAllHouse(careHome)
  }, [careHome])
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
      {allhouses.map((house) => {
        return (
          <Card
            className="p-4 rounded-lg border hover:shadow-md transition-shadow"
            key={house?.id}
          >
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{house?.name}</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Residents: {house?.residents?.length}</span>
                <span>Staff: {house?.staff?.length}</span>
              </div>
              {user?.role === "MANAGER" && (
                <Dialog open={deleteDialogId === house?.id} onOpenChange={(open) => !open && setDeleteDialogId(null)}>
                  <DialogTrigger asChild>
                    <Badge 
                      className="w-fit text-xs border-red-700 bg-rose-100 hover:bg-red-300 cursor-pointer" 
                      variant="outline"
                      onClick={() => setDeleteDialogId(house?.id || '')}
                    >
                      Delete
                    </Badge>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete House</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete &quot;{house?.name}&quot;? This action cannot be undone.
                        {house?.residents && house.residents.length > 0 && (
                          <div className="mt-2 text-red-600">
                            This house has {house.residents.length} resident(s). Please move them first.
                          </div>
                        )}
                        {house?.staff && house.staff.length > 0 && (
                          <div className="mt-2 text-red-600">
                            This house has {house.staff.length} staff member(s). Please reassign them first.
                          </div>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer px-4 py-2"
                        onClick={() => setDeleteDialogId(null)}
                      >
                        Cancel
                      </Badge>
                      <Badge 
                        variant="destructive" 
                        className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700"
                        onClick={() => handleDeleteHouse(house?.id || '')}
                      >
                        Delete
                      </Badge>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </Card>
        );
      })}
      {user?.role === "MANAGER" && (
        <Card className="p-4 rounded-lg border hover:shadow-md transition-shadow flex items-center justify-center">
          <CreateHouse onHouseCreated={refreshHouses} />
        </Card>
      )}
    </div>
  );
};

export default Page;
