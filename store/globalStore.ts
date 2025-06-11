import { create } from "zustand";

type CareHome = {
  id: string;
  name: string;
  address?: string;
};

type User = {
  id: string;
  email: string;
  role: "manager" | "nurse" | "care-assistant";
};
type Unit={
  id:string;
  name:string
}

type GlobalState = {
  user: User | null;
  house:Unit | null;
  careHome: CareHome | null;
  setUser: (user: User) => void;
  setCareHome: (careHome: CareHome) => void;
  resetState: () => void;
  setHouse:(house:Unit)=>void
};
type CareHomeStore = {
  units: Unit[];
  fetchUnits: () => Promise<void>;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  user: null,
  house:null,
  careHome: null,
  setHouse:(house)=>set({house}),
  setUser: (user) => set({ user }),
  setCareHome: (careHome) => set({ careHome }),
  resetState: () => set({ user: null, careHome: null }),
}));

export const useCareHomeStore = create<CareHomeStore>((set) => ({
  units: [],
  fetchUnits: async () => {
    const res = await fetch("/api/houses");
    const data = await res.json();
    set({ units: data });
  },
}));