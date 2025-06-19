import { User } from "@prisma/client";
import { create } from "zustand";

type CareHome = {
  id: string;
  name: string;
  address?: string;
};

type Unit = {
  id: string;
  name: string;
};


type GlobalState = {
  houseId: string | null;
  user: User | null;
  house: Unit | null;
  careHome: CareHome | null;
  setHouseId: (houseId: string) => void;
  setUser: (user: User) => void;
  setCareHome: (careHome: CareHome) => void;
  resetState: () => void;
  setHouse: (house: Unit) => void;
};


export const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  house: null,
  careHome: null,
  houseId: null,
  setHouseId: (houseId: string) => set({ houseId }),
  setHouse: (house) => set({ house }),
  setUser: (user) => set({ user }),
  setCareHome: (careHome) => set({ careHome }),
  resetState: () => set({ user: null, careHome: null }),
}));


