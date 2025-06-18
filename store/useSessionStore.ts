// stores/useSessionStore.ts
import { create } from "zustand";

type User = {
  id: string;
  email?: string;
  name?: string;
  role?: string;
} | null;

type UserStore = {
  user:User
  setUser:(user:User)=>void
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
