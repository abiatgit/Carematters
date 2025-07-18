import { User, Unit } from "@prisma/client";
import { create } from "zustand";

type CareHome = {
  id: string;
  name: string;
  address?: string;
   logo?:string
};
type GlobalState = {
  houseId: string | null;
  user: User | null;
  careHome: CareHome | null;
  houseList: Unit[];
  housesRefreshTrigger: number;
  setHouseId: (houseId: string) => void;
  setUser: (user: User) => void;
  setCareHome: (careHome: CareHome) => void;
  setHouseList: (houseList: Unit[]) => void;
  triggerHousesRefresh: () => void;
  resetState: () => void;
};
export const useGlobalStore = create<GlobalState>()(
    (set) => ({
      user: null,
      careHome: null,
      houseId: null,
      houseList: [],
      housesRefreshTrigger: 0,
      setHouseId: (houseId: string) => set({ houseId }),
      setUser: (user) => set({ user }),
      setCareHome: (careHome) => set({ careHome }),
      setHouseList: (houseList) => set({ houseList }),
      triggerHousesRefresh: () => set((state) => ({ housesRefreshTrigger: state.housesRefreshTrigger + 1 })),
      resetState: () => set({ user: null, careHome: null, houseList: [], housesRefreshTrigger: 0 }),
    })
    
)
